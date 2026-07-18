import { type ReactNode } from 'react';

interface KickerCell {
  children: ReactNode;
}

interface KickerProps {
  cells: KickerCell[];
}

export function Kicker({ cells }: KickerProps) {
  return (
    <div
      className="flex flex-wrap font-mono text-[11.5px] text-ink-muted mb-[26px]"
      style={{
        borderTop: '1px solid #26241C',
        borderBottom: '1px solid #c9bda0',
        letterSpacing: '0.06em',
      }}
    >
      {cells.map((cell, i) => (
        <span
          key={i}
          style={{
            padding: '8px 14px',
            paddingLeft: i === 0 ? 0 : 14,
            paddingRight: i === cells.length - 1 ? 0 : 14,
            borderRight: i < cells.length - 1 ? '1px solid #c9bda0' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {cell.children}
        </span>
      ))}
    </div>
  );
}
