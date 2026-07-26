// src/components/About.jsx
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

const About = () => {
  const { about, personal, education } = portfolioData;
  const encodedResumeUrl = encodeURI(personal.resumeUrl);
  const reducedMotion = useReducedMotion();
  const container = getVariants(staggerContainer(0.08, 0.05), reducedMotion);
  const item = getVariants(staggerItem, reducedMotion);

  return (
    <section id="about" className="portfolio-section about-section">
      <div className="section-orb section-orb--right" aria-hidden="true" />
      <div className="section-orb section-orb--left" aria-hidden="true" />

      <div className="container-custom relative z-10 mx-auto">
        <SectionHeading
          eyebrow="Get to know me"
          title="Engineering with intention"
          description="I connect product thinking, clean implementation, and dependable delivery."
        />

        <motion.div
          className="grid lg:grid-cols-3 gap-6 sm:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <motion.div
              className="relative surface-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 border-hover-accent transition-all duration-300"
              variants={item}
            >
              <div className="absolute -top-4 left-6 sm:left-8">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full
                  backdrop-blur-sm border border-[rgba(var(--accent-rgb),0.35)]
                  text-[var(--color-success)] bg-[var(--color-success-muted)]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
                  </span>
                  {personal.availability}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[var(--text-primary)] flex items-center gap-2 mt-2">
                <span className="w-1 h-5 accent-bar rounded-full"></span>
                Who I Am
              </h3>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                {about.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--black-border)]">
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Name
                  </span>
                  <span
                    className="text-xs sm:text-sm font-medium text-[var(--text-primary)] break-words"
                    title={personal.name}
                  >
                    {personal.name}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Location
                  </span>
                  <span
                    className="text-xs sm:text-sm font-medium text-[var(--text-primary)] break-words"
                    title={personal.location}
                  >
                    {personal.location}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-xs sm:text-sm font-medium text-accent-token hover:underline break-all block"
                    title={personal.email}
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {about.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="surface-panel rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-hover-accent transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg accent-soft flex items-center justify-center flex-shrink-0">
                    <span className="text-xs sm:text-sm font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium break-words">
                    {highlight}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div className="lg:col-span-1" variants={item}>
            <div className="lg:sticky lg:top-24 surface-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 border-hover-accent transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[var(--text-primary)] flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-accent-token"
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
                {education.slice(0, 1).map((edu, index) => (
                  <div key={index}>
                    <div className="relative pl-3 sm:pl-4 border-l-2 border-[rgba(var(--accent-rgb),0.3)]">
                      <div className="absolute left-[-5px] top-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--accent-primary)]"></div>
                      <div className="mb-1">
                        <h4 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base break-words pr-2">
                          {edu.degree}
                        </h4>
                        <p className="text-accent-token text-xs sm:text-sm font-medium break-words">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[var(--text-tertiary)] mb-1 sm:mb-2">
                        <span>{edu.duration}</span>
                        {edu.grade && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-[var(--color-success)] w-full sm:w-auto">
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
                              className="text-xs px-2 py-1 surface-elevated text-[var(--text-secondary)] rounded-full truncate max-w-[160px] sm:max-w-none border border-[var(--black-border)]"
                              title={course}
                            >
                              {course.length > 15
                                ? `${course.substring(0, 15)}...`
                                : course}
                            </span>
                          ))}
                          {edu.courses.length > 2 && (
                            <span className="text-xs px-2 py-1 surface-elevated text-[var(--text-secondary)] rounded-full border border-[var(--black-border)]">
                              +{edu.courses.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--black-border)]">
                <a
                  href={encodedResumeUrl}
                  download="Muhammad_Sarmad_Javed_Resume.pdf"
                  className="group w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-medium text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
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
                  <span className="relative">Download Resume</span>
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    PDF
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
