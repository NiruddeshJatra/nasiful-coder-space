interface ViewTransitionDocument extends Document {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
}

export const startViewTransition = (cb: () => void) => {
  const doc = document as ViewTransitionDocument;
  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(cb);
  } else {
    cb();
  }
};
