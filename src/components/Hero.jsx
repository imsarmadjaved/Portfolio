// src/components/Hero.jsx
import React from "react";
import { portfolioData } from "../data/PortfolioData";

const Hero = () => {
  const { personal, footer } = portfolioData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)] overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle particles - responsive count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window.innerWidth < 640 ? 15 : 30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white/40 rounded-full ${
              i % 2 === 0 ? "animate-drift" : "animate-drift-alt"
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * -15}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
              opacity: 0.2 + Math.random() * 0.6,
              scale:
                window.innerWidth < 640
                  ? 0.3 + Math.random() * 0.5
                  : 0.5 + Math.random(),
            }}
          ></div>
        ))}
      </div>

      {/* Background orbs - responsive sizing */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-[var(--primary-200)] rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-10 sm:opacity-20"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-[var(--accent-teal)] rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-10 sm:opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge - responsive text size */}
          <div data-aos="fade-down">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-[var(--accent-primary)] bg-[var(--bg-tertiary)] rounded-full whitespace-nowrap">
              Available for opportunities
            </span>
          </div>

          {/* Name - responsive font sizes */}
          <div data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 break-words">
              {personal.name}
            </h1>
          </div>

          {/* Title - responsive font sizes */}
          <div data-aos="fade-up">
            <h2 className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] mb-4 sm:mb-6 px-2">
              {personal.title}
            </h2>
          </div>

          {/* Description - responsive text and padding */}
          <div data-aos="fade-up">
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6">
              {footer.brandDescription}
            </p>
          </div>

          {/* CTA Buttons - responsive layout */}
          <div data-aos="fade-up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full sm:w-auto btn btn-primary text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3"
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto btn btn-outline text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3"
              >
                View Projects
              </button>
              <a
                href={personal.resumeUrl}
                download
                className="w-full sm:w-auto btn btn-outline text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Social Links - responsive sizing */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            data-aos="fade-up"
          >
            <span className="text-xs sm:text-sm text-[var(--text-tertiary)] mr-1 sm:mr-2">
              Connect:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {personal.socialLinks.github && (
                <a
                  href={personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
              )}
              {personal.socialLinks.linkedin && (
                <a
                  href={personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              <a
                href={`mailto:${personal.email}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all"
                aria-label="Email"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - responsive positioning */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors"
        aria-label="Scroll down"
        data-aos="fade-up"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M19 14l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
