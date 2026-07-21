import { useEffect, useState } from "react";

const useSectionVisibility = (ref, rootMargin = "120px") => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isVisible;
};

export default useSectionVisibility;
