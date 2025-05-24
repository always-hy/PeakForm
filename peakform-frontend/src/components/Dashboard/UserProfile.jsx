"use client";
import React, { useEffect, useState } from "react";
import GoalCard from "./GoalCard";
import AchievementCard from "./AchievementCard";
import ProfileStatCard from "./ProfileStatCard";
import UserStatsModal from "./UserStatsModal";

const UserProfile = ({ isOpen, toggleOpen, userData, userUuid, profile }) => {
  // Function to open the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [localUserData, setLocalUserData] = useState(userData);

  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to trigger refresh of data
  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Effect to fetch updated user data when needed
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/user-stats/get?userUuid=${userUuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLocalUserData(data);
        }
      } catch (error) {
        console.error("Error fetching updated user data:", error);
      }
    };

    if (userUuid && refreshTrigger > 0) {
      fetchUserData();
    }
  }, [refreshTrigger, userUuid]);

  // Update localUserData when userData prop changes
  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  // Function to handle modal form submission
  const handleModalSubmit = (updatedValues) => {
    // Here you could call the API to update the stats with the updated values
    console.log(updatedValues);
    refreshData();
  };
  // Prevent scrolling when mobile menu is open on mobile only
  useEffect(() => {
    const isMobile = window.innerWidth < 768; // md breakpoint

    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!localUserData || !profile) {
    return "Loading";
  }

  return (
    <>
      {/* Desktop version - always visible */}
      <aside className="hidden md:flex flex-col items-center self-stretch my-auto bg-stone-950 min-h-[1543px] min-w-60 w-[388px]">
        <div className="flex gap-3.5 items-center py-10 max-w-full w-[284px]">
          <div className="flex overflow-hidden flex-col items-center self-stretch my-auto bg-white rounded-xl h-[46px] w-[46px]">
            <div className="flex w-full min-h-[46px]" />
          </div>
          <div className="self-stretch my-auto w-[136px]">
            <h2 className="text-lg font-bold text-white">{profile.username}</h2>
            <div className="flex gap-px items-start">
              <div className="flex justify-between items-center px-1 py-0.5 w-5">
                <img
                  src="/location.png"
                  className="object-contain self-stretch my-auto w-3.5 aspect-[0.82]"
                  alt="Location"
                />
              </div>
              <p className="text-sm text-gray-400">Shenzhen, China</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 mt-8 max-w-full">
          {/* Weight and Height Card */}
          <div className="flex relative gap-10 items-center py-3 pr-6 pl-8 max-w-full min-h-[78px] w-[296px] max-md:px-5">
            <div className="flex absolute bottom-0 z-0 shrink-0 self-start rounded-xl bg-zinc-900 h-[78px] min-w-60 right-[-9px] w-[305px]" />

            <ProfileStatCard
              label="Weight"
              value={localUserData.weight}
              unit="kg"
              type="weight"
              userUuid={userUuid}
              onUpdate={refreshData}
              allStats={localUserData}
            />

            <ProfileStatCard
              label="Height"
              value={localUserData.height}
              unit="cm"
              type="height"
              userUuid={userUuid}
              onUpdate={refreshData}
              allStats={localUserData}
            />

            <div className="flex z-0 flex-col justify-center self-stretch my-auto">
              <div className="text-xl font-semibold text-white">
                <span style={{ fontWeight: 700, fontSize: "24px" }}>22</span>
                <span
                  style={{ fontSize: "14px", color: "rgba(157,172,193,1)" }}
                >
                  yrs
                </span>
              </div>
              <div className="text-base font-medium text-gray-500">Age</div>
            </div>
          </div>
        </div>

        <h3 className="mt-7 text-lg font-semibold text-white">Your Goals</h3>

        {/* Repeat the same goal card 3 times */}
        {[1, 2, 3].map((index) => (
          <GoalCard key={index} />
        ))}

        <h3 className="mt-7 text-lg font-semibold text-white">Goal Progress</h3>

        <div className="px-14 py-5 mt-7 text-sm leading-5 text-center text-white rounded-xl bg-zinc-900 max-md:px-5">
          You have achieved{" "}
          <span style={{ color: "rgba(10,222,30,1)" }}>80%</span> of your
          <br />
          goals. Keep going!
        </div>

        <h3 className="self-stretch mt-7 text-lg font-semibold text-white">
          Achievements
        </h3>

        {/* Repeat the same achievement card 3 times */}
        {[1, 2, 3].map((index) => (
          <AchievementCard key={index} />
        ))}
      </aside>

      {/* Mobile version - slides in */}
      <aside
        className={`md:hidden flex flex-col items-center fixed top-0 right-0 h-full z-40
          bg-stone-950 min-h-[100vh] w-[85%] max-w-[388px]
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{
          paddingBottom: "100px",
        }} /* Ensure space at bottom for scrolling */
      >
        <div className="w-full flex justify-end p-4">
          <button
            onClick={toggleOpen}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-3.5 items-center py-6 max-w-full w-[284px]">
          <div className="flex overflow-hidden flex-col items-center self-stretch my-auto bg-white rounded-xl h-[46px] w-[46px]">
            <div className="flex w-full min-h-[46px]" />
          </div>
          <div className="self-stretch my-auto w-[136px]">
            <h2 className="text-lg font-bold text-white">{profile.username}</h2>
            <div className="flex gap-px items-start">
              <div className="flex justify-between items-center px-1 py-0.5 w-5">
                <img
                  src="/location.png"
                  className="object-contain self-stretch my-auto w-3.5 aspect-[0.82]"
                  alt="Location"
                />
              </div>
              <p className="text-sm text-gray-400">Shenzhen, China</p>
            </div>
          </div>
        </div>

        <div className="flex relative gap-10 items-center py-3 pr-6 pl-8 mt-5 max-w-full min-h-[78px] w-[296px] max-md:px-5">
          <div className="flex absolute bottom-0 z-0 shrink-0 self-start rounded-xl bg-zinc-900 h-[78px] min-w-60 right-[-9px] w-[305px]" />

          <ProfileStatCard
            label="Weight"
            value={localUserData.weight}
            unit="kg"
            type="weight"
            userUuid={userUuid}
            onUpdate={refreshData}
            allStats={userData}
          />

          <ProfileStatCard
            label="Height"
            value={localUserData.height}
            unit="cm"
            type="height"
            userUuid={userUuid}
            onUpdate={refreshData}
            allStats={userData}
          />

          <div className="flex z-0 flex-col justify-center self-stretch my-auto">
            <div className="text-xl font-semibold text-white">
              <span style={{ fontWeight: 700, fontSize: "24px" }}>22</span>
              <span style={{ fontSize: "14px", color: "rgba(157,172,193,1)" }}>
                yrs
              </span>
            </div>
            <div className="text-base font-medium text-gray-500">Age</div>
          </div>
        </div>

        <h3 className="mt-7 text-lg font-semibold text-white">Your Goals</h3>

        {/* Repeat the same goal card 3 times */}
        {[1, 2, 3].map((index) => (
          <GoalCard key={`mobile-goal-${index}`} />
        ))}

        <h3 className="mt-7 text-lg font-semibold text-white">Goal Progress</h3>

        <div className="px-14 py-5 mt-7 text-sm leading-5 text-center text-white rounded-xl bg-zinc-900 max-md:px-5">
          You have achieved{" "}
          <span style={{ color: "rgba(10,222,30,1)" }}>80%</span> of your
          <br />
          goals. Keep going!
        </div>

        <h3 className="self-stretch mt-7 text-lg font-semibold text-white pb-4">
          Achievements
        </h3>

        {/* Repeat the same achievement card 3 times */}
        <div className="w-full flex flex-col items-center pb-20">
          {[1, 2, 3].map((index) => (
            <AchievementCard key={`mobile-achievement-${index}`} />
          ))}
        </div>
      </aside>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleOpen}
          aria-hidden="true"
        />
      )}

      {/* Modal */}
      <UserStatsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={localUserData} // Pass the current stats values
        onSubmit={handleModalSubmit} // Handle the form submission
        userUuid={userUuid} // Pass the userUuid to the Modal
        profile={true}
      />
    </>
  );
};

export default UserProfile;
