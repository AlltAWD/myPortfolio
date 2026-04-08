import { createSignal, onMount, createEffect, Show, For } from 'solid-js';
import { Sun, Moon, Menu, X, Globe } from 'lucide-solid';
import { Motion } from 'solid-motionone';
import { ui, defaultLang } from '../i18n/ui';

export function Navigation() {
  const [isDark, setIsDark] = createSignal(false);
  const [mounted, setMounted] = createSignal(false);
  const [activeTab, setActiveTab] = createSignal('');
  const [capsuleStyle, setCapsuleStyle] = createSignal({ left: 0, width: 0, opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
  const [currentLang, setCurrentLang] = createSignal<keyof typeof ui>(defaultLang);
  
  let navRefs: (HTMLAnchorElement | undefined)[] = [];

  const getTranslatedNavItems = () => {
    const lang = currentLang();
    const t = (key: keyof typeof ui['en-US']) => ui[lang][key] || ui[defaultLang][key];
    const prefix = lang === defaultLang ? '' : `/${lang}`;
    
    return [
      { id: 'home', label: t('nav.home'), href: `${prefix}/` },
      { id: 'projects', label: t('nav.projects'), href: `${prefix}/projects` },
      { id: 'blog', label: t('nav.blog'), href: `${prefix}/blog` },
      { id: 'about', label: t('nav.about'), href: `${prefix}/about` },
    ];
  };

  onMount(() => {
    setMounted(true);

    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setIsDark(theme === 'dark');

    // Function to update active tab and language
    const updateState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      
      // Determine language from path
      const langSegment = path.split('/')[1];
      if (langSegment === 'zh-CN') {
        setCurrentLang('zh-CN');
      } else {
        setCurrentLang('en-US');
      }

      // Determine active tab
      const currentItems = getTranslatedNavItems();
      const currentItem = currentItems.find(item => {
        if (item.href === '/' || item.href === '/zh-CN') {
          return path === '/' || path === '/zh-CN';
        }
        return path.startsWith(item.href);
      });
      
      if (currentItem) {
        setActiveTab(currentItem.id);
      } else if (path.includes('/projects')) {
        setActiveTab('projects');
      }
    };

    // Wait for fonts to load so we get the correct width for the capsule
    document.fonts.ready.then(() => {
      updateState();
    });
    
    // Listen for Astro page swaps (if ClientRouter is used)
    document.addEventListener('astro:page-load', updateState);
  });

  const toggleTheme = () => {
    // Enable global transition
    document.documentElement.classList.add('theme-transition');
    
    const newTheme = isDark() ? 'light' : 'dark';
    setIsDark(!isDark());
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);

    // Disable global transition after animation
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 150);
  };

  const toggleLanguage = () => {
    const path = window.location.pathname;
    let newPath = path;
    
    if (currentLang() === 'en-US') {
      newPath = `/zh-CN${path === '/' ? '' : path}`;
    } else {
      newPath = path.replace(/^\/zh-CN/, '') || '/';
    }
    
    window.location.href = newPath;
  };

  // Update capsule position when activeTab changes
  createEffect(() => {
    const currentId = activeTab();
    const currentItems = getTranslatedNavItems();
    const index = currentItems.findIndex(item => item.id === currentId);
    
    if (index !== -1 && navRefs[index]) {
      const el = navRefs[index]!;
      setCapsuleStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  });

  return (
    <nav class="fixed top-0 left-0 right-0 z-50 p-4">
      <Motion.div 
        class="max-w-6xl mx-auto neu-flat px-6 py-3 flex items-center justify-between"
        // Only animate opacity/y if it's the first time loading in this session
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
          <span>Hanson</span>
          <span class="text-[var(--muted-foreground)]">Liu</span>
        </Motion.div>

        <div class="hidden md:flex items-center gap-1 relative">
          {/* Sliding Capsule Background */}
          <Motion.div
            class="absolute neu-convex rounded-lg h-full top-0 -z-10"
            animate={{ 
              left: `${capsuleStyle().left}px`, 
              width: `${capsuleStyle().width}px`,
              opacity: capsuleStyle().opacity 
            }}
            transition={{ duration: 0.3 }}
          />

          <For each={getTranslatedNavItems()}>
            {(item, index) => (
              <a
                ref={(el) => navRefs[index()] = el}
                href={item.href}
                onClick={() => setActiveTab(item.id)}
                class={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab() === item.id ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
              >
                {item.label}
              </a>
            )}
          </For>
        </div>

        <div class="flex items-center gap-2">
          <Show when={mounted()}>
            <button
              onClick={toggleLanguage}
              class="w-10 h-10 flex items-center justify-center cursor-pointer relative rounded-xl neu-flat hover:neu-pressed transition-all text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              aria-label="Toggle language"
              title={currentLang() === 'en-US' ? 'Switch to Chinese' : 'Switch to English'}
            >
              <Globe class="w-5 h-5" />
              <span class="absolute -bottom-1 -right-1 text-[10px] font-bold bg-[var(--card)] px-1 rounded-sm shadow-sm">
                {currentLang() === 'en-US' ? '中' : 'EN'}
              </span>
            </button>
            
            <button
              onClick={toggleTheme}
              class="w-10 h-10 flex items-center justify-center cursor-pointer theme-toggle relative rounded-xl neu-flat hover:neu-pressed transition-all"
              aria-label="Toggle theme"
            >
              <div class="absolute inset-0 flex items-center justify-center text-orange-500 theme-toggle-icon sun-icon">
                <Sun class="w-5 h-5" />
              </div>
              <div class="absolute inset-0 flex items-center justify-center text-blue-400 theme-toggle-icon moon-icon">
                <Moon class="w-5 h-5" />
              </div>
            </button>
          </Show>

          {/* Mobile Menu Toggle */}
          <button 
            class="md:hidden p-2 neu-flat rounded-lg text-[var(--foreground)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen())}
            aria-label="Toggle menu"
          >
            <Show when={isMobileMenuOpen()} fallback={<Menu class="w-6 h-6" />}>
              <X class="w-6 h-6" />
            </Show>
          </button>
        </div>
      </Motion.div>

      {/* Mobile Menu Dropdown */}
      <Show when={isMobileMenuOpen()}>
        <Motion.div
          class="md:hidden max-w-6xl mx-auto mt-4 neu-flat rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div class="flex flex-col p-4 gap-2">
            <For each={getTranslatedNavItems()}>
              {(item) => (
                <a 
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  class="px-4 py-3 rounded-lg hover:bg-[var(--muted)] transition-colors font-medium"
                >
                  {item.label}
                </a>
              )}
            </For>
          </div>
        </Motion.div>
      </Show>
    </nav>
  );
}