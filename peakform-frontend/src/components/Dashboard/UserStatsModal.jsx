import { API_URL } from "@/config";
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

  // Status message state
  const [statusMessage, setStatusMessage] = useState("");

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

  // Function to update a single current stat
  const updateSingleStat = async (statName, value) => {
    const body = {
      [statName]: parseFloat(value),
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
        setStatusMessage(`Successfully updated ${statName}!`);
        setTimeout(() => setStatusMessage(""), 3000);
      } else {
        setStatusMessage(`Failed to update ${statName}.`);
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // Function to update a single target stat
  const updateSingleTarget = async (statName, value) => {
    const body = {
      [statName]: parseFloat(value),
    };

    try {
      const response = await fetch(
        `${API_URL}/user-target/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        setStatusMessage(`Successfully updated ${statName}!`);
        setTimeout(() => setStatusMessage(""), 3000);
      } else {
        setStatusMessage(`Failed to update ${statName}.`);
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // Function to handle updating all current stats at once
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
        `${API_URL}/user-stats/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        setStatusMessage("All stats updated successfully!");
        setTimeout(() => {
          setStatusMessage("");
          onClose();
        }, 2000);
      } else {
        setStatusMessage("Stats update failed.");
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // Function to handle updating all target stats at once
  const handleTargetStatsSubmit = async () => {
    const body = {
      targetWeight: parseFloat(targetWeight),
      targetWaterIntake: parseFloat(targetWaterIntake),
      targetCaloriesBurned: parseFloat(targetCaloriesBurned),
      targetWorkoutDuration: parseFloat(targetWorkoutDuration),
    };

    try {
      const response = await fetch(
        `${API_URL}/user-target/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        setStatusMessage("All target stats updated successfully!");
        setTimeout(() => {
          setStatusMessage("");
          onClose();
        }, 2000);
      } else {
        setStatusMessage("Target stats update failed.");
        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  // Creates a paired input field with its own update button
  const StatInputField = ({
    label,
    value,
    onChange,
    onUpdate,
    statName,
    unit,
  }) => (
    <div className="flex items-center mb-4">
      <div className="flex-1">
        <label className="mb-1 block">{label}</label>
        <div className="flex items-center">
          <input
            type="number"
            value={value}
            onChange={onChange}
            className="bg-black text-white border border-[#05A31D] p-2 w-full"
            placeholder={label}
          />
          {unit && <span className="ml-2 text-white">{unit}</span>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onUpdate(statName, value)}
        className="bg-[#05A31D] text-black rounded-md font-medium px-3 py-2 ml-3 h-10 whitespace-nowrap"
      >
        Update
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-black text-white border border-[#05A31D] p-6 rounded-lg w-3/4 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Update Your Stats</h2>
          {statusMessage && (
            <div className="bg-zinc-800 px-4 py-2 rounded-md text-sm">
              {statusMessage}
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Current Stats Form */}
          <div className="flex flex-col w-1/2">
            <h3 className="text-lg font-semibold mb-4">Current Stats</h3>

            {profile && (
              <>
                <StatInputField
                  label="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onUpdate={updateSingleStat}
                  statName="weight"
                  unit="kg"
                />

                <StatInputField
                  label="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onUpdate={updateSingleStat}
                  statName="height"
                  unit="cm"
                />
              </>
            )}

            {!profile && (
              <>
                <StatInputField
                  label="Water Intake"
                  value={waterIntake}
                  onChange={(e) => setWaterIntake(e.target.value)}
                  onUpdate={updateSingleStat}
                  statName="waterIntake"
                  unit="L"
                />

                <StatInputField
                  label="Calories Burned"
                  value={caloriesBurned}
                  onChange={(e) => setCaloriesBurned(e.target.value)}
                  onUpdate={updateSingleStat}
                  statName="caloriesBurned"
                  unit="kCal"
                />

                <StatInputField
                  label="Workout Duration"
                  value={workoutDuration}
                  onChange={(e) => setWorkoutDuration(e.target.value)}
                  onUpdate={updateSingleStat}
                  statName="workoutDuration"
                  unit="mins"
                />
              </>
            )}

            <button
              type="button"
              className="bg-[#05A31D] px-4 py-2 text-black rounded-md font-semibold mt-4"
              onClick={handleUserStatsSubmit}
            >
              Update All Stats
            </button>
          </div>

          {/* Target Stats Form */}
          <div className="flex flex-col w-1/2">
            <h3 className="text-lg font-semibold mb-4">Target Stats</h3>

            <StatInputField
              label="Target Weight"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              onUpdate={updateSingleTarget}
              statName="targetWeight"
              unit="kg"
            />

            <StatInputField
              label="Target Water Intake"
              value={targetWaterIntake}
              onChange={(e) => setTargetWaterIntake(e.target.value)}
              onUpdate={updateSingleTarget}
              statName="targetWaterIntake"
              unit="L"
            />

            <StatInputField
              label="Target Calories Burned"
              value={targetCaloriesBurned}
              onChange={(e) => setTargetCaloriesBurned(e.target.value)}
              onUpdate={updateSingleTarget}
              statName="targetCaloriesBurned"
              unit="kCal"
            />

            <StatInputField
              label="Target Workout Duration"
              value={targetWorkoutDuration}
              onChange={(e) => setTargetWorkoutDuration(e.target.value)}
              onUpdate={updateSingleTarget}
              statName="targetWorkoutDuration"
              unit="mins"
            />

            <button
              type="button"
              className="bg-[#05A31D] px-4 py-2 text-black rounded-md font-semibold mt-4"
              onClick={handleTargetStatsSubmit}
            >
              Update All Targets
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="border border-[#05A31D] text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStatsModal;
