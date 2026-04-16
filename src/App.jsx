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
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 0, // Changed from 120 to 0
      easing: "ease-in-out",
      delay: 0, // Changed from 100 to 0
      mirror: false,
      anchorPlacement: "top-bottom",
      disableMutationObserver: false,
    });

    // Force immediate animation for elements already in viewport
    setTimeout(() => {
      AOS.refresh();
    }, 50);

    setTimeout(() => {
      AOS.refreshHard();
    }, 150);

    setTimeout(() => {
      AOS.refresh();
    }, 300);

    // Manually trigger animations for hero section
    const heroElements = document.querySelectorAll("#home [data-aos]");
    heroElements.forEach((el) => {
      el.classList.add("aos-animate");
    });

    // Refresh on window load
    window.addEventListener("load", () => {
      AOS.refreshHard();
      const allElements = document.querySelectorAll("[data-aos]");
      allElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("aos-animate");
        }
      });
    });
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
