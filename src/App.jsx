import React, { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

function App() {
  // Force scroll to top on every page load/reload
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);

    // Also scroll after a tiny delay to handle any race conditions
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timer);
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
