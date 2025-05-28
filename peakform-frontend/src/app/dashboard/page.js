import Image from "next/image";

import React from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Sidebar from "@/components/Dashboard/Sidebar";
export default function Page() {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardLayout />
    </div>
  );
}
