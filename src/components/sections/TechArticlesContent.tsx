import { useNavigate } from "react-router-dom";
import { firePortal } from "@/hooks/useLoader";
import SEO from "../SEO";
import SectionCard from "./SectionCard";
import {
  ARTICLES,
  SERIES_TITLE,
  SERIES_HUB_PATH,
} from "@/articles/manifest";

const TechArticlesContent = () => {
  const navigate = useNavigate();
  const readCount = ARTICLES.filter((a) => a.state === "read").length;
  const complete = readCount === ARTICLES.length;

  // Entering a series crosses into the paper-oscilloscope world — portal first.
  const goSeries = (e: React.MouseEvent) => {
    e.preventDefault();
    firePortal({
      destination: "> Entering the tech world",
      onComplete: () => navigate(SERIES_HUB_PATH),
    });
  };

  return (
    <>
      <SEO
        title="tech articles — niruddeshjatra"
        description="long-form series on how computers actually work. series 001: the machine beneath your code — eight parts, from voltage in silicon to the letter on your screen."
        path="/writing/tech-articles"
      />
      <div className="animate-fade-in font-mono max-w-xl mx-auto px-4 py-6 pb-16 sm:pb-4 text-foreground/85">
        <div className="pl-2 mb-6">
          <p className="text-sm mb-1"><span className="text-phosphor">&gt; </span>tech-articles/</p>
          <p className="text-sm mb-1"><span className="text-phosphor">&gt; </span>long-form series on how machines actually work.</p>
          <p className="text-sm mb-1"><span className="text-phosphor">&gt; </span>each series is its own world — different design, bilingual, interactive.</p>
        </div>

        <div className="text-phosphor-dim text-sm mt-10 mb-4 font-mono">// series</div>

        <SectionCard
          eyebrow="SERIES 001"
          meta={complete ? `${ARTICLES.length} parts · complete` : `${readCount}/${ARTICLES.length} published`}
          title={SERIES_TITLE}
          tagline="how computers actually work"
          description="eight articles chasing one number. you write x = 5 — this follows that 5 from voltage in a transistor all the way to the letter drawn on your screen."
          facets="bilingual · an instrument in every section"
          cta="open series →"
          href={SERIES_HUB_PATH}
          onClick={goSeries}
          ariaLabel={`open series: ${SERIES_TITLE}`}
        />

        <div className="text-phosphor-dim text-sm mt-10 mb-4 font-mono">// queued</div>

        <div className="pl-2 mb-4 opacity-70">
          <p className="text-phosphor-dim text-sm font-mono mb-1">series 002 — ░░░░░░░░░░</p>
          <p className="text-phosphor-dim text-xs font-mono leading-relaxed">
            no signal yet. the next one starts when there's something worth eight articles.
          </p>
        </div>

        <div className="text-phosphor-dim text-sm mt-10 mb-3 font-mono">// the rule</div>

        <div className="pl-2">
          <p className="text-foreground/85 text-sm leading-relaxed mb-4 pr-12 sm:pr-2">
            every series gets its own design language. this one is the paper
            oscilloscope — warm paper, bangla-first, an instrument in every section.
            this page is the doorway.
          </p>
        </div>

        <div className="mt-12 pt-3 border-t border-border/40 text-[10px] text-phosphor-dim font-mono">
          — nj · 2026-09 · one series done, more when they're ready
        </div>
      </div>
    </>
  );
};

export default TechArticlesContent;
