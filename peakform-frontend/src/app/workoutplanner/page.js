import Image from "next/image";

import React from "react";
import PlannerLayout from "@/components/WorkoutPlanner/PlannerLayout";
import Sidebar from "@/components/WorkoutPlanner/Sidebar";
export default function Page() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <PlannerLayout />
      </div>
    </div>
  );
}
