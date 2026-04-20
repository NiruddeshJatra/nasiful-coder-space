export interface ChangelogEntry {
  date: string;
  section: string;
  summary: string;
  target?: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-04-20",
    section: "lab",
    summary: "shipped matrix-playground and typing-challenge",
    target: "/lab",
  },
  {
    date: "2026-04-20",
    section: "now",
    summary: "added /now page — what I'm focused on this quarter",
    target: "/now",
  },
  {
    date: "2026-04-18",
    section: "shell",
    summary: "URL routing + code-split sections + live status bar",
  },
  {
    date: "2026-04-15",
    section: "matrix",
    summary: "rebuilt matrix rain with mirrored katakana + phosphor trail",
  },
  {
    date: "2026-04-14",
    section: "resume",
    summary: "static HTML resume escape hatch",
    target: "/resume",
  },
];
