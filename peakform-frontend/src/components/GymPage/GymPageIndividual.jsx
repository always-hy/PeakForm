"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
        const response = await axios.get(
          "http://localhost:8080/gyms/1?userUuid=ba103f6e-4f5e-47d6-9eb8-4cf084fb79cf"
        );

        setGymData(response.data);
        console.log("Gym data:", response.data);
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
      <Header />
      <GymHero gymData={gymData} />
      <FeaturesSection />
      <FeaturedPhotos gymPhotos={gymData.gymPhotos} />
      <BookingSection />
      <RelatedGyms />
      <Footer />
    </main>
  );
}

export default GymPageIndividual;
