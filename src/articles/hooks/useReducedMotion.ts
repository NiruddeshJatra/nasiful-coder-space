/**
 * One-shot check of the user's reduced-motion preference, read once at render.
 * Guards both `window` (SSR/prerender) and `window.matchMedia` (test envs and
 * constrained webviews where the API is absent); falls back to "motion is fine".
 */
export const useReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
