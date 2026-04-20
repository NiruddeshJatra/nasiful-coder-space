type MatrixEvent = "type" | "focus-on" | "focus-off";

const target = new EventTarget();

export const emitMatrix = (e: MatrixEvent) => {
  if (typeof window === "undefined") return;
  target.dispatchEvent(new CustomEvent(`matrix:${e}`));
};

export const onMatrix = (e: MatrixEvent, cb: () => void): (() => void) => {
  const handler = () => cb();
  target.addEventListener(`matrix:${e}`, handler);
  return () => target.removeEventListener(`matrix:${e}`, handler);
};
