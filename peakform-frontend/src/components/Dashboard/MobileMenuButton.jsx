import React from "react";

const MobileMenuButton = ({ isOpen, toggleOpen }) => {
  return (
    <button
      onClick={toggleOpen}
      className="fixed top-4 right-4 z-50 p-2 rounded-md bg-green-500 text-white block md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="w-6 flex flex-col justify-between h-5">
        <span
          className={`h-0.5 w-full bg-white transform transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`h-0.5 w-full bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`h-0.5 w-full bg-white transform transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>
    </button>
  );
};

export default MobileMenuButton;
