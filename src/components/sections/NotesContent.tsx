import { StickyNote } from "lucide-react";

const NotesContent = () => {
  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div>
        <span className="terminal-purple">const</span>{" "}
        <span className="terminal-cyan">notes</span> ={" "}
        <span className="terminal-yellow">[];</span>
      </div>

      <div className="border border-dashed border-border rounded-lg p-6 bg-card/20">
        <div className="flex items-start gap-3">
          <StickyNote className="w-5 h-5 terminal-green flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm text-foreground/90">
              <span className="terminal-orange">/notes</span> — thinking in public, unfinished.
            </p>
            <p className="text-xs text-muted-foreground">
              Raw drafts, loose ends, evergreen questions. When one tightens up, it graduates to{" "}
              <span className="terminal-cyan">blog.md</span>.
            </p>
            <p className="text-xs text-muted-foreground">
              Status: <span className="terminal-green">sketching</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesContent;
