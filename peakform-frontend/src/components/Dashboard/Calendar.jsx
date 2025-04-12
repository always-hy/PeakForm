import React, { useState } from "react";

// DayPilot Pro
import { DayPilot, DayPilotCalendar } from "daypilot-pro-react";

const Calendar = () => {
  const [calendar, setCalendar] = useState();

  // Sample events to load on mount
  const events = [
    {
      id: DayPilot.guid(),
      text: "Team Meeting",
      start: DayPilot.Date.today().addHours(9),
      end: DayPilot.Date.today().addHours(10),
    },
    {
      id: DayPilot.guid(),
      text: "Design Review",
      start: DayPilot.Date.today().addHours(13),
      end: DayPilot.Date.today().addHours(14),
    },
  ];

  return (
    <div>
      <DayPilotCalendar
        viewType="Week"
        events={{ list: events }}
        onTimeRangeSelected={(args) => {
          const e = {
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: "New Event",
          };
          calendar.events.add(e);
          calendar.clearSelection();
        }}
        controlRef={setCalendar}
      />
    </div>
  );
};

export default Calendar;
