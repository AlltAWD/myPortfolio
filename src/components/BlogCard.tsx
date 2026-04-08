import { Clock, Calendar } from 'lucide-solid';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  readingTime?: number;
  publishedAt: string;
  category: {
    name: string;
    color: string;
  };
}

interface Props {
  post: BlogPost;
}

export function BlogCard(props: Props) {
  const post = () => props.post;
  
  return (
    <a href={`/blog/${post().slug}`} class="project-card neu-convex overflow-hidden cursor-pointer block">
      {post().coverImage && (
        <div class="relative aspect-video bg-[var(--muted)] overflow-hidden">
          <img
            src={post().coverImage}
            alt={post().title}
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div class="p-6">
        <span
          class="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
          style={{
            'background-color': `${post().category.color}20`,
            'color': post().category.color,
            'border': `1px solid ${post().category.color}40`,
          }}
        >
          {post().category.name}
        </span>
        
        <h3 class="text-xl font-bold mb-2 hover:text-[var(--muted-foreground)] transition-colors">
          {post().title}
        </h3>
        
        {post().excerpt && (
          <p class="text-[var(--muted-foreground)] mb-4 line-clamp-2">{post().excerpt}</p>
        )}
        
        <div class="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <span class="flex items-center gap-1">
            <Calendar class="w-4 h-4" />
            {new Date(post().publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          {post().readingTime && (
            <span class="flex items-center gap-1">
              <Clock class="w-4 h-4" />
              {post().readingTime} min read
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
