import { Coffee, GitBranch, Activity, Zap } from "lucide-react";

const StatusBar = () => {
  return (
    <div className="h-7 bg-primary/10 border-t border-border flex items-center justify-between px-4 text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 terminal-cyan">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Activity className="w-3 h-3" />
          <span>Lines: 10,000+</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Coffee className="w-3 h-3" />
          <span>Coffee: ∞</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Zap className="w-3 h-3" />
          <span>Bugs Fixed: 999</span>
        </div>
      </div>
      <div className="text-muted-foreground">
        UTF-8 | TypeScript | Ln 1, Col 1
      </div>
    </div>
  );
};

export default StatusBar;
