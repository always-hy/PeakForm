import { API_URL } from "@/config";
import React, { useState, useEffect, useRef } from "react";

const StatCard = ({
  title,
  icon,
  type,
  value: initialValue,
  target: initialTarget,
  unit,
  chart,
  userUuid,
  allStats,
  allTargets,
  onStatsUpdate, // Callback to update parent component
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(initialValue);
  const [newTarget, setNewTarget] = useState(initialTarget);
  const [updateStatus, setUpdateStatus] = useState("");
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [currentTarget, setCurrentTarget] = useState(initialTarget);

  // Refs for managing intervals
  const pollIntervalRef = useRef(null);
  const isMountedRef = useRef(true);

  // Update local state when props change
  useEffect(() => {
    setNewValue(initialValue);
    setNewTarget(initialTarget);
    setCurrentValue(initialValue);
    setCurrentTarget(initialTarget);
  }, [initialValue, initialTarget]);

  // Fetch latest stats from server
  const fetchLatestStats = async () => {
    if (!isMountedRef.current) return;

    try {
      if (userUuid) {
        const [statsResponse, targetsResponse] = await Promise.all([
          fetch(`${API_URL}/user-stats?userUuid=${userUuid}`, {
            credentials: "include",
          }),
          fetch(`${API_URL}/user-target?userUuid=${userUuid}`, {
            credentials: "include",
          }),
        ]);
        if (statsResponse.ok && targetsResponse.ok) {
          const [latestStats, latestTargets] = await Promise.all([
            statsResponse.json(),
            targetsResponse.json(),
          ]);

          // Map the field names to match the component
          const statFieldMap = {
            water: "waterIntake",
            calories: "caloriesBurned",
            duration: "workoutDuration",
            weight: "weight",
            height: "height",
          };

          const targetFieldMap = {
            water: "targetWaterIntake",
            calories: "targetCaloriesBurned",
            duration: "targetWorkoutDuration",
          };

          const statField = statFieldMap[type];
          const targetField = targetFieldMap[type];

          if (statField && latestStats[statField] !== undefined) {
            setCurrentValue(latestStats[statField]);
            if (!isEditing) {
              setNewValue(latestStats[statField]);
            }
          }

          if (targetField && latestTargets[targetField] !== undefined) {
            setCurrentTarget(latestTargets[targetField]);
            if (!isEditing) {
              setNewTarget(latestTargets[targetField]);
            }
          }

          // Notify parent component of updates
          if (onStatsUpdate) {
            onStatsUpdate(latestStats, latestTargets);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching latest stats:", error);
    }
  };

  // Start real-time polling
  useEffect(() => {
    // Initial fetch
    fetchLatestStats();

    // Set up polling every 5 seconds
    pollIntervalRef.current = setInterval(fetchLatestStats, 5000);

    // Cleanup
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      isMountedRef.current = false;
    };
  }, [userUuid, type]);

  // Stop polling when editing, resume when done
  useEffect(() => {
    if (isEditing) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    } else {
      pollIntervalRef.current = setInterval(fetchLatestStats, 5000);
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [isEditing]);

  // Function to update current stat
  const updateStat = async (statName, statValue) => {
    try {
      const body = {
        ...allStats,
        [statName]: parseFloat(statValue),
      };

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
        setUpdateStatus("Updated!");
        setTimeout(() => setUpdateStatus(""), 2000);
        // Immediately fetch latest data
        setTimeout(fetchLatestStats, 500);
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
    try {
      const targetBody = {
        ...allTargets,
        [targetName]: parseFloat(targetValue),
      };

      const response = await fetch(
        `${API_URL}/user-target/update?userUuid=${userUuid}`,
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
        // Immediately fetch latest data
        setTimeout(fetchLatestStats, 500);
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
    if (newValue !== currentValue) {
      const currentSuccess = await updateStat(statField, newValue);
      success = success && currentSuccess;
    }

    if (newTarget !== currentTarget) {
      const targetSuccess = await updateTarget(targetField, newTarget);
      success = success && targetSuccess;
    }

    if (success) {
      setIsEditing(false);
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setNewValue(currentValue);
    setNewTarget(currentTarget);
    setIsEditing(false);
  };

  // For the streak card which has a different layout
  if (type === "streak") {
    return (
      <article className="flex overflow-hidden flex-col grow shrink items-center self-stretch px-4 pt-5 pb-2 my-auto w-40 rounded-xl bg-zinc-900 min-h-[170px] relative">
        {/* Real-time indicator */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

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
            {currentValue}
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
      {/* Real-time indicator */}
      <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

      {/* Edit button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-2 right-2 text-xs bg-green-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600 transition-colors"
      >
        {isEditing ? "✕" : "✏️"}
      </button>

      {/* Status indicator */}
      {updateStatus && (
        <div className="absolute top-8 left-2 text-xs bg-zinc-800 rounded px-2 py-1 z-10">
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
                className="w-16 p-1 text-sm bg-zinc-800 border border-green-500 rounded focus:outline-none focus:border-green-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs">Target:</label>
              <input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-16 p-1 text-sm bg-zinc-800 border border-green-500 rounded focus:outline-none focus:border-green-400"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              className="bg-green-500 text-black px-3 py-1 rounded-md font-medium text-sm hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-zinc-600 text-white px-3 py-1 rounded-md font-medium text-sm hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
          </div>
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
          <div className="text-center">
            <span className="text-green-400">{currentValue}</span> /{" "}
            {currentTarget} minutes
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
          <div className="text-center">
            <span className="text-green-400">{currentValue}</span> /{" "}
            {currentTarget} {unit}
          </div>
        </div>
      )}
    </article>
  );
};

export default StatCard;
