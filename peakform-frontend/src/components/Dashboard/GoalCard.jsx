import React from "react";

const GoalCard = () => {
  return (
    <article className="flex gap-1.5 items-center px-2.5 py-3 mt-7 max-w-full rounded-xl bg-zinc-900 min-h-[68px] w-[314px]">
      <img
        src="/girl_running.png"
        className="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-[47px]"
        alt="Running"
      />
      <div className="self-stretch my-auto w-[167px]">
        <h4 className="text-base font-semibold text-white">
          Workout Consistency
        </h4>
        <p className="mt-1 text-sm text-slate-400">3x a week</p>
      </div>
      <div className="flex shrink-0 self-stretch my-auto w-0.5 h-0.5" />
      <div className="relative self-stretch px-2 py-3 my-auto text-sm font-semibold text-green-500 whitespace-nowrap rounded-3xl border-green-900 border-solid border-[3px] min-h-[42px] w-[42px]">
        <img
          src="/progress.png"
          className="object-contain absolute right-0 bottom-0 z-0 aspect-square h-[42px] w-[42px]"
          alt="Progress circle"
        />
        <div className="z-0">79%</div>
      </div>
    </article>
  );
};

export default GoalCard;
