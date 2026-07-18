import { useLang } from '../context/LanguageContext';

interface CaptionProps {
  bn: string;
  en: string;
}

export function Caption({ bn: bnText, en: enText }: CaptionProps) {
  const { bn } = useLang();
  return (
    <figcaption
      data-role="caption"
      className="font-mono text-[11.5px] text-ink-faint mb-[26px]"
    >
      {bn ? bnText : enText}
    </figcaption>
  );
}
