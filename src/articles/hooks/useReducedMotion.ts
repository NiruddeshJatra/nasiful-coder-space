/** One-shot check of the user's reduced-motion preference, read once at render. */
export const useReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
