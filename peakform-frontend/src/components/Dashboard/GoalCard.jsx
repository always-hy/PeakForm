import { API_URL } from "@/config";
import React, { useState, useEffect } from "react";

const AchievementBadges = ({
  userUuid = localStorage.getItem("user_uuid"),
}) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBadge, setHoveredBadge] = useState(null);

  // Map achievement names to their corresponding images
  const achievementImages = {
    "Target Weight Reached": "/Target_Weight_Reached.png",
    "10 Workout Completed": "/Workouts_Completed_10.png",
    "50 Workout Completed": "/Workouts_Completed_50.png",
    "100 Workout Completed": "/Workouts_Completed_100.png",
    "10 Water Intake Target Reached": "/Water_Intake_10.png",
    "50 Water Intake Target Reached": "/Water_Intake_50.png",
    "100 Water Intake Target Reached": "/Water_Intake_100.png",
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `${API_URL}/user-achievements?userUuid=${userUuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log("Fetched achievements:", data);
        setAchievements(Array.isArray(data) ? data : data.achievements || []);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        // Fallback to mock data for demo
        setAchievements([
          {
            achievementName: "10 Workout Completed",
            achievedAt: "2025-04-08T00:27:12",
          },
          {
            achievementName: "10 Water Intake Target Reached",
            achievedAt: "2025-04-03T00:27:12",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userUuid]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-7 max-w-full">
      <h3 className="text-xl font-bold text-white mb-4">Achievement Badges</h3>

      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-400 text-lg">No achievements yet!</p>
          <p className="text-slate-500 text-sm mt-2">
            Keep working towards your goals to earn badges.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform transition-all duration-200 hover:scale-105"
              onMouseEnter={() => setHoveredBadge(index)}
              onMouseLeave={() => setHoveredBadge(null)}
            >
              <div className="bg-zinc-900 rounded-xl p-2 border-2 border-transparent group-hover:border-green-500 transition-colors duration-200">
                <img
                  src={
                    achievementImages[achievement.achievementName] ||
                    "/default_badge.png"
                  }
                  alt={achievement.achievementName}
                  className="w-full h-28 object-contain mx-auto"
                />
              </div>

              {/* Hover Tooltip */}
              {hoveredBadge === index && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                  <div className="bg-black bg-opacity-90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                    <p className="font-semibold">
                      {achievement.achievementName}
                    </p>
                    <p className="text-green-400 mt-1">
                      Achieved: {formatDate(achievement.achievedAt)}
                    </p>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black border-t-opacity-90"></div>
                  </div>
                </div>
              )}

              {/* Shine Effect on Hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 transition-opacity duration-200"></div>
            </div>
          ))}
        </div>
      )}

      {/* Achievement Stats */}
      <div className="mt-6 bg-zinc-900 rounded-xl p-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Total Achievements:</span>
          <span className="text-green-500 font-semibold">
            {achievements.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;
