"use client";
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import DashboardPreview from "./DashboardPreview";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import Footer from "./Footer";
import CTASection from "./CTASection";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-end px-4 sm:px-6 lg:px-8">
      <main className="overflow-hidden w-full bg-black max-w-[1440px] mx-auto">
        <Header />
        <Hero />
        <DashboardPreview />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
