import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';

const useReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LAYERS_BN = [
  'অ্যাপ্লিকেশন', 'অপারেটিং সিস্টেম', 'প্রোগ্রামিং ভাষা',
  'অ্যাসেম্বলি / ISA', 'মাইক্রো-আর্কিটেকচার',
  'লজিক গেট', 'voltage স্তর ← আপনি এখানে',
];
const LAYERS_EN = [
  'Application', 'Operating System', 'Programming Language',
  'Assembly / ISA', 'Micro-architecture',
  'Logic Gates', 'voltage level ← you are here',
];

export function AbstractionStack() {
  const { bn } = useLang();
  const reduced = useReducedMotion();
  const layers = bn ? LAYERS_BN : LAYERS_EN;
  const voltageIdx = 6; // 0-indexed, bottom layer

  return (
    <>
      <Instrument
        bnTitle="ABSTRACTION STACK"
        enTitle="ABSTRACTION STACK"
      >
        <div className="flex items-stretch gap-0 p-4">
          {/* Left dot-rail */}
          <div className="relative flex-none" style={{ width: 28 }}>
            <svg width="28" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
              <line x1="14" y1="0" x2="14" y2="100%" stroke="#2e392e" strokeWidth="1.5" />
              {!reduced && (
                <circle r="4" fill="#00d26a">
                  <animateMotion dur="5s" repeatCount="indefinite" path="M14,0 V252" />
                </circle>
              )}
            </svg>
          </div>

          {/* Layer stack */}
          <div className="flex-1 flex flex-col">
            {layers.map((label, i) => {
              const isVoltage = i === voltageIdx;
              return (
                <div
                  key={i}
                  className="flex items-center font-mono text-[12px] py-[9px] px-3"
                  style={{
                    borderBottom: i < layers.length - 1 ? '1px solid #2e392e' : 'none',
                    background: isVoltage ? 'rgba(0,210,106,0.1)' : 'none',
                    color: isVoltage ? '#00d26a' : '#8aa893',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span className="w-5 text-right mr-2 text-[10px]" style={{ color: '#3a5847' }}>
                    {layers.length - i}
                  </span>
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </Instrument>
      <Caption
        bn="প্রতিটি স্তর নিচের জটিলতা লুকিয়ে রাখে। আপনি এখন সবচেয়ে নিচে — voltage স্তরে।"
        en="Each layer hides the complexity below. You are now at the very bottom — the voltage level."
      />
    </>
  );
}
