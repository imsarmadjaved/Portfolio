import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event) => setReducedMotion(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reducedMotion;
};

export default useReducedMotion;
