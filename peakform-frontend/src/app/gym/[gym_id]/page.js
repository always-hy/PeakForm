import Image from "next/image";

import React from "react";
import GymPageIndividual from "@/components/GymPage/GymPageIndividual";
import Header from "@/components/GymPage/Header";
export default function Page() {
  return (
    <div className="flex-row min-h-screen w-full">
      <Header />
      <GymPageIndividual />
    </div>
  );
}
