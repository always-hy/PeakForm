import React from "react";

const ExerciseLibrary = ({ exerciseLibrary, addExerciseToDay }) => {
  return (
    <div className="w-1/2 bg-zinc-900 p-4 rounded-lg border border-green-500 shadow-md">
      <h2 className="text-xl font-semibold text-green-400 mb-4">
        Exercise Library
      </h2>
      <ul className="space-y-3 max-h-[400px] overflow-y-auto">
        {exerciseLibrary.map((exercise) => (
          <li
            key={exercise.exerciseId}
            className="bg-black p-3 rounded cursor-pointer hover:bg-green-600"
            onClick={() => addExerciseToDay(exercise)}
          >
            <h3 className="text-lg font-bold">{exercise.exerciseName}</h3>
            <p className="text-sm text-gray-300">{exercise.description}</p>
            <p className="text-xs text-green-400">
              {exercise.targetMuscleGroup}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseLibrary;
