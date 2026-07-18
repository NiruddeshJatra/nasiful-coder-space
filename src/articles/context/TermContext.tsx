import {
  createContext, useContext, useState, useCallback, useRef,
  type ReactNode,
} from 'react';
import { glossary, type GlossaryEntry } from '../glossary';
import { useLang } from './LanguageContext';

interface TermPosition { x: number; y: number }

interface TermContextValue {
  activeTerm: string | null;
  isMobile: boolean;
  tipPos: TermPosition;
  openTerm: (id: string, el: Element) => void;
  closeTerm: () => void;
  onTipEnter: () => void;
  def: GlossaryEntry | null;
}

const TermContext = createContext<TermContextValue | null>(null);

export function TermProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tipPos, setTipPos] = useState<TermPosition>({ x: 0, y: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openTerm = useCallback((id: string, el: Element) => {
    clearClose();
    const r = el.getBoundingClientRect();
    const mobile = window.innerWidth < 720;
    setIsMobile(mobile);
    setTipPos({ x: Math.min(r.left, window.innerWidth - 360), y: r.bottom + 10 });
    setActiveTerm(id);
  }, []);

  const closeTerm = useCallback(() => {
    clearClose();
    closeTimer.current = setTimeout(() => setActiveTerm(null), 250);
  }, []);

  const onTipEnter = useCallback(() => clearClose(), []);

  const def = activeTerm ? (glossary[activeTerm] ?? null) : null;

  return (
    <TermContext.Provider value={{ activeTerm, isMobile, tipPos, openTerm, closeTerm, onTipEnter, def }}>
      {children}
    </TermContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTerm(): TermContextValue {
  const ctx = useContext(TermContext);
  if (!ctx) throw new Error('useTerm must be inside TermProvider');
  return ctx;
}
