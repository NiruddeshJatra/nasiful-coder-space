export interface ArticleEntry {
  slug: string;
  bnTitle: string;
  enTitle: string;
  sub: string;
  level: string;
  part: string;
  readTime: { bn: string; en: string };
  state: 'read' | 'next' | 'soon';
  href: string;
}

export const SERIES_TITLE = 'The Machine Beneath Your Code';

export const INTRO_ARTICLE = {
  slug: 'the-machine-beneath-your-code',
  bnTitle: 'ভূমিকা — আপনার কোডের নিচের যন্ত্রটা',
  enTitle: 'Intro — the machine beneath your code',
  sub: "series-র roadmap · এখান থেকে শুরু / the series roadmap · start here",
  tag: 'power on ⏻',
  href: '/writing/the-machine-beneath-your-code',
};

export const ARTICLES: ArticleEntry[] = [
  {
    slug: 'whats-inside-a-bit',
    bnTitle: 'বিটের ভেতরে কী থাকে?',
    enTitle: "What's inside a bit?",
    sub: 'voltage · transistor · latch',
    level: 'LEVEL 1 — THE ATOMS',
    part: '01/08',
    readTime: { bn: '~১২ মিনিট', en: '~12 min' },
    state: 'read',
    href: '/writing/whats-inside-a-bit',
  },
  {
    slug: 'how-does-anything-become-bits',
    bnTitle: 'যেকোনো তথ্য কীভাবে ০ আর ১ হয়?',
    enTitle: 'How does anything become 0s and 1s?',
    sub: 'encoding · numbers · text',
    level: 'LEVEL 1 — THE ATOMS',
    part: '02/08',
    readTime: { bn: '~১৫ মিনিট', en: '~15 min' },
    state: 'next',
    href: '#',
  },
  {
    slug: 'how-do-gates-do-arithmetic',
    bnTitle: 'Gate-রা কীভাবে হিসাব করে?',
    enTitle: 'How do gates do arithmetic?',
    sub: 'adder · ALU',
    level: 'LEVEL 2 — THE MACHINERY',
    part: '03/08',
    readTime: { bn: '', en: '' },
    state: 'soon',
    href: '#',
  },
  {
    slug: 'what-does-a-cpu-actually-do',
    bnTitle: 'CPU আসলে কী করে?',
    enTitle: 'What does a CPU actually do?',
    sub: 'fetch · decode · execute',
    level: 'LEVEL 2 — THE MACHINERY',
    part: '04/08',
    readTime: { bn: '', en: '' },
    state: 'soon',
    href: '#',
  },
  {
    slug: 'the-city-of-memory',
    bnTitle: 'Memory-র শহর',
    enTitle: 'The city of memory',
    sub: 'RAM · cache · addresses',
    level: 'LEVEL 2 — THE MACHINERY',
    part: '05/08',
    readTime: { bn: '', en: '' },
    state: 'soon',
    href: '#',
  },
  {
    slug: 'the-grand-manager',
    bnTitle: 'OS — মহাব্যবস্থাপক',
    enTitle: 'The OS — grand manager',
    sub: 'processes · scheduling',
    level: 'LEVEL 3 — THE BRIDGES',
    part: '06/08',
    readTime: { bn: '', en: '' },
    state: 'soon',
    href: '#',
  },
  {
    slug: 'the-compilers-translation',
    bnTitle: 'Compiler-এর অনুবাদ',
    enTitle: "The compiler's translation",
    sub: 'source → machine code',
    level: 'LEVEL 3 — THE BRIDGES',
    part: '07/08',
    readTime: { bn: '', en: '' },
    state: 'soon',
    href: '#',
  },
  {
    slug: 'from-keypress-to-screen',
    bnTitle: 'Keypress থেকে screen',
    enTitle: 'From keypress to screen',
    sub: 'the relay race, end to end',
    level: 'LEVEL 3 — THE BRIDGES',
    part: '08/08',
    readTime: { bn: '', en: '' },
    state: 'soon',
    href: '#',
  },
];

export function getArticle(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
