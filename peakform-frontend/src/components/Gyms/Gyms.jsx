// pages/gyms.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const gymData = [
  {
    id: 1,
    name: "Powerhouse Fitness",
    location: "123 Main Street, Downtown",
    openingHours: "Mon-Fri: 6am-10pm, Sat-Sun: 8am-8pm",
    imageUrl: "/images/gym1.jpg",
  },
  {
    id: 2,
    name: "Elite Training Center",
    location: "456 Park Avenue, Midtown",
    openingHours: "24/7",
    imageUrl: "/images/gym2.jpg",
  },
  {
    id: 3,
    name: "Flex Gym & Spa",
    location: "789 Ocean Drive, Beachside",
    openingHours: "Mon-Sun: 5am-11pm",
    imageUrl: "/images/gym3.jpg",
  },
  {
    id: 4,
    name: "Iron Athletics",
    location: "101 Mountain View Road, Uptown",
    openingHours: "Mon-Fri: 5am-10pm, Sat-Sun: 7am-9pm",
    imageUrl: "/images/gym4.jpg",
  },
  {
    id: 5,
    name: "Core Strength Studio",
    location: "202 River Lane, Eastside",
    openingHours: "Mon-Fri: 6am-9pm, Sat: 8am-6pm, Sun: Closed",
    imageUrl: "/images/gym5.jpg",
  },
];

export default function GymsPage() {
  // In a real app, you would fetch gym data from an API
  const [gyms, setGyms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Simulating data fetch - replace with your actual API call
    setGyms(gymData);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar isOpen={isSidebarOpen} toggleOpen={toggleSidebar} />
      <div className="flex-1 container mx-auto px-4 py-8 ml-0 md:ml-[100px]">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left text-white">
          Find a Gym Near You
        </h1>

        <div className="space-y-6">
          {gyms.map((gym) => (
            <Link href={`/gym/${gym.id}`} key={gym.id} className="block">
              <div className="border-2 border-[#0ADE1E] rounded-lg overflow-hidden bg-[#1C1C1C] shadow-md hover:shadow-lg hover:shadow-[#0ADE1E]/30 transition-all duration-300 flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                  <Image
                    src={gym.imageUrl}
                    alt={gym.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                    unoptimized // Remove this in production and use real images
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {gym.name}
                    </h2>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#0ADE1E] mt-0.5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <span className="text-white opacity-90">
                          {gym.location}
                        </span>
                      </div>

                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#0ADE1E] mt-0.5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span className="text-white opacity-90">
                          {gym.openingHours}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
