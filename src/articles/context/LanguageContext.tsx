import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Lang = 'bn' | 'en';

const STORAGE_KEY = 'ncs_article_lang';

const DIGIT_MAP: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

function bd(s: string | number): string {
  return String(s).replace(/[0-9]/g, (d) => DIGIT_MAP[d] ?? d);
}

interface LanguageContextValue {
  lang: Lang;
  bn: boolean;
  en: boolean;
  setLang: (lang: Lang) => void;
  bd: (s: string | number) => string;
  num: (n: string | number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'en' ? 'en' : 'bn';
    } catch {
      return 'bn';
    }
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const num = useCallback(
    (n: string | number) => (lang === 'bn' ? bd(n) : String(n)),
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, bn: lang === 'bn', en: lang === 'en', setLang, bd, num }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}

// eslint-disable-next-line react-refresh/only-export-components
export { bd as bdFn };
