import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  integrations: [
    solid(),
    mdx(),
    tailwind()
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});