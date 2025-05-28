import React, { useEffect, useState } from "react";
import GymCard from "./GymCard";
import { useNavigate } from "react-router-dom";

function RelatedGyms() {
  const [gyms, setGyms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await fetch("http://localhost:8080/gyms", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setGyms(data);
      } catch (error) {
        console.error("Error fetching gyms:", error);
      }
    };

    fetchGyms();
  }, []);

  const handleCardClick = (gymId) => {
    navigate(`/gym/${gymId}`);
  };

  return (
    <section className="px-32 py-24 w-full bg-stone-950 max-md:px-5 max-md:max-w-full">
      <h2 className="text-5xl leading-none text-white max-md:max-w-full max-md:text-4xl max-md:text-center">
        Other gyms you may like
      </h2>

      <div className="flex gap-6 items-center mt-10 overflow-x-auto pb-4 max-md:max-w-full">
        <div className="flex flex-wrap gap-6 justify-center items-center self-stretch my-auto min-w-60 max-md:max-w-full">
          {gyms.map((gym) => (
            <div
              key={gym.gymId}
              onClick={() => handleCardClick(gym.gymId)}
              className="cursor-pointer"
            >
              <GymCard
                title={gym.gymName}
                imageSrc={gym.gymCoverPhoto}
                ratingSrc=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedGyms;
