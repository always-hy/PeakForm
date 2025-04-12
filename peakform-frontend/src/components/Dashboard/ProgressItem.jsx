import React from "react";

const ProgressItem = ({ label, hours, color, isLast }) => {
  return (
    <div>
      <div className="flex gap-10 justify-between items-start">
        <div className="flex gap-3.5 items-center text-green-500 whitespace-nowrap">
          <div
            className={`flex shrink-0 self-stretch my-auto w-2 h-2 ${color} rounded-3xl`}
          />
          <span className="self-stretch my-auto">{label}</span>
        </div>
        <div className="font-medium leading-none text-neutral-400">{hours}</div>
      </div>
      {!isLast && (
        <div className="mt-2.5 max-w-full min-h-0 border border-solid border-stone-50 w-[182px]" />
      )}
    </div>
  );
};

export default ProgressItem;
