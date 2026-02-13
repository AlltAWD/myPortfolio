import { Search, X } from 'lucide-solid';
import { createSignal, For, Show } from 'solid-js';

interface Tag {
  name: string;
  color: string;
}

interface Props {
  tags: Tag[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
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

export function SearchFilter(props: Props) {
  const [isFocused, setIsFocused] = createSignal(false);

  return (
    <div class="neu-flat p-6 mb-8">
      <div class={`relative mb-4 transition-all ${isFocused() ? 'scale-[1.02]' : ''}`}>
        <div class={`flex items-center gap-3 px-4 py-3 neu-pressed rounded-xl ${
          isFocused() ? 'ring-2 ring-[var(--foreground)]/20' : ''
        }`}>
          <Search class="w-5 h-5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={props.searchQuery}
            onInput={(e) => props.onSearchChange(e.currentTarget.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            class="flex-1 bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
          />
          <Show when={props.searchQuery}>
            <button
              onClick={() => props.onSearchChange('')}
              class="p-1 hover:bg-[var(--muted)] rounded-full transition-colors"
            >
              <X class="w-4 h-4 text-[var(--muted-foreground)]" />
            </button>
          </Show>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span class="text-sm text-[var(--muted-foreground)] mr-2 self-center">Filter by:</span>
        <For each={props.tags}>
          {(tag) => {
            const isSelected = () => props.selectedTags.includes(tag.name);
            const color = tagColors[tag.name] || tag.color;
            
            return (
              <button
                onClick={() => props.onTagToggle(tag.name)}
                class={`tag text-sm font-medium transition-all ${
                  isSelected() ? 'scale-105' : ''
                }`}
                style={{
                  'background-color': isSelected() ? `${color}30` : `${color}10`,
                  'color': color,
                  'border': `2px solid ${isSelected() ? color : `${color}40`}`,
                  'box-shadow': isSelected() ? `0 0 12px ${color}40` : 'none',
                }}
              >
                {tag.name}
              </button>
            );
          }}
        </For>
        
        <Show when={props.selectedTags.length > 0}>
          <button
            onClick={() => props.selectedTags.forEach(t => props.onTagToggle(t))}
            class="px-3 py-1 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Clear all
          </button>
        </Show>
      </div>
    </div>
  );
}