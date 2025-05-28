"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "./Header";
import GymHero from "./GymHero";
import FeaturesSection from "./FeaturesSection";
import FeaturedPhotos from "./FeaturedPhotos";
import BookingSection from "./BookingSection";
import RelatedGyms from "./RelatedGyms";
import Footer from "./Footer";

function GymPageIndividual() {
  const { gym_id } = useParams(); // Correctly match the dynamic segment
  const [gymData, setGymData] = useState(null);

  useEffect(() => {
    if (!gym_id) return;

    const fetchGym = async () => {
      try {
        const uuid = localStorage.getItem("user_uuid");

        const response = await fetch(
          `http://localhost:8080/gyms/${gym_id}?userUuid=${uuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGymData(data);
          console.log("Gym Data:", data);
        } else {
          const error = await response.text();
          console.error("Fetch error:", error);
        }
      } catch (err) {
        console.error("Error fetching gym data:", err);
      }
    };

    fetchGym();
  }, [gym_id]);

  if (!gymData) return <div>Loading...</div>;

  return (
    <main className="overflow-hidden bg-black shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      <GymHero gymData={gymData} />
      <FeaturesSection />
      <FeaturedPhotos gymPhotos={gymData.gymPhotos} />
      <BookingSection gymSessions={gymData.gymSessions} gymId={gym_id} />
      <RelatedGyms />
      <Footer />
    </main>
  );
}

export default GymPageIndividual;
