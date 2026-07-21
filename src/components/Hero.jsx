import { useEffect, useRef, useState } from "react";
import { portfolioData } from "../data/PortfolioData";
import useReducedMotion from "../hooks/useReducedMotion";
import useSectionVisibility from "../hooks/useSectionVisibility";

const Hero = () => {
  const { personal, footer } = portfolioData;
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isVisible = useSectionVisibility(sectionRef);
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

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
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#050505";
      context.fillRect(0, 0, width, height);

      const centerX = width * (width > 900 ? 0.6 : 0.5);
      const centerY = height * 0.45;
      const baseRadius = Math.min(width, height) * 0.13;
      const rings = [
        [baseRadius + 28, 5, 1, 0.13],
        [baseRadius + 48, 7, -0.7, 0.08],
        [baseRadius + 68, 4, 1.25, 0.05],
      ];

      rings.forEach(([radius, waves, speed, opacity]) => {
        context.beginPath();
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.06) {
          const offset = Math.sin(angle * waves + time * speed) * 10;
          const x = centerX + Math.cos(angle) * (radius + offset);
          const y = centerY + Math.sin(angle) * (radius + offset);
          if (angle === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
        context.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
        context.lineWidth = 1;
        context.stroke();
      });

      const glow = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        baseRadius * 2.3,
      );
      glow.addColorStop(0, "rgba(0, 71, 255, 0.12)");
      glow.addColorStop(0.45, "rgba(0, 240, 255, 0.04)");
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(
        centerX - baseRadius * 2.3,
        centerY - baseRadius * 2.3,
        baseRadius * 4.6,
        baseRadius * 4.6,
      );

      const waveY = height - Math.max(80, height * 0.1);
      context.beginPath();
      for (let x = -20; x <= width + 20; x += 8) {
        const y =
          waveY +
          Math.sin(x * 0.007 + time * 1.2) * 18 +
          Math.cos(x * 0.003 + time * 0.5) * 8;
        if (x === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = "rgba(0, 71, 255, 0.2)";
      context.lineWidth = 2;
      context.stroke();
    };

    const animate = () => {
      time += 0.015;
      draw();
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    if (!reducedMotion && isVisible && pageVisible) animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, [isVisible, pageVisible, reducedMotion]);

  return (
    <section id="home" ref={sectionRef} className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="container-custom hero-content">
        <p className="availability-pill">
          <span aria-hidden="true" />
          {personal.availability}
        </p>
        <p className="hero-kicker">Full-stack engineering · AI-enhanced products</p>
        <h1>{personal.name}</h1>
        <p className="hero-role">
          I build as a <strong>{personal.title}</strong>
        </p>
        <p className="hero-summary">{footer.brandDescription}</p>
        <div className="hero-actions">
          <a className="button button--primary" href="#contact">
            Start a conversation
          </a>
          <a className="button button--secondary" href="#projects">
            View selected work
          </a>
          <a className="button button--text" href={personal.resumeUrl} download>
            Download résumé <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-socials" aria-label="Social links">
          <a
            href={personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href={personal.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${personal.email}`}>Email</a>
        </div>
      </div>
      <a className="hero-scroll" href="#about" aria-label="Continue to About">
        <span>Scroll</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
};

export default Hero;
