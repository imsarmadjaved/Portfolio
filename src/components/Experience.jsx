// src/components/Experience.jsx
import React from "react";
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

const Experience = () => {
  const { experience, education } = portfolioData;
  const reducedMotion = useReducedMotion();
  const container = getVariants(staggerContainer(0.08, 0.04), reducedMotion);
  const item = getVariants(staggerItem, reducedMotion);

  return (
    <section id="experience" className="portfolio-section experience-section">
      <div className="section-orb section-orb--right" aria-hidden="true" />
      <div className="section-orb section-orb--left" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="My journey"
          title="Experience & Education"
          description="Hands-on product work supported by a strong computer science foundation."
        />

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6 sm:mb-8"
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg accent-soft flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
            </motion.div>

            <motion.div
              className="space-y-4 sm:space-y-5"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="group relative surface-panel rounded-2xl p-5 sm:p-6 border-hover-accent transition-all duration-500"
                  variants={item}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[rgba(var(--accent-rgb),0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                          {exp.position}
                        </h4>
                        <p className="text-accent-token text-sm font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="px-3 py-1 surface-elevated text-[var(--text-secondary)] text-xs rounded-full border border-[var(--black-border)] whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-3">
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
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
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="text-accent-token text-lg leading-none flex-shrink-0">
                            •
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div
              className="flex items-center gap-3 mb-6 sm:mb-8"
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg accent-soft flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
            </motion.div>

            <motion.div
              className="space-y-4 sm:space-y-5"
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="group relative surface-panel rounded-2xl p-5 sm:p-6 border-hover-accent transition-all duration-500"
                  variants={item}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[rgba(var(--accent-rgb),0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                          {edu.degree}
                        </h4>
                        <p className="text-accent-token text-sm font-medium mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="px-3 py-1 surface-elevated text-[var(--text-secondary)] text-xs rounded-full border border-[var(--black-border)] whitespace-nowrap">
                        {edu.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                      <div className="flex items-center gap-1.5 text-[var(--text-tertiary)]">
                        <svg
                          className="w-3.5 h-3.5"
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
                        <span>{edu.location}</span>
                      </div>
                      {edu.grade && (
                        <>
                          <span className="text-[var(--text-tertiary)]">•</span>
                          <div className="flex items-center gap-1.5">
                            <svg
                              className="w-3.5 h-3.5 text-[var(--color-success)]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="text-[var(--color-success)]">{edu.grade}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {edu.courses && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2">
                          Relevant Courses:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.courses.map((course, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 surface-elevated text-[var(--text-secondary)] text-xs rounded-full border border-[var(--black-border)] hover:border-[rgba(var(--accent-rgb),0.35)] hover:text-[var(--accent-primary)] transition-all duration-300"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
