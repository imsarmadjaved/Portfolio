import { useState } from "react";
import { portfolioData } from "../data/PortfolioData";
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

        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter projects"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "is-active" : ""}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="projects-grid" key={filter} aria-live="polite">
          {filteredProjects.map((project, index) => {
            const hasImage = project.image && !imageErrors[project.id];
            return (
              <article
                key={project.id}
                className="project-card"
                style={{ "--item-index": index }}
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
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <p>No projects match this filter.</p>
            <button type="button" onClick={() => setFilter("all")}>
              View all work
            </button>
          </div>
        )}

        <div className="section-cta" data-aos="fade-up">
          <a
            href={personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore all repositories <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
