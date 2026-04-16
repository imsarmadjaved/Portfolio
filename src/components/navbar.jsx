// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/PortfolioData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { personal } = portfolioData;

  const navItems = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Experience", href: "experience" },
    { name: "Contact", href: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) =>
        document.getElementById(item.href),
      );
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 
    w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:max-w-6xl
    ${
      scrolled
        ? "top-3 sm:top-4 md:top-5 backdrop-blur-md border border-[#333333] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        : "top-4 sm:top-5 md:top-6 bg-opacity-0 backdrop-blur-md border border-[#2A2A2A] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    }
    rounded-2xl md:rounded-full
    ${scrolled ? "py-2 md:py-2.5" : "py-3 md:py-3.5"}
    px-3 sm:px-4 md:px-5
  `}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="flex items-center"
            aria-label="Home"
          >
            <img
              src="./Logo.png"
              alt="Logo"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                  ${
                    activeSection === item.href
                      ? "text-(--current-accent) bg-(--current-accent)/10"
                      : "text-[#A1A1A1] hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {item.name}
                {activeSection === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--current-accent,#0047FF)] rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Resume Button - Desktop */}
          <div className="hidden md:block">
            <a
              href={personal.resumeUrl}
              download
              className="px-4 lg:px-5 py-2 text-sm font-semibold rounded-full
                bg-gradient-to-r from-[#1050f1] to-[#00F0FF] 
                text-black hover:shadow-[0_0_20px_rgba(0,71,255,0.5)]
                transition-all duration-300 hover:scale-105
                border border-white/10"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full transition-all duration-300 
              text-white hover:bg-white/10
              focus:outline-none focus:ring-2 focus:ring-[#235ff7] focus:ring-opacity-50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-5 h-5 transform transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu - Floating Panel */}
      <div
        className={`md:hidden fixed left-4 right-4 top-24 z-50 transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
      >
        <div className="bg-black/95 backdrop-blur-xl border border-[#1A1A1A] rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`py-3 px-5 rounded-2xl transition-all duration-300 text-base
                    ${
                      activeSection === item.href
                        ? "bg-gradient-to-r from-[#0047FF]/20 to-[#00F0FF]/20 text-[#0047FF] font-medium border-l-2 border-[#0047FF]"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Resume Button */}
              <div className="pt-4 mt-2 border-t border-[#1A1A1A]">
                <a
                  href={personal.resumeUrl}
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-2xl
                    bg-gradient-to-r from-[#0047FF] to-[#00F0FF] 
                    text-black font-semibold text-base
                    hover:shadow-[0_0_20px_rgba(0,71,255,0.5)]
                    transition-all duration-300"
                  onClick={() => setIsOpen(false)}
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </a>
              </div>

              {/* Mobile Social Links */}
              <div className="flex justify-center gap-3 pt-4">
                {personal.socialLinks?.github && (
                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-[#0A0A0A] border border-[#1A1A1A] text-white/60 
                      hover:text-[#0047FF] hover:border-[#0047FF]/30 transition-all duration-300"
                    aria-label="GitHub"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                )}
                {personal.socialLinks?.linkedin && (
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-[#0A0A0A] border border-[#1A1A1A] text-white/60 
                      hover:text-[#0047FF] hover:border-[#0047FF]/30 transition-all duration-300"
                    aria-label="LinkedIn"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
