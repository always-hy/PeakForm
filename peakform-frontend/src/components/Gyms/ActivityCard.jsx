"use client";

import { useState, useEffect } from "react";

const ActivityCard = ({ userUuid, gymBookings }) => {
  const [bookings, setBookings] = useState(gymBookings?.bookingRecords || []);

  // Update bookings whenever gymBookings changes
  useEffect(() => {
    setBookings(gymBookings?.bookingRecords || []);
  }, [gymBookings]);

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
    <article className="flex flex-col h-full py-5 px-4 text-white bg-zinc-900 border-l border-zinc-800">
      <div className="flex gap-4 justify-between items-center w-full mb-4">
        <h3 className="text-xl font-semibold leading-tight">Activity</h3>
      </div>

      <div className="overflow-y-auto flex-grow pr-1 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
        {bookings.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center">No bookings available.</p>
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
  );
};

export default ActivityCard;
