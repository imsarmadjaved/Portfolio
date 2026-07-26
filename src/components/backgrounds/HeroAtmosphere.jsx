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
 * Hero — perspective construction grid + soft key light.
 * Architectural / drafting-board feel. No particles, blobs, or dots.
 */
const HeroAtmosphere = () => {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isVisible = useSectionVisibility(ref);
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  useEffect(() => attachPageVisibility(setPageVisible), []);

  useEffect(() => {
    const host = ref.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    const section = host.closest("section") || host.parentElement || host;
    let width = 0;
    let height = 0;
    let ctx;
    let frameId = 0;
    let time = 0;
    let simplified = isCoarseOrNarrow();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const detachPointer = attachSubtlePointer(host, pointer);

    const steel = (alpha) => `rgba(59, 130, 246, ${alpha})`;
    const ink = (alpha) => `rgba(0, 0, 0, ${alpha})`;

    const project = (nx, ny, ox, oy, depthBias = 0) => {
      const vanishX = 0.5 + ox * 0.06;
      const vanishY = 0.38 + oy * 0.04;
      const depth = 0.22 + ny * 0.78 + depthBias;
      const x = width * (vanishX + (nx - vanishX) * depth);
      const y = height * (vanishY + (ny - vanishY) * depth * 0.92);
      return { x, y };
    };

    const drawReadableWashes = () => {
      const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.45);
      topFade.addColorStop(0, ink(0.55));
      topFade.addColorStop(0.55, ink(0.14));
      topFade.addColorStop(1, "transparent");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, height * 0.45);

      const floor = ctx.createLinearGradient(0, height * 0.42, 0, height);
      floor.addColorStop(0, "transparent");
      floor.addColorStop(0.55, ink(0.28));
      floor.addColorStop(1, ink(0.78));
      ctx.fillStyle = floor;
      ctx.fillRect(0, height * 0.42, width, height * 0.58);
    };

    const drawStaticFrame = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const inset = Math.min(width, height) * 0.07;
      ctx.strokeStyle = steel(0.14);
      ctx.lineWidth = 1;
      ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);

      const mark = 16;
      ctx.beginPath();
      [
        [inset, inset],
        [width - inset, inset],
        [inset, height - inset],
        [width - inset, height - inset],
      ].forEach(([x, y], i) => {
        const sx = i % 2 === 0 ? 1 : -1;
        const sy = i < 2 ? 1 : -1;
        ctx.moveTo(x, y + sy * mark);
        ctx.lineTo(x, y);
        ctx.lineTo(x + sx * mark, y);
      });
      ctx.strokeStyle = steel(0.12);
      ctx.stroke();

      const rows = simplified ? 8 : 12;
      const cols = simplified ? 7 : 11;
      for (let r = 0; r < rows; r += 1) {
        const ny = 0.18 + (r / (rows - 1)) * 0.62;
        ctx.beginPath();
        for (let c = 0; c < cols; c += 1) {
          const nx = 0.12 + (c / (cols - 1)) * 0.76;
          const p = project(nx, ny, 0, 0);
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = steel(r % 3 === 0 ? 0.1 : 0.05);
        ctx.lineWidth = r % 3 === 0 ? 1 : 0.65;
        ctx.stroke();
      }

      for (let c = 0; c < cols; c += 1) {
        const nx = 0.12 + (c / (cols - 1)) * 0.76;
        ctx.beginPath();
        for (let r = 0; r < rows; r += 1) {
          const ny = 0.18 + (r / (rows - 1)) * 0.62;
          const p = project(nx, ny, 0, 0);
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = steel(c % 4 === 0 ? 0.08 : 0.04);
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      drawReadableWashes();
    };

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      simplified = isCoarseOrNarrow();
      ctx = setupCanvas(canvas, width, height);
    };

    const draw = (staticFrame = false) => {
      if (!ctx) return;
      if (staticFrame || reducedMotion) {
        drawStaticFrame();
        return;
      }

      const { ox, oy } = tickPointer(pointer, 0.038);
      ctx.clearRect(0, 0, width, height);

      // Soft key light — restrained, pointer-biased
      const wash = ctx.createRadialGradient(
        width * (0.48 + ox * 0.08),
        height * (0.32 + oy * 0.06),
        0,
        width * 0.5,
        height * 0.42,
        Math.max(width, height) * 0.75,
      );
      wash.addColorStop(0, steel(0.09));
      wash.addColorStop(0.42, steel(0.03));
      wash.addColorStop(1, "transparent");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      const rows = simplified ? 10 : 16;
      const cols = simplified ? 9 : 14;
      const breath = Math.sin(time * 0.35) * 0.008;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Horizontal construction lines
      for (let r = 0; r < rows; r += 1) {
        const ny = 0.14 + (r / (rows - 1)) * 0.68 + breath * (r % 2 === 0 ? 1 : -1);
        ctx.beginPath();
        for (let c = 0; c < cols; c += 1) {
          const nx = 0.08 + (c / (cols - 1)) * 0.84;
          const p = project(nx, ny, ox, oy);
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        const accent = r % 4 === 0;
        const near = Math.max(0, 1 - Math.abs(ny - (0.42 + oy * 0.05)) * 2.2);
        const alpha = (accent ? 0.13 : 0.055) + near * 0.07;
        ctx.strokeStyle = steel(alpha);
        ctx.lineWidth = accent ? 1.15 : 0.7;
        ctx.stroke();
      }

      // Vertical ribs converging to vanishing point
      for (let c = 0; c < cols; c += 1) {
        const nx = 0.08 + (c / (cols - 1)) * 0.84;
        ctx.beginPath();
        for (let r = 0; r < rows; r += 1) {
          const ny = 0.14 + (r / (rows - 1)) * 0.68;
          const p = project(nx, ny, ox, oy, breath * 0.4);
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        const accent = c % 5 === 0;
        const near = Math.max(0, 1 - Math.abs(nx - (0.5 + ox * 0.05)) * 2.4);
        ctx.strokeStyle = steel((accent ? 0.09 : 0.04) + near * 0.05);
        ctx.lineWidth = accent ? 0.95 : 0.6;
        ctx.stroke();
      }

      // Horizon guide
      const horizon = project(0.5, 0.38 + oy * 0.03, ox, oy);
      ctx.beginPath();
      ctx.moveTo(width * 0.08, horizon.y);
      ctx.lineTo(width * 0.92, horizon.y);
      ctx.strokeStyle = steel(0.1);
      ctx.lineWidth = 1;
      ctx.stroke();

      drawReadableWashes();
    };

    const animate = () => {
      time += 0.016;
      draw(false);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    draw(true);
    const observer = new ResizeObserver(resize);
    observer.observe(section);

    const shouldAnimate = !reducedMotion && isVisible && pageVisible;
    if (shouldAnimate) animate();

    return () => {
      observer.disconnect();
      detachPointer();
      window.cancelAnimationFrame(frameId);
    };
  }, [isVisible, pageVisible, reducedMotion]);

  return (
    <div ref={ref} className="section-bg hero-atmosphere" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-atmosphere__canvas" />
    </div>
  );
};

export default HeroAtmosphere;
