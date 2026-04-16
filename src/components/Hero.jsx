// src/components/Hero.jsx
import React, { useEffect, useRef } from "react";
import { portfolioData } from "../data/PortfolioData";

const Hero = () => {
  const { personal, footer } = portfolioData;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    let nodes = [];
    let dots = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      initDots();
    };

    const initDots = () => {
      const dotCount = 15;
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          waveOffset: Math.random() * 100,
          speed: 0.5 + Math.random() * 0.8,
          size: 2 + Math.random() * 3,
        });
      }
    };

    const drawAIOrb = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 120;

      time += 0.015;

      // Outer wavy rings that pass through each other
      const rings = [
        {
          radius: baseRadius + 30,
          speed: 1.2,
          waveCount: 5,
          opacity: 0.12,
          offset: 0,
        },
        {
          radius: baseRadius + 40,
          speed: -0.8,
          waveCount: 7,
          opacity: 0.08,
          offset: 2,
        },
        {
          radius: baseRadius + 50,
          speed: 1.5,
          waveCount: 4,
          opacity: 0.06,
          offset: 4,
        },
        {
          radius: baseRadius + 60,
          speed: -1.0,
          waveCount: 6,
          opacity: 0.04,
          offset: 1,
        },
        {
          radius: baseRadius + 70,
          speed: 2.0,
          waveCount: 7,
          opacity: 0.06,
          offset: 3,
        },
        {
          radius: baseRadius + 80,
          speed: 2.5,
          waveCount: 8,
          opacity: 0.07,
          offset: 6,
        },
      ];

      rings.forEach((ring) => {
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 2; angle += 0.03) {
          const waveOffset =
            Math.sin(angle * ring.waveCount + time * ring.speed + ring.offset) *
            12;
          const r = ring.radius + waveOffset;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;

          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${ring.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
    };

    const drawNodes = () => {
      nodes.forEach((node) => {
        node.x += node.speedX;
        node.y += node.speedY;

        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > canvas.height * 0.6) node.speedY *= -1;

        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 4,
        );
        gradient.addColorStop(0, "rgba(0, 240, 255, 0.15)");
        gradient.addColorStop(0.5, "rgba(0, 71, 255, 0.05)");
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();

        nodes.forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130 && distance > 0) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 * (1 - distance / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const drawWaves = () => {
      time += 0.015;

      const waves = [
        {
          amplitude: 35,
          frequency: 0.004,
          speed: 1.2,
          color: "rgba(0, 71, 255, 0.2)",
          thickness: 3,
          yBase: canvas.height - 120,
        },
        {
          amplitude: 28,
          frequency: 0.007,
          speed: 1.8,
          color: "rgba(0, 240, 255, 0.15)",
          thickness: 2.5,
          yBase: canvas.height - 85,
        },
        {
          amplitude: 20,
          frequency: 0.01,
          speed: 2.5,
          color: "rgba(163, 255, 0, 0.1)",
          thickness: 2,
          yBase: canvas.height - 50,
        },
        {
          amplitude: 15,
          frequency: 0.015,
          speed: 3.0,
          color: "rgba(255, 0, 85, 0.06)",
          thickness: 1.5,
          yBase: canvas.height - 25,
        },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();

        for (let x = -50; x < canvas.width + 50; x += 2) {
          const y =
            wave.yBase +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.cos(x * 0.002 + time * 0.5) * 12 +
            Math.sin(x * 0.001 + time * 0.3) * 8;

          if (x === -50) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.thickness;
        ctx.stroke();
      });
    };

    const drawDotsOnWaves = () => {
      const waves = [
        {
          yBase: canvas.height - 120,
          frequency: 0.004,
          speed: 1.2,
          amplitude: 35,
        },
        {
          yBase: canvas.height - 85,
          frequency: 0.007,
          speed: 1.8,
          amplitude: 28,
        },
        {
          yBase: canvas.height - 50,
          frequency: 0.01,
          speed: 2.5,
          amplitude: 20,
        },
      ];

      dots.forEach((dot, i) => {
        dot.x += dot.speed;
        if (dot.x > canvas.width + 50) {
          dot.x = -50;
          dot.waveOffset = Math.random() * 100;
        }

        const waveIndex = i % waves.length;
        const wave = waves[waveIndex];

        const y =
          wave.yBase +
          Math.sin(
            dot.x * wave.frequency + time * wave.speed + dot.waveOffset,
          ) *
            wave.amplitude +
          Math.cos(dot.x * 0.002 + time * 0.5) * 12 +
          Math.sin(dot.x * 0.001 + time * 0.3) * 8;

        const colors = [
          "rgba(0, 71, 255, 0.6)",
          "rgba(0, 240, 255, 0.5)",
          "rgba(163, 255, 0, 0.4)",
        ];

        const gradient = ctx.createRadialGradient(
          dot.x,
          y,
          0,
          dot.x,
          y,
          dot.size * 3,
        );
        gradient.addColorStop(0, colors[waveIndex]);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(dot.x, y, dot.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dot.x, y, dot.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      });
    };

    const drawOrbsOnWaves = () => {
      const orbPositions = [
        {
          progress: 0.2,
          waveIndex: 0,
          size: 60,
          color: "rgba(0, 71, 255, 0.08)",
        },
        {
          progress: 0.5,
          waveIndex: 1,
          size: 45,
          color: "rgba(0, 240, 255, 0.06)",
        },
        {
          progress: 0.8,
          waveIndex: 2,
          size: 50,
          color: "rgba(163, 255, 0, 0.05)",
        },
      ];

      const waves = [
        {
          yBase: canvas.height - 120,
          frequency: 0.004,
          speed: 1.2,
          amplitude: 35,
        },
        {
          yBase: canvas.height - 85,
          frequency: 0.007,
          speed: 1.8,
          amplitude: 28,
        },
        {
          yBase: canvas.height - 50,
          frequency: 0.01,
          speed: 2.5,
          amplitude: 20,
        },
      ];

      orbPositions.forEach((orb) => {
        const wave = waves[orb.waveIndex];
        const x = canvas.width * orb.progress + Math.sin(time * 0.2) * 30;

        const y =
          wave.yBase +
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
          Math.cos(x * 0.002 + time * 0.5) * 12 +
          Math.sin(x * 0.001 + time * 0.3) * 8;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(x, y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    const drawWaterRiver = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawAIOrb();
      drawNodes();
      drawWaves();
      drawOrbsOnWaves();
      drawDotsOnWaves();

      const bottomGradient = ctx.createLinearGradient(
        0,
        canvas.height - 250,
        0,
        canvas.height,
      );
      bottomGradient.addColorStop(0, "transparent");
      bottomGradient.addColorStop(1, "rgba(0, 71, 255, 0.08)");
      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, canvas.height - 250, canvas.width, 250);
    };

    const animate = () => {
      drawWaterRiver();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/90 pointer-events-none" />

      <div className="relative z-10 container-custom w-full pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full
              bg-[#0A0A0A]/80 backdrop-blur-sm
              border border-[#2A2A2A]
              text-[#A1A1A1]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
              Available for opportunities
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight relative">
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-[#0047FF] bg-clip-text text-transparent relative z-10">
              {personal.name}
            </span>
          </h1>

          <div className="mb-4 relative">
            <h2 className="text-lg sm:text-xl md:text-2xl relative z-10">
              <span className="text-[#ffffff]">I'm a </span>
              <span className="text-[#00aeff] font-medium">
                {personal.title}
              </span>
            </h2>
          </div>

          <div className="mb-8 relative">
            <p className="text-sm sm:text-base md:text-lg text-[#A1A1A1] max-w-xl mx-auto leading-relaxed px-4 relative z-10">
              {footer.brandDescription}
            </p>
          </div>

          <div className="mb-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-full
                  bg-[#0047FF] text-white
                  hover:bg-[#0056FF] hover:scale-105
                  transition-all duration-300"
              >
                Get In Touch
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-full
                  bg-transparent text-white
                  border border-[#333333]
                  hover:border-[#A3FF00] hover:text-[#A3FF00] hover:scale-105
                  transition-all duration-300"
              >
                View Projects
              </button>

              <a
                href={personal.resumeUrl}
                download
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-full
                  bg-transparent text-white
                  border border-[#333333]
                  hover:border-[#FF0055] hover:text-[#FF0055] hover:scale-105
                  transition-all duration-300"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 relative z-10">
            {personal.socialLinks?.github && (
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-[#6B6B6B] hover:text-[#A3FF00] hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
            {personal.socialLinks?.linkedin && (
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-[#6B6B6B] hover:text-[#00F0FF] hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            <a
              href={`mailto:${personal.email}`}
              className="p-2 rounded-full text-[#6B6B6B] hover:text-[#FF5E00] hover:scale-110 transition-all duration-300"
              aria-label="Email"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
          text-[#6B6B6B] hover:text-white z-10
          transition-colors duration-300"
        aria-label="Scroll down"
      >
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 14l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
