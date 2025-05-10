import React from "react";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-[#05A31D] transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{exercise.exerciseName}</h3>
          <span className="inline-block bg-[#05A31D]/20 text-[#05A31D] text-xs font-medium px-2 py-1 rounded mt-1">
            {exercise.day}
          </span>
        </div>
        <div className="bg-zinc-900 px-3 py-1 rounded-full text-sm">
          {exercise.sets} sets × {exercise.reps} reps
        </div>
      </div>

      <p className="text-zinc-400 mt-2 text-sm">{exercise.description}</p>

      <div className="mt-3">
        <span className="text-xs uppercase tracking-wider text-zinc-500">
          Target muscles
        </span>
        <p className="text-sm mt-1">{exercise.targetMuscleGroup}</p>
      </div>
    </div>
  );
};

export default ExerciseCard;
