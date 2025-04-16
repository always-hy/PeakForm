"use client";

import React, { useEffect, useState } from "react";
import WorkoutPlan from "./WorkoutPlan";
import ExerciseLibrary from "./ExerciseLibrary";

const WorkoutPlanner = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [exerciseLibrary, setExerciseLibrary] = useState([]);
  const [workoutPlan, setWorkoutPlan] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:8080/exercises", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setExerciseLibrary(data);
        } else {
          console.error("Failed to fetch exercises");
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const addExerciseToDay = (exercise) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      [selectedDay]: [
        ...prev[selectedDay],
        { ...exercise, sets: "", reps: "" },
      ],
    }));
  };

  const updateExerciseFields = (index, field, value) => {
    setWorkoutPlan((prev) => {
      const updatedDay = [...prev[selectedDay]];
      updatedDay[index] = { ...updatedDay[index], [field]: value };
      return {
        ...prev,
        [selectedDay]: updatedDay,
      };
    });
  };

  const handleCreateWorkout = async () => {
    const exercises = [];

    Object.entries(workoutPlan).forEach(([day, workouts]) => {
      workouts.forEach((workout) => {
        if (workout.exerciseId && workout.sets && workout.reps) {
          exercises.push({
            exerciseId: workout.exerciseId,
            day: day.toUpperCase(), // Convert day to uppercase
            sets: Number(workout.sets), // Ensure sets is a number
            reps: workout.reps.toString(), // Ensure reps is a string
          });
        }
      });
    });

    const finalWorkoutPayload = { exercises };

    // Log the final payload for debugging
    console.log("Final Workout Payload:", JSON.stringify(finalWorkoutPayload));

    const storedUuid = localStorage.getItem("user_uuid");
    console.log(storedUuid);
    const url = `http://localhost:8080/workout-plans/create?userUuid=${storedUuid}`;
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalWorkoutPayload),
      });

      if (response.ok) {
        console.log("Workout created successfully:");
        alert("Workout created successfully!");
      } else {
        // Read the error response as text
        const errorText = await response.text();
        console.error("Workout creation failed:", errorText);

        // Check if the response text contains something useful
        if (errorText && errorText.includes("Workout pl")) {
          alert("Workout creation failed! See console for details.");
        } else {
          alert("Unexpected response from the server.");
        }
      }
    } catch (error) {
      console.error("Error creating workout:", error);
      alert("An error occurred while creating the workout.");
    }
  };

  useEffect(() => {
    const exercises = [];

    Object.entries(workoutPlan).forEach(([day, workouts]) => {
      workouts.forEach((workout) => {
        if (workout.exerciseId && workout.sets && workout.reps) {
          exercises.push({
            exerciseId: workout.exerciseId,
            day: day.toUpperCase(),
            sets: Number(workout.sets),
            reps: workout.reps.toString(),
          });
        }
      });
    });

    const finalWorkoutPayload = { exercises };
    console.log("Live Workout Payload:", finalWorkoutPayload);
  }, [workoutPlan]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button
        onClick={() =>
          (window.location.href = "http://localhost:3000/dashboard")
        }
        className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md"
      >
        Back to dashboard
      </button>
      <h1 className="text-3xl font-bold text-green-400 mb-6">
        Workout Planner
      </h1>
      <div className="flex gap-6">
        <WorkoutPlan
          days={days}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          workoutPlan={workoutPlan}
          updateExerciseFields={updateExerciseFields}
          handleCreateWorkout={handleCreateWorkout}
        />
        <ExerciseLibrary
          exerciseLibrary={exerciseLibrary}
          addExerciseToDay={addExerciseToDay}
        />
      </div>
    </div>
  );
};

export default WorkoutPlanner;
