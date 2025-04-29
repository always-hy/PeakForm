import React, { useState, useEffect } from "react";

const StatCard = ({
  title,
  icon,
  type,
  value,
  target,
  unit,
  chart,
  userUuid,
  allStats,
  allTargets,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [newTarget, setNewTarget] = useState(target);
  const [updateStatus, setUpdateStatus] = useState("");

  // Update local state when props change
  useEffect(() => {
    setNewValue(value);
    setNewTarget(target);
  }, [value, target]);

  // Function to update current stat
  const updateStat = async (statName, statValue) => {
    const statFieldMap = {
      water: "waterIntake",
      calories: "caloriesBurned",
      duration: "workoutDuration",
      weight: "weight",
      height: "height",
    };

    const body = {
      ...allStats,
      [statName]: parseFloat(statValue),
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
        setUpdateStatus("Updated!");
        setTimeout(() => setUpdateStatus(""), 2000);
        return true;
      } else {
        setUpdateStatus("Failed!");
        setTimeout(() => setUpdateStatus(""), 2000);
        return false;
      }
    } catch (err) {
      setUpdateStatus("Error!");
      setTimeout(() => setUpdateStatus(""), 2000);
      return false;
    }
  };

  // Function to update target stat
  const updateTarget = async (targetName, targetValue) => {
    const targetBody = {
      ...allTargets,
      [targetName]: parseFloat(targetValue),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/user-target/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(targetBody),
        }
      );

      if (response.ok) {
        setUpdateStatus("Target updated!");
        setTimeout(() => setUpdateStatus(""), 2000);
        return true;
      } else {
        setUpdateStatus("Target update failed!");
        setTimeout(() => setUpdateStatus(""), 2000);
        return false;
      }
    } catch (err) {
      setUpdateStatus("Error!");
      setTimeout(() => setUpdateStatus(""), 2000);
      return false;
    }
  };

  // Handle saving changes
  const handleSave = async () => {
    let success = true;

    // Map the type to the correct API parameter names
    const statFieldMap = {
      water: "waterIntake",
      calories: "caloriesBurned",
      duration: "workoutDuration",
    };

    const targetFieldMap = {
      water: "targetWaterIntake",
      calories: "targetCaloriesBurned",
      duration: "targetWorkoutDuration",
    };

    const statField = statFieldMap[type];
    const targetField = targetFieldMap[type];

    // Only update if values changed
    if (newValue !== value) {
      const currentSuccess = await updateStat(statField, newValue);
      success = success && currentSuccess;
    }

    if (newTarget !== target) {
      const targetSuccess = await updateTarget(targetField, newTarget);
      success = success && targetSuccess;
    }

    if (success) {
      setIsEditing(false);
    }
  };

  // For the streak card which has a different layout
  if (type === "streak") {
    return (
      <article className="flex overflow-hidden flex-col grow shrink items-center self-stretch px-4 pt-5 pb-2 my-auto w-40 rounded-xl bg-zinc-900 min-h-[170px] relative">
        <div className="flex flex-wrap gap-2 justify-center items-end w-full max-w-[165px]">
          <div className="flex gap-2.5 items-center min-h-[22px] w-[22px]">
            <img
              src={icon}
              className="object-contain self-stretch my-auto aspect-square w-[22px]"
              alt={title}
            />
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
        <img
          src={chart}
          className="object-contain mt-5 max-w-full aspect-[3.19] w-[145px]"
          alt="Streak chart"
        />
        <div className="flex gap-0.5 justify-center items-end mt-5 whitespace-nowrap">
          <p className="text-2xl font-semibold leading-none text-white">
            {value}
          </p>
          <p className="text-base text-neutral-50">{unit}</p>
        </div>
      </article>
    );
  }

  // For other stat cards with editable functionality
  return (
    <article
      className="flex flex-col items-center justify-center px-4 pt-5 pb-5 text-base font-bold text-white rounded-xl bg-zinc-900 w-full max-w-[165px] relative"
      style={{ height: "170px" }}
    >
      {/* Edit button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-2 right-2 text-xs bg-green-500 rounded-full w-6 h-6 flex items-center justify-center"
      >
        {isEditing ? "X" : "✏️"}
      </button>

      {/* Status indicator */}
      {updateStatus && (
        <div className="absolute top-2 left-2 text-xs bg-zinc-800 rounded px-2 py-1">
          {updateStatus}
        </div>
      )}

      {isEditing ? (
        <div className="flex flex-col items-center justify-between h-full w-full">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={icon}
              className="object-contain aspect-square w-[22px]"
              alt={title}
            />
            <h3 className="text-center">{title}</h3>
          </div>

          {/* Edit form */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <label className="text-xs">Current:</label>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-16 p-1 text-sm bg-zinc-800 border border-green-500 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs">Target:</label>
              <input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-16 p-1 text-sm bg-zinc-800 border border-green-500 rounded"
              />
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="bg-green-500 text-black px-3 py-1 rounded-md font-medium text-sm mt-1"
          >
            Save
          </button>
        </div>
      ) : type === "duration" ? (
        <div className="flex flex-col items-center justify-between h-full w-full">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={icon}
              className="object-contain aspect-square w-[22px]"
              alt={title}
            />
            <h3 className="text-center">{title}</h3>
          </div>
          <div>
            {value} / {target} minutes
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between h-full w-full">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={icon}
              className="object-contain aspect-square w-[22px]"
              alt={title}
            />
            <h3 className="text-center">{title}</h3>
          </div>
          {/* Chart */}
          <div className="flex justify-center items-center w-full h-full">
            {chart}
          </div>
          <div>
            {value} / {target} {unit}
          </div>
        </div>
      )}
    </article>
  );
};

export default StatCard;
