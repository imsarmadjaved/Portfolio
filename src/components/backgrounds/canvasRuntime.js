/** Shared helpers for section canvas backgrounds. */

export const MAX_DPR = 1.6;

export const getDpr = () =>
  Math.min(window.devicePixelRatio || 1, MAX_DPR);

export const isCoarseOrNarrow = () =>
  window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

export const lerp = (a, b, t) => a + (b - a) * t;

export const setupCanvas = (canvas, width, height) => {
  const dpr = getDpr();
  const ctx = canvas.getContext("2d", { alpha: true });
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
};

export const attachPageVisibility = (onChange) => {
  const handle = () => onChange(!document.hidden);
  document.addEventListener("visibilitychange", handle);
  return () => document.removeEventListener("visibilitychange", handle);
};

/**
 * Subtle pointer tracking on a section ancestor.
 * Returns a cleanup + a mutable state object { x, y, tx, ty } in 0–1 coords.
 */
export const attachSubtlePointer = (host, state) => {
  const target =
    host.closest(".site-body-shell") ||
    host.closest("section") ||
    host.parentElement ||
    host;

  const onMove = (event) => {
    const rect = target.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    state.tx = (event.clientX - rect.left) / rect.width;
    state.ty = (event.clientY - rect.top) / rect.height;
  };

  const onLeave = () => {
    state.tx = 0.5;
    state.ty = 0.5;
  };

  target.addEventListener("pointermove", onMove, { passive: true });
  target.addEventListener("pointerleave", onLeave, { passive: true });

  return () => {
    target.removeEventListener("pointermove", onMove);
    target.removeEventListener("pointerleave", onLeave);
  };
};

export const tickPointer = (state, ease = 0.035) => {
  state.x = lerp(state.x, state.tx, ease);
  state.y = lerp(state.y, state.ty, ease);
  return {
    ox: (state.x - 0.5) * 2,
    oy: (state.y - 0.5) * 2,
  };
};
