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
      setScrolled(window.scrollY > 50);

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
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-secondary)]/85 backdrop-blur-md shadow-lg py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container-custom flex justify-between items-center px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors duration-300"
          aria-label="Home"
        >
          <img
            src="./Logo.png"
            alt="Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`nav-link text-sm font-medium transition-colors duration-300 ${
                activeSection === item.href
                  ? "active text-[var(--accent-primary)]"
                  : "hover:text-[var(--accent-primary)]"
              }`}
              style={{
                color:
                  !scrolled && activeSection !== item.href
                    ? "var(--text-secondary)"
                    : "inherit",
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Resume Button - Desktop */}
        <div className="hidden md:block">
          <a
            href={personal.resumeUrl}
            download
            className="btn btn-primary text-sm px-4 py-2"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg transition-all duration-300 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-50"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300"
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed left-0 right-0 top-[57px] sm:top-[65px] bg-[var(--bg-secondary)] shadow-xl transition-all duration-300 ease-in-out z-50 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container-custom mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`py-3 px-4 rounded-lg transition-all duration-300 text-base ${
                  activeSection === item.href
                    ? "bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 text-[var(--accent-primary)] font-medium border-l-4 border-[var(--accent-primary)]"
                    : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:pl-6"
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Resume Button */}
            <div className="pt-4 mt-2 border-t border-[var(--neutral-200)]">
              <a
                href={personal.resumeUrl}
                download
                className="btn btn-primary w-full text-center py-3 text-base"
                onClick={() => setIsOpen(false)}
              >
                Download Resume
              </a>
            </div>

            {/* Mobile Social Links (optional) */}
            <div className="flex justify-center gap-4 pt-4 mt-2">
              {personal.socialLinks?.github && (
                <a
                  href={personal.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300"
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
                  className="p-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-300"
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
    </nav>
  );
};

export default Navbar;
