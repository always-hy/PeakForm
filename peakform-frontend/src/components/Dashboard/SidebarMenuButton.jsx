import React from "react";

const SidebarMenuButton = ({ isOpen, toggleOpen }) => {
  return (
    <button
      onClick={toggleOpen}
      className="fixed top-4 left-4 z-50 p-2 rounded-md bg-green-500 text-white block md:hidden"
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        <span
          className={`text-white text-2xl transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          &gt;
        </span>
      </div>
    </button>
  );
};

export default SidebarMenuButton;
