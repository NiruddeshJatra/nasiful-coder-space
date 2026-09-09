import '../articles/article.css';
import SEO from '../components/SEO';
import { articleSchema } from '../lib/structuredData';
import { LanguageProvider } from '../articles/context/LanguageContext';
import { TermProvider } from '../articles/context/TermContext';
import { TermPopup } from '../articles/primitives/Term';
import { PromptBar } from '../articles/primitives/PromptBar';
import { Kicker } from '../articles/primitives/Kicker';
import { TraceRail } from '../articles/primitives/TraceRail';
import { MachineBeneathYourCode } from '../articles/content/MachineBeneathYourCode';
import { WhatsInsideABit } from '../articles/content/WhatsInsideABit';
import { HowDoesAnythingBecomeBits } from '../articles/content/HowDoesAnythingBecomeBits';
import { BlueprintOfACPU } from '../articles/content/BlueprintOfACPU';
import { HeartbeatFDE } from '../articles/content/HeartbeatFDE';
import { MemoryHierarchy } from '../articles/content/MemoryHierarchy';
import { OSGrandConductor } from '../articles/content/OSGrandConductor';
import { CodeToMachineCode } from '../articles/content/CodeToMachineCode';
import { KeyboardToScreen } from '../articles/content/KeyboardToScreen';
import { useLang } from '../articles/context/LanguageContext';
import { ARTICLES, INTRO_ARTICLE, getArticle, SERIES_TITLE, PublishedArticleEntry, IntroArticleEntry } from '../articles/manifest';
import { SITE_URL } from '../lib/site';

type ArticleSlug = 'the-machine-beneath-your-code' | 'whats-inside-a-bit' | 'how-does-anything-become-bits' | 'cpu-blueprint' | 'heartbeat-fde' | 'memory-hierarchy' | 'os-grand-conductor' | 'code-to-machine-code' | 'from-keypress-to-screen';

// manifest.ts enforces enDescription/bnDescription/datePublished at compile time
// for any ARTICLES entry with state: 'read' (see PublishedArticleEntry). This
// runtime check only covers the string-keyed lookup below, which TS can't
// narrow statically — it's a defense-in-depth fallback, not the primary guard.
function getArticleMeta(slug: ArticleSlug): PublishedArticleEntry | IntroArticleEntry {
  const entry = slug === INTRO_ARTICLE.slug ? INTRO_ARTICLE : getArticle(slug);
  if (!entry || !('datePublished' in entry)) {
    throw new Error(`Article "${slug}" is not a published (state: 'read') entry in manifest.ts`);
  }
  return entry;
}

interface Config {
  slug: string;
  bnSubtitle: string;
  enSubtitle: string;
  kickerCells: { bn: string; en: string }[];
  seriesPos?: number;
  Content: React.ComponentType;
}

