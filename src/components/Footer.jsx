// src/components/Footer.jsx
import React from "react";
import { portfolioData } from "../data/PortfolioData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personal, footer } = portfolioData;

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
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

  const handleLinkClick = (item, e) => {
    if (item.type === "section") {
      scrollToSection(item.href, e);
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      github: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      linkedin: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      email: (
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  // Social links with colors
  const socialLinks = [
    {
      ...personal.socialLinks,
      github: personal.socialLinks?.github,
      color: "#A3FF00",
      icon: "github",
    },
    {
      href: personal.socialLinks?.linkedin,
      color: "#00F0FF",
      icon: "linkedin",
      name: "LinkedIn",
    },
    {
      href: `mailto:${personal.email}`,
      color: "#FF5E00",
      icon: "email",
      name: "Email",
    },
  ].filter((link) => link.href);

  return (
    <footer
      className="relative border-t border-[#1A1A1A]"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#0047FF]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-4">
              <a
                href="#home"
                onClick={(e) => scrollToSection("home", e)}
                className="inline-block mb-4 hover:opacity-80 transition-opacity duration-300"
                aria-label="Go to home"
              >
                <img
                  src="./Logo.png"
                  alt="Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                />
              </a>
              <p className="text-xs sm:text-sm text-[#A1A1A1] leading-relaxed mb-6 max-w-sm">
                {footer.brandDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#6B6B6B] hover:scale-110 transition-all duration-300"
                    style={{
                      color: link.color,
                      borderColor: `${link.color}30`,
                    }}
                    aria-label={link.name || link.icon}
                  >
                    {getIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="sm:col-span-1 lg:col-span-2 lg:col-start-7">
              <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#00F0FF] rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footer.links.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={`#${link.href}`}
                      onClick={(e) => handleLinkClick(link, e)}
                      className="text-xs sm:text-sm text-[#A1A1A1] hover:text-[#00F0FF] transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="sm:col-span-1 lg:col-span-2">
              <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#0047FF] rounded-full"></span>
                Connect
              </h3>
              <ul className="space-y-3">
                {footer.links.connect.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-[#A1A1A1] hover:text-[#0047FF] transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      <span className="w-4 h-4 flex-shrink-0">
                        {getIcon(link.icon)}
                      </span>
                      <span className="truncate">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="sm:col-span-2 lg:col-span-2">
              <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#A3FF00] rounded-full"></span>
                Legal
              </h3>
              <ul className="space-y-3">
                {footer.links.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(link, e)}
                      className="text-xs sm:text-sm text-[#A1A1A1] hover:text-[#A3FF00] transition-colors duration-300 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-[#6B6B6B] text-center sm:text-left">
              © {currentYear} {personal.name}. All rights reserved.
            </p>
          </div>

          {/* Back to top button - mobile */}
          <div className="mt-6 text-center sm:hidden">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs text-[#00F0FF] bg-[#0A0A0A] rounded-full border border-[#1A1A1A] hover:border-[#00F0FF]/40 transition-all duration-300"
              aria-label="Back to top"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <span>Back to top</span>
            </button>
          </div>

          {/* Desktop back to top button */}
          <div className="hidden sm:block absolute bottom-8 right-8">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#6B6B6B] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all duration-300"
              aria-label="Back to top"
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
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
