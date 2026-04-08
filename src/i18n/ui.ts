export const languages = {
  'en-US': 'English',
  'zh-CN': '中文',
};

export const defaultLang = 'en-US';

export const ui = {
  'en-US': {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.status': 'Status',
  },
  'zh-CN': {
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.blog': '博客',
    'nav.about': '关于',
    'nav.status': '状态',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
