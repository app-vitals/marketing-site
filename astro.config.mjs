import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

// Build a map of blog post URL → date from frontmatter at module load time
const blogDateMap = {};
const blogDir = path.resolve('./src/content/blog');
if (fs.existsSync(blogDir)) {
  for (const file of fs.readdirSync(blogDir)) {
    if (!file.endsWith('.md')) continue;
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const match = content.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m);
    if (match) {
      const slug = file.replace(/\.md$/, '');
      blogDateMap[`https://app-vitals.com/blog/${slug}/`] = match[1];
    }
  }
}

export default defineConfig({
  site: 'https://app-vitals.com',
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        const lastmod = blogDateMap[item.url] ?? '2026-02-01';
        return { ...item, lastmod };
      },
    }),
  ],
  output: 'static',
});
