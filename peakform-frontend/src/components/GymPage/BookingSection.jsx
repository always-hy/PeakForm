import React, { useState } from "react";

// Time Slot Selector Component
const TimeSlotSelector = ({ selectedSlot, onSelectSlot, sessions }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {sessions.map((session) => (
        <button
          key={session.sessionId}
          className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
            selectedSlot === session.sessionStart
              ? "bg-green-600 text-white"
              : session.appointmentStatus === "UNRESERVED"
                ? "bg-[#05A31D] text-white border border-[#05A31D] hover:bg-green-600 hover:text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          onClick={() =>
            session.appointmentStatus === "UNRESERVED" &&
            onSelectSlot(session.sessionStart)
          }
          disabled={session.appointmentStatus === "RESERVED"}
        >
          {session.sessionStart} - Available Slots: {session.availableSlots}
        </button>
      ))}
    </div>
  );
};

// Booking Section Component
const BookingSection = ({ gymSessions, gymId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(""); // To show success or error message
  const availableDates = [
    ...new Set(gymSessions.map((session) => session.date)),
  ].map((d) => new Date(d));
  const DatePicker = ({ selectedDate, onSelectDate, availableDates }) => {
    const formattedDates = availableDates.map(
      (d) => d.toISOString().split("T")[0]
    );

    return (
      <select
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => onSelectDate(new Date(e.target.value))}
        className="p-2 text-lg border border-gray-300 rounded-lg text-white bg-black"
      >
        {formattedDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    );
  };

  // Convert Date object to 'YYYY-MM-DD' format
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Filter sessions by selected date
  const sessionsForSelectedDate = gymSessions.filter(
    (session) => session.date === formatDate(selectedDate)
  );

  // Handle Booking Request
  const handleBooking = async () => {
    if (!selectedSlot) return;

    // Find the session with the selected slot
    const selectedSession = gymSessions.find(
      (session) => session.sessionStart === selectedSlot
    );

    if (!selectedSession) {
      setBookingStatus("Error: Selected session not found.");
      return;
    }

    // API call to book the session
    try {
      const storedUuid = localStorage.getItem("user_uuid");
      const response = await fetch(
        `http://localhost:8080/user-schedules/book?gymId=${gymId}gymSessionId=${selectedSession.sessionId}&userUuid=${storedUuid}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.text();

      if (response.ok) {
        setBookingStatus("Booking successful!");
      } else {
        setBookingStatus(`Error: ${data.message || "Booking failed."}`);
      }
    } catch (error) {
      setBookingStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-10 bg-black rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-[#05A31D] shadow-[0_0_15px_#05A31D]">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(5,163,29,0.3)_0%,rgba(5,163,29,0)_100%)] blur-[120px] pointer-events-none z-10" />

      <h2 className="text-3xl font-bold text-white">Book a Gym Slot</h2>

      {/* Date Picker */}
      <div className="mt-6 mb-4">
        <h3 className="text-xl text-white mb-2">Select a Date</h3>
        <DatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          availableDates={availableDates}
        />
      </div>

      {/* Time Slot Selection */}
      <div className="mt-6">
        <h3 className="text-xl text-white mb-4">Select a Time Slot</h3>
        <TimeSlotSelector
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
          sessions={sessionsForSelectedDate}
        />
      </div>

      {/* Confirm Booking Button */}
      <button
        className={`mt-10 px-6 py-3 text-lg font-bold text-white rounded-lg transition ${
          selectedSlot
            ? "bg-[#05A31D] hover:bg-green-600"
            : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedSlot}
        onClick={handleBooking}
      >
        Confirm Booking
      </button>

      {/* Booking Status Message */}
      {bookingStatus && (
        <div className="mt-4 text-xl text-white">{bookingStatus}</div>
      )}
    </div>
  );
};

export default BookingSection;
