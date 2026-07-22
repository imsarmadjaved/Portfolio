import { motion, useReducedMotion } from "framer-motion";
import {
  getVariants,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "../../motion/variants";

const SectionHeading = ({ eyebrow, title, description, align = "center" }) => {
  const reducedMotion = useReducedMotion();
  const container = getVariants(staggerContainer(0.1, 0.05), reducedMotion);
  const item = getVariants(staggerItem, reducedMotion);

  return (
    <motion.header
      className={`section-heading ${align === "left" ? "section-heading--left" : ""}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.span className="section-heading__eyebrow" variants={item}>
        {eyebrow}
      </motion.span>
      <motion.h2 className="section-heading__title" variants={item}>
        {title}
      </motion.h2>
      <motion.p className="section-heading__description" variants={item}>
        {description}
      </motion.p>
    </motion.header>
  );
};

export default SectionHeading;
