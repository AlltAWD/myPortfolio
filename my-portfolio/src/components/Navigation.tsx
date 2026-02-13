import { createSignal, onMount, Show, For } from 'solid-js';
import { Sun, Moon } from 'lucide-solid';
import { Motion } from 'solid-motionone';

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'about', label: 'About', href: '/about' },
];

export function Navigation() {
  const [isDark, setIsDark] = createSignal(false);
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    setMounted(true);
    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setIsDark(theme === 'dark');
  });

  const toggleTheme = () => {
    const newTheme = isDark() ? 'light' : 'dark';
    setIsDark(!isDark());
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav class="fixed top-0 left-0 right-0 z-50 p-4">
      <Motion.div 
        class="max-w-4xl mx-auto neu-flat px-6 py-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Motion.div 
          class="font-bold text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>My</span>
          <span class="text-[var(--muted-foreground)]">Portfolio</span>
        </Motion.div>

        <div class="flex items-center gap-1">
          <For each={navItems}>
            {(item, index) => (
              <Motion.a
                href={item.href}
                class="px-4 py-2 rounded-lg font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index() * 0.1 }}
              >
                {item.label}
              </Motion.a>
            )}
          </For>
          
          <Show when={mounted()}>
            <Motion.button
              onClick={toggleTheme}
              class="w-10 h-10 neu-flat flex items-center justify-center cursor-pointer theme-toggle ml-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              aria-label="Toggle theme"
            >
              <Show when={isDark()} fallback={<Sun class="w-5 h-5" />}>
                <Moon class="w-5 h-5" />
              </Show>
            </Motion.button>
          </Show>
        </div>
      </Motion.div>
    </nav>
  );
}