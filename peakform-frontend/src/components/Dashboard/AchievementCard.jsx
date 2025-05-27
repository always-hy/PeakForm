import React from "react";
import { Dumbbell, ArmMuscle, Weight } from "lucide-react";

const icons = {
  Squat: <Dumbbell className="text-[#05A31D] w-6 h-6" />,
  BenchPress: <ArmMuscle className="text-[#05A31D] w-6 h-6" />,
  Deadlift: <Weight className="text-[#05A31D] w-6 h-6" />,
};

const AchievementCard = ({ title, value }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 text-white w-full shadow border border-[#05A31D]/40">
      <div className="flex items-center justify-center w-12 h-12 bg-[#05A31D]/10 rounded-full">
        {icons[title]}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-300">{title}</span>
        <span className="text-2xl font-bold">
          {value}{" "}
          <span className="text-base text-gray-400 font-medium">KG</span>
        </span>
      </div>
    </div>
  );
};

export default AchievementCard;
