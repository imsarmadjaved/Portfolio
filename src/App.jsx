import React, { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    // Initialize AOS with optimized settings
    AOS.init({
      disable: false,
      startEvent: "DOMContentLoaded",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,

      // Duration and timing
      duration: 800,
      easing: "ease-in-out",
      delay: 100,

      // Behavior
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
      offset: 120, // offset (in px) from the original trigger point

      // Anchor placement
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });

    // Refresh AOS on window resize
    window.addEventListener("resize", () => {
      AOS.refresh();
    });

    // Initial refresh
    setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      window.removeEventListener("resize", () => {
        AOS.refresh();
      });
    };
  }, []);

  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </MainLayout>
  );
}

export default App;
