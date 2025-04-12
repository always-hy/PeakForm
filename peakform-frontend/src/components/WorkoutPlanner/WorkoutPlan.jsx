import React from "react";

const WorkoutPlan = ({
  days,
  selectedDay,
  setSelectedDay,
  workoutPlan,
  updateExerciseFields,
  handleCreateWorkout,
}) => {
  return (
    <div className="w-1/2 bg-zinc-900 p-4 rounded-lg border border-green-500 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-green-400">Workout Plan</h2>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-zinc-900 text-white border border-green-500 rounded px-2 py-1"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {workoutPlan[selectedDay].map((exercise, index) => (
          <li
            key={index}
            className="bg-zinc-800 p-3 rounded text-white flex flex-col gap-2"
          >
            <div className="font-bold">{exercise.exerciseName}</div>
            <div className="flex gap-4">
              <div>
                <label className="text-sm text-gray-300">Sets:</label>
                <input
                  type="number"
                  min="1"
                  value={exercise.sets}
                  onChange={(e) =>
                    updateExerciseFields(index, "sets", e.target.value)
                  }
                  className="ml-2 w-16 px-2 py-1 bg-black text-white border border-green-400 rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Reps:</label>
                <input
                  type="number"
                  min="1"
                  value={exercise.reps}
                  onChange={(e) =>
                    updateExerciseFields(index, "reps", e.target.value)
                  }
                  className="ml-2 w-16 px-2 py-1 bg-black text-white border border-green-400 rounded"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCreateWorkout}
        className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded"
      >
        Create Workout
      </button>
    </div>
  );
};

export default WorkoutPlan;
