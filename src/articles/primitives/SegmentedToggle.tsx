import type { CSSProperties, ReactNode } from 'react';

interface SegmentedToggleOption<T extends string | number> {
  value: T;
  label: ReactNode;
}

interface SegmentedToggleProps<T extends string | number> {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  fontSize?: number | string;
}

export function SegmentedToggle<T extends string | number>({
  options,
  value,
  onChange,
  fontSize = '11.5px',
}: SegmentedToggleProps<T>) {
  const segStyle = (active: boolean): CSSProperties => ({
    background: active ? '#16402a' : 'none',
    color: active ? '#00d26a' : '#6c8873',
    border: 'none',
    padding: '5px 12px',
    cursor: 'pointer',
    fontFamily: "'Departure Mono', monospace",
    fontSize,
  });

  return (
    <div className="flex" style={{ border: '1px solid #3a5847' }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          style={segStyle(value === opt.value)}
          onClick={() => onChange(opt.value)}
          className="well-focus"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
