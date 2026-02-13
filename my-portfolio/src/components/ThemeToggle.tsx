import { createSignal, onMount, Show } from 'solid-js';
import { Sun, Moon } from 'lucide-solid';

export function ThemeToggle() {
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
    <Show when={mounted()}>
      <button
        onClick={toggleTheme}
        class="w-10 h-10 neu-flat flex items-center justify-center cursor-pointer theme-toggle"
        aria-label={`Switch to ${isDark() ? 'light' : 'dark'} mode`}
      >
        <Show when={isDark()} fallback={<Sun class="w-5 h-5" />}>
          <Moon class="w-5 h-5" />
        </Show>
      </button>
    </Show>
  );
}