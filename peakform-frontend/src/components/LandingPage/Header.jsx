"use client";
import React from "react";
import Logo from "./Logo";
import Button from "./Button";

const Header = () => {
  return (
    <header className="relative w-full min-h-[92px]">
      <nav className="flex relative justify-center items-start p-3 sm:p-5 w-full backdrop-blur-[5px] bg-stone-950 min-h-[72px] sm:min-h-[92px]">
        <div className="flex z-0 flex-wrap gap-4 sm:gap-10 justify-between items-center px-4 sm:px-10 my-auto w-full max-w-[1400px]">
          <Logo />

          <div className="hidden md:flex gap-2 justify-center items-center self-stretch p-1 my-auto rounded-[64px]">
            <button className="p-2 text-lg text-neutral-400">Product</button>
            <button className="p-2 text-lg text-neutral-400">Gyms</button>
            <button className="p-2 text-lg text-neutral-400">Dashboard</button>
            <button className="p-2 text-lg text-neutral-400">
              Create a workout
            </button>
          </div>

          <Button className="hidden sm:flex">Get started</Button>
          <button className="md:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="absolute inset-x-0 top-0 -bottom-4 border-b-[0.8px] border-[#161616]" />
      </nav>
    </header>
  );
};

export default Header;
