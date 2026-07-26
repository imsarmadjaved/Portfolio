import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "../data/PortfolioData";
import useReducedMotion from "../hooks/useReducedMotion";
import {
  getVariants,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";
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
    typeof skill === "string" ? { name: skill, level: 70 } : skill,
  );

/** Progress fill observes the track — not itself — so scaleX:0 never blocks IntersectionObserver. */
const SkillProgress = ({ name, level, reducedMotion, delay = 0 }) => {
  const trackRef = useRef(null);
  const inView = useInView(trackRef, {
    once: true,
    amount: 0.4,
    margin: "0px 0px -8% 0px",
  });
  const progress = Math.max(0, Math.min(100, level)) / 100;
  const showFill = reducedMotion || inView;

  return (
    <div
      ref={trackRef}
      className="skill-card__track"
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${name} proficiency`}
    >
      <motion.span
        className="skill-card__fill"
        initial={false}
        animate={{ scaleX: showFill ? progress : 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 0.9,
                delay,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      />
    </div>
  );
};

const Skills = () => {
  const { skills } = portfolioData;
  const reducedMotion = useReducedMotion();
  const container = getVariants(staggerContainer(0.07, 0.04), reducedMotion);
  const item = getVariants(staggerItem, reducedMotion);
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

        <motion.div
          className="filter-tabs"
          role="tablist"
          aria-label="Skill categories"
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
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
        </motion.div>

        <motion.div
          id="skills-panel"
          className="skills-grid"
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeCategory}`}
          key={activeCategory}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {currentSkills.map((skill, index) => {
            const level = Math.max(0, Math.min(100, skill.level ?? 70));
            return (
              <motion.article
                key={skill.name}
                className="skill-card"
                variants={item}
              >
                <span className="skill-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="skill-card__main">
                  <h3>{skill.name}</h3>
                  <SkillProgress
                    key={`${activeCategory}-${skill.name}`}
                    name={skill.name}
                    level={level}
                    reducedMotion={reducedMotion}
                    delay={Math.min(index * 0.05, 0.25)}
                  />
                </div>
                <span className="skill-card__status">{level}%</span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
