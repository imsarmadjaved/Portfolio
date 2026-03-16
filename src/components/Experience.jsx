// src/components/Experience.jsx
import React from "react";
import { portfolioData } from "../data/PortfolioData";

const Experience = () => {
  const { experience, education } = portfolioData;

  return (
    <section
      id="experience"
      className="py-12 sm:py-16 lg:py-20 bg-[var(--bg-primary)] relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration - responsive sizing */}
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[var(--accent-primary)]/10 rounded-full blur-2xl lg:blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl lg:blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 lg:w-[500px] h-64 sm:h-96 lg:h-[500px] bg-[var(--accent-primary)]/5 rounded-full blur-2xl lg:blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto">
        {/* Section Header - responsive spacing and text */}
        <div
          className="text-center mb-10 sm:mb-14 lg:mb-16 px-4"
          data-aos="fade-down"
        >
          <span className="text-[var(--accent-primary)] text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 sm:mb-3 block">
            My Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 relative inline-block">
            Experience & Education
            <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"></div>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
            My professional journey and academic background
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Experience Column */}
          <div data-aos="fade-right">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
                <div className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-[var(--accent-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                  Work Experience
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="group backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                    data-aos="fade-up"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300 break-words pr-2">
                            {exp.position}
                          </h4>
                          <p className="text-sm sm:text-base text-[var(--accent-primary)] font-medium mt-0.5 sm:mt-1 break-words">
                            {exp.company}
                          </p>
                        </div>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] text-xs sm:text-sm rounded-full border border-[var(--neutral-200)]/10 whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--text-tertiary)] mb-3 sm:mb-4">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="break-words">{exp.location}</span>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--text-secondary)] mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-1.5 sm:space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--text-secondary)]"
                          >
                            <span className="text-[var(--accent-primary)] text-base sm:text-lg leading-none flex-shrink-0">
                              •
                            </span>
                            <span className="break-words">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Column */}
          <div data-aos="fade-left">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-2">
                <div className="w-8 h-8 sm:w-10 lg:w-12 sm:h-10 lg:h-12 rounded-full bg-gradient-to-br from-[var(--accent-secondary)]/20 to-[var(--accent-primary)]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 text-[var(--accent-secondary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                  Education
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="group backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg border border-[var(--neutral-200)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                    data-aos="fade-up"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300 break-words pr-2">
                            {edu.degree}
                          </h4>
                          <p className="text-sm sm:text-base text-[var(--accent-secondary)] font-medium mt-0.5 sm:mt-1 break-words">
                            {edu.institution}
                          </p>
                        </div>
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] text-xs sm:text-sm rounded-full border border-[var(--neutral-200)]/10 whitespace-nowrap">
                          {edu.duration}
                        </span>
                      </div>

                      {/* Location & Grade */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[var(--text-tertiary)] mb-3 sm:mb-4">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="break-words">{edu.location}</span>
                        </div>
                        {edu.grade && (
                          <>
                            <span className="hidden sm:inline w-1 h-1 bg-[var(--text-tertiary)] rounded-full"></span>
                            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                              <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                              <span className="text-[var(--accent-primary)] break-words">
                                {edu.grade}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Courses */}
                      {edu.courses && (
                        <div className="mt-3 sm:mt-4">
                          <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] mb-1.5 sm:mb-2">
                            Relevant Courses:
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {edu.courses.map((course, idx) => (
                              <span
                                key={idx}
                                className="px-2 sm:px-3 py-0.5 sm:py-1 backdrop-blur-sm bg-[var(--bg-tertiary)]/50 text-[var(--text-secondary)] text-[10px] sm:text-xs rounded-full border border-[var(--neutral-200)]/10 break-words"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
