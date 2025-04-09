"use client";
import React from "react";
import Header from "./Header";
import GymHero from "./GymHero";
import FeaturesSection from "./FeaturesSection";
import FeaturedPhotos from "./FeaturedPhotos";
import BookingSection from "./BookingSection";
import RelatedGyms from "./RelatedGyms";
import Footer from "./Footer";

/**
 * GymPageIndividual - Main component for the individual gym page
 * Assembles all section components into a complete page
 */
function GymPageIndividual() {
  return (
    <main className="overflow-hidden bg-black shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      <Header />
      <GymHero />
      <FeaturesSection />
      <FeaturedPhotos />
      <BookingSection />
      <RelatedGyms />
      <Footer />
    </main>
  );
}

export default GymPageIndividual;
