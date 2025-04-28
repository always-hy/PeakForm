"use client";
import React from "react";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleOpen }) => {
  // SVG icons with the specified color
  const iconColor = "#0ADE1E";

  // Common sidebar content
  const sidebarContent = (
    <div className="flex flex-col items-center mt-12 w-11 max-md:mt-10">
      <div className="flex gap-2.5 justify-center items-center self-stretch px-2.5 w-full h-11 bg-green-500 rounded-xl shadow-[0px_3px_9px_rgba(255,132,75,0.25)]">
        {/* Home icon links to `/` */}
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={iconColor}
            className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-square basis-0 cursor-pointer"
            aria-label="Dashboard"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </Link>
      </div>
      {/* Activity/Workout icon links to `/workoutplanner` */}
      <Link href="/workoutplanner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={iconColor}
          className="object-contain mt-10 w-full aspect-square cursor-pointer"
          aria-label="Workout Planner"
        >
          <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
        </svg>
      </Link>
      {/* Exercise icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={iconColor}
        className="object-contain mt-10 w-full aspect-square"
        aria-label="Exercise"
      >
        <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
      </svg>
      {/* Messages icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={iconColor}
        className="object-contain mt-10 w-full aspect-square"
        aria-label="Messages"
      >
        <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </svg>
      {/* Discover/Explore icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={iconColor}
        className="object-contain mt-10 w-full aspect-square"
        aria-label="Discover"
      >
        <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
      </svg>
      {/* Settings icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={iconColor}
        className="object-contain mt-10 w-full aspect-square"
        aria-label="Settings"
      >
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
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
