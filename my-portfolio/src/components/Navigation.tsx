import { A } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'about', label: 'About', href: '/about' },
];

export function Navigation() {
  const [activeTab, setActiveTab] = createSignal('home');

  return (
    <nav class="fixed top-0 left-0 right-0 z-50 p-4">
      <div class="max-w-4xl mx-auto neu-flat px-6 py-3 flex items-center justify-between">
        <div class="font-bold text-xl">
          <span>My</span>
          <span class="text-[var(--muted-foreground)]">Portfolio</span>
        </div>

        <div class="flex items-center gap-1">
          {navItems.map((item) => (
            <A
              href={item.href}
              class={`relative px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab() === item.id
                  ? 'text-[var(--foreground)]'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
              onClick={() => setActiveTab(item.id)}
              activeClass="neu-pressed"
            >
              {item.label}
            </A>
          ))}
          
          <div class="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}