import React from "react";

const ActivityCard = () => {
  return (
    <article className="grow shrink self-stretch px-5 pt-5 pb-52 my-auto text-white whitespace-nowrap rounded-xl bg-zinc-900 min-h-[271px] min-w-60 w-[342px] max-md:pb-24 max-md:max-w-full">
      <div className="flex gap-10 justify-between items-center w-full max-w-[387px]">
        <h3 className="self-stretch my-auto text-xl font-semibold leading-tight">
          Activity
        </h3>
        <div className="flex gap-2 justify-center items-center self-stretch p-2 my-auto text-sm leading-none rounded-xl bg-zinc-900">
          <span className="self-stretch my-auto">Weekly</span>
          <img
            src="/dropdown.png"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
            alt="Dropdown"
          />
        </div>
      </div>
    </article>
  );
};

export default ActivityCard;
