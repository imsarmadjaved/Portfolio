import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary)">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
