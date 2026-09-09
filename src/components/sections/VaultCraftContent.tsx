import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isVaultUnlocked } from "@/lib/vault";

const Rule = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3">
    <span className="text-phosphor">&gt; </span>
    {children}
  </p>
);

const Head = ({ children }: { children: React.ReactNode }) => (
  <p className="text-phosphor-dim mb-3">// {children}</p>
);

const VaultCraftContent = () => {
  const navigate = useNavigate();
  const [unlocked] = useState(() => isVaultUnlocked());

  useEffect(() => {
    if (!unlocked) {
      navigate("/vault");
    }
  }, [navigate, unlocked]);

  if (!unlocked) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 font-mono text-[15px] leading-[1.7] text-foreground/85">
      <div className="mb-8">
        <h1 className="text-xl tracking-[0.15em] uppercase mb-1">series craft</h1>
        <p className="text-xs text-foreground/45">
          what series 001 actually does, so 002 can do it on purpose. nj · ongoing.
        </p>
      </div>

      <div className="pl-2 mb-10">
        <Rule>
          this is a teardown of my own work. series 001 came out right, but most
          of it came out right by instinct.
        </Rule>
        <Rule>
          written down, the instinct becomes a spec. every rule below is
          something series 001 already does in all eight legs.
        </Rule>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>01 · the spine — one protagonist, one question</Head>
        <div className="pl-2 space-y-4">
          <p>
            the series is not "eight articles about computers." it is one number
            being followed. you write <span className="text-phosphor">x = 5</span>,
            and the whole series asks where that 5 goes. the manifest says it
            outright: <em>one protagonist — information</em>.
          </p>
          <p>
            article 01 opens on that 5. article 08 closes the loop — "from
            voltage back to voltage." nothing in between is a standalone
            explainer; each leg inherits an unanswered question and hands
            forward a new one.
          </p>
          <p className="text-phosphor-dim">
            for 002: pick the protagonist before picking the topics. if the
            series can be reordered without damage, there is no protagonist and
            it's a listicle in eight parts.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>02 · the hook — same five beats, every single article</Head>
        <div className="pl-2 space-y-3">
          <p>1. a concrete snippet in a dark well. two lines, never more.</p>
          <p>2. state the obvious outcome flatly. "the code runs. fine."</p>
          <p>
            3. the turn — a question that shouldn't be hard but is. "where did
            that 5 actually go?"
          </p>
          <p>
            4. close the escape routes by negation. "not on the screen. not held
            in the cpu the whole time. so where?"
          </p>
          <p>
            5. declare scope <em>and</em> exclusions. "today's goal is one
            specific question" + "i'm not going to talk about any specific
            language today."
          </p>
          <p className="text-phosphor-dim mt-4">
            beat 5 is the one most writing skips. naming what the article
            refuses to cover is what buys permission to go slow on what's left.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>03 · the recurring teaching move</Head>
        <div className="pl-2 space-y-4">
          <p>
            almost every explanation in 001 runs the same reversal: the reader
            assumes the reason is elegance or math, and the real reason is
            physics or reliability.
          </p>
          <p className="text-foreground/70 pl-3 border-l border-border/50">
            "the problem isn't math. it's physics. and the problem has a name —
            noise."
            <br />
            "not that 0 and 1 make data representation easy — that 0 and 1 are{" "}
            <strong>reliable</strong>."
          </p>
          <p>
            the payoff sentence gets <strong>&lt;strong&gt;</strong>, and it is
            the only bold in the section. one bold per idea, or it stops meaning
            anything.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>04 · analogy discipline</Head>
        <div className="pl-2 space-y-4">
          <p>
            analogies are everyday and physical: a water tap (transistor), a car
            you can't rebuild but can diagnose (why the series exists), a relay
            race (the series shape), a conductor (the os).
          </p>
          <p>
            the discipline is that each one is introduced, cashed out once
            concretely, then <em>dropped</em>. the tap never comes back to
            explain gates. an analogy stretched to a second job starts lying.
          </p>
          <p>
            and every analogy is immediately followed by the literal mechanism.
            the metaphor buys attention; it never substitutes for the answer.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>05 · section rhythm</Head>
        <div className="pl-2 space-y-3">
          <p>
            numbered <span className="text-phosphor">01</span>,{" "}
            <span className="text-phosphor">02</span> · rising-edge svg ·
            hairline. bilingual h2. then a fixed loop:
          </p>
          <p className="text-phosphor-dim pl-3">
            prose → instrument → prose that reads the instrument back
          </p>
          <p>
            the prose after the widget is not optional and not a caption. it
            tells the reader what they just saw. a widget nobody interprets is
            decoration.
          </p>
          <p>
            every section ends on the question the next section answers. "next
            question: who creates these voltages? who does the switching?" the
            reader is never at a stopping point they chose themselves.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>06 · the instrument rule</Head>
        <div className="pl-2 space-y-4">
          <p>
            "an instrument in every section" is the promise on the card, and 001
            keeps it — 40+ widgets across eight legs, all plain react, no engine,
            no runtime.
          </p>
          <p>
            the reader is always <em>told to use it</em>: "raise the noise on the
            instrument below and see for yourself." never "the diagram below
            shows."
          </p>
          <p>
            every instrument sits in a dark well — <span className="text-phosphor">#232b23</span>{" "}
            ground, phosphor text, scanline overlay, mono title bar at 11.5px
            with 0.08em tracking, optional control on the right.
          </p>
          <p className="text-phosphor-dim">
            the well is the whole visual thesis: paper is the page, dark is the
            machine. you are never confused about which one you're looking at.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>07 · the bridge — the most distinctive device in the series</Head>
        <div className="pl-2 space-y-4">
          <p>
            every article ends with a bridge paragraph inside RelayNav. it is
            always three moves, in order:
          </p>
          <p className="text-phosphor-dim pl-3">
            what we now have → what is still missing → the question that opens
            the next leg
          </p>
          <p className="text-foreground/70 pl-3 border-l border-border/50">
            "now we know how a bit can be held. but one bit alone does nothing.
            how do trillions of bits together become a bengali sentence, a jpeg
            photo, an mp3 song?"
            <br />
            <br />
            "hardware — done. os — done. but the code you write — javascript,
            python, go — isn't the cpu's own language."
          </p>
          <p>
            the ui makes the metaphor literal: hub card on the left (◀), next
            card at 2× flex weight on the right (▶), and a phosphor baton bar
            that runs across the bottom on hover. the reader is handed a baton.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>08 · sentence mechanics</Head>
        <div className="pl-2 space-y-3">
          <p>· hard stop after a hard idea. "that's it. that's all."</p>
          <p>· fragments are fine. "in other words — a switch."</p>
          <p>· em-dash is the connective. semicolons appear essentially never.</p>
          <p>· second person for the reader, first person only for scope calls.</p>
          <p>· rhetorical question, then answer it immediately. never stacked.</p>
          <p>
            · numbers are always concrete — 0.8v, 1.8v, 100 billion transistors,
            40 episodes. no "very fast", no "enormous".
          </p>
          <p>
            · no hype vocabulary. nothing is amazing or incredible. the material
            is interesting; saying so out loud would be admitting it isn't.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>09 · bilingual rules (not translation)</Head>
        <div className="pl-2 space-y-4">
          <p>
            bn is default. the toggle is js only — no url change, no{" "}
            <span className="text-phosphor">-bn</span> route. definitions,
            titles, numerals and instrument labels all follow it.
          </p>
          <p>
            the two languages are <em>written separately</em>, not translated.
            bn keeps english technical nouns inline in latin script — transistor,
            voltage, memory, register. that's how engineers here actually talk,
            and transliterating them would read as fake.
          </p>
          <p>
            bn runs slightly longer and warmer ("ধরুন", "ব্যস, এইটুকুই"). en runs
            tighter. same content, different temperature — that's allowed.
          </p>
          <p>
            mechanics: <span className="text-phosphor">lang="bn"</span> on every
            bn block, <span className="text-phosphor">bd()</span> for bengali
            numerals, h2 at weight 900 in bn vs font-display bold in en.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>10 · typography scale</Head>
        <div className="pl-2 space-y-2 text-[14px]">
          <p>body · Anek · 16.5px · line-height 1.9</p>
          <p>section h2 · 29px en (display bold) / 28px bn (weight 900)</p>
          <p>code + wells · Departure Mono · 14.5px</p>
          <p>instrument title · mono 11.5px · tracking 0.08em</p>
          <p>Term · 0.85em mono · dashed green underline</p>
          <p>recap · 16px · 1.9 · inside a #c9bda0 border</p>
          <p className="text-phosphor-dim mt-4 text-[15px]">
            one law behind all of it: micro-labels are mono with wide tracking,
            prose is never mono. the machine speaks in monospace; the writer
            doesn't.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>11 · colour semantics</Head>
        <div className="pl-2 space-y-2 text-[14px]">
          <p>paper #e8dfc9 — the page</p>
          <p>ink #26241C — everything readable</p>
          <p>ink-green #00753F — structural marks on paper only</p>
          <p>phosphor #00d26a — inside dark wells only, never on paper</p>
          <p>rule #c9bda0 — hairlines, recap and deeper borders</p>
          <p className="text-phosphor-dim mt-4 text-[15px]">
            the one rule that must survive into 002 even if the palette changes
            completely: green-on-dark means you are looking into the machine.
            never spend that signal on decoration.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>12 · closing furniture — same order, all eight legs</Head>
        <div className="pl-2 space-y-2">
          <p>
            1. <span className="text-phosphor">Recap</span> — "// what we learned
            in this article", bulleted, bordered
          </p>
          <p>
            2. <span className="text-phosphor">Deeper</span> — collapsible depth,
            closed by default
          </p>
          <p>
            3. <span className="text-phosphor">RelayNav</span> — bridge + hub +
            next
          </p>
          <p>
            4. <span className="text-phosphor">Colophon</span> — live transistor
            counter + <span className="text-phosphor">cd ~</span>
          </p>
          <p className="text-phosphor-dim mt-4">
            Deeper closed by default is load-bearing: the main prose stays at one
            reading level, and a reader who opens nothing still gets a complete
            arc. depth is opt-in, never a prerequisite.
          </p>
          <p className="text-phosphor-dim">
            the colophon counter is the series' one joke, and it's a joke that
            teaches — it counts the thing article 01 was about, while you sit
            there reading article 08.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>13 · terms and progressive disclosure</Head>
        <div className="pl-2 space-y-4">
          <p>
            <span className="text-phosphor">&lt;Term&gt;</span> wraps a technical
            noun on <em>first use only</em>. hover ≥720px, tap → bottom sheet on
            mobile. all definitions live in one bilingual{" "}
            <span className="text-phosphor">glossary.ts</span>.
          </p>
          <p>
            this is what lets the prose stay fast. the article never stops to
            define; the definition is one hover away and costs the fluent reader
            nothing.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>14 · structural contract (manifest-driven)</Head>
        <div className="pl-2 space-y-3">
          <p>
            every entry carries: slug · bn/enTitle · sub (three keywords, ·
            separated) · level · part NN/08 · readTime bn/en · state ·
            bn/enDescription · datePublished.
          </p>
          <p>
            levels group the arc — ATOMS → MACHINERY → BRIDGES. three acts, not
            eight equal chapters.
          </p>
          <p>read times sit between 12 and 20 minutes. nothing shorter, nothing longer.</p>
          <p className="text-phosphor-dim mt-4">
            the hub, sitemap, og images, hreflang and progress counter all derive
            from that one file. 002 must keep that discipline — the moment a
            title exists in two places, one of them goes stale. it already
            happened twice in 001.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>15 · voice — the thing hardest to copy</Head>
        <div className="pl-2 space-y-4">
          <p>
            001 is honest about its own limits up front: "you won't be able to
            design a new cpu after this." the car analogy is a promise about
            scope, and keeping it is why the series is trustworthy.
          </p>
          <p>
            the reading list at the end rates things frankly — "heavier going,
            but authoritative." no affiliate-brochure tone.
          </p>
          <p>
            and the asides stay in. the silicon jab in the intro is slightly
            rude, slightly funny, unmistakably a person. that's the difference
            between this and generated explainer content.
          </p>
          <p className="text-phosphor-dim">
            the register to hold: a competent friend explaining something at a
            table, who respects you enough not to flatter you.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>16 · checklist before shipping any leg of 002</Head>
        <div className="pl-2 space-y-2">
          <p>· does it open on a concrete artefact, not a definition?</p>
          <p>· is the scope <em>and</em> the exclusion stated in the first screen?</p>
          <p>· does every section have an instrument the reader is told to touch?</p>
          <p>· does prose interpret each instrument afterwards?</p>
          <p>· does every section end on the next section's question?</p>
          <p>· exactly one bold payoff per idea?</p>
          <p>· bridge paragraph: have → missing → next question?</p>
          <p>· bn written, not translated? technical nouns left in latin?</p>
          <p>· recap → deeper → relay → colophon, in that order?</p>
          <p>· all metadata in the manifest and nowhere else?</p>
          <p>· green reserved for the machine?</p>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      <div className="mb-10">
        <Head>17 · what 002 should deliberately change</Head>
        <div className="pl-2 space-y-4">
          <p>
            the rule on the tech-articles page says every series gets its own
            design language. so the paper oscilloscope does not carry over —
            paper, scanlines and phosphor belong to 001.
          </p>
          <p>
            what carries over is the <em>grammar</em>, not the skin: one
            protagonist, the five-beat hook, instrument-per-section, the bridge,
            manifest-as-single-source, and green-means-machine translated into
            whatever the new palette's equivalent signal is.
          </p>
          <p className="text-phosphor-dim">
            a reader should be able to tell 001 and 002 apart at a glance, and
            still recognise the same person wrote both.
          </p>
        </div>
      </div>

      <div className="mt-12 pt-3 border-t border-border/40 text-[10px] text-phosphor-dim font-mono">
        — nj · vault · series craft · ongoing
      </div>
    </div>
  );
};

export default VaultCraftContent;
