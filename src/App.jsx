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
      duration: 1000,
      once: true,
      offset: 120,
      easing: "ease-in-out",
      delay: 100,
      mirror: false,

      // Anchor placement
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });

    // Refresh AOS on window resize
    AOS.refresh();

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
