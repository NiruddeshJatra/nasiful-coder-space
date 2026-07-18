import { Helmet } from 'react-helmet-async';
import '../articles/article.css';
import { LanguageProvider } from '../articles/context/LanguageContext';
import { TermProvider } from '../articles/context/TermContext';
import { TermPopup } from '../articles/primitives/Term';
import { PromptBar } from '../articles/primitives/PromptBar';
import { SeriesHub } from '../articles/content/SeriesHub';

export default function ArticleHub() {
  return (
    <LanguageProvider>
      <TermProvider>
        <Helmet>
          <title>The Machine Beneath Your Code — niruddeshjatra</title>
          <meta name="description" content="A series on how computers actually work, from bits to OS. One protagonist — information." />
          <link rel="canonical" href="https://niruddeshjatra.space/writing/tech-articles" />
          <meta property="og:title" content="The Machine Beneath Your Code" />
          <meta property="og:description" content="A series on how computers actually work, from bits to OS." />
          <meta property="og:type" content="website" />
        </Helmet>
        <div className="article-root" style={{ minHeight: '100vh' }}>
          <PromptBar slug="writing" isHub />
          <SeriesHub />
          <TermPopup />
        </div>
      </TermProvider>
    </LanguageProvider>
  );
}
