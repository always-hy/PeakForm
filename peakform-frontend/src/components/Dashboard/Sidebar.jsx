"use client";
import React from "react";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleOpen }) => {
  // SVG icons with the specified color
  const iconColor = "#0ADE1E";

  // Common sidebar content
  const sidebarContent = (
    <div className="flex flex-col items-center justify-evenly h-full py-12 w-11 max-md:py-10">
      {/* Home icon links to `/` */}
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-square basis-0 cursor-pointer mt-10"
          aria-label="Home"
        >
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </Link>
      {/* Dashboard icon links to `/dashboard` */}
      <Link href="/dashboard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-square basis-0 cursor-pointer mt-10"
          aria-label="Dashboard"
        >
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      </Link>
      {/* Activity/Workout icon links to `/workoutplanner` */}
      <Link href="/workoutplanner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain w-full aspect-square cursor-pointer mt-10"
          aria-label="Workout Planner"
        >
          <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
        </svg>
      </Link>
      {/* Exercise icon */}
      <Link href="/gyms">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain w-full aspect-square mt-10"
          aria-label="Exercise"
        >
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
        </svg>
      </Link>
      {/* Messages icon */}
      <Link href="/social">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain w-full aspect-square mt-10"
          aria-label="Messages"
        >
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
      </Link>
      {/* Discover/Explore icon */}
      <Link href="/landingPage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain w-full aspect-square mt-10"
          aria-label="Discover"
        >
          <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
        </svg>
      </Link>
      {/* ai icon */}
      <Link href="/ai-planner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain w-full aspect-square mt-10"
          aria-label="Robot"
        >
          <path d="M12 2a1 1 0 011 1v1h3a1 1 0 010 2h-.18A3.001 3.001 0 0118 9v2h1a1 1 0 011 1v7a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H6a2 2 0 01-2-2v-7a1 1 0 011-1h1V9a3.001 3.001 0 012.18-2.9H8a1 1 0 010-2h3V3a1 1 0 011-1zm-4 7v2h8V9a1 1 0 00-1-1H9a1 1 0 00-1 1zm-2 4v6h12v-6H6zm3 1a1 1 0 110 2 1 1 0 010-2zm6 0a1 1 0 110 2 1 1 0 010-2z" />
        </svg>
      </Link>
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
