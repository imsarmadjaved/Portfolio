import { motion } from "framer-motion";
import { portfolioData } from "../data/PortfolioData";
import useReducedMotion from "../hooks/useReducedMotion";
import {
  getVariants,
  staggerContainer,
  staggerItem,
} from "../motion/variants";

const Hero = () => {
  const { personal, footer } = portfolioData;
  const reducedMotion = useReducedMotion();
  const heroContainer = getVariants(staggerContainer(0.09, 0.15), reducedMotion);
  const heroItem = getVariants(staggerItem, reducedMotion);

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="container-custom hero-content"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="availability-pill" variants={heroItem}>
          <span aria-hidden="true" />
          {personal.availability}
        </motion.p>
        <motion.p className="hero-kicker" variants={heroItem}>
          Full-stack engineering · AI-enhanced products
        </motion.p>
        <motion.h1 variants={heroItem}>{personal.name}</motion.h1>
        <motion.p className="hero-role" variants={heroItem}>
          I build as a <strong>{personal.title}</strong>
        </motion.p>
        <motion.p className="hero-summary" variants={heroItem}>
          {footer.brandDescription}
        </motion.p>
        <motion.div className="hero-actions" variants={heroItem}>
          <a className="button button--primary" href="#contact">
            Start a conversation
          </a>
          <a className="button button--secondary" href="#projects">
            View selected work
          </a>
          <a className="button button--text" href={personal.resumeUrl} download>
            Download résumé <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
        <motion.div
          className="hero-socials"
          aria-label="Social links"
          variants={heroItem}
        >
          <a
            href={personal.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href={personal.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${personal.email}`}>Email</a>
        </motion.div>
      </motion.div>
      <motion.a
        className="hero-scroll"
        href="#about"
        aria-label="Continue to About"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0.2 : 0.7,
          delay: reducedMotion ? 0 : 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span>Scroll</span>
        <span aria-hidden="true">↓</span>
      </motion.a>
    </section>
  );
};

export default Hero;
