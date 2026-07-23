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
import { useLang } from '../articles/context/LanguageContext';
import { INTRO_ARTICLE, getArticle, SERIES_TITLE } from '../articles/manifest';

type ArticleSlug = 'the-machine-beneath-your-code' | 'whats-inside-a-bit';

const SITE_URL = 'https://niruddeshjatra.space';

interface PublishedArticleMeta {
  bnTitle: string;
  enTitle: string;
  bnDescription: string;
  enDescription: string;
  datePublished: string;
}

function getArticleMeta(slug: ArticleSlug): PublishedArticleMeta {
  const entry = slug === INTRO_ARTICLE.slug ? INTRO_ARTICLE : getArticle(slug);
  if (!entry || !entry.bnDescription || !entry.enDescription || !entry.datePublished) {
    throw new Error(`Article "${slug}" is missing SEO fields (title/description/datePublished) in manifest.ts`);
  }
  return entry as PublishedArticleMeta;
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
};

function ArticleBody({ config }: { config: Config }) {
  const { bn } = useLang();
  const { Content } = config;
  const slug = config.slug as ArticleSlug;
  const isBnTitle = slug === 'whats-inside-a-bit';
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
