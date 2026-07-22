import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../../hooks/useReducedMotion";
import useSectionVisibility from "../../hooks/useSectionVisibility";

const HeroAtmosphere = ({ sectionRef }) => {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isVisible = useSectionVisibility(sectionRef);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );
  const mouseRef = useRef({ x: 0.35, y: 0.42, tx: 0.35, ty: 0.42 });

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const onMove = (event) => {
      const bounds = section.getBoundingClientRect();
      mouseRef.current.tx = (event.clientX - bounds.left) / bounds.width;
      mouseRef.current.ty = (event.clientY - bounds.top) / bounds.height;
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    return () => section.removeEventListener("pointermove", onMove);
  }, [sectionRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return undefined;

    const context = canvas.getContext("2d");
    let frameId;
    let time = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];

    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

    const rebuildNodes = () => {
      const count = isMobile() ? 7 : 16;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random() * 0.85,
        r: 1.1 + Math.random() * 1.6,
        speed: 0.12 + Math.random() * 0.28,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildNodes();
    };

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0C0E12";
      context.fillRect(0, 0, width, height);
      const glow = context.createRadialGradient(
        width * 0.35,
        height * 0.4,
        0,
        width * 0.35,
        height * 0.4,
        Math.min(width, height) * 0.38,
      );
      glow.addColorStop(0, "rgba(122, 158, 181, 0.12)");
      glow.addColorStop(0.55, "rgba(122, 158, 181, 0.04)");
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
    };

    const draw = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#0C0E12";
      context.fillRect(0, 0, width, height);

      const centerX = width * (0.32 + (mouse.x - 0.5) * 0.08);
      const centerY = height * (0.4 + (mouse.y - 0.5) * 0.06);
      const baseRadius = Math.min(width, height) * 0.12;

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        baseRadius * 2.8,
      );
      glow.addColorStop(0, "rgba(122, 158, 181, 0.14)");
      glow.addColorStop(0.5, "rgba(122, 158, 181, 0.04)");
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const rings = [
        [baseRadius + 24, 4, 0.8, 0.1],
        [baseRadius + 48, 6, -0.55, 0.07],
        [baseRadius + 72, 3, 1.05, 0.04],
      ];

      rings.forEach(([radius, waves, speed, opacity]) => {
        context.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.06) {
          const offset = Math.sin(angle * waves + time * speed) * 8;
          const x = centerX + Math.cos(angle) * (radius + offset);
          const y = centerY + Math.sin(angle) * (radius + offset);
          if (angle === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.strokeStyle = `rgba(155, 184, 201, ${opacity})`;
        context.lineWidth = 1;
        context.stroke();
      });

      const positions = nodes.map((node) => {
        const x =
          node.x * width +
          Math.sin(time * node.speed + node.phase) * 14 +
          (mouse.x - 0.5) * 10;
        const y =
          node.y * height +
          Math.cos(time * node.speed * 0.8 + node.phase) * 12 +
          (mouse.y - 0.5) * 8;
        return { x, y, r: node.r };
      });

      for (let i = 0; i < positions.length; i += 1) {
        for (let j = i + 1; j < positions.length; j += 1) {
          const a = positions[i];
          const b = positions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(122, 158, 181, ${0.1 * (1 - dist / 130)})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      positions.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        context.fillStyle = "rgba(155, 184, 201, 0.55)";
        context.fill();
      });

      const waveY = height - Math.max(70, height * 0.09);
      context.beginPath();
      for (let x = -20; x <= width + 20; x += 8) {
        const y =
          waveY +
          Math.sin(x * 0.006 + time * 0.9) * 14 +
          Math.cos(x * 0.003 + time * 0.4) * 6;
        if (x === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = "rgba(122, 158, 181, 0.16)";
      context.lineWidth = 1.5;
      context.stroke();
    };

    const animate = () => {
      time += 0.012;
      draw();
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    if (reducedMotion) drawStatic();
    else draw();

    const observer = new ResizeObserver(resize);
    observer.observe(section);

    if (!reducedMotion && isVisible && pageVisible) animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [isVisible, pageVisible, reducedMotion, sectionRef]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
};

export default HeroAtmosphere;
