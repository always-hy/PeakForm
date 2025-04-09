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
    const loginAndFetchGym = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/gyms/1?userUuid=9fa2fa3e-a194-4187-95a3-5c818c433973"
        );

        setGymData(response.data);
        console.log("Gym data:", response.data);
      } catch (error) {
        console.error("Error during login or fetching gym data:", error);
      }
    };

    loginAndFetchGym();
  }, []);

  if (!gymData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="overflow-hidden bg-black shadow-[0px_3px_6px_rgba(18,15,40,0.12)]">
      <Header />
      <GymHero gymData={gymData} />
      <FeaturesSection />
      <FeaturedPhotos />
      <BookingSection />
      <RelatedGyms />
      <Footer />
    </main>
  );
}

export default GymPageIndividual;
