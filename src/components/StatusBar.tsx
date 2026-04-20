import { useEffect, useState } from "react";
import { GitBranch, Clock, FileText, Circle } from "lucide-react";

interface StatusBarProps {
  currentSection: string;
}

const getPath = (section: string): string => {
  switch (section) {
    case "welcome":
      return "~/nasif";
    case "lab":
      return "~/nasif/lab/";
    case "notes":
      return "~/nasif/notes/";
    case "about":
      return "~/nasif/about.txt";
    case "experience":
      return "~/nasif/experience.txt";
    case "projects":
      return "~/nasif/projects.txt";
    case "skills":
      return "~/nasif/skills.json";
    case "education":
      return "~/nasif/education.txt";
    case "now":
      return "~/nasif/now.md";
    case "blog":
      return "~/nasif/blog.md";
    case "contact":
      return "~/nasif/contact.md";
    default:
      return `~/nasif/${section}`;
  }
};

const LAST_UPDATED: Record<string, string> = {
  welcome: "2026-04-20",
  about: "2026-02-10",
  experience: "2026-03-15",
  projects: "2026-04-05",
  skills: "2026-01-28",
  education: "2025-12-12",
  now: "2026-04-20",
  blog: "pending",
  contact: "2026-02-10",
};

const StatusBar = ({ currentSection }: StatusBarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const path = getPath(currentSection);
  const lastUpdated = LAST_UPDATED[currentSection] ?? "—";

  return (
    <div className="h-6 bg-primary/10 border-t border-border flex items-center justify-between px-3 text-[11px] font-mono">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-1.5 terminal-cyan shrink-0">
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground truncate">
          <Circle className="w-2 h-2 fill-green-500 stroke-none shrink-0" />
          <span className="truncate">{path}</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-muted-foreground shrink-0">
          <span>updated:</span>
          <span>{lastUpdated}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-muted-foreground shrink-0">
        <a
          href="/resume.html"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          aria-label="Plain-text resume"
        >
          <FileText className="w-3 h-3" />
          <span className="hidden sm:inline">resume</span>
        </a>
        <div className="hidden sm:flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{time.toLocaleTimeString([], { hour12: false })}</span>
        </div>
        <span className="hidden lg:inline">UTF-8 · LF</span>
      </div>
    </div>
  );
};

export default StatusBar;
