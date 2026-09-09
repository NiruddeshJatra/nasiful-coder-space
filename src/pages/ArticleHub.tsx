import '../articles/article.css';
import SEO from '../components/SEO';
import { LanguageProvider, useLang } from '../articles/context/LanguageContext';
import { TermProvider } from '../articles/context/TermContext';
import { TermPopup } from '../articles/primitives/Term';
import { PromptBar } from '../articles/primitives/PromptBar';
import { SeriesHub } from '../articles/content/SeriesHub';
import { ARTICLES, INTRO_ARTICLE, SERIES_TITLE, SERIES_DESCRIPTION_EN, SERIES_DESCRIPTION_BN, SERIES_HUB_PATH } from '../articles/manifest';
import { SITE_URL } from '../lib/site';

const HUB_PATH = SERIES_HUB_PATH;

function hubItemListSchema() {
  const published = [INTRO_ARTICLE, ...ARTICLES.filter((a) => a.state === 'read')];
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: SERIES_TITLE,
    description: SERIES_DESCRIPTION_EN,
    itemListElement: published.map((article, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${article.href}`,
      name: article.enTitle,
    })),
  };
}

function ArticleHubBody() {
  const { bn } = useLang();
  return (
    <SEO
      title={SERIES_TITLE}
      description={bn ? SERIES_DESCRIPTION_BN : SERIES_DESCRIPTION_EN}
      path={HUB_PATH}
      lang={bn ? 'bn' : 'en'}
      ogType="website"
      image={`${SITE_URL}/og/tech-articles.png`}
      structuredData={hubItemListSchema()}
    />
  );
}

export default function ArticleHub() {
  return (
    <LanguageProvider>
      <TermProvider>
        <ArticleHubBody />
        <div className="article-root" style={{ minHeight: '100vh' }}>
          <PromptBar slug="writing" isHub />
          <SeriesHub />
          <TermPopup />
        </div>
      </TermProvider>
    </LanguageProvider>
  );
}