const CONFIGS: Record<ArticleSlug, Config> = {
  'the-machine-beneath-your-code': {
    slug: 'the-machine-beneath-your-code',
    bnSubtitle: 'হার্ডওয়্যার আর অপারেটিং সিস্টেমের ভেতরের গল্প',
    enSubtitle: 'A story of hardware and operating systems, from the ground up',
    kickerCells: [
      { bn: 'SERIES 001 · INTRO', en: 'SERIES 001 · INTRO' },
      { bn: 'power on ⏻', en: 'power on ⏻' },
      { bn: '~৮ মিনিট', en: '~8 min' },
    ],
    Content: MachineBeneathYourCode,
  },
  'whats-inside-a-bit': {
    slug: 'whats-inside-a-bit',
    bnSubtitle: 'Transistor, voltage, আর memory-র শুরু',
    enSubtitle: 'Transistors, voltage, and the birth of memory',
    kickerCells: [
      { bn: 'LEVEL 1 — THE ATOMS', en: 'LEVEL 1 — THE ATOMS' },
      { bn: 'পর্ব ০১/০৮', en: 'part 01/08' },
      { bn: '~১২ মিনিট', en: '~12 min' },
    ],
    seriesPos: 1,
    Content: WhatsInsideABit,
  },
  'how-does-anything-become-bits': {
    slug: 'how-does-anything-become-bits',
    bnSubtitle: 'Text, image, sound-এর ভেতরের অনুবাদক',
    enSubtitle: 'The translator inside text, image, and sound',
    kickerCells: [
      { bn: 'LEVEL 1 — THE ATOMS', en: 'LEVEL 1 — THE ATOMS' },
      { bn: 'পর্ব ০২/০৮', en: 'part 02/08' },
      { bn: '~১৫ মিনিট', en: '~15 min' },
    ],
    seriesPos: 2,
    Content: HowDoesAnythingBecomeBits,
  },
  'cpu-blueprint': {
    slug: 'cpu-blueprint',
    bnSubtitle: 'একটা processor-এর ভেতরে আসলে কী কী থাকে?',
    enSubtitle: 'What actually lives inside a processor?',
    kickerCells: [
      { bn: 'LEVEL 2 — THE MACHINERY', en: 'LEVEL 2 — THE MACHINERY' },
      { bn: 'পর্ব ০৩/০৮', en: 'part 03/08' },
      { bn: '~১২ মিনিট', en: '~12 min' },
    ],
    seriesPos: 3,
    Content: BlueprintOfACPU,
  },
  'heartbeat-fde': {
    slug: 'heartbeat-fde',
    bnSubtitle: 'CPU একটা instruction কীভাবে বোঝে আর চালায়?',
    enSubtitle: 'How does a CPU understand and execute an instruction?',
    kickerCells: [
      { bn: 'LEVEL 2 — THE MACHINERY', en: 'LEVEL 2 — THE MACHINERY' },
      { bn: 'পর্ব ০৪/০৮', en: 'part 04/08' },
      { bn: '~১৪ মিনিট', en: '~14 min' },
    ],
    seriesPos: 4,
    Content: HeartbeatFDE,
  },
  'memory-hierarchy': {
    slug: 'memory-hierarchy',
    bnSubtitle: 'কেন এক memory দিয়ে হয় না, আর register থেকে disk পর্যন্ত যাত্রা',
    enSubtitle: 'Why one memory never works, and the journey from register to disk',
    kickerCells: [
      { bn: 'LEVEL 2 — THE MACHINERY', en: 'LEVEL 2 — THE MACHINERY' },
      { bn: 'পর্ব ০৫/০৮', en: 'part 05/08' },
      { bn: '~১৬ মিনিট', en: '~16 min' },
    ],
    seriesPos: 5,
    Content: MemoryHierarchy,
  },
  'os-grand-conductor': {
    slug: 'os-grand-conductor',
    bnSubtitle: 'process, scheduling, virtual memory, syscall — OS কীভাবে সব চালায়',
    enSubtitle: 'Process, scheduling, virtual memory, syscall — how the OS runs everything',
    kickerCells: [
      { bn: 'LEVEL 3 — THE SOFTWARE', en: 'LEVEL 3 — THE SOFTWARE' },
      { bn: 'পর্ব ০৬/০৮', en: 'part 06/08' },
      { bn: '~২০ মিনিট', en: '~20 min' },
    ],
    seriesPos: 6,
    Content: OSGrandConductor,
  },
  'code-to-machine-code': {
    slug: 'code-to-machine-code',
    bnSubtitle: 'compiler, interpreter, bytecode, JIT — অনুবাদকদের গল্প',
    enSubtitle: 'Compiler, interpreter, bytecode, JIT — the story of the translators',
    kickerCells: [
      { bn: 'LEVEL 3 — THE BRIDGES', en: 'LEVEL 3 — THE BRIDGES' },
      { bn: 'পর্ব ০৭/০৮', en: 'part 07/08' },
      { bn: '~১৪ মিনিট', en: '~14 min' },
    ],
    seriesPos: 7,
    Content: CodeToMachineCode,
  },
  'from-keypress-to-screen': {
    slug: 'from-keypress-to-screen',
    bnSubtitle: 'এক keystroke-এর ভেতরে যা কিছু ঘটে — সিরিজের সব layer একসাথে',
    enSubtitle: 'Everything that happens inside one keystroke — every layer of the series at once',
    kickerCells: [
      { bn: 'LEVEL 3 — THE BRIDGES', en: 'LEVEL 3 — THE BRIDGES' },
      { bn: 'পর্ব ০৮/০৮', en: 'part 08/08' },
      { bn: '~১৫ মিনিট', en: '~15 min' },
    ],
    seriesPos: 8,
    Content: KeyboardToScreen,
  },
};

