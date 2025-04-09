import React from "react";

/**
 * GymCard component - Displays a card for a related gym
 *
 * @param {Object} props - Component props
 * @param {string} props.imageSrc - Source URL for the gym image
 * @param {string} props.title - Title of the gym
 * @param {string} props.ratingSrc - Source URL for the rating image
 */
function GymCard({ imageSrc, title, ratingSrc }) {
  return (
    <article className="flex flex-wrap gap-14 justify-center items-end self-stretch pb-4 my-auto bg-black rounded-2xl min-w-60 shadow-[0px_0px_2px_rgba(23,26,31,0.12)] w-[275px] hover:shadow-lg transition-shadow">
      {/* Gym Image */}
      <img
        src={imageSrc}
        alt={title}
        className="object-contain grow shrink rounded-2xl aspect-[1.49] min-w-60 w-[230px]"
      />

      {/* Card Content */}
      <div className="flex flex-wrap grow shrink gap-14 justify-center items-end w-[182px]">
        {/* Gym Title */}
        <h3 className="grow shrink text-xl font-medium leading-snug text-white w-[222px]">
          {title}
        </h3>

        {/* Rating */}
        <img
          src={ratingSrc}
          alt="Rating"
          className="object-contain grow shrink aspect-[5.26] w-[95px]"
        />
      </div>
    </article>
  );
}

export default GymCard;
