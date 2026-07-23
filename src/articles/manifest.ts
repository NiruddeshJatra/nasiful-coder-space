interface ArticleBase {
  slug: string;
  bnTitle: string;
  enTitle: string;
  sub: string;
  level: string;
  part: string;
  readTime: { bn: string; en: string };
  href: string;
}

/** SEO meta fields, required once an article is routed/prerendered (state: 'read'). */
interface ArticleSEOFields {
  enDescription: string;
  bnDescription: string;
  /** ISO date (YYYY-MM-DD) */
  datePublished: string;
}

export type PublishedArticleEntry = ArticleBase & ArticleSEOFields & { state: 'read' };
type UnpublishedArticleEntry = ArticleBase & { state: 'next' | 'soon' };

// A union keyed on `state` — TypeScript enforces enDescription/bnDescription/
// datePublished at compile time for any entry marked 'read', instead of that
// only surfacing as a runtime throw when the page renders.
export type ArticleEntry = PublishedArticleEntry | UnpublishedArticleEntry;

export const SERIES_TITLE = 'The Machine Beneath Your Code';
export const SERIES_DESCRIPTION_EN = 'A series on how computers actually work, from bits to OS. One protagonist — information.';
export const SERIES_DESCRIPTION_BN = 'কম্পিউটার আসলে কীভাবে কাজ করে তার একটা series — bit থেকে OS পর্যন্ত। একটাই protagonist — তথ্য।';

export type IntroArticleEntry = ArticleSEOFields & {
  slug: string;
  bnTitle: string;
  enTitle: string;
  sub: string;
  tag: string;
  href: string;
};

export const INTRO_ARTICLE: IntroArticleEntry = {
  slug: 'the-machine-beneath-your-code',
  // Title kept in English even in BN mode — "The Machine Beneath Your Code" is the series name, not translated.
  bnTitle: 'Intro — The Machine Beneath Your Code',
  enTitle: 'Intro — The Machine Beneath Your Code',
  sub: "series-র roadmap · এখান থেকে শুরু / the series roadmap · start here",
  tag: 'power on ⏻',
  href: '/writing/the-machine-beneath-your-code',
  enDescription: 'A story of hardware and operating systems from the ground up — where was that 5 stored?',
  bnDescription: 'হার্ডওয়্যার আর অপারেটিং সিস্টেমের ভেতরের গল্প — সেই ৫ সংখ্যাটা কোথায় গিয়েছিল?',
  datePublished: '2026-07-18',
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
    enDescription: 'Transistors, voltage, and the birth of memory — how a bit physically lives in silicon.',
    bnDescription: 'Transistor, voltage, আর memory-র শুরু — একটা bit কীভাবে physically silicon-এ থাকে।',
    datePublished: '2026-07-18',
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
