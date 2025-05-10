"use client";
import React from "react";

const Button = ({ children, variant = "primary", className = "" }) => {
  const baseStyles =
    "flex justify-center items-center px-6 py-4 font-medium leading-tight rounded-[64px] transition-colors";

  const variants = {
    primary: "bg-stone-900 text-zinc-50 border border-[#3B3B3B]",
    light: "bg-zinc-50 text-zinc-900",
    green: "bg-green-500 text-zinc-900",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
