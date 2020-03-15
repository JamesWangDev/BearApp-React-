import React from "react";
import NavBar from "../../components/NavBar";
import Hero from "./Hero";
import Info from "./Info";
import Footer from "../Footer";
import Header from "../Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header title="Chingu Registry" />

      <NavBar />

      <div className="bg-gray-100 text-gray-900">
        <Hero />
        <Info />
      </div>

      <Footer />
    </div>
  );
}
