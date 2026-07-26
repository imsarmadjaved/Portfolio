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
 * Hero — topographic contour field with soft pointer warping.
 * Architectural iso-lines, not particles / grids / blobs.
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

    const heightField = (nx, ny, t, px, py) => {
      const dx = nx - (0.5 + px * 0.18);
      const dy = ny - (0.42 + py * 0.14);
      const influence = Math.exp(-(dx * dx * 4.2 + dy * dy * 5.5)) * 0.55;
      return (
        Math.sin(nx * 5.6 + t * 0.11) * Math.cos(ny * 4.1 - t * 0.09) * 0.55 +
        Math.sin((nx * 1.4 + ny) * 7.2 + t * 0.07) * 0.28 +
        Math.cos(nx * 9.1 - ny * 3.4 - t * 0.05) * 0.18 +
        influence
      );
    };

    const drawStaticFrame = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Quiet architectural frame — reduced-motion / paused state
      const inset = Math.min(width, height) * 0.06;
      ctx.strokeStyle = "rgba(94, 181, 196, 0.14)";
      ctx.lineWidth = 1;
      ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);

      ctx.strokeStyle = "rgba(76, 141, 235, 0.1)";
      ctx.beginPath();
      const mark = 18;
      // Corner crop marks
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
      ctx.stroke();

      // Soft static contour suggestion
      const rows = 14;
      for (let i = 0; i < rows; i += 1) {
        const ny = 0.18 + (i / (rows - 1)) * 0.64;
        const y = height * ny;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const nx = x / width;
          const h = heightField(nx, ny, 0, 0, 0);
          const py = y + h * height * 0.035;
          if (x === 0) ctx.moveTo(x, py);
          else ctx.lineTo(x, py);
        }
        ctx.strokeStyle = `rgba(94, 181, 196, ${0.04 + (i % 3 === 0 ? 0.05 : 0)})`;
        ctx.lineWidth = i % 3 === 0 ? 1.1 : 0.7;
        ctx.stroke();
      }

      // Readability washes
      const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.5);
      topFade.addColorStop(0, "rgba(10, 12, 16, 0.55)");
      topFade.addColorStop(0.55, "rgba(10, 12, 16, 0.12)");
      topFade.addColorStop(1, "transparent");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, height * 0.5);

      const floor = ctx.createLinearGradient(0, height * 0.45, 0, height);
      floor.addColorStop(0, "transparent");
      floor.addColorStop(0.55, "rgba(10, 12, 16, 0.35)");
      floor.addColorStop(1, "rgba(10, 12, 16, 0.82)");
      ctx.fillStyle = floor;
      ctx.fillRect(0, height * 0.45, width, height * 0.55);
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

      const { ox, oy } = tickPointer(pointer, 0.04);
      ctx.clearRect(0, 0, width, height);

      const px = ox;
      const py = oy;
      const t = time;

      // Soft key light — restrained, pointer-biased
      const wash = ctx.createRadialGradient(
        width * (0.48 + ox * 0.1),
        height * (0.34 + oy * 0.08),
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.78,
      );
      wash.addColorStop(0, "rgba(76, 141, 235, 0.1)");
      wash.addColorStop(0.4, "rgba(94, 181, 196, 0.035)");
      wash.addColorStop(1, "transparent");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      const rowCount = simplified ? 18 : 28;
      const stepX = simplified ? 6 : 3;
      const amp = height * (simplified ? 0.028 : 0.038);
      const focusX = width * (0.5 + ox * 0.16);
      const focusY = height * (0.42 + oy * 0.12);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < rowCount; i += 1) {
        const ny = 0.12 + (i / (rowCount - 1)) * 0.76;
        const baseY = height * ny;
        const accent = i % 4 === 0;
        const mid = i % 2 === 0;

        ctx.beginPath();
        let started = false;
        for (let x = 0; x <= width; x += stepX) {
          const nx = x / width;
          const h = heightField(nx, ny, t, px, py);
          const y = baseY + h * amp;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Proximity brightening near pointer — luxury, not chasey
        const rowDist = Math.abs(baseY - focusY) / height;
        const near = Math.max(0, 1 - rowDist * 2.4);
        const alpha =
          (accent ? 0.14 : mid ? 0.08 : 0.045) + near * 0.1;
        ctx.strokeStyle = accent
          ? `rgba(94, 181, 196, ${alpha})`
          : `rgba(74, 127, 232, ${alpha * 0.85})`;
        ctx.lineWidth = accent ? 1.25 : mid ? 0.9 : 0.65;
        ctx.stroke();
      }

      // Sparse vertical meridians for depth (architectural, not grid)
      if (!simplified) {
        const meridians = 5;
        for (let m = 0; m < meridians; m += 1) {
          const nx = 0.18 + (m / (meridians - 1)) * 0.64 + ox * 0.02;
          ctx.beginPath();
          for (let y = height * 0.1; y <= height * 0.88; y += 5) {
            const ny = y / height;
            const h = heightField(nx, ny, t * 0.7, px, py);
            const x = width * nx + h * width * 0.012;
            if (y === height * 0.1) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          const dist = Math.abs(width * nx - focusX) / width;
          const a = 0.025 + Math.max(0, 1 - dist * 2.2) * 0.06;
          ctx.strokeStyle = `rgba(76, 141, 235, ${a})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Soft horizon weight
      const floor = ctx.createLinearGradient(0, height * 0.4, 0, height);
      floor.addColorStop(0, "transparent");
      floor.addColorStop(0.5, "rgba(10, 12, 16, 0.25)");
      floor.addColorStop(1, "rgba(10, 12, 16, 0.78)");
      ctx.fillStyle = floor;
      ctx.fillRect(0, height * 0.4, width, height * 0.6);

      const topFade = ctx.createLinearGradient(0, 0, 0, height * 0.48);
      topFade.addColorStop(0, "rgba(10, 12, 16, 0.5)");
      topFade.addColorStop(0.5, "rgba(10, 12, 16, 0.14)");
      topFade.addColorStop(1, "transparent");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, height * 0.48);
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
