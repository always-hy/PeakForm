import React, { useState, useEffect } from "react";
import { Dumbbell, Activity, Weight, Edit2, Check, X } from "lucide-react";

const icons = {
  Squat: <Dumbbell className="text-[#05A31D] w-6 h-6" />,
  BenchPress: <Activity className="text-[#05A31D] w-6 h-6" />,
  Deadlift: <Weight className="text-[#05A31D] w-6 h-6" />,
};

const AchievementCard = ({
  title,
  initialValue,
  userUuid = "9fa2fa3e-a194-4187-95a3-5c818c433973",
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Update local value when initialValue changes
  useEffect(() => {
    setValue(initialValue);
    setEditValue(initialValue);
  }, [initialValue]);

  const handleEdit = () => {
    setEditValue(value || 0);
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(value || 0);
    setError("");
  };

  const updateRecord = async (exercise, newValue) => {
    setIsUpdating(true);

    try {
      // Prepare the request body based on the exercise
      const requestBody = {
        benchPressPr: exercise === "BenchPress" ? newValue : null,
        squatPr: exercise === "Squat" ? newValue : null,
        deadliftPr: exercise === "Deadlift" ? newValue : null,
      };
      console.log(requestBody);
      const response = await fetch(
        `http://localhost:8080/records/update?userUuid=${userUuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();

      // Update the local state with the new value
      setValue(newValue);

      // Show success message
      setSuccessMessage(`${exercise} PR updated successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);

      return result;
    } catch (error) {
      console.error("Error updating record:", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSave = async () => {
    const numValue = parseFloat(editValue);
    if (isNaN(numValue) || numValue < 0) {
      setError("Please enter a valid positive number");
      return;
    }

    try {
      await updateRecord(title, numValue);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div className="w-full">
      {successMessage && (
        <div className="bg-[#05A31D]/20 border border-[#05A31D]/40 rounded-lg p-3 text-[#05A31D] text-center text-sm mb-4">
          {successMessage}
        </div>
      )}

      <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 text-white w-full shadow border border-[#05A31D]/40 relative">
        <div className="flex items-center justify-center w-12 h-12 bg-[#05A31D]/10 rounded-full">
          {icons[title]}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-sm text-gray-300">{title}</span>
          {isEditing ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                step="0.5"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-zinc-800 text-white border border-[#05A31D]/40 rounded px-2 py-1 text-xl font-bold w-24 focus:outline-none focus:border-[#05A31D]"
                autoFocus
              />
              <span className="text-base text-gray-400 font-medium">KG</span>
            </div>
          ) : (
            <span className="text-2xl font-bold">
              {value || 0}{" "}
              <span className="text-base text-gray-400 font-medium">KG</span>
            </span>
          )}
          {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="p-2 rounded-lg bg-[#05A31D]/20 hover:bg-[#05A31D]/30 transition-colors disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-[#05A31D]" />
              </button>
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              disabled={isUpdating}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              <Edit2 className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {isUpdating && (
          <div className="absolute inset-0 bg-zinc-900/50 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#05A31D] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
