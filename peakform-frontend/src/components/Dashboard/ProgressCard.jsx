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

  useEffect(() => {
    // Fetch workout plans
    const fetchWorkouts = async () => {
      try {
        const uuid = localStorage.getItem("user_uuid");
        const response = await fetch(
          `http://localhost:8080/workout-plans?userUuid=${uuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setWorkouts(data || []);
        console.log("hi", data);
        // Set default selected workout (active one first, or first available)
        if (data && data.length > 0) {
          const activeWorkout = data.find((workout) => workout.isActive);
          setSelectedWorkoutId(
            activeWorkout ? activeWorkout.workoutId : data[0].workoutId
          );
        }

        console.log("Fetched workouts:", data);
      } catch (err) {
        console.error("Failed to fetch workout data:", err);
      }
    };

    fetchWorkouts();
  }, []);

  // Function to activate a workout
  const activateWorkout = async (workoutId) => {
    if (!workoutId || isActivating) return;

    setIsActivating(true);
    try {
      const uuid = localStorage.getItem("user_uuid");
      const response = await fetch(
        `http://localhost:8080/workout-plans/${workoutId}/activate?userUuid=${uuid}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Refresh workout data to get updated active states
        const workoutsResponse = await fetch(
          `http://localhost:8080/workout-plans?userUuid=${uuid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const updatedWorkouts = await workoutsResponse.json();
        setWorkouts(updatedWorkouts || []);

        // Update selectedWorkoutId to the newly activated workout
        // This ensures the UI switches to show the active workout
        const newlyActivatedWorkout = updatedWorkouts.find(
          (workout) => workout.workoutId === workoutId
        );
        if (newlyActivatedWorkout && newlyActivatedWorkout.isActive) {
          setSelectedWorkoutId(workoutId);
        }

        console.log(`Workout ${workoutId} activated successfully`);
      } else {
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
      console.error("Error activating workout:", err);
      alert(
        "Error activating workout. Please check your connection and try again."
      );
    } finally {
      setIsActivating(false);
    }
  };

  // Get available workouts based on filter
  const availableWorkouts = showActiveOnly
    ? workouts.filter((workout) => workout.isActive)
    : workouts;

  // Get current selected workout
  const currentWorkout = workouts.find(
    (workout) => workout.workoutId === selectedWorkoutId
  );

  // Get exercises for selected day from current workout
  const filteredExercises =
    currentWorkout?.exercises?.filter(
      (exercise) => exercise.day === selectedDay
    ) || [];

  return (
    <article className="flex flex-col gap-5 p-5 rounded-xl bg-zinc-900 text-white min-w-60 w-full max-h-[500px] overflow-hidden">
      {/* Header with title and controls */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Workout Plans</h3>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showActiveOnly}
                onChange={(e) => setShowActiveOnly(e.target.checked)}
                className="rounded"
              />
              Active Only
            </label>
          </div>
        </div>

        {/* Workout selector */}
        <div className="flex gap-2">
          <select
            value={selectedWorkoutId || ""}
            onChange={(e) => setSelectedWorkoutId(Number(e.target.value))}
            className="bg-zinc-800 text-white p-2 rounded-lg text-sm flex-1"
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
          >
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {/* Activate workout button */}
        {currentWorkout && !currentWorkout.isActive && (
          <button
            onClick={() => activateWorkout(currentWorkout.workoutId)}
            disabled={isActivating}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActivating
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "text-white hover:opacity-80"
            }`}
            style={{
              backgroundColor: isActivating ? undefined : "#05A31D",
            }}
          >
            {isActivating ? "Activating..." : "Set as Active Workout"}
          </button>
        )}
      </div>

      {/* Exercises display */}
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
                className={`p-4 rounded-xl ${
                  currentWorkout.isActive ? "bg-green-600" : "bg-gray-600"
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

      {/* Workout info footer */}
      {currentWorkout && (
        <div className="text-xs text-gray-400 border-t border-gray-700 pt-2">
          Workout #{currentWorkout.workoutId} -{" "}
          {currentWorkout.isActive ? "Active" : "Inactive"} (
          {currentWorkout.exercises?.length || 0} total exercises)
        </div>
      )}
    </article>
  );
};

export default ProgressCard;
