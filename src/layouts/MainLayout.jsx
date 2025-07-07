import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;