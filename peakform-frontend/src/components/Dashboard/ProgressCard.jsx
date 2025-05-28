import { API_URL } from "@/config";
import React, { useEffect, useState } from "react";

const dayOptions = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const ProgressCard = () => {
  const [selectedDay, setSelectedDay] = useState("MONDAY");
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [isActivating, setIsActivating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  const fetchWorkouts = async () => {
    try {
      const uuid = localStorage.getItem("user_uuid");
      if (!uuid) {
        console.error("No user UUID found");
        return;
      }

      const response = await fetch(
        `${API_URL}/workout-plans?userUuid=${uuid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched workouts:", data);

      setWorkouts((prevWorkouts) => {
        const hasChanged =
          JSON.stringify(prevWorkouts) !== JSON.stringify(data || []);
        if (hasChanged) {
          setLastUpdateTime(Date.now());

          if (data && data.length > 0) {
            const activeWorkout = data.find((workout) => workout.isActive);
            const currentSelected = data.find(
              (w) => w.workoutId === selectedWorkoutId
            );

            if (
              !selectedWorkoutId ||
              (!currentSelected?.isActive && activeWorkout)
            ) {
              setSelectedWorkoutId(
                activeWorkout ? activeWorkout.workoutId : data[0].workoutId
              );
            }
          }
        }
        return data || [];
      });
    } catch (err) {
      console.error("Failed to fetch workout data:", err);
    }
  };

  useEffect(() => {
    fetchWorkouts(); // Only fetch once on mount
  }, []);

  const activateWorkout = async (workoutId) => {
    if (!workoutId || isActivating) return;

    setIsActivating(true);

    // Optimistically update UI
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) => ({
        ...workout,
        isActive: workout.workoutId === workoutId,
      }))
    );

    try {
      const uuid = localStorage.getItem("user_uuid");
      const response = await fetch(
        `${API_URL}/workout-plans/${workoutId}/activate?userUuid=${uuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        await fetchWorkouts();
        setSelectedWorkoutId(workoutId);
        console.log(`Workout ${workoutId} activated successfully`);
      } else {
        await fetchWorkouts(); // Revert optimistic update
        const errorText = await response.text();
        console.error(
          "Failed to activate workout:",
          response.status,
          errorText
        );
        alert(
          `Failed to activate workout: ${response.status} ${response.statusText}`
        );
      }
    } catch (err) {
      await fetchWorkouts(); // Revert on error
      console.error("Error activating workout:", err);
      alert(
        "Error activating workout. Please check your connection and try again."
      );
    } finally {
      setIsActivating(false);
    }
  };

  const handleShowActiveOnlyChange = (e) => {
    const newShowActiveOnly = e.target.checked;
    setShowActiveOnly(newShowActiveOnly);

    if (newShowActiveOnly) {
      const activeWorkout = workouts.find((workout) => workout.isActive);
      const currentWorkout = workouts.find(
        (workout) => workout.workoutId === selectedWorkoutId
      );

      if (activeWorkout && (!currentWorkout || !currentWorkout.isActive)) {
        setSelectedWorkoutId(activeWorkout.workoutId);
      }
    }
  };

  const availableWorkouts = showActiveOnly
    ? workouts.filter((workout) => workout.isActive)
    : workouts;

  const currentWorkout = workouts.find(
    (workout) => workout.workoutId === selectedWorkoutId
  );

  const filteredExercises =
    currentWorkout?.exercises?.filter(
      (exercise) => exercise.day === selectedDay
    ) || [];

  return (
    <article className="flex flex-col gap-5 p-5 rounded-xl bg-zinc-900 text-white min-w-60 w-full max-h-[500px] overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">Workout Plans</h3>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              title="Live updates enabled"
            ></div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showActiveOnly}
                onChange={handleShowActiveOnlyChange}
                className="rounded"
              />
              Active Only
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <select
            value={selectedWorkoutId || ""}
            onChange={(e) => setSelectedWorkoutId(Number(e.target.value))}
            className="bg-zinc-800 text-white p-2 rounded-lg text-sm flex-1"
            disabled={isActivating}
          >
            {availableWorkouts.length === 0 ? (
              <option value="">No workouts available</option>
            ) : (
              availableWorkouts.map((workout) => (
                <option key={workout.workoutId} value={workout.workoutId}>
                  Workout #{workout.workoutId}{" "}
                  {workout.isActive ? "(Active)" : "(Inactive)"}
                </option>
              ))
            )}
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-zinc-800 text-white p-2 rounded-lg text-sm"
            disabled={isActivating}
          >
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {currentWorkout && !currentWorkout.isActive && (
          <button
            onClick={() => activateWorkout(currentWorkout.workoutId)}
            disabled={isActivating}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActivating
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "text-white hover:opacity-80 transform hover:scale-[1.02]"
            }`}
            style={{
              backgroundColor: isActivating ? undefined : "#05A31D",
            }}
          >
            {isActivating ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Activating...
              </span>
            ) : (
              "Set as Active Workout"
            )}
          </button>
        )}
      </div>

      <div className="overflow-y-auto pr-2 custom-scrollbar">
        {!currentWorkout ? (
          <p className="text-sm text-gray-400">No workout selected.</p>
        ) : filteredExercises.length === 0 ? (
          <p className="text-sm text-gray-400">
            No exercises for {selectedDay} in this workout.
          </p>
        ) : (
          <div className="flex flex-col gap-4 pb-1">
            {filteredExercises.map((exercise, index) => (
              <div
                key={`${exercise.exerciseId}-${index}`}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  currentWorkout.isActive
                    ? "bg-green-600 shadow-lg shadow-green-600/20"
                    : "bg-gray-600"
                }`}
              >
                <h4 className="font-semibold text-lg">
                  {exercise.exerciseName}
                </h4>
                <p className="text-sm text-gray-200">{exercise.description}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Target:</span>{" "}
                  {exercise.targetMuscleGroup}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Sets:</span> {exercise.sets}{" "}
                  &nbsp;
                  <span className="font-medium">Reps:</span> {exercise.reps}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentWorkout && (
        <div className="text-xs text-gray-400 border-t border-gray-700 pt-2 flex justify-between items-center">
          <span>
            Workout #{currentWorkout.workoutId} -{" "}
            <span
              className={
                currentWorkout.isActive ? "text-green-400 font-medium" : ""
              }
            >
              {currentWorkout.isActive ? "Active" : "Inactive"}
            </span>{" "}
            ({currentWorkout.exercises?.length || 0} total exercises)
          </span>
          <span className="text-xs opacity-60">
            Updated {new Date(lastUpdateTime).toLocaleTimeString()}
          </span>
        </div>
      )}
    </article>
  );
};

export default ProgressCard;
