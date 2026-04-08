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
    document.documentElement.classList.add('theme-transition');
    
    const newTheme = isDark() ? 'light' : 'dark';
    setIsDark(!isDark());
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);

    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 150);
  };

  return (
    <Show when={mounted()}>
      <button
        onClick={toggleTheme}
        class="w-10 h-10 flex items-center justify-center cursor-pointer theme-toggle relative rounded-xl neu-flat hover:neu-pressed transition-all"
        aria-label={`Switch to ${isDark() ? 'light' : 'dark'} mode`}
      >
        <div class="absolute inset-0 flex items-center justify-center text-orange-500 theme-toggle-icon sun-icon">
          <Sun class="w-5 h-5" />
        </div>
        <div class="absolute inset-0 flex items-center justify-center text-blue-400 theme-toggle-icon moon-icon">
          <Moon class="w-5 h-5" />
        </div>
      </button>
    </Show>
  );
}