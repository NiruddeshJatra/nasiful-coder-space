import React from "react";
import { firePortal } from "@/hooks/useLoader";
import SEO from "../SEO";
import SectionCard, { type CardTheme } from "./SectionCard";

// ArcZero announces itself in its own palette, not the site's phosphor tokens.
// Deliberate — see CLAUDE.md. Only the card *structure* is shared.
const ARCZERO_THEME: CardTheme = {
  accent: '#44aaff',
  border: 'rgba(68, 170, 255, 0.4)',
  background: 'rgba(10, 10, 15, 0.92)',
  fontFamily: '"Courier New", monospace',
  body: 'rgba(255, 255, 255, 0.7)',
  dim: 'rgba(255, 255, 255, 0.5)',
};

const GamesContent = () => {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    firePortal({
      destination: "> arczero standby",
      sessionKey: "ncs_portal_seen_arczero",
      onComplete: () => {
        window.location.href = "/games/arczero/";
      },
    });
  };

  return (
  <>
    <SEO
      title="games — niruddeshjatra"
      description="games i built. arczero is a physics-based missile interception puzzle. more on the way."
      path="/games"
    />
  <div className="animate-fade-in font-mono max-w-xl mx-auto px-4 py-6 pb-16 sm:pb-4 text-foreground/85">
    <div className="pl-2 mb-6">
      <p className="text-sm mb-1"><span className="text-phosphor">&gt; </span>games/</p>
      <p className="text-sm mb-1"><span className="text-phosphor">&gt; </span>things i made that you can play.</p>
      <p className="text-sm mb-1"><span className="text-phosphor">&gt; </span>each one is its own world, deployed separately.</p>
    </div>

    <div className="text-phosphor-dim text-sm mt-10 mb-4 font-mono">// deployed</div>

    <SectionCard
      eyebrow="DEPLOYED"
      title="ARCZERO"
      tagline="physics-based missile interception"
      description="a two-minute physics puzzle disguised as an arcade reflex game. you read a falling parabola, launch a rising one, and meet them in the air — one shot at a time, one second of commitment at a time."
      facets="10 levels · daily challenge · leaderboards · endless mode"
      cta="▶ PLAY"
      href="/games/arczero/"
      onClick={handlePlayClick}
      ariaLabel="play arczero"
      theme={ARCZERO_THEME}
    />

    <div className="text-phosphor-dim text-sm mt-10 mb-4 font-mono">// in development</div>

    <div className="pl-2 mb-4 opacity-70">
      <p className="text-phosphor-dim text-sm font-mono mb-1">
        word-grid (codename)
      </p>
      <p className="text-phosphor-dim text-xs font-mono leading-relaxed">
        a classic paper-and-pencil word game from childhood, redone.
        in head only for now.
      </p>
    </div>

    <div className="text-phosphor-dim text-sm mt-10 mb-3 font-mono">// the rule</div>

    <div className="pl-2">
      <p className="text-foreground/85 text-sm leading-relaxed mb-4 pr-12 sm:pr-2">
        every game is its own world. its own repo, its own deploy,
        its own visual language. this page is the doorway.
      </p>
    </div>
  </div>
  </>
  );
};

export default GamesContent;
