import React, { useState, useEffect, useRef } from "react";
import StatCard from "./StatCard";
import ActivityCard from "./ActivityCard";
import ProgressCard from "./ProgressCard";
import CaloriesBurnedGraph from "./d3Graphs/CaloriesBurnedGraph";
import UserStatsModal from "./UserStatsModal";
import { API_URL } from "@/config";

const MainContent = ({ userData, userUuid, userTarget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gymBookings, setGymBookings] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const notificationRef = useRef(null);

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

  // Function to fetch notifications
  const fetchNotifications = async () => {
    if (!userUuid) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/notifications?userUuid=${userUuid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const notificationData = await response.json();
        setNotifications(notificationData);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        `${API_URL}/notifications/${notificationId}/mark-read?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        // Update the notification state to reflect the change
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.notificationId === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Function to toggle notification panel
  const toggleNotifications = () => {
    if (!isNotificationOpen) {
      fetchNotifications();
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Fetch user data and gym bookings
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("Refreshing user data");
    };

    const fetchActivity = async () => {
      try {
        const statsResponse = await fetch(
          `${API_URL}/user-schedules/records?userUuid=${userUuid}`,
          {
            method: "GET",
            credentials: "include",
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
      fetchNotifications();
    }
  }, [userUuid, refreshTrigger]);

  if (!userData || !userTarget) {
    return "Loading";
  }

  return (
    <section className="self-stretch mt-24 min-w-60 w-[882px] max-md:max-w-full md:flex-1">
      <header className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
        <div className="min-w-60 w-[246px]">
          <h2 className="text-lg font-medium text-zinc-400">Good Morning</h2>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <button
            onClick={toggleNotifications}
            className="relative p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            🎉
          </button>
        </div>
        <div className="flex gap-8 items-center">
          <button
            onClick={async () => {
              try {
                const response = await fetch(
                  `${API_URL}/logout`,
                  {
                    method: "POST",
                    credentials: "include",
                  }
                );
                window.location.href = "/";
              } catch (error) {
                console.error("Logout error:", error);
              }
            }}
            className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
          >
            Logout
          </button>

          {/* Notification Icon with dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotifications}
              className="relative p-1 hover:bg-gray-800 rounded-full transition-colors"
            >
              <img
                src="/notification.png"
                className="object-contain shrink-0 w-6 aspect-square"
                alt="Notification"
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#1c1c1c] border border-[#05A31D] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <p className="text-sm text-gray-400">
                      {unreadCount} unread
                    </p>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center text-gray-400">
                      Loading notifications...
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.notificationId}
                        onClick={() =>
                          !notification.isRead &&
                          markNotificationAsRead(notification.notificationId)
                        }
                        className={`p-4 border-b border-gray-700 cursor-pointer transition-colors hover:bg-gray-800 ${
                          notification.isRead
                            ? "bg-[#1c1c1c] opacity-70"
                            : "bg-[#05A31D]/10 border-l-4 border-l-[#05A31D]"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p
                              className={`text-sm ${notification.isRead ? "text-gray-400" : "text-white"}`}
                            >
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-[#05A31D] rounded-full ml-2 mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-700 text-center">
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-sm text-[#05A31D] hover:text-green-400 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mt-8 w-full max-md:max-w-full relative">
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
