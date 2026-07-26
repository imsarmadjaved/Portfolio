import { useEffect, useRef, useState } from "react";
import { portfolioData } from "../data/PortfolioData";
import LogoMark from "./ui/LogoMark";

const Navbar = () => {
  const { personal, footer } = portfolioData;
  const navItems = footer.links.product;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 20);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const observers = [];
    navItems.forEach((item) => {
      const section = document.getElementById(item.href);
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(item.href);
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      observer.observe(section);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [navItems]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    const focusable = menuRef.current?.querySelectorAll(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav
        className={`portfolio-nav ${scrolled ? "portfolio-nav--scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a href="#home" className="portfolio-nav__brand" aria-label="Go to home">
          <LogoMark />
        </a>

        <div className="portfolio-nav__links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              className={activeSection === item.href ? "is-active" : ""}
              aria-current={activeSection === item.href ? "location" : undefined}
            >
              {item.name}
            </a>
          ))}
        </div>

        <a className="portfolio-nav__resume" href={personal.resumeUrl} download>
          Resume
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="portfolio-nav__toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {isOpen && (
        <div className="mobile-nav-shell">
          <button
            className="mobile-nav-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />
          <div
            id="mobile-navigation"
            ref={menuRef}
            className="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                onClick={closeMenu}
                className={activeSection === item.href ? "is-active" : ""}
                style={{ "--menu-index": index }}
                aria-current={activeSection === item.href ? "location" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.name}
              </a>
            ))}
            <a
              href={personal.resumeUrl}
              download
              onClick={closeMenu}
              className="mobile-nav__resume"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
