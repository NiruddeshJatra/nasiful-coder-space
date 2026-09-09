import type { CSSProperties, ReactNode } from "react";

/**
 * Optional guest identity for a card. Games like ArcZero announce themselves in
 * their own palette rather than the site's phosphor tokens (see CLAUDE.md), so
 * the card keeps one shared *structure* while letting colours/type be overridden.
 */
export interface CardTheme {
  accent: string;
  border: string;
  background: string;
  fontFamily?: string;
  /** Body copy colour; defaults to a muted version of the accent-neutral text. */
  body?: string;
  /** Dim colour for eyebrow/meta/facets. */
  dim?: string;
  hoverBackground?: string;
  /** Title letter-spacing. Short wordmarks take more; long titles need less. */
  titleTracking?: string;
}

interface SectionCardProps {
  /** Top-left label, e.g. "SERIES 001" or "DEPLOYED". */
  eyebrow?: string;
  /** Top-right label, e.g. "complete · 8 parts". */
  meta?: string;
  title: string;
  /** Uppercase tracked line under the title. */
  tagline?: string;
  description: ReactNode;
  /** Dim single line of facets, e.g. "10 levels · daily challenge". */
  facets?: string;
  cta: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  theme?: CardTheme;
  ariaLabel?: string;
}

export function SectionCard({
  eyebrow,
  meta,
  title,
  tagline,
  description,
  facets,
  cta,
  href,
  onClick,
  theme,
  ariaLabel,
}: SectionCardProps) {
  const themed = !!theme;

  const shell: CSSProperties = themed
    ? {
        background: theme!.background,
        border: `1px solid ${theme!.border}`,
        borderRadius: 4,
        fontFamily: theme!.fontFamily,
      }
    : {};

  const dim = themed ? { color: theme!.dim ?? "rgba(255,255,255,0.5)" } : undefined;
  const bodyCol = themed ? { color: theme!.body ?? "rgba(255,255,255,0.7)" } : undefined;

  const inner = (
    <>
      {(eyebrow || meta) && (
        <div className="flex items-baseline justify-between gap-x-3 gap-y-1 flex-wrap mb-2">
          {eyebrow && (
            <span
              className={`text-[10px] sm:text-[11px] tracking-[0.12em] ${themed ? "" : "text-phosphor-dim"}`}
              style={dim}
            >
              {eyebrow}
            </span>
          )}
          {meta && (
            <span
              className={`text-[10px] sm:text-[11px] ${themed ? "" : "text-phosphor-dim"}`}
              style={dim}
            >
              {meta}
            </span>
          )}
        </div>
      )}

      <h3
        className={`leading-tight break-words mb-1 font-normal ${themed ? "" : "text-phosphor"}`}
        style={{
          fontSize: "clamp(1.5rem, 7vw, 2.5rem)",
          letterSpacing: theme?.titleTracking ?? "0.02em",
          ...(themed ? { color: theme!.accent } : {}),
        }}
      >
        {title}
      </h3>

      {tagline && (
        <p
          className={`uppercase leading-snug mb-4 text-[10px] sm:text-xs ${themed ? "" : "text-phosphor-dim"}`}
          style={{ letterSpacing: "0.2em", ...(dim ?? {}) }}
        >
          {tagline}
        </p>
      )}

      <p
        className={`text-xs sm:text-sm leading-relaxed mb-4 ${themed ? "" : "text-foreground/70"}`}
        style={bodyCol}
      >
        {description}
      </p>

      {facets && (
        <p
          className={`text-[10px] sm:text-[11px] leading-relaxed mb-5 ${themed ? "" : "text-phosphor-dim"}`}
          style={{ letterSpacing: "0.06em", ...(dim ?? {}) }}
        >
          {facets}
        </p>
      )}

      <span
        className={`inline-flex items-center justify-center min-h-[38px] px-5 py-2 text-xs sm:text-[13px] border rounded-[2px] transition-colors duration-150 ${
          themed ? "" : "border-border/70 text-phosphor group-hover:border-phosphor group-hover:bg-phosphor/10"
        }`}
        style={
          themed
            ? { color: theme!.accent, borderColor: theme!.accent, letterSpacing: "0.15em" }
            : { letterSpacing: "0.1em" }
        }
      >
        {cta}
      </span>
    </>
  );

  const shellClass =
    `group block w-full text-left font-mono p-5 sm:p-7 mb-6 no-underline cursor-pointer ` +
    (themed
      ? "hover:brightness-110 focus-visible:outline-none focus-visible:ring-1"
      : "border border-border/60 hover:border-phosphor/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-phosphor/60 bg-transparent transition-colors");

  if (href) {
    return (
      <a href={href} onClick={onClick} className={shellClass} style={shell} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={shellClass} style={shell} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}

export default SectionCard;
