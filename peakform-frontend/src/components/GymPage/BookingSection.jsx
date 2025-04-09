import React, { useState } from "react";

// Date Picker Component
const DatePicker = ({ selectedDate, onSelectDate }) => {
  return (
    <input
      type="date"
      value={selectedDate.toISOString().split("T")[0]}
      onChange={(e) => onSelectDate(new Date(e.target.value))}
      className="p-2 text-lg border border-gray-300 rounded-lg text-white"
    />
  );
};

// Time Slot Selector Component
const TimeSlotSelector = ({ selectedSlot, onSelectSlot }) => {
  const timeSlots = [
    "08:00 AM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {timeSlots.map((slot) => (
        <button
          key={slot}
          className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
            selectedSlot === slot
              ? "bg-[#05A31D] text-white"
              : "bg-black text-white border border-[#05A31D] hover:bg-[#05A31D] hover:text-white"
          }`}
          onClick={() => onSelectSlot(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

// Booking Section Component
const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="relative flex flex-col items-center p-10 bg-black rounded-lg shadow-lg w-full max-w-md mx-auto border-2 border-[#05A31D] shadow-[0_0_15px_#05A31D]">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(5,163,29,0.3)_0%,rgba(5,163,29,0)_100%)] blur-[120px] pointer-events-none z-10" />

      <h2 className="text-3xl font-bold text-white">Book a Gym Slot</h2>

      {/* Date Picker Section */}
      <div className="mt-10">
        <h3 className="text-xl text-white mb-4">Select a Date</h3>
        <DatePicker
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      {/* Time Slot Selection */}
      <div className="mt-10">
        <h3 className="text-xl text-white mb-4">Select a Time Slot</h3>
        <TimeSlotSelector
          selectedSlot={selectedSlot}
          onSelectSlot={setSelectedSlot}
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
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingSection;
