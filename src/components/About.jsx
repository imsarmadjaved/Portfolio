// src/components/About.jsx
import React from "react";
import { portfolioData } from "../data/PortfolioData";

const About = () => {
  const { about, personal, education } = portfolioData;

  // Encode the filename to handle spaces
  const encodedResumeUrl = encodeURI(personal.resumeUrl);

  return (
    <section
      id="about"
      className="section bg-[var(--bg-secondary)] relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration - responsive sizing */}
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[var(--accent-primary)]/10 rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl sm:blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto">
        {/* Section Header - responsive spacing */}
        <div
          className="text-center mb-8 sm:mb-10 lg:mb-12 px-4"
          data-aos="fade-down"
        >
          <span className="text-[var(--accent-primary)] text-xs sm:text-sm font-medium uppercase tracking-wider mb-1 sm:mb-2 block">
            Get to know me
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Who I Am Card */}
            <div
              className="backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-[var(--neutral-200)]/30 hover:border-[var(--accent-primary)]/30 transition-all duration-300"
              data-aos="fade-right"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[var(--text-primary)]">
                Who I Am
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {about.summary}
              </p>

              {/* Quick Info Grid - responsive layout */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--neutral-200)]/30">
                <div>
                  <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)] block mb-0.5 sm:mb-1">
                    Name
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)] break-words">
                    {personal.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)] block mb-0.5 sm:mb-1">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                    {personal.location}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)] block mb-0.5 sm:mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-xs sm:text-sm font-medium text-[var(--accent-primary)] hover:underline break-words"
                  >
                    {personal.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-[var(--text-tertiary)] block mb-0.5 sm:mb-1">
                    Status
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                    {personal.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {about.highlights.map((highlight, index) => (
                <div key={index} data-aos="fade-up">
                  <div className="backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-lg border border-[var(--neutral-200)]/30 hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[var(--accent-primary)]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm text-[var(--accent-primary)] font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium break-words">
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1" data-aos="fade-left">
            {/* Education Card */}
            <div className="lg:sticky lg:top-24 backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-[var(--neutral-200)]/30 hover:border-[var(--accent-primary)]/30 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[var(--text-primary)] flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-primary)]"
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
                Education
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                  <div key={index} data-aos="fade-up">
                    <div className="relative pl-3 sm:pl-4 border-l-2 border-[var(--accent-primary)]/30 last:pb-0">
                      <div className="absolute left-[-5px] top-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-primary)]"></div>
                      <div className="mb-1">
                        <h4 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base break-words pr-2">
                          {edu.degree}
                        </h4>
                        <p className="text-[var(--accent-primary)] text-xs sm:text-sm font-medium break-words">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[var(--text-tertiary)] mb-1 sm:mb-2">
                        <span>{edu.duration}</span>
                        {edu.grade && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-[var(--accent-primary)] w-full sm:w-auto">
                              {edu.grade}
                            </span>
                          </>
                        )}
                      </div>
                      {edu.courses && (
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
                          {edu.courses.slice(0, 2).map((course, idx) => (
                            <span
                              key={idx}
                              className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-[var(--bg-tertiary)]/50 backdrop-blur-sm text-[var(--text-secondary)] rounded-full truncate max-w-[120px] sm:max-w-none"
                              title={course}
                            >
                              {course.length > 15
                                ? `${course.substring(0, 15)}...`
                                : course}
                            </span>
                          ))}
                          {edu.courses.length > 2 && (
                            <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-[var(--bg-tertiary)]/50 backdrop-blur-sm text-[var(--text-secondary)] rounded-full">
                              +{edu.courses.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Resume Button */}
              <div
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--neutral-200)]/30"
                data-aos="fade-up"
              >
                <a
                  href={encodedResumeUrl}
                  download="Muhammad_Sarmad_Javed_Resume.pdf"
                  className="group w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                >
                  {/* Hover effect overlay */}
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

                  {/* Icon with animation */}
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>

                  {/* Text with animation */}
                  <span className="relative">Download Resume</span>

                  {/* Optional: Download count badge - you can add dynamic count if needed */}
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    PDF
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
