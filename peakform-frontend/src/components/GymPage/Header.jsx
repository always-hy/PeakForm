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
    { text: "Home", width: "w-[66px]" },
    { text: "Gyms", width: "w-[57px]" },
    { text: "Dashboard", width: "w-[107px]" },
    { text: "Notifications", width: "w-[122px]" },
    { text: "Pricing", width: "w-[73px]" },
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
                src="/logo.png"
                alt="PeakForm Logo"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
              />
              <h1 className="self-stretch my-auto h-4 w-[97px]">PeakForm</h1>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-2 justify-center items-center self-stretch p-1 my-auto text-lg leading-none whitespace-nowrap min-w-60 rounded-[64px] text-neutral-400 max-md:max-w-full">
            {navItems.map((item, index) => (
              <NavLink key={index} width={item.width}>
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
              <span className="z-0 my-auto">Get started</span>
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
