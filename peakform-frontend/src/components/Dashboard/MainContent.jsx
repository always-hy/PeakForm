import React from "react";
import StatCard from "./StatCard";
import ActivityCard from "./ActivityCard";
import ProgressCard from "./ProgressCard";
import Calendar from "./Calendar";

const MainContent = () => {
  return (
    <section class="self-stretch mt-24 min-w-60 w-[882px] max-md:max-w-full md:flex-1">
      <header className="flex flex-wrap gap-10 justify-between items-start w-full max-md:max-w-full">
        <div className="min-w-60 w-[246px]">
          <h2 className="text-lg font-medium text-zinc-400">Good Morning</h2>
          <h1 className="text-3xl font-bold text-white">Welcome Back 🎉</h1>
        </div>
        <div className="flex gap-8 items-center">
          <button className="gap-2 self-stretch px-3 py-2 my-auto text-base font-semibold text-white whitespace-nowrap bg-green-500 rounded-md">
            Subscribe
          </button>
          <img
            src="/notification.png"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt="Notification"
          />
        </div>
      </header>

      <div className="mt-8 w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <div className="flex flex-wrap gap-7 items-center w-full max-md:max-w-full">
            <StatCard
              title="Workout Duration"
              icon="/workout-duration.png"
              type="duration"
            />
            <StatCard title="Water" icon="/Water.png" type="water" />
            <StatCard title="Calories" icon="/Cal.png" type="calories" />
            <StatCard
              title="Streak"
              icon="/streak.png"
              type="streak"
              value="110"
              unit="Days"
              chart="/streak_line.png"
            />
          </div>

          <div className="flex flex-wrap gap-7 items-center mt-8 w-full max-md:max-w-full">
            <ActivityCard />
            <ProgressCard />
          </div>
        </div>
        <div className="mt-8">
          <Calendar />
        </div>
      </div>
    </section>
  );
};

export default MainContent;
