// src/components/Skills.jsx
import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/PortfolioData";

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
      className="py-12 sm:py-16 lg:py-20 bg-[var(--bg-primary)] relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background decorative elements - responsive sizing */}
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-[var(--accent-primary)]/10 rounded-full blur-2xl lg:blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl lg:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[var(--accent-primary)]/5 rounded-full blur-2xl lg:blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto">
        {/* Header - responsive spacing and text */}
        <div
          className="text-center mb-10 sm:mb-14 lg:mb-16 px-4"
          data-aos="fade-down"
        >
          <span className="text-[var(--accent-primary)] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3 block">
            What I Bring
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 relative inline-block">
            Skills & Expertise
            <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"></div>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            Technologies and tools I've mastered to build exceptional digital
            experiences
          </p>
        </div>

        {/* Category Tabs - responsive layout */}
        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 px-2"
          data-aos="fade-up"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap ${
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

        {/* Skills Grid - responsive layout */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4" data-aos="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {currentSkills.map((skill, index) => (
              <div
                key={index}
                className="group backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300 break-words pr-2">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span className="text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 rounded-md text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 whitespace-nowrap">
                        {skill.level}%
                      </span>
                    )}
                  </div>
                  {skill.level && (
                    <div className="relative w-full h-2 sm:h-2.5 bg-[var(--neutral-200)]/30 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible[index] ? `${skill.level}%` : "0%",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Label - responsive */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md bg-[var(--bg-tertiary)]/70 rounded-full border border-[var(--neutral-200)]/20">
            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {categories.find((c) => c.id === activeCategory)?.name}
            </span>
            <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[var(--accent-primary)] rounded-full"></span>
            <span className="text-xs sm:text-sm font-medium text-[var(--accent-primary)]">
              {currentSkills.length} skills
            </span>
          </div>
        </div>

        {/* Empty state - if no skills in category */}
        {currentSkills.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              No skills available in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
