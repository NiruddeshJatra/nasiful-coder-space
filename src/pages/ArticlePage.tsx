import { Helmet } from 'react-helmet-async';
import '../articles/article.css';
import { LanguageProvider } from '../articles/context/LanguageContext';
import { TermProvider } from '../articles/context/TermContext';
import { TermPopup } from '../articles/primitives/Term';
import { PromptBar } from '../articles/primitives/PromptBar';
import { Kicker } from '../articles/primitives/Kicker';
import { TraceRail } from '../articles/primitives/TraceRail';
import { MachineBeneathYourCode } from '../articles/content/MachineBeneathYourCode';
import { WhatsInsideABit } from '../articles/content/WhatsInsideABit';
import { useLang } from '../articles/context/LanguageContext';

type ArticleSlug = 'the-machine-beneath-your-code' | 'whats-inside-a-bit';

interface Config {
  slug: string;
  bnTitle: string;
  enTitle: string;
  bnSubtitle: string;
  enSubtitle: string;
  kickerCells: { bn: string; en: string }[];
  seriesPos?: number;
  Content: React.ComponentType;
}

const CONFIGS: Record<ArticleSlug, Config> = {
  'the-machine-beneath-your-code': {
    slug: 'the-machine-beneath-your-code',
    bnTitle: 'The Machine Beneath Your Code',
    enTitle: 'The Machine Beneath Your Code',
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
    bnTitle: 'বিটের ভেতরে কী থাকে?',
    enTitle: "What's inside a bit?",
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
};

const ARTICLE_META: Record<ArticleSlug, { enDesc: string; bnDesc: string }> = {
  'the-machine-beneath-your-code': {
    enDesc: 'A story of hardware and operating systems from the ground up — where was that 5 stored?',
    bnDesc: 'হার্ডওয়্যার আর অপারেটিং সিস্টেমের ভেতরের গল্প — সেই ৫ সংখ্যাটা কোথায় গিয়েছিল?',
  },
  'whats-inside-a-bit': {
    enDesc: 'Transistors, voltage, and the birth of memory — how a bit physically lives in silicon.',
    bnDesc: 'Transistor, voltage, আর memory-র শুরু — একটা bit কীভাবে physically silicon-এ থাকে।',
  },
};

function ArticleBody({ config }: { config: Config }) {
  const { bn } = useLang();
  const { Content } = config;
  const isBnTitle = config.slug === 'whats-inside-a-bit';
  const meta = ARTICLE_META[config.slug as ArticleSlug];
  const pageTitle = bn ? config.bnTitle : config.enTitle;
  const pageDesc = bn ? meta.bnDesc : meta.enDesc;
  const canonical = `https://niruddeshjatra.space/writing/${config.slug}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle} — niruddeshjatra</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <html lang={bn ? 'bn' : 'en'} />
      </Helmet>
      <TraceRail />
      <main style={{ maxWidth: 660, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div>
          <Kicker cells={config.kickerCells.map((c) => ({ children: bn ? c.bn : c.en }))} />
          {isBnTitle && bn ? (
            <h1
              lang="bn"
              style={{ fontFamily: "'Anek Bangla',sans-serif", fontWeight: 700, fontSize: 48, lineHeight: 1.22, margin: '0 0 10px', letterSpacing: '-0.01em' }}
            >
              {config.bnTitle}
            </h1>
          ) : (
            <h1
              style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 44, lineHeight: 1.15, margin: '0 0 10px' }}
            >
              {bn ? config.bnTitle : config.enTitle}
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

export default function ArticlePage({ article }: ArticlePageProps) {
  const config = CONFIGS[article];

  return (
    <LanguageProvider>
      <TermProvider>
        <div className="article-root" style={{ minHeight: '100vh' }}>
          <PromptBar slug={config.slug} seriesPos={config.seriesPos} readCount={1} />
          <ArticleBody config={config} />
        </div>
      </TermProvider>
    </LanguageProvider>
  );
}
