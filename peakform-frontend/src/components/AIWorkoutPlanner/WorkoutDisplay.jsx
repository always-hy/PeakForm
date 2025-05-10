import { useState, useEffect } from "react";

const WorkoutPlanDisplay = ({ workoutPlan }) => {
  const [activeTab, setActiveTab] = useState("all");

  // Get all unique days from exercises with better error handling
  const getDays = () => {
    if (
      !workoutPlan ||
      !workoutPlan.exercises ||
      !Array.isArray(workoutPlan.exercises)
    ) {
      console.error("Invalid workout plan data:", workoutPlan);
      return [];
    }

    const days = new Set();

    try {
      // Iterate through the exercises array within the workoutPlan object
      workoutPlan.exercises.forEach((exercise) => {
        if (exercise && exercise.day) {
          days.add(exercise.day);
        }
      });
    } catch (error) {
      console.error("Error extracting days from workout plan:", error);
    }

    // Sort days in a sensible order (if they're weekdays)
    const weekdayOrder = {
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
      SUNDAY: 7,
    };

    return Array.from(days).sort((a, b) => {
      // Try to sort by weekday order if possible
      return (weekdayOrder[a] || 999) - (weekdayOrder[b] || 999);
    });
  };

  const days = getDays();

  // Debug logging
  useEffect(() => {
    console.log("Workout plan data:", workoutPlan);
    console.log("Extracted days:", days);
  }, [workoutPlan]);

  // Filter exercises by day with improved error handling
  const getExercisesByDay = (day) => {
    if (
      !workoutPlan ||
      !workoutPlan.exercises ||
      !Array.isArray(workoutPlan.exercises)
    ) {
      return [];
    }

    try {
      // Filter the exercises array within the workoutPlan object
      return workoutPlan.exercises.filter(
        (exercise) => exercise && (day === "all" || exercise.day === day)
      );
    } catch (error) {
      console.error("Error filtering exercises by day:", error);
      return [];
    }
  };

  const currentExercises = getExercisesByDay(activeTab);

  // This is a function to look up missing exercise details - in a real app
  // you'd either have this data in your exercises or make an API call
  const getExerciseDetails = (exerciseId) => {
    // These would come from your database or API
    const exerciseDatabase = {
      1: {
        exerciseName: "Bench Press",
        description:
          "A compound exercise that targets the chest, shoulders, and triceps.",
        targetMuscleGroup: "Chest, Shoulders, Triceps",
      },
      2: {
        exerciseName: "Squats",
        description:
          "A compound lower body exercise that primarily targets the quadriceps, hamstrings, and glutes.",
        targetMuscleGroup: "Quadriceps, Hamstrings, Glutes",
      },
      3: {
        exerciseName: "Deadlift",
        description:
          "A compound exercise that works the entire posterior chain.",
        targetMuscleGroup: "Lower Back, Hamstrings, Glutes",
      },
      4: {
        exerciseName: "Barbell Rows",
        description:
          "A compound exercise that targets the muscles of the back.",
        targetMuscleGroup: "Upper Back, Lats, Biceps",
      },
      5: {
        exerciseName: "Overhead Press",
        description:
          "A compound push exercise that targets the shoulders and triceps.",
        targetMuscleGroup: "Shoulders, Triceps",
      },
      6: {
        exerciseName: "Pull-Ups",
        description:
          "A bodyweight exercise that works the upper back and arms.",
        targetMuscleGroup: "Lats, Biceps, Upper Back",
      },
      7: {
        exerciseName: "Dips",
        description: "A bodyweight exercise focusing on the chest and triceps.",
        targetMuscleGroup: "Chest, Triceps, Shoulders",
      },
      8: {
        exerciseName: "Lunges",
        description: "A unilateral exercise that targets the lower body.",
        targetMuscleGroup: "Quadriceps, Hamstrings, Glutes",
      },
      9: {
        exerciseName: "Lateral Raises",
        description: "An isolation exercise that targets the lateral deltoids.",
        targetMuscleGroup: "Shoulders, Upper Traps",
      },
      10: {
        exerciseName: "Bicep Curls",
        description: "An isolation exercise for the biceps muscles.",
        targetMuscleGroup: "Biceps, Forearms",
      },
      13: {
        exerciseName: "Calf Raises",
        description: "An isolation exercise targeting the calf muscles.",
        targetMuscleGroup: "Calves",
      },
      14: {
        exerciseName: "Tricep Extensions",
        description: "An isolation exercise targeting the triceps.",
        targetMuscleGroup: "Triceps",
      },
      15: {
        exerciseName: "Face Pulls",
        description:
          "An exercise that targets the rear deltoids and upper back.",
        targetMuscleGroup: "Rear Deltoids, Rotator Cuff, Upper Back",
      },
      17: {
        exerciseName: "Romanian Deadlift",
        description: "A hip-hinge movement that targets the posterior chain.",
        targetMuscleGroup: "Hamstrings, Glutes, Lower Back",
      },
      18: {
        exerciseName: "Leg Press",
        description: "A machine exercise that targets the lower body muscles.",
        targetMuscleGroup: "Quadriceps, Hamstrings, Glutes",
      },
    };

    return (
      exerciseDatabase[exerciseId] || {
        exerciseName: `Exercise #${exerciseId}`,
        description: "No description available.",
        targetMuscleGroup: "Unknown",
      }
    );
  };

  return (
    <div>
      {/* Display JSON data for debugging */}
      <div className="mb-4 p-3 bg-zinc-800 rounded-lg border border-zinc-700 overflow-auto max-h-32 hidden">
        <div className="text-xs text-zinc-400 mb-1">Raw Response Data:</div>
        <pre className="text-xs">{JSON.stringify(workoutPlan, null, 2)}</pre>
      </div>

      {/* Show error if no days found */}
      {days.length === 0 ? (
        <div className="bg-yellow-900/20 border border-yellow-700/30 text-yellow-200 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Workout Plan Structure Issue</h3>
          <p className="text-sm">
            The workout plan data doesn't contain any days or exercises. This
            could be due to an API response format mismatch.
          </p>
          <details className="mt-3">
            <summary className="text-xs cursor-pointer hover:text-yellow-300">
              Show expected format
            </summary>
            <pre className="text-xs bg-zinc-900 p-2 mt-2 rounded overflow-auto max-h-60">
              {`{
  "exercises": [
    {
      "exerciseId": 3,
      "day": "MONDAY",
      "sets": 4,
      "reps": "8-12"
    },
    // More exercises...
  ]
}`}
            </pre>
          </details>
        </div>
      ) : null}

      {/* Tabs for days */}
      {days.length > 0 && (
        <div className="flex overflow-x-auto mb-6 -mx-1 pb-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 mx-1 whitespace-nowrap rounded transition-colors ${
              activeTab === "all"
                ? "bg-[#05A31D] text-white"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            All Days
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`px-4 py-2 mx-1 whitespace-nowrap rounded transition-colors ${
                activeTab === day
                  ? "bg-[#05A31D] text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      )}

      {/* Exercise cards */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {currentExercises.length > 0 ? (
          currentExercises.map((exercise) => {
            // Get additional exercise details from our lookup function
            const details = getExerciseDetails(exercise.exerciseId);

            return (
              <div
                key={exercise.exerciseId}
                className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-[#05A31D] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {details.exerciseName}
                    </h3>
                    <span className="inline-block bg-[#05A31D]/20 text-[#05A31D] text-xs font-medium px-2 py-1 rounded mt-1">
                      {exercise.day}
                    </span>
                  </div>
                  <div className="bg-zinc-900 px-3 py-1 rounded-full text-sm">
                    {exercise.sets} sets × {exercise.reps} reps
                  </div>
                </div>

                <p className="text-zinc-400 mt-2 text-sm">
                  {details.description}
                </p>

                <div className="mt-3">
                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                    Target muscles
                  </span>
                  <p className="text-sm mt-1">{details.targetMuscleGroup}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-zinc-400">
            No exercises found for the selected day.
          </div>
        )}
      </div>

      {/* Summary section */}
      {currentExercises.length > 0 && (
        <div className="mt-6 pt-4 border-t border-zinc-800">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Workout Summary</h3>
            <span className="text-sm text-[#05A31D]">
              {currentExercises.length}{" "}
              {currentExercises.length === 1 ? "exercise" : "exercises"}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="bg-zinc-800 p-3 rounded">
              <span className="text-xs text-zinc-400">Total Sets</span>
              <p className="text-xl font-semibold mt-1">
                {currentExercises.reduce(
                  (total, ex) => total + (parseInt(ex.sets) || 0),
                  0
                )}
              </p>
            </div>
            <div className="bg-zinc-800 p-3 rounded">
              <span className="text-xs text-zinc-400">Days</span>
              <p className="text-xl font-semibold mt-1">{days.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanDisplay;
