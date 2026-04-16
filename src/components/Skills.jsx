// src/components/Skills.jsx
import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/PortfolioData";

const Skills = () => {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [animatedSkills, setAnimatedSkills] = useState({});
  const canvasRef = useRef(null);

  // Background animation - subtle floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    const particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      const count = 25;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          radius: 1 + Math.random() * 2,
        });
      }
    };

    const drawBackground = () => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.04)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.08)";
        ctx.fill();
      });
    };

    const animate = () => {
      drawBackground();
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

  useEffect(() => {
    const newAnimated = {};
    currentSkills.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedSkills((prev) => ({ ...prev, [index]: true }));
      }, index * 40);
    });
  }, [activeCategory]);

  const categories = [
    {
      id: "frontend",
      name: "Frontend",
      color: "#00F0FF",
      bg: "rgba(0, 240, 255, 0.1)",
    },
    {
      id: "backend",
      name: "Backend",
      color: "#0047FF",
      bg: "rgba(0, 71, 255, 0.1)",
    },
    {
      id: "databases",
      name: "Databases",
      color: "#A3FF00",
      bg: "rgba(163, 255, 0, 0.1)",
    },
    {
      id: "tools",
      name: "Tools",
      color: "#FF5E00",
      bg: "rgba(255, 94, 0, 0.1)",
    },
    {
      id: "softSkills",
      name: "Soft Skills",
      color: "#FF0055",
      bg: "rgba(255, 0, 85, 0.1)",
    },
  ];

  const getCategorySkills = () => {
    switch (activeCategory) {
      case "frontend":
        return skills.frontend || [];
      case "backend":
        return skills.backend || [];
      case "databases":
        return skills.databases || [];
      case "tools":
        return (skills.tools || []).map((tool) => ({
          name: tool,
          level: 80 + Math.floor(Math.random() * 15),
        }));
      case "softSkills":
        return (skills.softSkills || []).map((skill) => ({
          name: skill,
          level: 85 + Math.floor(Math.random() * 10),
        }));
      default:
        return [];
    }
  };

  const currentSkills = getCategorySkills();
  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />

      {/* Glowing orbs background */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#00F0FF]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <span className="text-[#00F0FF] text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 block">
            Technical Expertise
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-[#0047FF] bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#00F0FF]"></div>
            <p className="text-[#A1A1A1] text-sm sm:text-base max-w-xl">
              Tools and technologies I use to bring ideas to life
            </p>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#00F0FF]"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="group relative px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300"
              style={{
                backgroundColor: activeCategory === cat.id ? cat.bg : "#0A0A0A",
                color: activeCategory === cat.id ? cat.color : "#6B6B6B",
                border:
                  activeCategory === cat.id
                    ? `1px solid ${cat.color}40`
                    : "1px solid #1A1A1A",
                boxShadow:
                  activeCategory === cat.id
                    ? `0 0 20px ${cat.color}15`
                    : "none",
              }}
            >
              <span className="relative z-10">{cat.name}</span>

              {activeCategory === cat.id && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className="max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {currentSkills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-[#0A0A0A] rounded-2xl p-5 border border-[#1A1A1A] hover:border-[#2A2A2A] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${activeCategoryData?.color}08, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white text-base">
                      {skill.name}
                    </h4>
                    {skill.level && (
                      <span
                        className="text-sm font-semibold px-2.5 py-1 rounded-lg"
                        style={{
                          backgroundColor: `${activeCategoryData?.color}15`,
                          color: activeCategoryData?.color,
                        }}
                      >
                        {skill.level}%
                      </span>
                    )}
                  </div>

                  {skill.level && (
                    <div className="relative">
                      <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: animatedSkills[index]
                              ? `${skill.level}%`
                              : "0%",
                            background: `linear-gradient(90deg, ${activeCategoryData?.color}, ${activeCategoryData?.color}80)`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {currentSkills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#A1A1A1]">
              No skills added in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
