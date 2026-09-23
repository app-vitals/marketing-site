import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Optional override for the <title>/og:title/twitter:title tags. Use when the
    // display title (H1) is descriptive but too long for search-result titles —
    // BaseLayout otherwise auto-shortens by dropping the " — App Vitals" suffix.
    seoTitle: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
    author: z.string(),
    category: z.enum(['AI Adoption', 'Engineering Velocity', 'Technical Leadership', 'Company Updates']),
    excerpt: z.string(),
    readTime: z.string(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  }),
});

export const collections = { blog };
