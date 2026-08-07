import { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { Instrument } from '../primitives/Instrument';
import { Caption } from '../primitives/Caption';
import { SegmentedToggle } from '../primitives/SegmentedToggle';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MEMORY_LAYERS, type MemoryLayerId } from '../data/memoryLayers';

export function MemoryLookupCascade() {
  const { bn, num } = useLang();
  const reduced = useReducedMotion();
  const [target, setTarget] = useState<MemoryLayerId>('ram');
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(false);

  const targetIdx = MEMORY_LAYERS.findIndex((s) => s.id === target);

  const play = () => {
    setRevealed(0);
    setPlaying(true);
    if (reduced) { setRevealed(targetIdx + 1); setPlaying(false); return; }
  };

  useEffect(() => {
    if (!playing || reduced) return;
    if (revealed > targetIdx) { setPlaying(false); return; }
    const t = setTimeout(() => setRevealed((r) => r + 1), 450);
    return () => clearTimeout(t);
  }, [playing, revealed, targetIdx, reduced]);

  const changeTarget = (t: MemoryLayerId) => { setTarget(t); setRevealed(0); setPlaying(false); };

  const totalCycles = MEMORY_LAYERS.slice(0, targetIdx + 1).reduce((a, s) => a + s.cycles, 0);

  return (
    <>
      <Instrument
        bnTitle="THE FULL LOOKUP"
        enTitle="THE FULL LOOKUP"
        control={
          <SegmentedToggle
            value={target}
            onChange={changeTarget}
            options={MEMORY_LAYERS.map((s) => ({ value: s.id, label: bn ? s.bn : s.en }))}
          />
        }
      >
        <div className="flex flex-col gap-[14px] py-[18px] px-4">
          <div className="flex flex-wrap gap-[6px]">
            {MEMORY_LAYERS.map((s, i) => {
              if (i > targetIdx) return null;
              const isShown = i < revealed;
              const isFinal = i === targetIdx;
              return (
                <div
                  key={s.id}
                  className="font-mono text-[11.5px]"
                  style={{
                    padding: '8px 12px',
                    border: `1px solid ${isShown ? (isFinal ? '#00d26a' : '#00753f') : '#2e392e'}`,
                    background: isShown ? (isFinal ? '#16402a' : 'rgba(0,117,63,0.25)') : '#1b231b',
                    color: isShown ? '#00d26a' : '#3a5847',
                    opacity: isShown ? 1 : 0.4,
                    transition: 'opacity 0.2s, border-color 0.2s, background 0.2s',
                  }}
                >
                  {bn ? s.bn : s.en} {isShown && !isFinal && (bn ? '· miss' : '· miss')}
                  {isShown && isFinal && (bn ? ' · পাওয়া গেল' : ' · found')}
                </div>
              );
            })}
          </div>
          <button
            onClick={play}
            className="well-focus font-mono text-[12px]"
            style={{ background: 'none', border: '1px solid #3a5847', color: '#00d26a', padding: '7px 16px', cursor: 'pointer', width: 'fit-content' }}
          >
            {bn ? 'CPU data চাইল ▶' : 'CPU requests data ▶'}
          </button>
          {revealed > targetIdx && (
            <div
              className="font-mono text-[13px]"
              style={{ color: '#00d26a', border: '1px dashed #00d26a', padding: '6px 12px', width: 'fit-content' }}
            >
              {bn ? `মোট অপেক্ষা: ~${num(totalCycles)} cycle` : `total wait: ~${num(totalCycles)} cycles`}
            </div>
          )}
        </div>
      </Instrument>
      <Caption
        bn="Register থেকে শুরু করে যেখানে data পাওয়া যায়, ততক্ষণ পর্যন্ত প্রতিটা layer-এ miss। যত নিচে যেতে হয়, cycle-এর হিসাব তত ভয়ংকরভাবে বাড়ে।"
        en="Every layer from register onward is a miss until the data turns up. The deeper it has to search, the more the cycle count explodes."
      />
    </>
  );
}
