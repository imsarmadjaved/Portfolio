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
    AOS.init({
      duration: 780,
      once: true,
      offset: 72,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      delay: 0,
      mirror: false,
      anchorPlacement: "top-bottom",
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    const refreshAos = () => {
      AOS.refreshHard();
    };
    const refreshTimer = window.setTimeout(AOS.refresh, 100);
    window.addEventListener("load", refreshAos);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refreshAos);
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
