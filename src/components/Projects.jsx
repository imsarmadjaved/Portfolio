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

  const filterTechnologies = technologies.slice(0, 7);

  const handleImageError = (projectId) => {
    setImageErrors((prev) => ({ ...prev, [projectId]: true }));
  };

  // Category colors for filter tabs
  const getFilterColor = (tech) => {
    if (tech === "all") return "#00F0FF";
    if (tech === "featured") return "#A3FF00";
    if (tech === "React") return "#00F0FF";
    if (tech === "Node.js") return "#A3FF00";
    if (tech === "MongoDB") return "#0047FF";
    return "#FF5E00";
  };

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#0047FF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#A3FF00]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Matching About/Skills style */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <span className="text-[#00F0FF] text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 block">
            My Work
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-[#0047FF] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#00F0FF]"></div>
            <p className="text-[#A1A1A1] text-sm sm:text-base max-w-xl">
              A collection of projects I've built, each with its own story
            </p>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#00F0FF]"></div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {filterTechnologies.map((tech) => {
            const color = getFilterColor(tech);
            return (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className="relative px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: filter === tech ? `${color}15` : "#0A0A0A",
                  color: filter === tech ? color : "#6B6B6B",
                  border:
                    filter === tech
                      ? `1px solid ${color}40`
                      : "1px solid #1A1A1A",
                  boxShadow: filter === tech ? `0 0 15px ${color}15` : "none",
                }}
              >
                <span className="relative z-10">
                  {tech === "all"
                    ? "All"
                    : tech === "featured"
                      ? "★ Featured"
                      : tech}
                </span>

                {filter === tech && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-[#0A0A0A] rounded-2xl overflow-hidden border border-[#1A1A1A] hover:border-[#2A2A2A] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Project Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-[#0047FF]/10 to-[#00F0FF]/10">
                {!imageErrors[project.id] && project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(project.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-light text-[#00F0FF]/20 group-hover:text-[#00F0FF]/40 transition-all duration-500">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-3 py-1 bg-gradient-to-r from-[#A3FF00]/20 to-[#00F0FF]/20 backdrop-blur-sm text-[#A3FF00] text-xs font-medium rounded-full border border-[#A3FF00]/40">
                      ★ Featured
                    </span>
                  </div>
                )}

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 relative z-10 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-[#00F0FF] transition-colors duration-300 line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-[#A1A1A1] text-sm mb-4 line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#0F0F0F] text-[#A1A1A1] text-xs rounded-md border border-[#1A1A1A]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-[#0F0F0F] text-[#A1A1A1] text-xs rounded-md border border-[#1A1A1A]">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#1A1A1A]">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B6B6B] hover:text-[#A3FF00] transition-colors duration-300"
                    aria-label="GitHub Repository"
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
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B6B6B] hover:text-[#00F0FF] transition-colors duration-300"
                    aria-label="Live Demo"
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span className="flex-1 text-right text-xs text-[#6B6B6B]">
                    {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#A1A1A1] mb-4">
              No projects found matching this filter.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="px-6 py-2.5 bg-[#0047FF] text-white rounded-full text-sm font-medium hover:bg-[#0056FF] transition-all duration-300"
            >
              View All Projects
            </button>
          </div>
        )}

        {/* GitHub Button */}
        {filteredProjects.length > 0 && (
          <div
            className="text-center mt-12 sm:mt-14"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <a
              href="https://github.com/imsarmadjaved"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#0A0A0A] text-white text-sm sm:text-base rounded-full font-medium border border-[#1A1A1A] hover:border-[#A3FF00] hover:text-[#A3FF00] transition-all duration-300 group"
            >
              <span>View All on GitHub</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
