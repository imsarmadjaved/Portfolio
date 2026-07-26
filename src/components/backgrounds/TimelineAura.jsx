import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";
import useSectionVisibility from "../../hooks/useSectionVisibility";
import {
  attachPageVisibility,
  attachSubtlePointer,
  setupCanvas,
  tickPointer,
  isCoarseOrNarrow,
} from "./canvasRuntime";

/**
 * Shared aperture / meridian field for About → Contact.
 * Mount once inside `.site-body-shell` — sticky viewport-sized canvas.
 * Soft architectural light slits + large-radius arcs; low opacity for readability.
 */
const TimelineAura = () => {
  const shellLayerRef = useRef(null);
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isVisible = useSectionVisibility(shellLayerRef, "80px");
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  useEffect(() => attachPageVisibility(setPageVisible), []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    const host = shellLayerRef.current;
    if (!viewport || !canvas || !host) return undefined;

    let width = 0;
    let height = 0;
    let ctx;
    let frameId = 0;
    let time = 0;
    let simplified = isCoarseOrNarrow();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const detachPointer = attachSubtlePointer(host, pointer);

    const resize = () => {
      width = Math.max(1, Math.round(viewport.clientWidth || window.innerWidth));
      height = Math.max(
        1,
        Math.round(viewport.clientHeight || window.innerHeight),
      );
      simplified = isCoarseOrNarrow();
      ctx = setupCanvas(canvas, width, height);
    };

    const drawStatic = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Quiet vertical aperture lines
      const slits = [0.12, 0.28, 0.72, 0.88];
      slits.forEach((nx, i) => {
        const x = width * nx;
        const grad = ctx.createLinearGradient(x, 0, x, height);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.25, `rgba(76, 141, 235, ${0.05 + (i % 2) * 0.02})`);
        grad.addColorStop(0.5, `rgba(94, 181, 196, ${0.07 + (i % 2) * 0.02})`);
        grad.addColorStop(0.75, `rgba(76, 141, 235, ${0.045})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(x - 0.5, 0, 1, height);
      });

      // Soft horizon rule
      ctx.strokeStyle = "rgba(94, 181, 196, 0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, height * 0.5);
      ctx.lineTo(width * 0.92, height * 0.5);
      ctx.stroke();
    };

    const draw = (staticFrame = false) => {
      if (!ctx) return;
      if (staticFrame || reducedMotion) {
        drawStatic();
        return;
      }

      const { ox, oy } = tickPointer(pointer, 0.028);
      ctx.clearRect(0, 0, width, height);

      const t = time;
      const breath = 0.5 + Math.sin(t * 0.35) * 0.5;

      // Ambient wash — very restrained
      const wash = ctx.createRadialGradient(
        width * (0.5 + ox * 0.08),
        height * (0.45 + oy * 0.06),
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7,
      );
      wash.addColorStop(0, "rgba(76, 141, 235, 0.04)");
      wash.addColorStop(0.5, "rgba(94, 181, 196, 0.015)");
      wash.addColorStop(1, "transparent");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      // Vertical lumen slits (gallery / aperture feel)
      const slitCount = simplified ? 4 : 6;
      for (let i = 0; i < slitCount; i += 1) {
        const base = (i + 0.5) / slitCount;
        const nx = base + ox * 0.025 * (i % 2 === 0 ? 1 : -1);
        const x = width * nx;
        const intensity =
          0.035 +
          Math.max(0, 1 - Math.abs(pointer.x - nx) * 2.4) * 0.055 +
          breath * 0.012;

        const band = ctx.createLinearGradient(x - 14, 0, x + 14, 0);
        band.addColorStop(0, "transparent");
        band.addColorStop(0.45, `rgba(76, 141, 235, ${intensity * 0.35})`);
        band.addColorStop(0.5, `rgba(94, 181, 196, ${intensity})`);
        band.addColorStop(0.55, `rgba(76, 141, 235, ${intensity * 0.35})`);
        band.addColorStop(1, "transparent");
        ctx.fillStyle = band;
        ctx.fillRect(x - 14, 0, 28, height);

        ctx.beginPath();
        ctx.moveTo(x, height * 0.08);
        ctx.lineTo(x, height * 0.92);
        ctx.strokeStyle = `rgba(94, 181, 196, ${intensity * 0.9})`;
        ctx.lineWidth = i % 2 === 0 ? 1 : 0.65;
        ctx.stroke();
      }

      // Large-radius architectural arcs
      const arcs = simplified
        ? [
            { cx: 0.08, cy: 0.55, r: 0.55, a0: -0.6, a1: 0.9 },
            { cx: 0.94, cy: 0.4, r: 0.5, a0: 2.2, a1: 3.8 },
          ]
        : [
            { cx: 0.05, cy: 0.52, r: 0.62, a0: -0.75, a1: 1.05 },
            { cx: 0.96, cy: 0.38, r: 0.58, a0: 2.05, a1: 4.0 },
            { cx: 0.5, cy: 1.15, r: 0.72, a0: Math.PI + 0.35, a1: Math.PI * 2 - 0.35 },
          ];

      arcs.forEach((arc, index) => {
        const cx = width * (arc.cx + ox * 0.02);
        const cy = height * (arc.cy + oy * 0.018);
        const r = Math.min(width, height) * arc.r;
        const drift = staticFrame ? 0 : Math.sin(t * 0.2 + index) * 0.04;

        ctx.beginPath();
        ctx.arc(cx, cy, r, arc.a0 + drift, arc.a1 + drift);
        const near =
          1 -
          Math.min(
            1,
            Math.hypot(pointer.x - arc.cx, pointer.y - arc.cy) * 1.6,
          );
        ctx.strokeStyle = `rgba(74, 127, 232, ${0.06 + near * 0.08})`;
        ctx.lineWidth = simplified ? 1 : 1.15;
        ctx.stroke();

        // Parallel offset hairline
        if (!simplified) {
          ctx.beginPath();
          ctx.arc(cx, cy, r * 0.92, arc.a0 + drift * 0.7, arc.a1 + drift * 0.7);
          ctx.strokeStyle = `rgba(94, 181, 196, ${0.035 + near * 0.04})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });

      // Sparse horizon guides
      const guides = simplified ? 2 : 3;
      for (let g = 0; g < guides; g += 1) {
        const ny = 0.28 + g * 0.22 + oy * 0.015;
        const y = height * ny;
        ctx.beginPath();
        ctx.moveTo(width * 0.06, y);
        ctx.lineTo(width * 0.94, y);
        ctx.strokeStyle = `rgba(76, 141, 235, ${0.035 + (g === 1 ? 0.02 : 0)})`;
        ctx.lineWidth = 0.7;
        ctx.setLineDash(simplified ? [] : [6, 14]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const animate = () => {
      time += 0.016;
      draw(false);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    draw(true);
    const observer = new ResizeObserver(resize);
    observer.observe(viewport);

    if (!reducedMotion && isVisible && pageVisible) animate();

    return () => {
      observer.disconnect();
      detachPointer();
      window.cancelAnimationFrame(frameId);
    };
  }, [isVisible, pageVisible, reducedMotion]);

  return (
    <div ref={shellLayerRef} className="site-shared-bg" aria-hidden="true">
      <div ref={viewportRef} className="site-shared-bg__viewport">
        <canvas ref={canvasRef} className="site-shared-bg__canvas" />
      </div>
    </div>
  );
};

export default TimelineAura;
