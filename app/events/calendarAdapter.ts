import { rawEventData } from "./eventdata";

type RawEvent = {
  id: number;
  title: string;
  format: string;
  date: string; // Format: "DD-MM-YYYY"
  reporting_time: string;
  venue: string;
};

export type CalendarEvent = {
  day: number;
  time: string;
  title: string;
  category: string;
  location: string;
};

export function getCalendarSchedule(): Record<number, CalendarEvent[]> {
  const schedule: Record<number, CalendarEvent[]> = {};

  Object.entries(rawEventData).forEach(([category, events]) => {
    (events as RawEvent[]).forEach((event) => {
      // Split "20-02-2026" by the hyphen
      const dateParts = event.date.split("-");

      // Since your format is DD-MM-YYYY, the day is the FIRST element [0]
      const day = parseInt(dateParts[0], 10);

      if (!isNaN(day)) {
        if (!schedule[day]) schedule[day] = [];

        schedule[day].push({
          day,
          time: event.reporting_time,
          title: event.title,
          category,
          location: event.venue,
        });
      }
    });
  });

  return schedule;
}
