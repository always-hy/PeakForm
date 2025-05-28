import { API_URL } from "@/config";
import React, { useState, useEffect } from "react";

const ProfileStatCard = ({
  label,
  value,
  unit,
  type, // This should be used to identify the stat type (height or weight)
  userUuid,
  onUpdate,
  allStats,
  userTarget, // Add this prop to get the target weight
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [updateStatus, setUpdateStatus] = useState("");
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [achievementData, setAchievementData] = useState(null);

  // Achievement image for target weight reached
  const achievementImage = "/target_weight_reached.png"; // Update this path as needed

  // Update local state when props change
  useEffect(() => {
    setNewValue(value);
  }, [value]);

  // Function to show achievement popup
  const showAchievement = () => {
    setAchievementData({
      name: "Target Weight Reached",
      image: achievementImage,
    });
    setShowAchievementPopup(true);
  };

  // Function to close achievement popup
  const closeAchievementPopup = () => {
    setShowAchievementPopup(false);
    setAchievementData(null);
  };

  const updateStat = async (statName, statValue) => {
    const statFieldMap = {
      water: "waterIntake",
      calories: "caloriesBurned",
      duration: "workoutDuration",
      weight: "weight",
      height: "height",
    };

    const body = {
      ...allStats,
      [statName]: parseFloat(statValue),
    };

    try {
      const response = await fetch(
        `${API_URL}/user-stats/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        setUpdateStatus("Updated!");
        console.log(body);

        // Check if target weight is reached when updating weight
        if (type === "weight" && userTarget && userTarget.targetWeight) {
          const targetWeight = parseFloat(userTarget.targetWeight);
          const currentWeight = parseFloat(statValue);

          // Show achievement if target weight is reached
          if (currentWeight === targetWeight) {
            showAchievement();
          }
        }

        // Update the local value immediately to reflect the change
        setNewValue(statValue);

        setTimeout(() => setUpdateStatus(""), 2000);

        // Call the onUpdate callback to refresh parent component data
        if (onUpdate) {
          onUpdate();
        }

        return true;
      } else {
        setUpdateStatus("Failed!");
        setTimeout(() => setUpdateStatus(""), 2000);
        return false;
      }
    } catch (err) {
      setUpdateStatus("Error!");
      setTimeout(() => setUpdateStatus(""), 2000);
      return false;
    }
  };

  // Handle save
  const handleSave = async () => {
    const statFieldMap = {
      weight: "weight",
      height: "height",
    };
    const statField = statFieldMap[type];
    if (newValue !== value) {
      const success = await updateStat(statField, newValue);
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center p-4 bg-zinc-800 rounded-lg text-white">
        {/* Edit button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-0 right-0 text-xs bg-green-500 rounded-full w-5 h-5 flex items-center justify-center"
          style={{ transform: "translate(50%, -50%)" }}
        >
          {isEditing ? "X" : "✏️"}
        </button>

        {/* Status indicator */}
        {updateStatus && (
          <div className="absolute top-0 left-0 text-xs bg-blue-500 px-2 py-1 rounded">
            {updateStatus}
          </div>
        )}

        {isEditing ? (
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-16 p-1 text-sm bg-zinc-800 border border-green-500 rounded text-white mb-1"
            />
            <button
              onClick={handleSave}
              className="text-xs bg-green-500 px-2 py-1 rounded mb-1"
            >
              Save
            </button>
            <div className="text-xs text-gray-400 text-center">{label}</div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-center">
              {newValue}
              <span className="text-sm font-normal text-gray-400 ml-1">
                {unit}
              </span>
            </div>
            <div className="text-xs text-gray-400 text-center mt-1">
              {label}
            </div>
          </>
        )}
      </div>

      {/* Achievement Popup */}
      {showAchievementPopup && achievementData && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-2xl p-8 max-w-sm w-full mx-4 text-center border-2 border-green-500 shadow-2xl animate-pulse">
            {/* Celebration Icons */}
            <div className="text-4xl mb-4">🎉✨🏆</div>

            {/* Achievement Badge */}
            <div className="mb-6">
              <img
                src={achievementData.image}
                alt={achievementData.name}
                className="w-24 h-24 mx-auto object-contain mb-4 animate-bounce"
              />
            </div>

            {/* Achievement Text */}
            <h2 className="text-2xl font-bold text-white mb-2">
              🎊 Achievement Unlocked! 🎊
            </h2>
            <p className="text-green-400 text-lg font-semibold mb-6">
              {achievementData.name}
            </p>

            <p className="text-gray-300 text-sm mb-6">
              Congratulations! You've reached your target weight! This is a huge
              milestone in your fitness journey. Keep up the amazing work! 💪
            </p>

            {/* Close Button */}
            <button
              onClick={closeAchievementPopup}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              Awesome! 🚀
            </button>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-yellow-400 text-2xl animate-ping">
              ⭐
            </div>
            <div className="absolute top-1/3 right-1/4 text-green-400 text-3xl animate-pulse">
              🌟
            </div>
            <div className="absolute bottom-1/3 left-1/3 text-blue-400 text-2xl animate-bounce">
              ✨
            </div>
            <div className="absolute bottom-1/4 right-1/3 text-purple-400 text-3xl animate-ping">
              💫
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStatCard;
