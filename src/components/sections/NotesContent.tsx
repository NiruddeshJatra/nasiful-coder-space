import { useMemo } from 'react';

interface NoteEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  status: 'seedling' | 'budding' | 'evergreen';
  updatedAt: string;
}

const NOTES: NoteEntry[] = [
  {
    id: 'on-building-in-public',
    title: 'On building in public',
    content:
      "Sharing work before it's polished is uncomfortable. But the feedback loop you get from early visibility is worth more than the safety of waiting. The portfolio shaped like a codebase is an experiment in this — the form itself is the argument.",
    tags: ['craft', 'building', 'portfolio'],
    status: 'budding',
    updatedAt: '2026-04',
  },
  {
    id: 'distributed-systems-reading',
    title: 'Distributed systems reading list',
    content:
      "Working through Designing Data-Intensive Applications. The chapter on replication lag felt directly applicable to the Bhara marketplace — we hit exactly the read-your-writes inconsistency described there. Real distributed systems problems look nothing like textbook examples.",
    tags: ['distributed-systems', 'reading', 'bhara'],
    status: 'seedling',
    updatedAt: '2026-03',
  },
  {
    id: 'on-mvp-scope',
    title: 'On cutting scope without cutting value',
    content:
      "Every feature cut should ask: does removing this change whether a real user gets the core value? If no, cut it. The hardest thing is distinguishing 'this is important' from 'I find this interesting'. They feel identical from the inside.",
    tags: ['building', 'product', 'craft'],
    status: 'evergreen',
    updatedAt: '2026-02',
  },
  {
    id: 'terminal-as-ux',
    title: 'The terminal as a UX metaphor',
    content:
      "Developers learn to trust CLIs precisely because they're explicit — no hidden state, every action typed and visible. A portfolio shaped like a terminal borrows that trust. It signals 'the person who made this thinks carefully about interfaces.'",
    tags: ['portfolio', 'craft', 'ux'],
    status: 'budding',
    updatedAt: '2026-04',
  },
];

const STATUS_CONFIG = {
  seedling: { label: 'seedling', color: 'text-yellow-500 border-yellow-500/40 bg-yellow-500/10' },
  budding: { label: 'budding', color: 'text-blue-400 border-blue-400/40 bg-blue-400/10' },
  evergreen: { label: 'evergreen', color: 'text-green-500 border-green-500/40 bg-green-500/10' },
};

const NotesContent = () => {
  const notesWithRelated = useMemo(() => {
    return NOTES.map((note) => {
      const relatedNotes = NOTES.filter(
        (other) =>
          other.id !== note.id &&
          other.tags.some((tag) => note.tags.includes(tag))
      );
      return { ...note, relatedNotes };
    });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in font-mono text-sm">
      <div className="space-y-1">
        <div>
          <span className="terminal-purple">const</span>{' '}
          <span className="terminal-cyan">notes</span>{' '}
          <span className="text-muted-foreground">= thinking in public, unfinished.</span>
        </div>
        <p className="text-xs text-muted-foreground pl-2">
          Raw drafts, loose ends, evergreen questions. When one tightens up, it graduates to{' '}
          <span className="terminal-cyan">blog.md</span>.
        </p>
      </div>

      {notesWithRelated.map((note) => {
        const statusCfg = STATUS_CONFIG[note.status];
        return (
          <article
            key={note.id}
            className="border border-border rounded-lg p-4 bg-card/20 space-y-3 hover:border-primary/30 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground leading-tight">{note.title}</h2>
              <span
                className={`shrink-0 text-[10px] font-mono border rounded-full px-2 py-0.5 ${statusCfg.color}`}
                aria-label={`Status: ${statusCfg.label}`}
              >
                {statusCfg.label}
              </span>
            </div>

            {/* Content */}
            <p className="text-xs text-muted-foreground leading-relaxed">{note.content}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono terminal-purple border border-border rounded px-1.5 py-0.5"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related notes */}
            {note.relatedNotes.length > 0 && (
              <div className="pt-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground/60 font-mono">mentioned in: </span>
                {note.relatedNotes.map((rel, i) => (
                  <span key={rel.id} className="text-[10px] font-mono terminal-cyan">
                    {rel.title}
                    {i < note.relatedNotes.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            )}

            {/* Date */}
            <div className="text-[10px] text-muted-foreground/40 font-mono">{note.updatedAt}</div>
          </article>
        );
      })}
    </div>
  );
};

export default NotesContent;
