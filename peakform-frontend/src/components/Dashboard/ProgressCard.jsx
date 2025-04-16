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

const staticWorkoutData = [
  {
    exerciseId: 1,
    exerciseName: "Push-Up",
    description:
      "A basic bodyweight exercise to strengthen the chest, shoulders, and triceps.",
    targetMuscleGroup: "Chest, Shoulders, Triceps",
    day: "MONDAY",
    sets: 3,
    reps: "10",
  },
  {
    exerciseId: 2,
    exerciseName: "Squat",
    description:
      "A lower-body exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    targetMuscleGroup: "Legs, Glutes",
    day: "MONDAY",
    sets: 4,
    reps: "12",
  },
  {
    exerciseId: 3,
    exerciseName: "Plank",
    description:
      "An isometric core strength exercise that involves maintaining a position.",
    targetMuscleGroup: "Core",
    day: "MONDAY",
    sets: 3,
    reps: "60 sec",
  },
  {
    exerciseId: 4,
    exerciseName: "Burpees",
    description:
      "A full-body exercise used in strength training and aerobic exercise.",
    targetMuscleGroup: "Full Body",
    day: "MONDAY",
    sets: 3,
    reps: "15",
  },
];

const ProgressCard = () => {
  const [selectedDay, setSelectedDay] = useState("MONDAY");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fetch workout plan
    const fetchWorkout = async () => {
      try {
        const uuid = localStorage.getItem("user_uuid");
        const statsResponse = await fetch(
          // "http://localhost:8080/user-schedules/records?userUuid=" + data.userUuid,
          `http://localhost:8080/workout-plans?userUuid=${uuid}`,

          {
            method: "GET",
            credentials: "include", // Include session cookies
          }
        );
        const data = await statsResponse.json();
        setExercises(data.exercises || []);
        console.log(data);
        // setExercises(staticWorkoutData);
      } catch (err) {
        console.error("Failed to fetch workout data:", err);
      }
    };

    fetchWorkout();
  }, []);

  const filteredExercises = exercises.filter(
    (exercise) => exercise.day === selectedDay
  );

  return (
    <article className="flex flex-col gap-5 p-5 rounded-xl bg-zinc-900 text-white min-w-60 w-full max-h-[400px] overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Workout Plan</h3>
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

      <div className="overflow-y-auto pr-2 custom-scrollbar">
        {filteredExercises.length === 0 ? (
          <p className="text-sm text-gray-400">
            No exercises for {selectedDay}.
          </p>
        ) : (
          <div className="flex flex-col gap-4 pb-1">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.exerciseId}
                className="p-4 rounded-xl bg-green-600"
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
    </article>
  );
};

export default ProgressCard;
