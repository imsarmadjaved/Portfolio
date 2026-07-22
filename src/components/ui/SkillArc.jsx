import { motion, useReducedMotion } from "framer-motion";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SkillArc = ({ level = 0, label }) => {
  const reducedMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, level));
  const offset = CIRCUMFERENCE * (1 - clamped / 100);

  return (
    <svg
      className="skill-arc"
      viewBox="0 0 44 44"
      role="img"
      aria-label={`${label} proficiency ${clamped} percent`}
    >
      <circle className="skill-arc__track" cx="22" cy="22" r={RADIUS} />
      <motion.circle
        className="skill-arc__fill"
        cx="22"
        cy="22"
        r={RADIUS}
        strokeDasharray={CIRCUMFERENCE}
        initial={reducedMotion ? false : { strokeDashoffset: CIRCUMFERENCE }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
};

export default SkillArc;
