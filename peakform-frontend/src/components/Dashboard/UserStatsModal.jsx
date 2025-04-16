import React, { useState, useEffect } from "react";

const UserStatsModal = ({
  isOpen,
  onClose,
  userData,
  targetData,
  onSubmit,
  userUuid,
  profile,
}) => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [waterIntake, setWaterIntake] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workoutDuration, setWorkoutDuration] = useState(0);

  const [targetWeight, setTargetWeight] = useState(0);
  const [targetWaterIntake, setTargetWaterIntake] = useState(0);
  const [targetCaloriesBurned, setTargetCaloriesBurned] = useState(0);
  const [targetWorkoutDuration, setTargetWorkoutDuration] = useState(0);

  useEffect(() => {
    if (isOpen && userData && targetData) {
      setWeight(userData.weight || 0);
      setHeight(userData.height || 0);
      setWaterIntake(userData.waterIntake || 0);
      setCaloriesBurned(userData.caloriesBurned || 0);
      setWorkoutDuration(userData.workoutDuration || 0);

      setTargetWeight(targetData.targetWeight || 0);
      setTargetWaterIntake(targetData.targetWaterIntake || 0);
      setTargetCaloriesBurned(targetData.targetCaloriesBurned || 0);
      setTargetWorkoutDuration(targetData.targetWorkoutDuration || 0);
    }
  }, [isOpen, userData, targetData]);

  const handleUserStatsSubmit = async () => {
    const body = {
      weight: parseFloat(weight),
      height: parseFloat(height),
      waterIntake: parseFloat(waterIntake),
      caloriesBurned: parseInt(caloriesBurned),
      workoutDuration: parseInt(workoutDuration),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/user-stats/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        console.log(await response.text());
        onClose();
      } else {
        console.error("User stats update failed.");
      }
    } catch (err) {
      console.error("Error updating user stats:", err);
    }
  };

  const handleTargetStatsSubmit = async () => {
    const body = {
      targetWeight: parseInt(targetWeight),
      targetWaterIntake: parseInt(targetWaterIntake),
      targetCaloriesBurned: parseInt(targetCaloriesBurned),
      targetWorkoutDuration: parseInt(targetWorkoutDuration),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/user-target/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        console.log(await response.text());
        onClose();
      } else {
        console.error("Target stats update failed.");
      }
    } catch (err) {
      console.error("Error updating target stats:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-black text-white border border-[#05A31D] p-6 rounded-lg w-3/4 max-w-5xl">
        <h2 className="text-xl font-semibold mb-6">Update Your Stats</h2>
        <div className="flex gap-8">
          {/* Actual Stats Form */}
          <form className="flex flex-col w-1/2">
            <h3 className="text-lg font-semibold mb-4">Current Stats</h3>
            {profile && (
              <>
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
              </>
            )}

            {!profile && (
              <>
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
              </>
            )}

            <button
              type="button"
              className="bg-[#05A31D] px-4 py-2 text-black rounded-md font-semibold mt-4"
              onClick={handleUserStatsSubmit}
            >
              Update Stats
            </button>
          </form>

          {/* Target Stats Form */}
          <form className="flex flex-col w-1/2">
            <h3 className="text-lg font-semibold mb-4">Target Stats</h3>

            <label className="mb-2">Target Weight</label>
            <input
              type="number"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              className="bg-black text-white border border-[#05A31D] p-2 mb-4"
              placeholder="Target Weight"
            />

            <label className="mb-2">Target Water Intake</label>
            <input
              type="number"
              value={targetWaterIntake}
              onChange={(e) => setTargetWaterIntake(e.target.value)}
              className="bg-black text-white border border-[#05A31D] p-2 mb-4"
              placeholder="Target Water Intake"
            />

            <label className="mb-2">Target Calories Burned</label>
            <input
              type="number"
              value={targetCaloriesBurned}
              onChange={(e) => setTargetCaloriesBurned(e.target.value)}
              className="bg-black text-white border border-[#05A31D] p-2 mb-4"
              placeholder="Target Calories Burned"
            />

            <label className="mb-2">Target Workout Duration (mins)</label>
            <input
              type="number"
              value={targetWorkoutDuration}
              onChange={(e) => setTargetWorkoutDuration(e.target.value)}
              className="bg-black text-white border border-[#05A31D] p-2 mb-4"
              placeholder="Target Workout Duration"
            />

            <button
              type="button"
              className="bg-[#05A31D] px-4 py-2 text-black rounded-md font-semibold mt-4"
              onClick={handleTargetStatsSubmit}
            >
              Update Target
            </button>
          </form>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="border border-[#05A31D] text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStatsModal;
