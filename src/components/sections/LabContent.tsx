import { FlaskConical } from "lucide-react";

const LabContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div>
        <span className="terminal-purple">const</span>{" "}
        <span className="terminal-cyan">lab</span> ={" "}
        <span className="terminal-yellow">[];</span>
      </div>

      <div className="border border-dashed border-border rounded-lg p-6 bg-card/20">
        <div className="flex items-start gap-3">
          <FlaskConical className="w-5 h-5 terminal-yellow flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground/90">
              <span className="terminal-orange">lab/</span> — experiments, half-baked,
              pinned here when interesting.
            </p>
            <p className="text-xs text-muted-foreground">
              Live demos, probes, and toys. Nothing here is production-grade.
              The polished stuff lives in <span className="terminal-cyan">projects.txt</span>.
            </p>
            <p className="text-xs text-muted-foreground">
              Status: <span className="terminal-green">seeding</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabContent;
