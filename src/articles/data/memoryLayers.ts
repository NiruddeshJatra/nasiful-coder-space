// Canonical register→disk layer stats shared by MemoryPyramid, LatencyScale,
// and MemoryLookupCascade — single source so the numbers can't drift between
// widgets (or from the article prose, which quotes the same figures).
export type MemoryLayerId = 'reg' | 'l1' | 'l2' | 'l3' | 'ram' | 'disk';

export interface MemoryLayerInfo {
  id: MemoryLayerId;
  bn: string;
  en: string;
  /** capacity range, e.g. "32-64 KB" */
  size: string;
  /** clock-cycle range shown in the pyramid, e.g. "1-2 cycles" */
  speedLabel: string;
  /** representative cycle cost used by MemoryLookupCascade's running total */
  cycles: number;
  /** "if register access = 1 second" analogy, used by LatencyScale's log-scaled bars */
  scaledSeconds: number;
  scaledBn: string;
  scaledEn: string;
  /** real hardware latency, e.g. "~0.5 ns" */
  realLatency: string;
}

export const MEMORY_LAYERS: MemoryLayerInfo[] = [
  { id: 'reg', bn: 'Register', en: 'Register', size: '~few hundred bytes', speedLabel: '1 cycle', cycles: 1, scaledSeconds: 1, scaledBn: '১ সেকেন্ড', scaledEn: '1 second', realLatency: '~0.5 ns' },
  { id: 'l1', bn: 'L1 Cache', en: 'L1 Cache', size: '32-64 KB', speedLabel: '1-2 cycles', cycles: 2, scaledSeconds: 3.5, scaledBn: '৩-৪ সেকেন্ড', scaledEn: '3-4 seconds', realLatency: '~1-2 ns' },
  { id: 'l2', bn: 'L2 Cache', en: 'L2 Cache', size: '256 KB - 1 MB', speedLabel: '3-10 cycles', cycles: 10, scaledSeconds: 15, scaledBn: '১৫ সেকেন্ড', scaledEn: '15 seconds', realLatency: '~4-5 ns' },
  { id: 'l3', bn: 'L3 Cache', en: 'L3 Cache', size: '4-64 MB', speedLabel: '10-30 cycles', cycles: 30, scaledSeconds: 45, scaledBn: '৪৫ সেকেন্ড', scaledEn: '45 seconds', realLatency: '~15-20 ns' },
  { id: 'ram', bn: 'RAM', en: 'RAM', size: '8-32 GB', speedLabel: '100-300 cycles', cycles: 300, scaledSeconds: 360, scaledBn: '৫-৭ মিনিট', scaledEn: '5-7 minutes', realLatency: '~60-100 ns' },
  { id: 'disk', bn: 'SSD / HDD', en: 'SSD / HDD', size: '256 GB - many TB', speedLabel: '100,000+ cycles', cycles: 100000, scaledSeconds: 151200, scaledBn: '১.৫-২ দিন', scaledEn: '1.5-2 days', realLatency: '~50-100 µs (SSD) · ~5-10 ms (HDD)' },
];
