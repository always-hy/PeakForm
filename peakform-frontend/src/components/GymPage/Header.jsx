"use client";
import React from "react";

/**
 * Navigation link component for the header
 */
function NavLink({ href, width, children }) {
  return (
    <a
      href={href || "#"}
      className={`flex justify-center items-center self-stretch p-2 my-auto ${width}`}
    >
      <p className="self-stretch my-auto">{children}</p>
    </a>
  );
}

/**
 * Header component with navigation and call-to-action button
 */
function Header() {
  const navItems = [
    { text: "Home", href: "/", width: "w-[66px]" },
    { text: "Gyms", href: "/gyms", width: "w-[57px]" },
    { text: "Dashboard", href: "/dashboard", width: "w-[107px]" }, // ✅ updated here
    { text: "Notifications", href: "/notifications", width: "w-[122px]" },
    { text: "Pricing", href: "/pricing", width: "w-[73px]" },
  ];

  return (
    <header className="w-full min-h-[92px] text-zinc-50 max-md:max-w-full">
      <div className="flex relative justify-center items-start p-5 w-full backdrop-blur-[5px] bg-stone-950 min-h-[92px] max-md:max-w-full">
        {/* Main navigation container */}
        <nav className="flex z-0 flex-wrap gap-10 justify-between items-center px-10 my-auto max-w-[1400px] min-w-60 w-[1400px] max-md:px-5 max-md:max-w-full">
          {/* Logo */}
          <div className="flex flex-col justify-center self-stretch my-auto text-xl font-semibold leading-none whitespace-nowrap">
            <a
              href="#"
              className="flex overflow-hidden gap-2 justify-center items-center"
            >
              <img
                src="/logo.svg"
                alt="PeakForm Logo"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              />
              <h1 className="self-stretch my-auto h-4 w-[97px]">PeakForm</h1>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-2 justify-center items-center self-stretch p-1 my-auto text-lg leading-none whitespace-nowrap min-w-60 rounded-[64px] text-neutral-400 max-md:max-w-full">
            {navItems.map((item, index) => (
              <NavLink key={index} href={item.href} width={item.width}>
                {item.text}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="self-stretch my-auto text-base font-medium leading-tight">
            <a
              href="#"
              className="flex overflow-hidden relative justify-center items-start px-6 py-4 bg-stone-900 rounded-[64px] max-md:px-5 hover:bg-stone-800 transition-colors"
            >
              <button
                onClick={() =>
                  (window.location.href = "http://localhost:3000/dashboard")
                }
                className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
              >
                Back to dashboard
              </button>

              <button
                onClick={() =>
                  (window.location.href =
                    "http://localhost:3000/workoutplanner")
                }
                className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
              >
                Create workout
              </button>
              <div className="flex absolute inset-0 z-0 shrink-0 self-start border border-solid border-[color:var(--prestige-framer-website-mine-shaft,#3B3B3B)] h-[52px] rounded-[64px] w-[136px]"></div>
            </a>
          </div>
        </nav>

        {/* Bottom border */}
        <div className="flex absolute inset-x-0 top-0 -bottom-4 z-0 self-start border-solid border-b-[0.8px] border-b-[color:var(--prestige-framer-website-cod-gray,#161616)] min-h-[108px] w-[1440px] max-md:max-w-full"></div>
      </div>
    </header>
  );
}

export default Header;
