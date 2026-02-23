---
title: "Portfolio Website"
description: "Just an ordinary portfolio website powered by Astro + SolidJS."
coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"
videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
githubUrl: "https://github.com/AlltAWD/myPortfolio"
demoUrl: "https://ai-image-generator.demo.com"
tags:
  - name: "Astro"
    color: "#ff5d01"
  - name: "TypeScript"
    color: "#3178c6"
  - name: "AI/ML"
    color: "#ff6b6b"
  - name: "Python"
    color: "#3776ab"
featured: true
createdAt: 2024-01-15
---

# Portfolio Website

An ordinary portfolio website powered by Astro + SolidJS.

## Features

- **Markdown + $\LaTeX$ Support**: This website supports Markdown and $\LaTeX$ which enables good reading.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **Type Safety**: Built with TypeScript for robust code.

## Tech Stack

- **Astro** - UI framework
- **SolidJS(TypeScript)** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management

## Installation

```bash
# Clone the repository
git clone https://github.com/AlltAWD/myPortfolio.git

# Install dependencies
npm install
npm run dev
```

## Configuration

The application requires the following environment variables:

```env
OPENAI_API_KEY=your_api_key
DATABASE_URL=postgresql://localhost:5432/ai_images
REDIS_URL=redis://localhost:6379
```

## Performance Optimization

We implemented several optimizations:

1. **Model Quantization**: Reduced model size by 4x
2. **Batch Inference**: Process multiple prompts simultaneously
3. **Caching**: Redis-based caching for repeated prompts
4. **CDN**: Image delivery via CloudFlare CDN

## Results

After optimization, we achieved:

| Metric | Before | After |
|--------|--------|-------|
| Generation Time | 12s | 3.5s |
| Memory Usage | 8GB | 4GB |
| API Latency | 500ms | 120ms |

## Future Plans

- [ ] Support for video generation
- [ ] Fine-tuning capabilities
- [ ] Mobile app release
- [ ] API for third-party integration

---

*This project was built as part of my exploration into generative AI. Feel free to check out the [source code](https://github.com/yourusername/ai-image-generator) or try the [live demo](https://ai-image-generator.demo.com)!*
