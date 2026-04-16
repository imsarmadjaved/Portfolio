// src/components/About.jsx
import React from "react";
import { portfolioData } from "../data/PortfolioData";

const About = () => {
  const { about, personal, education } = portfolioData;

  const encodedResumeUrl = encodeURI(personal.resumeUrl);

  return (
    <section
      id="about"
      className="section relative overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Subtle background accents - matching Hero colors */}
      <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[#0047FF]/5 rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-[#00F0FF]/5 rounded-full blur-2xl sm:blur-3xl"></div>

      <div className="container-custom relative z-10 mx-auto">
        {/* Section Header - Matching Skills style */}
        <div className="text-center mb-12 sm:mb-16 px-4" data-aos="fade-up">
          <span className="text-[#00F0FF] text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 block">
            Get to know me
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-[#0047FF] bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#00F0FF]"></div>
            <p className="text-[#A1A1A1] text-sm sm:text-base max-w-xl">
              Passionate developer focused on creating impactful digital
              experiences
            </p>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#00F0FF]"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Who I Am Card */}
            <div
              className="relative bg-[#0A0A0A] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#1A1A1A] hover:border-[#00F0FF]/30 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              {/* Availability Badge - Intersecting the top */}
              <div className="absolute -top-4 left-6 sm:left-8">
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium rounded-full
                  bg-gradient-to-r from-[#A3FF00]/20 to-[#00F0FF]/20 
                  backdrop-blur-sm
                  border border-[#A3FF00]/40
                  text-[#A3FF00]
                  shadow-[0_0_15px_rgba(163,255,0,0.15)]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3FF00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3FF00]"></span>
                  </span>
                  {personal.availability}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white flex items-center gap-2 mt-2">
                <span className="w-1 h-5 bg-[#00F0FF] rounded-full"></span>
                Who I Am
              </h3>
              <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                {about.summary}
              </p>

              {/* Quick Info Grid - Only Name, Location, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#1A1A1A]">
                <div>
                  <span className="text-[10px] sm:text-xs text-[#6B6B6B] block mb-0.5 sm:mb-1">
                    Name
                  </span>
                  <span
                    className="text-xs sm:text-sm font-medium text-white break-words line-clamp-1"
                    title={personal.name}
                  >
                    {personal.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-[#6B6B6B] block mb-0.5 sm:mb-1">
                    Location
                  </span>
                  <span
                    className="text-xs sm:text-sm font-medium text-white line-clamp-1"
                    title={personal.location}
                  >
                    {personal.location}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-[#6B6B6B] block mb-0.5 sm:mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-xs sm:text-sm font-medium text-[#00F0FF] hover:underline line-clamp-1 block truncate"
                    title={personal.email}
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-[#0A0A0A] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-[#1A1A1A] hover:border-[#0047FF]/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#0047FF]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs sm:text-sm text-[#0047FF] font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium break-words">
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
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Education Card */}
            <div className="lg:sticky lg:top-24 bg-[#0A0A0A] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#1A1A1A] hover:border-[#0047FF]/30 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047FF]"
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
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 100}
                  >
                    <div className="relative pl-3 sm:pl-4 border-l-2 border-[#0047FF]/30">
                      <div className="absolute left-[-5px] top-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0047FF]"></div>
                      <div className="mb-1">
                        <h4 className="font-semibold text-white text-sm sm:text-base break-words pr-2">
                          {edu.degree}
                        </h4>
                        <p className="text-[#00F0FF] text-xs sm:text-sm font-medium break-words">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[#6B6B6B] mb-1 sm:mb-2">
                        <span>{edu.duration}</span>
                        {edu.grade && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-[#A3FF00] w-full sm:w-auto">
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
                              className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-[#0F0F0F] text-[#A1A1A1] rounded-full truncate max-w-[120px] sm:max-w-none border border-[#1A1A1A]"
                              title={course}
                            >
                              {course.length > 15
                                ? `${course.substring(0, 15)}...`
                                : course}
                            </span>
                          ))}
                          {edu.courses.length > 2 && (
                            <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-[#0F0F0F] text-[#A1A1A1] rounded-full border border-[#1A1A1A]">
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
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#1A1A1A]"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <a
                  href={encodedResumeUrl}
                  download="Muhammad_Sarmad_Javed_Resume.pdf"
                  className="group w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#0047FF] to-[#00F0FF] text-white font-medium text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-[#0047FF]/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
