import { useNavigate } from "react-router-dom";
import { firePortal } from "@/hooks/useLoader";
import SEO from "../SEO";
import {
  ARTICLES,
  SERIES_TITLE,
  SERIES_DESCRIPTION_EN,
  SERIES_HUB_PATH,
} from "@/articles/manifest";

const TechArticlesContent = () => {
  const navigate = useNavigate();
  const readCount = ARTICLES.filter((a) => a.state === "read").length;
  const complete = readCount === ARTICLES.length;

  // Entering a series crosses into the paper-oscilloscope world — portal first.
  const goSeries = () => {
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
          <p className="mb-1"><span className="text-phosphor">&gt; </span>tech-articles/</p>
          <p className="mb-1"><span className="text-phosphor">&gt; </span>long-form series on how machines actually work.</p>
          <p className="mb-1"><span className="text-phosphor">&gt; </span>each series is its own world — different design, bilingual, interactive.</p>
        </div>

        <div className="text-phosphor-dim text-sm mt-10 mb-4 font-mono">// series</div>

        <button
          onClick={goSeries}
          className="w-full text-left font-mono p-5 sm:p-6 mb-6 bg-transparent border border-border/60 hover:border-phosphor/60 transition-colors cursor-pointer"
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <span className="text-phosphor-dim text-xs">SERIES 001</span>
            <span className="text-phosphor-dim text-xs">
              {complete ? `complete · ${ARTICLES.length} parts` : `${readCount}/${ARTICLES.length} published`}
            </span>
          </div>

          <h3 className="text-phosphor text-lg sm:text-xl mt-2 mb-1 tracking-wide">
            {SERIES_TITLE}
          </h3>

          <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-3">
            {SERIES_DESCRIPTION_EN}
          </p>

          <p className="text-phosphor-dim text-[11px] leading-relaxed mb-3">
            transistors · encoding · the CPU · fetch-decode-execute · memory hierarchy ·
            the operating system · compilers and JIT · one keystroke, end to end
          </p>

          <span className="text-phosphor text-xs">open series →</span>
        </button>

        <div className="text-phosphor-dim text-sm mt-10 mb-4 font-mono">// queued</div>
        <div className="pl-2 text-phosphor-dim text-xs">
          SERIES 002 — ░░░░░░░░░░ <span className="text-foreground/50">(no signal yet)</span>
        </div>

        <div className="mt-12 pt-3 border-t border-border/40 text-[10px] text-phosphor-dim font-mono">
          — nj · 2026-09 · one series done, more when they're ready
        </div>
      </div>
    </>
  );
};

export default TechArticlesContent;
