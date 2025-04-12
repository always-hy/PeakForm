import React from "react";
import ProgressItem from "./ProgressItem";

const ProgressCard = () => {
  const progressItems = [
    { label: "Cardio", hours: "30 hrs", color: "bg-green-500" },
    { label: "Stretching", hours: "40 hrs", color: "bg-green-500" },
    { label: "Treadmill", hours: "30 hrs", color: "bg-green-600" },
    { label: "Strength", hours: "20 hrs", color: "bg-green-900" },
  ];

  return (
    <article className="flex flex-wrap grow shrink gap-9 items-start self-stretch pt-5 pr-px pb-10 pl-5 my-auto rounded-xl bg-zinc-900 min-h-[271px] min-w-60 w-[343px] max-md:max-w-full">
      <div className="flex grow shrink gap-10 justify-between items-start text-white whitespace-nowrap min-w-60 w-[242px]">
        <h3 className="text-xl font-semibold leading-tight">Progress</h3>
        <div className="flex gap-2 justify-center items-center p-2 text-sm leading-none rounded-xl bg-zinc-900">
          <span className="self-stretch my-auto">Weekly</span>
          <img
            src="/dropdown.png"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
            alt="Dropdown"
          />
        </div>
      </div>
      <div className="flex grow shrink gap-10 items-start text-sm min-w-60 w-[346px]">
        <div>
          {progressItems.map((item, index) => (
            <ProgressItem
              key={index}
              label={item.label}
              hours={item.hours}
              color={item.color}
              isLast={index === progressItems.length - 1}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProgressCard;
