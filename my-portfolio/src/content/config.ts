import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    coverImage: z.string().optional(),
    readingTime: z.number().optional(),
    category: z.object({
      name: z.string(),
      color: z.string(),
    }),
  }),
});

export const collections = { blog };