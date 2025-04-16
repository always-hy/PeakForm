import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import ActivityCard from "./ActivityCard";
import ProgressCard from "./ProgressCard";
import Calendar from "./Calendar";
import CaloriesBurnedGraph from "./d3Graphs/CaloriesBurnedGraph";
import UserStatsModal from "./UserStatsModal";
import axios from "axios";

const MainContent = ({ userData, userUuid, userTarget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gymBookings, setGymBookings] = useState([]);
  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to handle modal form submission
  const handleModalSubmit = (updatedValues) => {
    // Here you could call the API to update the stats with the updated values
    // For example:
    // callApiToUpdateStats(updatedValues);

    // In this example, we'll just log the updated values
    console.log(updatedValues);
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const statsResponse = await fetch(
          // "http://localhost:8080/user-schedules/records?userUuid=" + data.userUuid,
          `http://localhost:8080/user-schedules/records?userUuid=${userUuid}`,

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
        }
      } catch (error) {
        console.error("Error during login or fetching gym data:", error);
      }
    };
    if (userUuid) {
      fetchActivity();
    }
  }, [userUuid]);

  if (!userData | !userTarget) {
    return "Loading";
  }

  return (
    <section class="self-stretch mt-24 min-w-60 w-[882px] max-md:max-w-full md:flex-1">
      <header className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
        <div className="min-w-60 w-[246px]">
          <h2 className="text-lg font-medium text-zinc-400">Good Morning</h2>
          <h1 className="text-3xl font-bold text-white">Welcome Back 🎉</h1>
        </div>
        <div className="flex gap-8 items-center">
          <button
            onClick={() => (window.location.href = "http://localhost:3000/gym")}
            className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
          >
            Book a gym session
          </button>
          <img
            src="/notification.png"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Notification"
          />
        </div>
      </header>

      <div className="mt-8 w-full max-md:max-w-full relative">
        <button
          onClick={openModal}
          className="relative top-0 right-0 bg-green-500 p-4 rounded-full text-white shadow-xl"
        >
          Update Stats
        </button>
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-7 items-center w-full max-md:max-w-full">
            <StatCard
              title="Workout Duration"
              icon="/workout-duration.png"
              type="duration"
              value={userData.workoutDuration}
            />
            <StatCard
              title="Water"
              icon="/Water.png"
              type="water"
              value={userData.waterIntake}
              target={userTarget.targetWaterIntake}
            />
            <StatCard
              title="Calories"
              icon="/Cal.png"
              type="calories"
              value={userData.caloriesBurned}
              target={userTarget.targetCaloriesBurned}
              chart={
                <CaloriesBurnedGraph
                  value={userData.caloriesBurned}
                  target={userTarget.targetCaloriesBurned}
                />
              }
            />
            <StatCard
              title="Streak"
              icon="/streak.png"
              type="streak"
              value="110"
              unit="Days"
              chart="/streak_line.png"
            />
          </div>

          <div className="flex flex-wrap gap-7 items-center mt-8 w-full max-md:max-w-full">
            <ActivityCard userUuid={userUuid} gymBookings={gymBookings} />
            <ProgressCard />
          </div>
        </div>
        {/* <div className="mt-8">
          <Calendar />
        </div> */}
      </div>

      {/* Modal */}
      <UserStatsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={userData} // Pass the current stats values
        onSubmit={handleModalSubmit} // Handle the form submission
        userUuid={userUuid} // Pass the userUuid to the Modal
      />
    </section>
  );
};

export default MainContent;
