// pages/gyms.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ActivityCard from "./ActivityCard";
import { API_URL } from "@/config";

// Sample data as fallback
const sampleGymData = [
  {
    gymId: 1,
    gymName: "AlphaLand",
    startTime: "09:00:00",
    endTime: "21:00:00",
    location: "123 Fitness St, City Center",
    description: "A gym focused on weightlifting and strength training.",
    contact: "123-456-7890",
    gymCoverPhoto:
      "https://storage.googleapis.com/peakform-3d589.firebasestorage.app/gym-photo/1/1-1.webp?GoogleAccessId=firebase-adminsdk-fbsvc@peakform-3d589.iam.gserviceaccount.com&Expires=1747462159&Signature=GlHQxra%2F3wCvZhvOOFe9XsRRSSG5QRXHG%2FB2zH6nn6JBi6%2BkB%2B0A64GFZjQNgnavWOx5O2ZqFLDm5N8QA4N4%2BIy9W45sRL4eKr8bGWM5kV1KIgC6b%2F9W8zNPbtW3XIAd1jpsOkvFiMesMZ32Llwwy3OLQfEQZQzTZVayzf6Ef6sMHpM3yOeca7LjapHDEnRlVvnLw%2FnbHhQckgQpmFTdpE7A05SvUk%2BOcB%2B%2FYUn46nmKSdWE6UEDJxPlmgxdyQtVgF7NjJnQne7UzEmItoaByuBS4UWiN%2FNU4GsB4mvd43fgWNIRxyucV9VxRKrxE74e%2BTT7N29lBScVoF58p0ZtwA%3D%3D",
  },
];

export default function GymsPage() {
  // In a real app, you would fetch gym data from an API
  const [gyms, setGyms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [storedUuid, setStoredUuid] = useState(null);
  const [gymBookings, setGymBookings] = useState([]);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");
    setStoredUuid(uuid);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Fetch gym data from API
    const fetchGyms = async () => {
      try {
        const response = await fetch(`${API_URL}/gyms`, {
          method: "GET",
          credentials: "include", // Include session cookies
        });

        if (response.ok) {
          const data = await response.json();
          setGyms(Array.isArray(data) ? data : [data]);
          console.log("Gym data fetched:", data);
        } else {
          const error = await response.text();
          console.error("Failed to fetch gyms:", error);
          // Fallback to sample data if API fails
          setGyms(sampleGymData);
        }
      } catch (error) {
        console.error("Error fetching gym data:", error);
        // Fallback to sample data if API fails
        setGyms(sampleGymData);
      }
    };

    fetchGyms();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      // You would add code here to refresh userData and userTarget
      // by making API calls similar to what you have in your app elsewhere
      console.log("Refreshing user data");
    };

    const fetchActivity = async () => {
      try {
        const statsResponse = await fetch(
          `${API_URL}/user-schedules/records?userUuid=${storedUuid}`,
          {
            method: "GET",
            credentials: "include", // Include session cookies
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setGymBookings(statsData);
          console.log("Gym Bookings:", statsData);
        } else {
          const statsError = await statsResponse.text();
          console.error("User stats failed:", statsError);
          // Initialize with empty array to prevent errors
          setGymBookings([]);
        }
      } catch (error) {
        console.error("Error fetching gym bookings:", error);
        // Initialize with empty array to prevent errors
        setGymBookings([]);
      }
    };

    if (storedUuid) {
      fetchActivity();
      fetchUserData();
    }
  }, [storedUuid]);

  if (!gymBookings) {
    return "Loading";
  }

  return (
    <div className="bg-black text-white flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleOpen={toggleSidebar} />
      {/* Main content layout with flex */}
      <div className="flex-1 flex ml-0 md:ml-[100px] h-full">
        {/* Middle section - Gym listings (wider now) */}
        <div className="w-full lg:w-3/4 xl:w-4/5 container px-4 py-8 h-full">
          <h1 className="text-3xl font-bold mb-8 text-center md:text-left text-white">
            Find a Gym Near You
          </h1>

          <div className="space-y-6">
            {gyms.map((gym) => (
              <Link
                href={`/gym/${gym.gymId}`}
                key={gym.gymId}
                className="block"
              >
                <div className="border-2 border-[#0ADE1E] rounded-lg overflow-hidden bg-[#1C1C1C] shadow-md hover:shadow-lg hover:shadow-[#0ADE1E]/30 transition-all duration-300 flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={gym.gymCoverPhoto || "/images/gym-placeholder.jpg"}
                      alt={gym.gymName}
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
                        {gym.gymName}
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
                            {gym.startTime && gym.endTime
                              ? `${gym.startTime.substring(0, 5)} - ${gym.endTime.substring(0, 5)}`
                              : "Hours not available"}
                          </span>
                        </div>

                        {gym.contact && (
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
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            <span className="text-white opacity-90">
                              {gym.contact}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {gym.description && (
                      <p className="text-white opacity-80 mt-3 text-sm line-clamp-2">
                        {gym.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right section - Activity card (narrower now) */}
        <div className="hidden lg:block lg:w-1/4 xl:w-1/5 ">
          <ActivityCard userUuid={storedUuid} gymBookings={gymBookings} />
        </div>
      </div>

      {/* Show ActivityCard at the bottom on smaller screens */}
      <div className="lg:hidden w-full fixed bottom-0 left-0 right-0 z-10">
        <ActivityCard userUuid={storedUuid} gymBookings={gymBookings} />
      </div>
    </div>
  );
}
