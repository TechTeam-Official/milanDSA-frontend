// app/events/eventAdapter.ts

import { rawEventData } from "./eventdata";
import type { EventItem } from "@/components/event/EventDetailsModal";

/* ----------------------------------
   Raw data shape (exactly matches JSON)
----------------------------------- */
export type RawEvent = {
  id: number;
  title: string;
  format: string;
  open_to_all: boolean; // ✅ Changed from 'is_srm_only' to match your raw data
  date: string;
  reporting_time: string;
  venue: string;
  mode: string;
  participation_type: string;
  team_size: string;
};

/* ----------------------------------
   Adapter function (pure & reusable)
----------------------------------- */
function adaptEventsData() {
  const adapted: Record<string, EventItem[]> = {};

  for (const [category, events] of Object.entries(rawEventData)) {
    // The cast now works because RawEvent matches the data structure
    adapted[category] = (events as RawEvent[]).map((e) => ({
      id: e.id,
      title: e.title,

      // 👇 Keep modal flow EXACTLY the same
      description: `${e.date} • ${e.venue}`,

      format: e.format,

      // 👇 Logic adjustment: If it is open to all, it is NOT SRM only.
      is_srm_only: !e.open_to_all,

      // 👇 Keep these for later (calendar / expansion)
      date: e.date,
      reporting_time: e.reporting_time,
      venue: e.venue,
      mode: e.mode,
      participation_type: e.participation_type,
      team_size: e.team_size,
    }));
  }

  return adapted;
}

/* ----------------------------------
   ✅ What page.tsx imports
----------------------------------- */
export const adaptedEventsData = adaptEventsData();
