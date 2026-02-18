import { createSignal, createMemo, For, Show } from 'solid-js';
import { Search, X } from 'lucide-solid';
import { Motion } from 'solid-motionone';
import { ProjectCard, type Project } from './ProjectCard';

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
  'Tailwind': '#38bdf8',
};

interface Props {
  projects: Project[];
  allTags: { name: string; color: string }[];
}

export function ProjectsPage(props: Props) {
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);
  const [searchQuery, setSearchQuery] = createSignal('');
  const [isFocused, setIsFocused] = createSignal(false);

  const filteredProjects = createMemo(() => {
    return props.projects.filter((project) => {
      const matchesSearch =
        searchQuery() === '' ||
        project.title.toLowerCase().includes(searchQuery().toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery().toLowerCase());
      
      const matchesTags =
        selectedTags().length === 0 ||
        selectedTags().every((tag) => project.tags.some((t) => t.name === tag));
      
      return matchesSearch && matchesTags;
    });
  });

  const toggleTag = (tag: string) => {
    const current = selectedTags();
    if (current.includes(tag)) {
      setSelectedTags(current.filter((t) => t !== tag));
    } else {
      setSelectedTags([...current, tag]);
    }
  };

  return (
    <div>
      {/* Search & Filter */}
      <div class="neu-flat p-6 mb-8">
        <div class={`relative mb-4 transition-all ${isFocused() ? 'scale-[1.02]' : ''}`}>
          <div
            class={`flex items-center gap-3 px-4 py-3 neu-pressed rounded-xl ${
              isFocused() ? 'ring-2 ring-[var(--foreground)]/20' : ''
            }`}
          >
            <Search class="w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              class="flex-1 bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
            />
            <Show when={searchQuery()}>
              <button
                onClick={() => setSearchQuery('')}
                class="p-1 hover:bg-[var(--muted)] rounded-full transition-colors"
              >
                <X class="w-4 h-4 text-[var(--muted-foreground)]" />
              </button>
            </Show>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <span class="text-sm text-[var(--muted-foreground)] mr-2 self-center">
            Filter by:
          </span>
          <For each={props.allTags}>
            {(tag) => {
              const isSelected = () => selectedTags().includes(tag.name);
              const color = tagColors[tag.name] || tag.color;

              return (
                <Motion.button
                  onClick={() => toggleTag(tag.name)}
                  class="tag text-sm font-medium transition-all"
                  style={{
                    'background-color': isSelected() ? `${color}30` : `${color}10`,
                    color: color,
                    border: `2px solid ${isSelected() ? color : `${color}40`}`,
                    'box-shadow': isSelected() ? `0 0 12px ${color}40` : 'none',
                  }}
                >
                  {tag.name}
                </Motion.button>
              );
            }}
          </For>

          <Show when={selectedTags().length > 0}>
            <button
              onClick={() => setSelectedTags([])}
              class="px-3 py-1 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Clear all
            </button>
          </Show>
        </div>
      </div>

      {/* Projects Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <For each={filteredProjects()}>
          {(project, index) => (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index() * 0.1 }}
            >
              <ProjectCard project={project} />
            </Motion.div>
          )}
        </For>
      </div>

      <Show when={filteredProjects().length === 0}>
        <div class="text-center py-12 text-[var(--muted-foreground)]">
          No projects found matching your criteria.
        </div>
      </Show>
    </div>
  );
}