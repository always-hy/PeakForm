import React from "react";

const AchievementCard = () => {
  return (
    <article className="flex overflow-hidden relative flex-col items-start mt-7 max-w-full text-base whitespace-nowrap rounded-xl w-[312px] mb-2">
      <div className="flex z-0 self-stretch w-full bg-zinc-900 min-h-[170px]" />
      <h4 className="absolute top-5 z-0 h-6 font-bold text-white left-[45px] w-[62px]">
        Deadlift
      </h4>
      <img
        src="/dumbell 2.png"
        className="object-contain absolute left-3.5 top-5 z-0 w-6 h-6 aspect-square"
        alt="Deadlift icon"
      />
      <p className="absolute bottom-16 z-0 h-8 text-6xl font-semibold leading-none text-white left-[102px] w-[106px] max-md:text-4xl">
        210
      </p>
      <span className="absolute z-0 h-6 bottom-[49px] right-[83px] text-neutral-50 w-[21px]">
        KG
      </span>
    </article>
  );
};

export default AchievementCard;
