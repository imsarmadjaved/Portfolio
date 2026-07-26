export const easings = {
  premium: [0.22, 1, 0.36, 1],
  soft: [0.4, 0, 0.2, 1],
};

const riseTransition = {
  duration: 0.75,
  ease: easings.premium,
};

/** Primary content reveal: fade + 24px rise */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: riseTransition,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: easings.premium },
  },
};

export const staggerContainer = (stagger = 0.075, delayChildren = 0.06) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: riseTransition,
  },
};

/** Quick fade only — no movement when prefers-reduced-motion is on */
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export const getVariants = (variants, reducedMotion) =>
  reducedMotion ? reducedMotionVariants : variants;

export const viewportOnce = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -40px 0px",
};
