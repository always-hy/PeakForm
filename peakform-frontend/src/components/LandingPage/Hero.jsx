"use client";
import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent opacity-50" />

      <div className="relative z-10 flex flex-col items-center max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading with gradient text effect */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 leading-[1.2] tracking-tight mb-6 sm:mb-8">
          Streamline your workout journey with PeakForm
        </h1>

        {/* Subheading with improved typography */}
        <p className="text-xl sm:text-2xl text-neutral-400 text-center max-w-2xl mb-12 leading-relaxed">
          Empower your workouts. Get big{" "}
          <span className="inline-block animate-pulse">💪</span>
        </p>

        {/* CTA Button with hover effect */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Button
            variant="green"
            className="transform hover:scale-105 transition-all duration-300 text-lg sm:text-xl px-12 py-6 font-semibold shadow-lg hover:shadow-green-500/20"
          >
            Register Now
          </Button>
        </div>

        {/* Optional: Feature highlights */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-neutral-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Personalized Workouts</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Progress Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Expert Guidance</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute -left-48 -top-48 w-96 h-96 bg-green-500 rounded-full filter blur-[128px] opacity-10" />
      <div className="absolute -right-48 -bottom-48 w-96 h-96 bg-green-500 rounded-full filter blur-[128px] opacity-10" />
    </section>
  );
};

export default Hero;
