import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/PortfolioData";
import useReducedMotion from "../hooks/useReducedMotion";
import {
  getVariants,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../motion/variants";
import SectionHeading from "./ui/SectionHeading";

const filters = [
  { id: "all", label: "All work" },
  { id: "featured", label: "Featured" },
  { id: "React.js", label: "React" },
  { id: "Node.js", label: "Node.js" },
  { id: "Next.js", label: "Next.js" },
];

const Projects = () => {
  const { projects, personal } = portfolioData;
  const reducedMotion = useReducedMotion();
  const container = getVariants(staggerContainer(0.075, 0.04), reducedMotion);
  const item = getVariants(staggerItem, reducedMotion);
  const [filter, setFilter] = useState("all");
  const [imageErrors, setImageErrors] = useState({});
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    return project.technologies.includes(filter);
  });

  return (
    <section id="projects" className="portfolio-section projects-section">
      <div className="section-orb section-orb--left" aria-hidden="true" />
      <div className="container-custom">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects built with purpose"
          description="Products that combine practical engineering, thoughtful interfaces, and real-world problem solving."
        />

        <motion.div
          className="filter-tabs"
          role="group"
          aria-label="Filter projects"
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {filters.map((itemFilter) => (
            <button
              key={itemFilter.id}
              type="button"
              className={filter === itemFilter.id ? "is-active" : ""}
              aria-pressed={filter === itemFilter.id}
              onClick={() => setFilter(itemFilter.id)}
            >
              {itemFilter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          key={filter}
          aria-live="polite"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => {
            const hasImage = project.image && !imageErrors[project.id];
            return (
              <motion.article
                key={project.id}
                className="project-card"
                variants={item}
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__media"
                  aria-label={`Open ${project.title} live demo`}
                >
                  {hasImage ? (
                    <img
                      src={project.image}
                      alt={`${project.title} project identity`}
                      loading="lazy"
                      onError={() =>
                        setImageErrors((errors) => ({
                          ...errors,
                          [project.id]: true,
                        }))
                      }
                    />
                  ) : (
                    <div className="project-card__fallback" aria-hidden="true">
                      <span>{String(project.id).padStart(2, "0")}</span>
                      <strong>{project.title.charAt(0)}</strong>
                    </div>
                  )}
                  {project.featured && (
                    <span className="project-card__featured">Featured</span>
                  )}
                </a>

                <div className="project-card__body">
                  <div>
                    <span className="project-card__number">
                      Project {String(project.id).padStart(2, "0")}
                    </span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.description}</p>
                  <ul className="project-card__tech" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <div className="project-card__links">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      Source
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                    >
                      Live demo <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <p>No projects match this filter.</p>
            <button type="button" onClick={() => setFilter("all")}>
              View all work
            </button>
          </div>
        )}

        <motion.div
          className="section-cta"
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <a
            href={personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore all repositories <span aria-hidden="true">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
