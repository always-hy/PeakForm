import React, { useState, useEffect } from "react";
import StatCard from "./StatCard";
import ActivityCard from "./ActivityCard";
import ProgressCard from "./ProgressCard";
import Calendar from "./Calendar";
import CaloriesBurnedGraph from "./d3Graphs/CaloriesBurnedGraph";
import UserStatsModal from "./UserStatsModal";

const MainContent = ({ userData, userUuid, userTarget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gymBookings, setGymBookings] = useState([]);
  // State to track if stats have been updated
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to trigger refresh of data
  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Function to handle modal form submission
  const handleModalSubmit = (updatedValues) => {
    console.log(updatedValues);
    refreshData();
  };

  // Fetch user data and gym bookings
  useEffect(() => {
    const fetchUserData = async () => {
      // You would add code here to refresh userData and userTarget
      // by making API calls similar to what you have in your app elsewhere
      console.log("Refreshing user data");
    };

    const fetchActivity = async () => {
      try {
        const statsResponse = await fetch(
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
      fetchUserData();
    }
  }, [userUuid, refreshTrigger]); // Add refreshTrigger to dependencies

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
            onClick={async () => {
              try {
                const response = await fetch("http://localhost:8080/logout", {
                  method: "POST",
                  credentials: "include",
                });
                window.location.href = "/";
              } catch (error) {
                console.error("Logout error:", error);
              }
            }}
            className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
          >
            Logout
          </button>

          <button
            onClick={() => (window.location.href = "http://localhost:3000/gym")}
            className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
          >
            Book a session
          </button>
          <img
            src="/notification.png"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Notification"
          />
        </div>
      </header>

      <div className="mt-8 w-full max-md:max-w-full relative">
        {/* <button
          onClick={openModal}
          className="relative top-0 right-0 bg-green-500 p-4 rounded-full text-white shadow-xl"
        >
          Update All Stats
        </button> */}
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-7 items-center w-full max-md:max-w-full">
            <StatCard
              title="Workout Duration"
              icon="/workout-duration.png"
              type="duration"
              target={userTarget.targetWorkoutDuration}
              value={userData.workoutDuration}
              userUuid={userUuid}
              unit="minutes"
              allStats={userData}
              allTargets={userTarget}
            />
            <StatCard
              title="Water"
              icon="/Water.png"
              type="water"
              unit="Litres"
              value={userData.waterIntake}
              target={userTarget.targetWaterIntake}
              userUuid={userUuid}
              allStats={userData}
              allTargets={userTarget}
            />
            <StatCard
              title="Calories"
              icon="/Cal.png"
              type="calories"
              value={userData.caloriesBurned}
              target={userTarget.targetCaloriesBurned}
              unit="kCal"
              userUuid={userUuid}
              chart={
                <CaloriesBurnedGraph
                  value={userData.caloriesBurned}
                  target={userTarget.targetCaloriesBurned}
                />
              }
              allStats={userData}
              allTargets={userTarget}
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

      {/* Modal - Keep as a backup for batch updates */}
      <UserStatsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={userData}
        targetData={userTarget}
        onSubmit={handleModalSubmit}
        userUuid={userUuid}
      />
    </section>
  );
};

export default MainContent;
