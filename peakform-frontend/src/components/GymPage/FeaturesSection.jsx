"use client";
import React, { useState } from "react";

/**
 * AccordionItem component for features section
 */
function AccordionItem({ title, number, isOpen, onClick }) {
  const formattedNumber = number.toString().padStart(2, "0");

  return (
    <div className="z-0 w-full max-md:max-w-full">
      {/* Top border line */}
      <div className="w-full border border-green-500 border-solid min-h-px max-md:max-w-full" />

      {/* Accordion header */}
      <div
        className="flex flex-wrap gap-10 items-start px-2 pt-4 pb-6 w-full max-md:max-w-full cursor-pointer hover:bg-stone-900 transition-colors"
        onClick={onClick}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <h3 className="flex-1 shrink gap-2 pr-2 text-white basis-0 min-w-60 max-md:max-w-full">
          {title}
        </h3>
        <span className="gap-2 text-green-500 whitespace-nowrap">
          {formattedNumber}
        </span>
      </div>

      {/* Accordion content */}
      {isOpen && (
        <div className="px-2 pb-6 text-gray-300 animate-fadeIn">
          <p>
            Detailed information about this feature would appear here when
            expanded.
          </p>
          <ul className="mt-4 ml-6 list-disc">
            <li className="mt-2">Feature benefit point 1</li>
            <li className="mt-2">Feature benefit point 2</li>
            <li className="mt-2">Feature benefit point 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * FeaturesSection component - Displays gym features in an accordion
 */
function FeaturesSection() {
  const [openItem, setOpenItem] = useState(0);

  // Feature data
  const features = [
    { id: 1, title: "State-of-the-art Equipment", number: 1 },
    { id: 2, title: "Professional Trainers", number: 2 },
    { id: 3, title: "Luxury Amenities", number: 3 },
    { id: 4, title: "Specialized Classes", number: 4 },
    { id: 5, title: "Nutrition Guidance", number: 5 },
  ];

  // Toggle accordion item
  const toggleItem = (index) => {
    setOpenItem(index === openItem ? -1 : index);
  };

  return (
    <section className="flex overflow-hidden flex-wrap items-start px-32 py-24 w-full bg-black max-md:px-5 max-md:max-w-full">
      {/* Section heading */}
      <h2 className="grow shrink text-4xl font-semibold tracking-wide leading-tight text-white w-[326px]">
        Features and Benefits
      </h2>

      {/* Accordion container */}
      <div className="flex flex-col grow shrink items-start text-2xl leading-none bg-black rounded-xl min-w-60 w-[510px] max-md:max-w-full">
        <div className="relative p-2 max-w-full w-[560px]">
          {/* Render accordion items */}
          {features.map((feature, index) => (
            <AccordionItem
              key={feature.id}
              title={feature.title}
              number={feature.number}
              isOpen={openItem === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
