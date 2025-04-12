import React from "react";

const StatCard = ({ title, icon, type, value, target, unit, chart }) => {
  // For the streak card which has a different layout
  if (type === "streak") {
    return (
      <article className="flex overflow-hidden flex-col grow shrink items-center self-stretch px-4 pt-5 pb-2 my-auto w-40 rounded-xl bg-zinc-900 min-h-[170px]">
        <div className="flex flex-wrap gap-2 justify-center items-end w-full max-w-[165px]">
          <div className="flex gap-2.5 items-center min-h-[22px] w-[22px]">
            <img
              src={icon}
              className="object-contain self-stretch my-auto aspect-square w-[22px]"
              alt={title}
            />
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
        <img
          src={chart}
          className="object-contain mt-5 max-w-full aspect-[3.19] w-[145px]"
          alt="Streak chart"
        />
        <div className="flex gap-0.5 justify-center items-end mt-5 whitespace-nowrap">
          <p className="text-2xl font-semibold leading-none text-white">
            {value}
          </p>
          <p className="text-base text-neutral-50">{unit}</p>
        </div>
      </article>
    );
  }

  // For other stat cards (workout duration, water, calories)
  return (
    <article
      className="flex flex-col items-center justify-center px-4 pt-5 pb-5 text-base font-bold text-white rounded-xl bg-zinc-900 w-full max-w-[165px]"
      style={{ height: "170px" }}
    >
      {type === "duration" ? (
        <div className="flex flex-col items-center justify-between h-full w-full">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={icon}
              className="object-contain aspect-square w-[22px]"
              alt={title}
            />
            <h3 className="text-center">{title}</h3>
          </div>
          <div>{value} minutes</div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between h-full w-full">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-2">
            <img
              src={icon}
              className="object-contain aspect-square w-[22px]"
              alt={title}
            />
            <h3 className="text-center">{title}</h3>
          </div>
          {/* Chart */}
          <div className="flex justify-center items-center w-full h-full">
            {chart}
          </div>
          <div>
            {value} / {target}
          </div>
        </div>
      )}
    </article>
  );
};

export default StatCard;