function ArticleBody({ config }: { config: Config }) {
  const { bn } = useLang();
  const { Content } = config;
  const slug = config.slug as ArticleSlug;
  const isBnTitle = slug === 'whats-inside-a-bit' || slug === 'how-does-anything-become-bits' || slug === 'cpu-blueprint' || slug === 'heartbeat-fde' || slug === 'memory-hierarchy' || slug === 'os-grand-conductor' || slug === 'code-to-machine-code' || slug === 'from-keypress-to-screen';
  const meta = getArticleMeta(slug);
  const pageTitle = bn ? meta.bnTitle : meta.enTitle;
  const pageDesc = bn ? meta.bnDescription : meta.enDescription;
  const path = `/writing/${slug}`;
  const imageUrl = `${SITE_URL}/og/${slug}.png`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDesc}
        path={path}
        lang={bn ? 'bn' : 'en'}
        ogType="article"
        image={imageUrl}
        articleMeta={{
          publishedTime: meta.datePublished,
          modifiedTime: meta.datePublished,
        }}
        structuredData={articleSchema({
          title: pageTitle,
          description: pageDesc,
          path,
          datePublished: meta.datePublished,
          lang: bn ? 'bn' : 'en',
          image: imageUrl,
          isPartOf: { name: SERIES_TITLE, url: `${SITE_URL}/writing/tech-articles` },
        })}
      />
      <TraceRail />
      <main style={{ maxWidth: 660, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div>
          <Kicker cells={config.kickerCells.map((c) => ({ children: bn ? c.bn : c.en }))} />
          {isBnTitle && bn ? (
            <h1
              lang="bn"
              style={{ fontFamily: "'Anek Bangla',sans-serif", fontWeight: 700, fontSize: 48, lineHeight: 1.22, margin: '0 0 10px', letterSpacing: '-0.01em' }}
            >
              {meta.bnTitle}
            </h1>
          ) : (
            <h1
              style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 44, lineHeight: 1.15, margin: '0 0 10px' }}
            >
              {pageTitle}
            </h1>
          )}
          {bn ? (
            <p lang="bn" style={{ fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: 19, color: '#5c5442', margin: 0 }}>
              {config.bnSubtitle}
            </p>
          ) : (
            <p style={{ fontFamily: "'Anek Latin',sans-serif", fontSize: 19, color: '#5c5442', margin: 0 }}>
              {config.enSubtitle}
            </p>
          )}
          <div aria-hidden="true" style={{ marginTop: 26, borderTop: '1px solid #26241C', borderBottom: '1px solid #26241C', height: 3 }} />
        </div>
        <Content />
      </main>
      <TermPopup />
    </>
  );
}

interface ArticlePageProps {
  article: ArticleSlug;
}

const READ_COUNT = ARTICLES.filter((a) => a.state === 'read').length;

export default function ArticlePage({ article }: ArticlePageProps) {
  const config = CONFIGS[article];

  return (
    <LanguageProvider>
      <TermProvider>
        <div className="article-root" style={{ minHeight: '100vh' }}>
          <PromptBar slug={config.slug} seriesPos={config.seriesPos} readCount={READ_COUNT} />
          <ArticleBody config={config} />
        </div>
      </TermProvider>
    </LanguageProvider>
  );
}
