// src/components/Experience.jsx
import React from "react";
import { portfolioData } from "../data/PortfolioData";

const Experience = () => {
  const { experience, education } = portfolioData;

  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#00F0FF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0047FF]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <span className="text-[#00F0FF] text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 block">
            My Journey
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-[#0047FF] bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#00F0FF]"></div>
            <p className="text-[#A1A1A1] text-sm sm:text-base max-w-xl">
              My professional journey and academic background
            </p>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#00F0FF]"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Experience Column */}
          <div data-aos="fade-up" data-aos-delay="0">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#0047FF]/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#0047FF]"
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
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Work Experience
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="group relative bg-[#0A0A0A] rounded-2xl p-5 sm:p-6 border border-[#1A1A1A] hover:border-[#0047FF]/30 transition-all duration-500"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0047FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                          {exp.position}
                        </h4>
                        <p className="text-[#00F0FF] text-sm font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-[#0F0F0F] text-[#A1A1A1] text-xs rounded-full border border-[#1A1A1A] whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-3">
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

                    <p className="text-[#A1A1A1] text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-[#A1A1A1]"
                        >
                          <span className="text-[#00F0FF] text-lg leading-none flex-shrink-0">
                            •
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#00F0FF]"
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
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Education
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="group relative bg-[#0A0A0A] rounded-2xl p-5 sm:p-6 border border-[#1A1A1A] hover:border-[#00F0FF]/30 transition-all duration-500"
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 200}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-[#00F0FF] transition-colors duration-300">
                          {edu.degree}
                        </h4>
                        <p className="text-[#0047FF] text-sm font-medium mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-[#0F0F0F] text-[#A1A1A1] text-xs rounded-full border border-[#1A1A1A] whitespace-nowrap">
                        {edu.duration}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                      <div className="flex items-center gap-1.5 text-[#6B6B6B]">
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
                          <span className="text-[#6B6B6B]">•</span>
                          <div className="flex items-center gap-1.5">
                            <svg
                              className="w-3.5 h-3.5 text-[#A3FF00]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <span className="text-[#A3FF00]">{edu.grade}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {edu.courses && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-[#6B6B6B] mb-2">
                          Relevant Courses:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.courses.map((course, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-[#0F0F0F] text-[#A1A1A1] text-xs rounded-full border border-[#1A1A1A] hover:border-[#A3FF00]/30 hover:text-[#A3FF00] transition-all duration-300"
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
    </section>
  );
};

export default Experience;
