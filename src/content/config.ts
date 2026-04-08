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

const status = defineCollection({
  type: 'data',
  schema: z.object({
    learning: z.array(z.object({
      title: z.string(),
      progress: z.number(),
      description: z.string(),
      tasks: z.array(z.string()).default([]),
      lastUpdated: z.string(),
    })).default([]),
    building: z.array(z.object({
      title: z.string(),
      progress: z.number(),
      tasks: z.array(z.string()).default([]),
      lastUpdated: z.string(),
    })).default([]),
    research: z.array(z.object({
      title: z.string(),
      phase: z.string(),
      color: z.string().default('purple'),
      description: z.string(),
      lastUpdated: z.string(),
    })).default([]),
  }),
});

export const collections = { blog, projects, status };