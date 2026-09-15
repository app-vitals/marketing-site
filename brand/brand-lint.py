#!/usr/bin/env python3
"""Brand lint — deterministic brand checks. Python 3 stdlib only.

Checks content files against the project's brand system:
  * banned terms          (terminology.yaml: banned,        case-insensitive, HIGH)
  * preferred terms       (terminology.yaml: preferred,     case-insensitive, LOW)
  * casing rules          (terminology.yaml: casing,        case-sensitive,   LOW)
  * product names         (terminology.yaml: product_names, case-sensitive,   LOW)
  * off-palette hex colors (tokens.json: any 6-digit hex not in the palette,  MEDIUM)

Files inside the brand directory get only the hex check (they define the
terminology, so term rules would flag their own definitions).

Usage:
  brand-lint.py [--brand-dir DIR] [--hook] <file-or-directory ...>

Exit codes: 0 = clean, 1 = findings, 2 = usage or brand-config error.
In --hook mode (Claude Code PostToolUse), reads the hook JSON from stdin,
lints the edited file, prints findings, and always exits 0 (advisory).
"""

import argparse
import json
import re
import sys
from pathlib import Path

CONTENT_EXTS = {".md", ".mdx", ".txt", ".html", ".htm", ".css", ".svg"}
HEX_RE = re.compile(r"#[0-9a-fA-F]{6}\b")
ALWAYS_ALLOWED_HEX = {"#FFFFFF", "#000000"}

SECTIONS = {
    # section -> (identity key, case-insensitive?, severity, rule id)
    "banned": ("term", True, "HIGH", "banned-term"),
    "preferred": ("use", True, "LOW", "preferred-term"),
    "casing": ("correct", False, "LOW", "casing"),
    "product_names": ("correct", False, "LOW", "product-name"),
}


def config_error(msg):
    print(f"brand-lint: config error: {msg}", file=sys.stderr)
    sys.exit(2)


def strip_quotes(value):
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def strip_inline_comment(value):
    """Strip a trailing ' #...' inline comment from an unquoted scalar.

    Only whitespace-preceded '#' counts as a comment delimiter (the common
    YAML-adjacent convention) so a literal '#' with no preceding space —
    e.g. a `matches` regex like `#[0-9a-f]{6}` — survives untouched.
    Quoted values (e.g. "foo # bar") are never touched here; strip_quotes
    handles those, and their '#' is preserved as literal content.
    """
    stripped = value.strip()
    if len(stripped) >= 2 and stripped[0] == stripped[-1] and stripped[0] in "\"'":
        return value  # quoted — leave comment-looking content alone
    match = re.search(r"\s#", value)
    if match:
        return value[:match.start()]
    return value


def parse_terminology(path):
    """Parse the constrained YAML subset defined in references/brand-file-schemas.md."""
    rules = {name: [] for name in SECTIONS}
    section = None
    item = None
    for lineno, raw in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        top = re.match(r"^([A-Za-z_][A-Za-z0-9_]*):\s*$", raw)
        if top:
            section = top.group(1)
            item = None
            if section not in SECTIONS:
                print(f"brand-lint: warning: unknown terminology section "
                      f"'{section}' (line {lineno}) — ignored", file=sys.stderr)
            continue
        entry = re.match(r"^\s*-\s+([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$", raw)
        if entry:
            if section is None:
                config_error(f"{path}:{lineno}: list item outside any section")
            item = {entry.group(1): strip_quotes(strip_inline_comment(entry.group(2)))}
            if section in SECTIONS:
                rules[section].append(item)
            continue
        cont = re.match(r"^\s+([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$", raw)
        if cont and item is not None:
            item[cont.group(1)] = strip_quotes(strip_inline_comment(cont.group(2)))
            continue
        config_error(f"{path}:{lineno}: unparseable line (the schema allows only "
                     f"'section:', '- key: value', and indented 'key: value' lines)")

    compiled = []
    for section, (ident, ci, severity, rule_id) in SECTIONS.items():
        for entry in rules[section]:
            if ident not in entry or "matches" not in entry:
                config_error(f"{path}: every '{section}' entry needs "
                             f"'{ident}' and 'matches' — got {entry}")
            try:
                pattern = re.compile(entry["matches"], re.IGNORECASE if ci else 0)
            except re.error as exc:
                config_error(f"{path}: bad regex {entry['matches']!r}: {exc}")
            compiled.append((pattern, entry, ident, severity, rule_id))
    return compiled


