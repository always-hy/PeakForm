import React, { useState, useEffect } from "react";

const ProfileStatCard = ({
  label,
  value,
  unit,
  type, // This should be used to identify the stat type (height or weight)
  userUuid,
  onUpdate,
  allStats,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [updateStatus, setUpdateStatus] = useState("");

  // Update local state when props change
  useEffect(() => {
    setNewValue(value);
  }, [value]);

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
        console.log(body);
        setTimeout(() => setUpdateStatus(""), 2000);
        if (onUpdate) onUpdate(); // Call the onUpdate callback if provided
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

  // Handle save
  const handleSave = async () => {
    const statFieldMap = {
      weight: "weight",
      height: "height",
    };
    const statField = statFieldMap[type];
    if (newValue !== value) {
      const success = await updateStat(statField, newValue);
      if (success) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex z-0 flex-col justify-center items-center self-stretch my-auto relative">
      {/* Edit button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-0 right-0 text-xs bg-green-500 rounded-full w-5 h-5 flex items-center justify-center"
        style={{ transform: "translate(50%, -50%)" }}
      >
        {isEditing ? "X" : "✏️"}
      </button>

      {/* Status indicator */}
      {updateStatus && (
        <div
          className="absolute top-0 left-0 text-xs bg-zinc-800 rounded px-1 py-0.5 text-white"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {updateStatus}
        </div>
      )}

      {isEditing ? (
        <div className="flex flex-col items-center justify-center">
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-16 p-1 text-sm bg-zinc-800 border border-green-500 rounded text-white mb-1"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-black px-2 py-0.5 rounded-md font-medium text-xs"
          >
            Save
          </button>
          <div className="text-base font-medium text-gray-500 mt-1">
            {label}
          </div>
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold text-white">
            <span style={{ fontWeight: 700, fontSize: "24px" }}>{value}</span>
            <span style={{ fontSize: "14px", color: "rgba(157,172,193,1)" }}>
              {unit}
            </span>
          </div>
          <div className="text-base font-medium text-gray-500">{label}</div>
        </>
      )}
    </div>
  );
};

export default ProfileStatCard;
