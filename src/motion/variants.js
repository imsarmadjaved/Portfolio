export const easings = {
  premium: [0.22, 1, 0.36, 1],
  soft: [0.4, 0, 0.2, 1],
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easings.premium },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easings.premium },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easings.premium },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easings.premium },
  },
};

export const scaleInSoft = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easings.premium },
  },
};

export const scaleIn = scaleInSoft;

export const clipWipe = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.85, ease: easings.premium },
  },
};

export const heroReveal = {
  hidden: { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: easings.premium },
  },
};

export const maskReveal = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easings.premium },
  },
};

export const timelineItem = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.premium },
  },
};

export const riseIn = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easings.premium },
  },
};

export const staggerContainer = (stagger = 0.07, delayChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.premium },
  },
};

export const reducedMotionVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const getVariants = (variants, reducedMotion) =>
  reducedMotion ? reducedMotionVariants : variants;

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -64px 0px",
};
