import SEO from "../SEO";

const NowContent = () => {
  return (
    <>
      <SEO
        title="now — niruddeshjatra"
        description="what i'm doing this month — taper week, tutoring, building. updates whenever life shifts."
        path="/now"
      />
    <div className="animate-fade-in font-mono text-sm leading-relaxed max-w-xl mx-auto px-4 py-6">
      <div className="space-y-4 text-foreground/80">
        <p><span className="text-phosphor">&gt; </span>what i'm doing this month, in plain language. updates whenever life shifts.</p>

        <div>
          <div className="text-phosphor-dim text-sm mt-8 mb-2 font-mono">// tutoring</div>
          <p>
            Tutoring still pays the bills — around fourteen of them now, and most of my daylight. It's the ground everything else stands on, so it stays, even when it crowds the rest.
          </p>
        </div>

        <div>
          <div className="text-phosphor-dim text-sm mt-8 mb-2 font-mono">// training</div>
          <p>
            Seven days out from the Chatto Metro Half Marathon, so this is taper week — less volume, more rest, trying not to invent new work to fill the space. The base is real now: I ran Dhaka 25K in 2:32 in June, even splits, first race back after a long injury stretch. The schedule shifted this month — tuitions moved to 7am, so training is a post-Fajr window now, roughly 5:15 to 6:45. Full calendar's on the running page.
          </p>
        </div>

        <div>
          <div className="text-phosphor-dim text-sm mt-8 mb-2 font-mono">// races</div>
          <p>
            Chatto Metro Half Marathon on July 10 is next — targeting 2:05 to 2:10. After that, Sylhet International Marathon in August, then a heavier autumn: Chattogram in October, the Albatross Ultrail, Cox's Bazar in November. The 100K is still the line I'm walking toward, not across, yet.
          </p>
        </div>

        <div>
          <div className="text-phosphor-dim text-sm mt-8 mb-2 font-mono">// building</div>
          <p>
            This site, which you're reading — finally current, finally announced. ArcZero shipped and now has an online leaderboard. There's a second game in my head and a rebuild of an older project (a rental marketplace) taking most of my building hours right now. Tech writing is queued — the first piece is drafting. Priority stays where it's been: income, the body, and shipping the things I actually mean to finish.
          </p>
        </div>
      </div>
      <div className="mt-12 pt-3 border-t border-border/40 text-[10px] text-phosphor-dim font-mono">
        — nj · 2026-07 · this changes often
      </div>
    </div>
    </>
  );
};

export default NowContent;
