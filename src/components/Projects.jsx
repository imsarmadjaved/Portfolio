// src/components/Projects.jsx
import React, { useState } from "react";
import { portfolioData } from "../data/PortfolioData";

const Projects = () => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState("all");
  const [imageErrors, setImageErrors] = useState({});

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) =>
          filter === "featured"
            ? project.featured
            : project.technologies.includes(filter),
        );

  const technologies = [
    "all",
    "featured",
    ...new Set(projects.flatMap((p) => p.technologies)),
  ];

  // Get unique technologies for filter (limit to 5 for cleaner UI)
  const filterTechnologies = technologies.slice(0, 7);

  // Handle image error
  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 lg:py-20 bg-[var(--bg-secondary)] relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration - responsive sizing */}
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-[var(--accent-primary)]/10 rounded-full blur-2xl lg:blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl lg:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute top-1/2 left-1/3 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[var(--accent-primary)]/5 rounded-full blur-2xl lg:blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto">
        {/* Section Header - responsive spacing and text */}
        <div
          className="text-center mb-10 sm:mb-14 lg:mb-16 px-4"
          data-aos="fade-down"
        >
          <span className="text-[var(--accent-primary)] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3 block">
            My Work
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 relative inline-block">
            Featured Projects
            <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"></div>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            A collection of projects I've built, each with its own story and
            purpose
          </p>
        </div>

        {/* Filter Tabs - responsive */}
        <div
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 lg:mb-12 px-2"
          data-aos="fade-up"
        >
          {filterTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                filter === tech
                  ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-lg shadow-[var(--accent-primary)]/30"
                  : "backdrop-blur-md bg-[var(--bg-tertiary)]/70 text-[var(--text-secondary)] hover:bg-[var(--accent-primary)]/20 hover:text-[var(--accent-primary)] border border-[var(--neutral-200)]/10"
              }`}
            >
              {tech === "all" ? "All" : tech === "featured" ? "Featured" : tech}
            </button>
          ))}
        </div>

        {/* Projects Grid - responsive */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 px-2 sm:px-0"
          data-aos="fade-up"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group backdrop-blur-md bg-[var(--bg-primary)]/70 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              {/* Project Image */}
              <div className="relative h-36 sm:h-40 lg:h-48 overflow-hidden bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20">
                {!imageErrors[project.id] && project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(project.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-light text-[var(--accent-primary)]/30 group-hover:text-[var(--accent-primary)]/50 transition-all duration-500">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 z-20">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-[10px] sm:text-xs font-medium rounded-full shadow-lg backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content - responsive padding */}
              <div className="p-4 sm:p-5 lg:p-6 relative z-10 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-1.5 sm:mb-2 group-hover:text-[var(--accent-primary)] transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
                  {project.description}
                </p>

                {/* Technologies - responsive */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] text-[10px] sm:text-xs rounded-md border border-[var(--neutral-200)]/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] text-[10px] sm:text-xs rounded-md border border-[var(--neutral-200)]/10">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links - responsive */}
                <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-[var(--neutral-200)]/20">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 p-1"
                    aria-label="GitHub Repository"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
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
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-300 p-1"
                    aria-label="Live Demo"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span className="flex-1 text-right text-[10px] sm:text-xs text-[var(--text-tertiary)] truncate ml-1">
                    {project.technologies[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - when no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-8 sm:py-12 lg:py-16">
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              No projects found matching this filter.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] transition-colors duration-300"
            >
              View All Projects
            </button>
          </div>
        )}

        {/* View More Button - responsive */}
        {filteredProjects.length > 0 && (
          <div
            className="text-center mt-8 sm:mt-10 lg:mt-12"
            data-aos="fade-up"
          >
            <a
              href="https://github.com/imsarmadjaved"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 backdrop-blur-md bg-[var(--bg-tertiary)]/70 text-[var(--text-primary)] text-sm sm:text-base rounded-full font-medium hover:bg-gradient-to-r hover:from-[var(--accent-primary)] hover:to-[var(--accent-secondary)] hover:text-white transition-all duration-300 group border border-[var(--neutral-200)]/10"
            >
              <span>View All on GitHub</span>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
