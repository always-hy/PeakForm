"use client";

import { useState, useEffect } from "react";

const ActivityCard = ({ userUuid, gymBookings }) => {
  const [bookings, setBookings] = useState(gymBookings?.bookingRecords || []);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [achievementData, setAchievementData] = useState(null);

  // Map achievement names to their corresponding images
  const achievementImages = {
    "10 Workout Completed": "/Workouts_Completed_10.png",
    "50 Workout Completed": "/Workouts_Completed_50.png",
    "100 Workout Completed": "/Workouts_Completed_100.png",
  };

  // Update bookings whenever gymBookings changes
  useEffect(() => {
    setBookings(gymBookings?.bookingRecords || []);
  }, [gymBookings]);

  // Function to extract achievement from response message
  const extractAchievement = (responseText) => {
    const achievementMatch = responseText.match(
      /New achievement unlocked: "([^"]+)"/
    );
    return achievementMatch ? achievementMatch[1] : null;
  };

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

  // Function to update the status of a booking and send the API request
  const handleStatusChange = async (gymSessionId, newStatus) => {
    let url = "";

    // Set the URL based on the new status
    if (newStatus === "COMPLETED") {
      url = `http://localhost:8080/user-schedules/complete?gymSessionId=${gymSessionId}&userUuid=${userUuid}`;
    } else if (newStatus === "MISSED") {
      url = `http://localhost:8080/user-schedules/miss?gymSessionId=${gymSessionId}&userUuid=${userUuid}`;
    } else if (newStatus === "CANCELLED") {
      url = `http://localhost:8080/user-schedules/cancel?gymSessionId=${gymSessionId}&userUuid=${userUuid}`;
    }

    try {
      // Send the API request to update the status
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        // Get the response text to check for achievements
        const responseText = await response.text();

        // Check if a new achievement was unlocked
        const achievement = extractAchievement(responseText);
        if (achievement) {
          showAchievement(achievement);
        }

        // Update the booking status in the local state
        setBookings((prevBookings) => {
          if (!Array.isArray(prevBookings)) {
            return [];
          }

          return prevBookings.map((booking) =>
            booking.gymSessionId === gymSessionId
              ? { ...booking, appointmentStatus: newStatus }
              : booking
          );
        });
      } else {
        console.error("Failed to update the status");
      }
    } catch (error) {
      console.error("Error updating the status:", error);
    }
  };

  return (
    <>
      <article className="flex flex-col h-full py-5 px-4 text-white bg-zinc-900 border-l border-zinc-800">
        <div className="flex gap-4 justify-between items-center w-full mb-4">
          <h3 className="text-xl font-semibold leading-tight">Activity</h3>
        </div>

        <div className="overflow-y-auto flex-grow pr-1 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
          {bookings.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-center">
                No bookings available.
              </p>
            </div>
          ) : (
            bookings.map((record, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 p-3 bg-zinc-800 rounded-lg text-sm leading-tight transition-all hover:bg-zinc-750 break-words"
              >
                <span className="font-medium truncate">{record.gymName}</span>
                <span>{record.date}</span>
                <span>
                  {record.sessionStart} - {record.sessionEnd}
                </span>
                <span
                  className={`capitalize font-semibold ${
                    record.appointmentStatus === "COMPLETED"
                      ? "text-green-400"
                      : record.appointmentStatus === "MISSED"
                        ? "text-red-400"
                        : record.appointmentStatus === "CANCELLED"
                          ? "text-yellow-400"
                          : "text-gray-300"
                  }`}
                >
                  [{record.appointmentStatus.toLowerCase()}]
                </span>

                <div className="flex flex-wrap gap-2 mt-2">
                  {["COMPLETED", "MISSED", "CANCELLED"].map((status) => (
                    <button
                      key={status}
                      className={`px-1.5 py-0.5 text-xs rounded transition-colors ${
                        status === record.appointmentStatus
                          ? "bg-[#0ADE1E] text-black font-medium"
                          : "bg-zinc-700 hover:bg-zinc-600"
                      }`}
                      onClick={() =>
                        handleStatusChange(record.gymSessionId, status)
                      }
                    >
                      {status.charAt(0) + status.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </article>

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
              Congratulations! You've reached a new milestone in your fitness
              journey. Keep up the great work! 💪
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

export default ActivityCard;
