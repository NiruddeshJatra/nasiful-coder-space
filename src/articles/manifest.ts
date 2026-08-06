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
    state: 'read',
    href: '/writing/how-does-anything-become-bits',
    enDescription: "Numbers, text, images, and sound — how every kind of information becomes 0s and 1s, and why the CPU understands none of it.",
    bnDescription: 'সংখ্যা, text, image, sound — সব ধরনের তথ্য কীভাবে ০ আর ১ হয়, আর CPU কেন এর কিছুই বোঝে না।',
    datePublished: '2026-07-27',
  },
  {
    slug: 'cpu-blueprint',
    bnTitle: 'CPU-র blueprint',
    enTitle: "The CPU's blueprint",
    sub: 'ALU · register · clock',
    level: 'LEVEL 2 — THE MACHINERY',
    part: '03/08',
    readTime: { bn: '~১২ মিনিট', en: '~12 min' },
    state: 'read',
    href: '/writing/cpu-blueprint',
    enDescription: 'ALU, registers, data bus, and clock — how a literal slab of silicon computes 2+3=5, told in full hardware detail.',
    bnDescription: 'ALU, register, data bus, আর clock — সিলিকনের একটা জড় টুকরো কীভাবে ২+৩=৫ হিসাব করে তার পুরো গল্প।',
    datePublished: '2026-07-30',
  },
  {
    slug: 'heartbeat-fde',
    bnTitle: 'হার্টবিট: Fetch-Decode-Execute',
    enTitle: 'Heartbeat: Fetch-Decode-Execute',
    sub: 'fetch · decode · execute',
    level: 'LEVEL 2 — THE MACHINERY',
    part: '04/08',
    readTime: { bn: '~১৪ মিনিট', en: '~14 min' },
    state: 'read',
    href: '/writing/heartbeat-fde',
    enDescription: 'Program counter, instruction register, control unit — how a CPU pulls an instruction out of memory, works out what it means, and turns it into a real action.',
    bnDescription: 'Program counter, instruction register, control unit — CPU কীভাবে memory থেকে একটা instruction তুলে এনে তার মানে বুঝে সেটাকে বাস্তব কাজে রূপ দেয়।',
    datePublished: '2026-08-03',
  },
  {
    slug: 'memory-hierarchy',
    bnTitle: 'মেমোরি হায়ারার্কি',
    enTitle: 'The Memory Hierarchy',
    sub: 'cache · locality · SRAM vs DRAM',
    level: 'LEVEL 2 — THE MACHINERY',
    part: '05/08',
    readTime: { bn: '~১৬ মিনিট', en: '~16 min' },
    state: 'read',
    href: '/writing/memory-hierarchy',
    enDescription: 'Why one memory is never enough — the speed/capacity/cost trilemma, locality, cache lines, SRAM vs DRAM, and the full register-to-disk lookup path.',
    bnDescription: 'কেন এক memory দিয়ে হয় না — speed/capacity/cost trilemma, locality, cache line, SRAM vs DRAM, আর register থেকে disk পর্যন্ত পুরো lookup path।',
    datePublished: '2026-08-07',
  },
  {
    slug: 'the-grand-manager',
    bnTitle: 'OS — মহাব্যবস্থাপক',
    enTitle: 'The OS — grand manager',
    sub: 'processes · scheduling',
    level: 'LEVEL 3 — THE BRIDGES',
    part: '06/08',
    readTime: { bn: '', en: '' },
    state: 'next',
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
