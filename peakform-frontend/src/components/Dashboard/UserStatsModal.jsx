import React, { useState, useEffect } from "react";

const UserStatsModal = ({ isOpen, onClose, values, onSubmit, userUuid }) => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  useEffect(() => {
    if (isOpen && values) {
      setWeight(values.weight || 0);
      setHeight(values.height || 0);
      setWaterIntake(values.waterIntake || 0);
      setCaloriesBurned(values.caloriesBurned || 0);
      setWorkoutDuration(values.workoutDuration || 0);
    }
  }, [isOpen, values]);

  const handleSubmit = async () => {
    const body = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      waterIntake: parseFloat(waterIntake),
      caloriesBurned: parseInt(caloriesBurned),
      workoutDuration: parseInt(workoutDuration),
    };

    try {
      const statsResponse = await fetch(
        // "http://localhost:8080/user-schedules/records?userUuid=" + data.userUuid,
        `http://localhost:8080/user-stats/update?userUuid=${userUuid}`,

        {
          method: "PUT",
          credentials: "include", // Include session cookies
          body: JSON.stringify(body),
        }
      );

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        console.log(body);
      } else {
        const statsError = await statsResponse.text();
        console.error("User stats failed:", statsError);
      }
    } catch (error) {
      console.error("Error during login or fetching gym data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-black text-white border border-[#05A31D] p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Update Your Stats</h2>
        <form className="flex flex-col">
          <label className="mb-2">Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-black text-white border border-[#05A31D] p-2 mb-4"
            placeholder="Weight"
          />

          <label className="mb-2">Height</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-black text-white border border-[#05A31D] p-2 mb-4"
            placeholder="Height"
          />

          <label className="mb-2">Water Intake</label>
          <input
            type="number"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
            className="bg-black text-white border border-[#05A31D] p-2 mb-4"
            placeholder="Water Intake"
          />

          <label className="mb-2">Calories Burned</label>
          <input
            type="number"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            className="bg-black text-white border border-[#05A31D] p-2 mb-4"
            placeholder="Calories Burned"
          />

          <label className="mb-2">Workout Duration (mins)</label>
          <input
            type="number"
            value={workoutDuration}
            onChange={(e) => setWorkoutDuration(e.target.value)}
            className="bg-black text-white border border-[#05A31D] p-2 mb-4"
            placeholder="Workout Duration"
          />

          <div className="flex justify-between">
            <button
              type="button"
              className="border border-[#05A31D] text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-[#05A31D] px-4 py-2 text-black rounded-md font-semibold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserStatsModal;
