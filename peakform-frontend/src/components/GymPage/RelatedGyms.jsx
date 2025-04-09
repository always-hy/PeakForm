import React from "react";
import GymCard from "./GymCard";

/**
 * RelatedGyms component - Displays a section of related gyms
 */
function RelatedGyms() {
  // Data for related gyms
  const gyms = [
    {
      id: 1,
      title: "Level Up Fitness",
      imageSrc: "/image 1.png",
      ratingSrc: "",
    },
    {
      id: 2,
      title: "Power House Gym",
      imageSrc: "/image 1.png",
      ratingSrc: "",
    },
    {
      id: 3,
      title: "Elite Training Center",
      imageSrc: "/image 1.png",
      ratingSrc: "",
    },
    {
      id: 4,
      title: "Flex Fitness Club",
      imageSrc: "/image 1.png",
      ratingSrc: "",
    },
  ];

  return (
    <section className="px-32 py-24 w-full bg-stone-950 max-md:px-5 max-md:max-w-full">
      {/* Section heading - Added text-center class for small screens */}
      <h2 className="text-5xl leading-none text-white max-md:max-w-full max-md:text-4xl max-md:text-center">
        Other gyms you may like
      </h2>

      {/* Gym cards container */}
      <div className="flex gap-6 items-center mt-10 overflow-x-auto pb-4 max-md:max-w-full">
        <div className="flex flex-wrap gap-6 justify-center items-center self-stretch my-auto min-w-60 max-md:max-w-full">
          {/* Render gym cards */}
          {gyms.map((gym) => (
            <GymCard
              key={gym.id}
              title={gym.title}
              imageSrc={gym.imageSrc}
              ratingSrc={gym.ratingSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedGyms;
