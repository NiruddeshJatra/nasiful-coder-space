import { Zap, Radio, BookOpen, Hammer } from "lucide-react";

const NowContent = () => {
  const lastUpdated = "2026-04-20";

  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="space-y-2">
        <div>
          <span className="terminal-purple">const</span>{" "}
          <span className="terminal-cyan">now</span> ={" "}
          <span className="terminal-yellow">{"{"}</span>
        </div>
        <p className="text-[11px] text-muted-foreground pl-4">
          // what i&apos;m focused on right now — updated {lastUpdated}
        </p>
      </div>

      <div className="pl-4 space-y-4">
        <div className="flex items-start gap-3 border border-border rounded-lg p-4 bg-card/30">
          <Hammer className="w-5 h-5 terminal-orange flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="terminal-cyan">building:</div>
            <p className="text-xs text-foreground/90">
              bhara — scaling the rent-anything marketplace past 10k concurrent users on AWS.
              Focus this quarter: payment rails hardening + trust/safety flows.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 border border-border rounded-lg p-4 bg-card/30">
          <BookOpen className="w-5 h-5 terminal-green flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="terminal-cyan">reading:</div>
            <p className="text-xs text-foreground/90">
              Designing Data-Intensive Applications · Kleppmann.
              Re-reading the consensus chapters.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 border border-border rounded-lg p-4 bg-card/30">
          <Zap className="w-5 h-5 terminal-yellow flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="terminal-cyan">learning:</div>
            <p className="text-xs text-foreground/90">
              Rust — systems-level ergonomics. Ported a Node.js worker to Actix as a benchmark.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 border border-border rounded-lg p-4 bg-card/30">
          <Radio className="w-5 h-5 terminal-purple flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="terminal-cyan">available for:</div>
            <p className="text-xs text-foreground/90">
              Short contracts on backend infra, distributed systems, or developer tooling.
              Mail the address in <span className="terminal-orange">contact.md</span>.
            </p>
          </div>
        </div>
      </div>

      <div>
        <span className="terminal-yellow">{"};"}</span>
      </div>

      <p className="text-[10px] text-muted-foreground pl-1">
        inspired by <span className="terminal-cyan">nownownow.com</span> — a page about what I&apos;m doing now, not an activity log.
      </p>
    </div>
  );
};

export default NowContent;
