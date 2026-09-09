import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ncs_articles_read';

/** Broadcast within the tab; `storage` events only fire in *other* tabs. */
const CHANGE_EVENT = 'ncs:read-progress';

function load(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

function save(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // storage unavailable (private mode, blocked cookies) — progress is a
    // convenience, never a correctness requirement.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Record that this reader opened an article. Idempotent. */
export function markArticleRead(slug: string) {
  if (typeof window === 'undefined' || !slug) return;
  const current = load();
  if (current.includes(slug)) return;
  save([...current, slug]);
}

export function clearReadProgress() {
  if (typeof window === 'undefined') return;
  save([]);
}

/**
 * Which articles this browser has opened. Starts empty on the first render so
 * the prerendered HTML and the hydrated client agree, then fills in on mount.
 */
export function useReadProgress() {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setReadSlugs(load());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const isRead = useCallback((slug: string) => readSlugs.includes(slug), [readSlugs]);

  return { readSlugs, isRead, readCount: readSlugs.length, clear: clearReadProgress };
}
