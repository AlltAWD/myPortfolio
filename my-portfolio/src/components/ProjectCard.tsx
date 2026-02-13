import { Github, ExternalLink, Play } from 'lucide-solid';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: { name: string; color: string }[];
}

interface Props {
  project: Project;
}

const tagColors: Record<string, string> = {
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Next.js': '#000000',
  'Node.js': '#339933',
  'Python': '#3776ab',
  'Rust': '#dea584',
  'AI/ML': '#ff6b6b',
  'Web': '#4ecdc4',
  'Mobile': '#a855f7',
  'Database': '#f59e0b',
  'SolidJS': '#4f88c6',
  'Astro': '#ff5d01',
  'Tailwind': '#38bdf8',
};

export function ProjectCard(props: Props) {
  const project = () => props.project;
  
  return (
    <div class="project-card neu-convex overflow-hidden">
      {project().imageUrl && (
        <div class="relative aspect-video bg-[var(--muted)] overflow-hidden">
          <img
            src={project().imageUrl}
            alt={project().title}
            class="w-full h-full object-cover"
          />
          {project().videoUrl && (
            <div class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <div class="w-16 h-16 neu-flat rounded-full flex items-center justify-center">
                <Play class="w-8 h-8" fill="currentColor" />
              </div>
            </div>
          )}
        </div>
      )}
      
      <div class="p-6">
        <h3 class="text-xl font-bold mb-2">{project().title}</h3>
        <p class="text-[var(--muted-foreground)] mb-4 line-clamp-2">{project().description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          {project().tags.map((tag) => (
            <span
              class="tag text-xs font-semibold"
              style={{
                'background-color': `${tagColors[tag.name] || tag.color}20`,
                'color': tagColors[tag.name] || tag.color,
                'border': `1px solid ${tagColors[tag.name] || tag.color}40`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        
        <div class="flex gap-3">
          {project().githubUrl && (
            <a
              href={project().githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-4 py-2 neu-flat rounded-lg text-sm font-medium hover:opacity-80"
            >
              <Github class="w-4 h-4" />
              Code
            </a>
          )}
          {project().demoUrl && (
            <a
              href={project().demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 px-4 py-2 neu-flat rounded-lg text-sm font-medium hover:opacity-80"
            >
              <ExternalLink class="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}