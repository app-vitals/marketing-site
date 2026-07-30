import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Fallback for the rare post missing a `date` in frontmatter, mirroring the
// sitemap's lastmod fallback in astro.config.mjs.
const FALLBACK_DATE = '2026-02-01';

function postDate(post) {
  return new Date(post.data.date || FALLBACK_DATE);
}

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'App Vitals Blog',
    description: 'App Vitals builds Shipwright — the open source alternative to Devin.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: postDate(post),
      description: post.data.excerpt,
      link: `${context.site}blog/${post.id}/`,
      categories: [post.data.category],
    })),
  });
}
