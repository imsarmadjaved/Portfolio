import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";
import {
  attachPageVisibility,
  attachSubtlePointer,
  setupCanvas,
  tickPointer,
  isCoarseOrNarrow,
} from "./canvasRuntime";

/**
 * Shared fixed atmosphere for the rest of the site.
 * Very low opacity drafting lines — one system, not per-section gimmicks.
 */
const SiteAtmosphere = () => {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  useEffect(() => attachPageVisibility(setPageVisible), []);

  useEffect(() => {
    const host = ref.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    let width = 0;
    let height = 0;
    let ctx;
    let frameId = 0;
    let time = 0;
    let simplified = isCoarseOrNarrow();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const detachPointer = attachSubtlePointer(host, pointer);

    const steel = (alpha) => `rgba(59, 130, 246, ${alpha})`;

    const drawFrame = (animated) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const { ox, oy } = animated
        ? tickPointer(pointer, 0.03)
        : { ox: 0, oy: 0 };
      const drift = animated ? Math.sin(time * 0.2) * 0.004 : 0;

      // Soft ambient wash — barely there
      const wash = ctx.createRadialGradient(
        width * (0.7 + ox * 0.04),
        height * (0.2 + oy * 0.03),
        0,
        width * 0.55,
        height * 0.4,
        Math.max(width, height) * 0.9,
      );
      wash.addColorStop(0, steel(0.035));
      wash.addColorStop(0.55, steel(0.012));
      wash.addColorStop(1, "transparent");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      const lineCount = simplified ? 6 : 9;
      for (let i = 0; i < lineCount; i += 1) {
        const t = i / (lineCount - 1);
        const y = height * (0.12 + t * 0.76 + drift * (i % 2 === 0 ? 1 : -1));
        ctx.beginPath();
        ctx.moveTo(0, y + ox * 6);
        ctx.lineTo(width, y - ox * 4);
        ctx.strokeStyle = steel(i % 3 === 0 ? 0.045 : 0.022);
        ctx.lineWidth = i % 3 === 0 ? 1 : 0.6;
        ctx.stroke();
      }

      // Two quiet vertical guides
      [0.18 + ox * 0.01, 0.82 + ox * 0.01].forEach((nx, idx) => {
        ctx.beginPath();
        ctx.moveTo(width * nx, height * 0.08);
        ctx.lineTo(width * nx + oy * 8, height * 0.92);
        ctx.strokeStyle = steel(idx === 0 ? 0.035 : 0.028);
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      simplified = isCoarseOrNarrow();
      ctx = setupCanvas(canvas, width, height);
      drawFrame(false);
    };

    const animate = () => {
      time += 0.016;
      drawFrame(true);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const shouldAnimate = !reducedMotion && pageVisible;
    if (shouldAnimate) animate();
    else drawFrame(false);

    return () => {
      window.removeEventListener("resize", resize);
      detachPointer();
      window.cancelAnimationFrame(frameId);
    };
  }, [pageVisible, reducedMotion]);

  return (
    <div ref={ref} className="site-atmosphere" aria-hidden="true">
      <canvas ref={canvasRef} className="site-atmosphere__canvas" />
    </div>
  );
};

export default SiteAtmosphere;
