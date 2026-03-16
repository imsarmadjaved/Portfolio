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
      className="section bg-[var(--bg-secondary)] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--accent-primary)]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <span className="text-[var(--accent-primary)] text-sm font-medium uppercase tracking-wider mb-2 block">
            Get to know me
          </span>
          <h2 className="heading-2">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Who I Am Card */}
            <div
              className="backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-2xl p-6 shadow-lg border border-[var(--neutral-200)]/30 hover:border-[var(--accent-primary)]/30 transition-all duration-300"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
                Who I Am
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {about.summary}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--neutral-200)]/30">
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Name
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {personal.name}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Location
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {personal.location}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-sm font-medium text-[var(--accent-primary)] hover:underline"
                  >
                    {personal.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-tertiary)] block mb-1">
                    Status
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {personal.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 items-center">
              {about.highlights.map((highlight, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay="100">
                  <div className="backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-2xl p-4 flex items-center gap-3 shadow-lg border border-[var(--neutral-200)]/30 hover:border-[var(--accent-primary)]/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-[var(--accent-primary)] font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] font-medium">
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div
            className="lg:col-span-1"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {/* Education Card */}
            <div className="sticky top-24 backdrop-blur-md bg-[var(--bg-secondary)]/70 rounded-2xl p-6 shadow-lg border border-[var(--neutral-200)]/30 hover:border-[var(--accent-primary)]/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--accent-primary)]"
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

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={250 + index * 50}
                  >
                    <div className="relative pl-4 border-l-2 border-[var(--accent-primary)]/30 last:pb-0">
                      <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--accent-primary)]"></div>
                      <div className="mb-1">
                        <h4 className="font-semibold text-[var(--text-primary)] text-base">
                          {edu.degree}
                        </h4>
                        <p className="text-[var(--accent-primary)] text-sm font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-2">
                        <span>{edu.duration}</span>
                        {edu.grade && (
                          <>
                            <span>•</span>
                            <span className="text-[var(--accent-primary)]">
                              {edu.grade}
                            </span>
                          </>
                        )}
                      </div>
                      {edu.courses && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {edu.courses.slice(0, 2).map((course, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 bg-[var(--bg-tertiary)]/50 backdrop-blur-sm text-[var(--text-secondary)] rounded-full"
                            >
                              {course}
                            </span>
                          ))}
                          {edu.courses.length > 2 && (
                            <span className="text-[10px] px-2 py-0.5 bg-[var(--bg-tertiary)]/50 backdrop-blur-sm text-[var(--text-secondary)] rounded-full">
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
                className="mt-6 pt-6 border-t border-[var(--neutral-200)]/30"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <a
                  href={encodedResumeUrl}
                  download="Muhammad_Sarmad_Javed_Resume.pdf"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  Download Resume
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