def collect_palette(path):
    """Recursively harvest every 6-digit hex from tokens.json (shape-tolerant)."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        config_error(f"{path}: invalid JSON: {exc}")
    palette = set(ALWAYS_ALLOWED_HEX)

    def walk(node):
        if isinstance(node, dict):
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for value in node:
                walk(value)
        elif isinstance(node, str):
            for match in HEX_RE.findall(node):
                palette.add(match.upper())

    walk(data)
    return palette


def lint_file(path, term_rules, palette, in_brand_dir):
    findings = []
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as exc:
        return [(path, 0, "MEDIUM", "unreadable", str(exc))]
    for lineno, line in enumerate(lines, 1):
        if not in_brand_dir:
            for pattern, entry, ident, severity, rule_id in term_rules:
                if pattern.search(line):
                    msg = f"use {entry[ident]!r}"
                    if entry.get("reason"):
                        msg += f" ({entry['reason']})"
                    if entry.get("use_instead"):
                        msg += f" — instead: {entry['use_instead']}"
                    if entry.get("note"):
                        msg += f" [note: {entry['note']}]"
                    findings.append((path, lineno, severity, rule_id, msg))
        if palette is not None:
            off = sorted({h.upper() for h in HEX_RE.findall(line)} - palette)
            if off:
                findings.append((path, lineno, "MEDIUM", "off-palette-color",
                                 f"not in tokens.json: {', '.join(off)}"))
    return findings


def gather_targets(args_paths):
    files = []
    for arg in args_paths:
        p = Path(arg)
        if p.is_dir():
            files.extend(sorted(f for f in p.rglob("*")
                                if f.is_file() and f.suffix.lower() in CONTENT_EXTS))
        elif p.is_file():
            files.append(p)
        else:
            config_error(f"no such file or directory: {arg}")
    return files


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("targets", nargs="*", help="files or directories to lint")
    parser.add_argument("--brand-dir", default="brand",
                        help="brand system directory (default: ./brand)")
    parser.add_argument("--hook", action="store_true",
                        help="Claude Code PostToolUse mode: read hook JSON on "
                             "stdin, lint the edited file, always exit 0")
    args = parser.parse_args()

    brand_dir = Path(args.brand_dir)
    term_path = brand_dir / "terminology.yaml"
    tokens_path = brand_dir / "tokens.json"
    term_rules = parse_terminology(term_path) if term_path.is_file() else []
    palette = collect_palette(tokens_path) if tokens_path.is_file() else None
    if not term_rules and palette is None:
        config_error(f"nothing to enforce: neither {term_path} nor {tokens_path} exists")
    if palette is None:
        print("brand-lint: note: no tokens.json — color check disabled", file=sys.stderr)
    if not term_rules:
        print("brand-lint: note: no terminology.yaml — term checks disabled", file=sys.stderr)

    if args.hook:
        try:
            payload = json.load(sys.stdin)
        except json.JSONDecodeError:
            return 0
        edited = payload.get("tool_input", {}).get("file_path", "")
        p = Path(edited)
        if not (p.is_file() and p.suffix.lower() in CONTENT_EXTS):
            return 0
        targets = [p]
    else:
        if not args.targets:
            parser.error("no targets given")
        targets = gather_targets(args.targets)

    brand_resolved = brand_dir.resolve()
    all_findings = []
    for path in targets:
        in_brand = brand_resolved in path.resolve().parents or path.resolve().parent == brand_resolved
        all_findings.extend(lint_file(path, term_rules, palette, in_brand))

    for path, lineno, severity, rule_id, msg in all_findings:
        print(f"{path}:{lineno}: [{severity}:{rule_id}] {msg}")
    clean = [p for p in targets if not any(f[0] == p for f in all_findings)]
    print(f"brand-lint: {len(all_findings)} finding(s) across {len(targets)} file(s) "
          f"({len(clean)} clean)", file=sys.stderr)
    if args.hook:
        return 0
    return 1 if all_findings else 0


if __name__ == "__main__":
    sys.exit(main())
