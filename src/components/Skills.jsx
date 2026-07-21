import { useMemo, useRef, useState } from "react";
import { portfolioData } from "../data/PortfolioData";
import SectionHeading from "./ui/SectionHeading";

const categories = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "databases", name: "Databases" },
  { id: "tools", name: "Tools & AI" },
  { id: "softSkills", name: "Collaboration" },
];

const normalizeSkills = (skills, category) =>
  (skills[category] || []).map((skill) =>
    typeof skill === "string" ? { name: skill } : skill,
  );

const Skills = () => {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState("frontend");
  const tabsRef = useRef([]);
  const currentSkills = useMemo(
    () => normalizeSkills(skills, activeCategory),
    [skills, activeCategory],
  );

  const handleTabKeyDown = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % categories.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + categories.length) % categories.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = categories.length - 1;
    setActiveCategory(categories[nextIndex].id);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section id="skills" className="portfolio-section skills-section">
      <div className="section-orb section-orb--right" aria-hidden="true" />
      <div className="container-custom">
        <SectionHeading
          eyebrow="Technical expertise"
          title="Skills & Technologies"
          description="A practical toolkit for building complete, reliable web products."
        />

        <div
          className="filter-tabs"
          role="tablist"
          aria-label="Skill categories"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          {categories.map((category, index) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                ref={(element) => {
                  tabsRef.current[index] = element;
                }}
                id={`skills-tab-${category.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="skills-panel"
                tabIndex={isActive ? 0 : -1}
                className={isActive ? "is-active" : ""}
                onClick={() => setActiveCategory(category.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div
          id="skills-panel"
          className="skills-grid"
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeCategory}`}
          key={activeCategory}
        >
          {currentSkills.map((skill, index) => (
            <article
              key={skill.name}
              className="skill-card"
              style={{ "--item-index": index }}
            >
              <span className="skill-card__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{skill.name}</h3>
              <span className="skill-card__status">Applied in practice</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
