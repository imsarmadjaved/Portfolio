import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary)">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
