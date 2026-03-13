import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/PortfolioData";
import AnimationWrapper from "./AnimationWrapper";

const Skills = () => {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const newVisibility = {};
      currentSkills.forEach((_, index) => {
        newVisibility[index] = true;
      });
      setIsVisible(newVisibility);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const categories = [
    { id: "frontend", name: "Frontend Development" },
    { id: "backend", name: "Backend Development" },
    { id: "databases", name: "Databases" },
    { id: "tools", name: "Tools & Platforms" },
    { id: "softSkills", name: "Soft Skills" },
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
        return (skills.tools || []).map((tool) => ({ name: tool }));
      case "softSkills":
        return (skills.softSkills || []).map((skill) => ({ name: skill }));
      default:
        return [];
    }
  };

  const currentSkills = getCategorySkills();

  return (
    <section
      id="skills"
      className="py-20 bg-[var(--bg-primary)] relative overflow-hidden"
    >
      {/* Background decorative elements - enhanced for glass effect */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--accent-primary)]/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 left-20 w-72 h-72 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--accent-primary)]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Header with animation */}
        <AnimationWrapper direction="down">
          <div className="text-center mb-16">
            <span className="text-[var(--accent-primary)] text-sm font-medium uppercase tracking-wider mb-3 block">
              What I Bring
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 relative inline-block">
              Skills & Expertise
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"></div>
            </h2>
            <p className="text-[var(--text-secondary)] mt-6 max-w-2xl mx-auto">
              Technologies and tools I've mastered to build exceptional digital
              experiences
            </p>
          </div>
        </AnimationWrapper>

        {/* Category Tabs - glassy style */}
        <AnimationWrapper direction="up" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "text-white shadow-lg shadow-[var(--accent-primary)]/30"
                    : "backdrop-blur-md bg-[var(--bg-tertiary)]/70 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--accent-primary)] border border-[var(--neutral-200)]/20"
                }`}
                style={{
                  background:
                    activeCategory === cat.id
                      ? "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
                      : "",
                }}
              >
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>
        </AnimationWrapper>

        {/* Skills Grid - Glassy cards */}
        <AnimationWrapper direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentSkills.map((skill, index) => (
                <div className="group backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-xl p-5 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Subtle gradient background on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="text-sm font-medium px-2 py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 rounded-md text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                          {skill.level}%
                        </span>
                      )}
                    </div>
                    {skill.level && (
                      <div className="relative w-full h-2.5 bg-[var(--neutral-200)]/30 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible[index] ? `${skill.level}%` : "0%",
                          }}
                        ></div>
                        {/* Shimmer effect */}
                        <div className="absolute top-0 left-0 w-20 h-full bg-white/10 transform -skew-x-30 animate-shimmer"></div>
                      </div>
                    )}
                  </div>

                  {/* Decorative corner accent - more subtle */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-10 transform rotate-12 translate-x-6 -translate-y-6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimationWrapper>

        {/* Category Label with glassy style */}
        <AnimationWrapper direction="up" delay={0.4}>
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-md bg-[var(--bg-tertiary)]/70 rounded-full border border-[var(--neutral-200)]/20">
              <span className="text-sm text-[var(--text-secondary)]">
                {categories.find((c) => c.id === activeCategory)?.name}
              </span>
              <span className="w-1 h-1 bg-[var(--accent-primary)] rounded-full"></span>
              <span className="text-sm font-medium text-[var(--accent-primary)]">
                {currentSkills.length} skills
              </span>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </section>
  );
};

export default Skills;
