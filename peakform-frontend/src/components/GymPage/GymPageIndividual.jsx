"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import GymHero from "./GymHero";
import FeaturesSection from "./FeaturesSection";
import FeaturedPhotos from "./FeaturedPhotos";
import BookingSection from "./BookingSection";
import RelatedGyms from "./RelatedGyms";
import Footer from "./Footer";

function GymPageIndividual() {
  const [gymData, setGymData] = useState(null);

  useEffect(() => {
    const FetchGym = async () => {
      try {
        const uuid = localStorage.getItem("user_uuid");
        const statsResponse = await fetch(
          // "http://localhost:8080/user-schedules/records?userUuid=" + data.userUuid,
          `http://localhost:8080/gyms/1?userUuid=${uuid}`,

          {
            method: "GET",
            credentials: "include", // Include session cookies
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setGymData(statsData);
          console.log("Gym Data:", statsData);
        } else {
          const statsError = await statsResponse.text();
          console.error("Gym stats failed:", statsError);
        }
      } catch (error) {
        console.error("Error during login or fetching gym data:", error);
      }
    };

    FetchGym();
  }, []);

  if (!gymData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="overflow-hidden bg-black shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      <GymHero gymData={gymData} />
      <FeaturesSection />
      <FeaturedPhotos gymPhotos={gymData.gymPhotos} />
      <BookingSection gymSessions={gymData.gymSessions} />
      <RelatedGyms />
      <Footer />
    </main>
  );
}

export default GymPageIndividual;
