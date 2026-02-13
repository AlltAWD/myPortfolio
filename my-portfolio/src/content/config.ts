import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    coverImage: z.string().optional(),
    readingTime: z.number().optional(),
    category: z.object({
      name: z.string(),
      color: z.string(),
    }),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    videoUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    tags: z.array(z.object({
      name: z.string(),
      color: z.string(),
    })),
    featured: z.boolean().default(false),
    createdAt: z.coerce.date().optional(),
  }),
});

export const collections = { blog, projects };