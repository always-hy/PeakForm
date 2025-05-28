import React from "react";
import EnhancedWorkoutPlanner from "@/components/AIWorkoutPlanner/ImprovedPlanner";
import Sidebar from "@/components/AIWorkoutPlanner/Sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <div className="flex-1">
        <EnhancedWorkoutPlanner />
      </div>
    </div>
  );
}
