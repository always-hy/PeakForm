"use client";
import React from "react";
import Link from "next/link";
const Sidebar = ({ isOpen, toggleOpen }) => {
  // Common sidebar content
  const sidebarContent = (
    <div className="flex flex-col items-center mt-12 w-11 max-md:mt-10">
      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 w-full h-11 bg-green-500 rounded-xl shadow-[0px_3px_9px_rgba(255,132,75,0.25)]">
        {/* First image links to `/` */}
        <Link href="/">
          <img
            src="/home.png"
            className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-square basis-0 cursor-pointer"
            alt="Dashboard icon"
          />
        </Link>
      </div>
      {/* Second image links to `/workoutplanner` */}
      <Link href="/workoutplanner">
        <img
          src="/activity.png"
          className="object-contain mt-10 w-full aspect-square cursor-pointer"
          alt="Navigation icon"
        />
      </Link>
      <img
        src="/exercise.png"
        className="object-contain mt-10 w-full aspect-square"
        alt="Navigation icon"
      />
      <img
        src="/messages.png"
        className="object-contain mt-10 w-full aspect-square"
        alt="Navigation icon"
      />
      <img
        src="/discover.png"
        className="object-contain mt-10 w-full aspect-square"
        alt="Navigation icon"
      />
      <img
        src="/settings.png"
        className="object-contain mt-10 w-full aspect-square"
        alt="Navigation icon"
      />
    </div>
  );

  return (
    <>
      {/* Desktop version - always visible */}
      <nav className="hidden md:flex flex-col items-center self-stretch px-4 pt-3.5 my-auto bg-stone-950 pb-[1005px] w-[100px]">
        <div className="flex overflow-hidden flex-wrap gap-0 items-start rounded-md h-[58px] w-[66px]">
          <div className="flex min-h-[38px] w-[55px]" />
        </div>
        {sidebarContent}
      </nav>

      {/* Mobile version - slides in from left */}
      <nav
        className={`md:hidden flex flex-col items-center fixed top-0 left-0 h-full z-40
          bg-stone-950 min-h-[100vh] w-[70px]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          paddingBottom: "100px",
        }} /* Ensure space at bottom for scrolling */
      >
        <div className="w-full flex justify-end p-4">
          <button
            onClick={toggleOpen}
            className="text-white p-2"
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex overflow-hidden flex-wrap gap-0 items-start rounded-md h-[58px] w-[66px]">
          <div className="flex min-h-[38px] w-[55px]" />
        </div>
        {sidebarContent}
      </nav>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleOpen}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
