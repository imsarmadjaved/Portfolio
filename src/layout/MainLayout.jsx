import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import SiteAtmosphere from "../components/backgrounds/SiteAtmosphere";

const MainLayout = ({ children }) => {
  return (
    <div className="site-body-shell min-h-screen flex flex-col bg-(--bg-primary)">
      <SiteAtmosphere />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="grow relative z-[1]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
