import { useRef, useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

const MagneticButton = ({
  children,
  className = "",
  href,
  type,
  onClick,
  strength = 0.35,
  disabled = false,
  download,
  target,
  rel,
  "aria-label": ariaLabel,
}) => {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    if (reducedMotion || disabled || !ref.current) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * strength, y: y * strength });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const motionProps = {
    ref,
    className,
    onPointerMove: handlePointerMove,
    onPointerLeave: reset,
    animate: { x: offset.x, y: offset.y },
    transition: { type: "spring", stiffness: 220, damping: 18, mass: 0.4 },
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
