"use client";

import { useState } from "react";

const ActivityCard = ({ userUuid, gymBookings }) => {
  const [bookings, setBookings] = useState(gymBookings.bookingRecords);

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
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.gymSessionId === gymSessionId
              ? { ...booking, appointmentStatus: newStatus }
              : booking
          )
        );
      } else {
        console.error("Failed to update the status");
      }
    } catch (error) {
      console.error("Error updating the status:", error);
    }
  };

  return (
    <article className="grow shrink self-stretch px-5 pt-5 pb-6 my-auto text-white whitespace-nowrap rounded-xl bg-zinc-900 min-h-[271px] min-w-60 w-[342px] max-md:pb-24 max-md:max-w-full">
      <div className="flex gap-10 justify-between items-center w-full mb-4">
        <h3 className="text-xl font-semibold leading-tight">Activity</h3>
      </div>

      <div className="overflow-y-auto max-h-[200px] pr-2 space-y-4">
        {gymBookings.length === 0 ? (
          <p className="text-gray-400">No bookings available.</p>
        ) : (
          gymBookings.bookingRecords.map((record, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 p-3 bg-zinc-800 rounded-lg text-sm leading-tight"
            >
              <span className="font-medium">{record.gymName}</span>
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

              <div className="flex gap-2 mt-2">
                {["COMPLETED", "MISSED", "CANCELLED"].map((status) => (
                  <button
                    key={status}
                    className={`px-2 py-1 text-xs rounded ${status === record.appointmentStatus ? "bg-gray-600" : "bg-zinc-700"}`}
                    onClick={() =>
                      handleStatusChange(record.gymSessionId, status)
                    }
                  >
                    {status}
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
