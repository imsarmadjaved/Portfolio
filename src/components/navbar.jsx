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
          ? "bg-[var(--bg-secondary)]/95 backdrop-blur-sm shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
        >
          MSJ<span className="text-[var(--accent-primary)]">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`nav-link text-sm font-medium ${
                activeSection === item.href ? "active" : ""
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

        {/* Resume Button */}
        <div className="hidden md:block">
          <a href={personal.resumeUrl} download className="btn btn-primary">
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg transition-colors text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 bg-[var(--bg-secondary)] shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-custom py-4 flex flex-col space-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`py-2 px-4 rounded-lg transition-colors ${
                activeSection === item.href
                  ? "bg-[var(--bg-tertiary)] text-[var(--accent-primary)] font-medium"
                  : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
              }`}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 border-t border-[var(--neutral-200)]">
            <a
              href={personal.resumeUrl}
              download
              className="btn btn-primary w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
