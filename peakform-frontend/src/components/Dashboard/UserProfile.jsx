"use client";
import React, { useEffect, useState, useRef } from "react";
import AchievementBadges from "./GoalCard";
import AchievementCard from "./AchievementCard";
import ProfileStatCard from "./ProfileStatCard";
import UserStatsModal from "./UserStatsModal";

const UserProfile = ({
  isOpen,
  toggleOpen,
  userData,
  userUuid,
  profile,
  userTarget,
}) => {
  // Function to open the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [localUserData, setLocalUserData] = useState(userData);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [record, setRecord] = useState(null);

  // Achievement image mapping
  const achievementImages = {
    "Target Weight Reached": "/Target_Weight_Reached.png",
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const userUuid = localStorage.getItem("user_uuid");
        if (!userUuid) return;

        const response = await fetch(
          `http://localhost:8080/records?userUuid=${userUuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRecord(data);
        } else {
          console.error("Failed to fetch records");
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to show achievement popup
  const showAchievement = (achievementName) => {
    setAchievementData({
      name: achievementName,
      image: achievementImages[achievementName],
    });
    setShowAchievementPopup(true);
  };

  // Function to close achievement popup
  const closeAchievementPopup = () => {
    setShowAchievementPopup(false);
    setAchievementData(null);
  };

  // Function to check if target weight is reached
  const checkTargetWeightAchievement = (currentWeight) => {
    if (
      userTarget &&
      userTarget.targetWeight &&
      currentWeight === userTarget.targetWeight
    ) {
      showAchievement("Target Weight Reached");
    }
  };

  // Enhanced refresh function that also checks for achievements
  const refreshData = (updatedWeight) => {
    setRefreshTrigger((prev) => prev + 1);

    // Check for target weight achievement if weight was updated
    if (updatedWeight !== undefined) {
      checkTargetWeightAchievement(updatedWeight);
    }
  };

  // Function to handle profile picture upload
  const handleProfilePictureUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
      alert("Please select a JPEG image file.");
      return;
    }

    // Validate file size (optional - e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size must be less than 5MB.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", localStorage.getItem("user_uuid"));

      const response = await fetch(
        "http://localhost:8080/user/upload-profile",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {
        // Refresh user data to get the new profile picture URL
        refreshData();
      } else {
        const errorData = await response.text();
        console.error("Upload failed:", errorData);
        alert("Failed to upload profile picture. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Function to trigger file input click
  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Function to handle file input change
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleProfilePictureUpload(file);
    }
    // Reset the input value so the same file can be selected again
    event.target.value = "";
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

    // Check if weight was updated and if it matches target
    if (updatedValues.weight !== undefined) {
      refreshData(updatedValues.weight);
    } else {
      refreshData();
    }
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

  // Profile picture component with upload functionality
  const ProfilePicture = ({ className, onClick }) => (
    <div
      className={`flex overflow-hidden flex-col items-center self-stretch my-auto bg-white rounded-xl h-[46px] w-[46px] relative cursor-pointer group ${className}`}
      onClick={onClick}
      title="Click to change profile picture"
    >
      <img
        src={profile.url}
        alt="Profile"
        className="h-[46px] w-[46px] object-cover"
      />

      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />

      {/* Desktop version - always visible */}
      <aside className="hidden md:flex flex-col items-center bg-stone-950 w-[388px] min-w-60 min-h-screen">
        <div className="flex gap-3.5 items-center py-10 max-w-full w-[284px]">
          <ProfilePicture onClick={handleProfilePictureClick} />
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
          <div className="flex justify-start relative gap-6 items-start py-3 px-0 max-w-full min-h-[78px] w-[296px]">
            <ProfileStatCard
              label="Weight"
              value={localUserData.weight}
              unit="kg"
              type="weight"
              userUuid={userUuid}
              onUpdate={refreshData}
              allStats={localUserData}
              userTarget={userTarget}
              onTargetWeightReached={() =>
                showAchievement("Target Weight Reached")
              }
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

        <AchievementBadges />

        <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
        {record && (
          <div className="flex flex-wrap gap-4">
            <AchievementCard title="Squat" value={record.squatPr} />
            <AchievementCard title="BenchPress" value={record.benchPressPr} />
            <AchievementCard title="Deadlift" value={record.deadliftPr} />
          </div>
        )}
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
          <ProfilePicture onClick={handleProfilePictureClick} />
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
            userTarget={userTarget}
            onTargetWeightReached={() =>
              showAchievement("Target Weight Reached")
            }
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

        <AchievementBadges />
        <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
        {record && (
          <div className="flex flex-wrap gap-4">
            <AchievementCard title="Squat" value={record.squatPr} />
            <AchievementCard title="BenchPress" value={record.benchPressPr} />
            <AchievementCard title="Deadlift" value={record.deadliftPr} />
          </div>
        )}
      </aside>

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
