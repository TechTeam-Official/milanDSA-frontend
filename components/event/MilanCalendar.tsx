"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Calendar as CalIcon } from "lucide-react";

import {
  getCalendarSchedule,
  type CalendarEvent,
} from "../../app/events/calendarAdapter";

/* ---------------- CONFIG ---------------- */

const YEAR = 2026;
const DAYS_IN_MONTH = 28;
const FIRST_DAY_OFFSET = 0;
const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/* ---------------- INAUGURATION ---------------- */

const INAUG_DAY = 19;
const INAUGURAL_EVENT: CalendarEvent = {
  day: INAUG_DAY,
  time: "09:00 AM",
  title: "Inauguration Ceremony",
  category: "General",
  location: "Main Auditorium",
};

/* ---------------- HELPER: TIME SORTING ---------------- */

/* ---------------- HELPER: TIME SORTING ---------------- */

// ✅ FIXED: Now handles "8.30 AM" (dots) AND "8:30 AM" (colons)
const parseTime = (timeStr: string) => {
  // 1. Remove extra spaces and force uppercase for safety
  const normalized = timeStr.trim().toUpperCase();

  // 2. Split into Time and Modifier (AM/PM)
  // This regex splits by space, handling "8.30 AM" or "8.30AM"
  const [timePart, modifier] = normalized.split(/\s+/);

  // 3. Split hours and minutes using EITHER dot (.) OR colon (:)
  const [rawHours, rawMinutes] = timePart.split(/[.:]/).map(Number);

  let hours = rawHours;
  const minutes = rawMinutes || 0; // Default to 0 if minutes are missing

  // 4. Convert to 24-hour format for sorting
  if (hours === 12 && modifier === "AM") hours = 0;
  if (modifier === "PM" && hours !== 12) hours += 12;

  return hours * 60 + minutes;
};
/* ---------------- MODAL COMPONENT (TIMELINE DESIGN) ---------------- */

function ScheduleModal({
  isOpen,
  onClose,
  day,
  schedule,
}: {
  isOpen: boolean;
  onClose: () => void;
  day: number | null;
  schedule: Record<number, CalendarEvent[]>;
}) {
  if (!isOpen || day === null) return null;

  // ✅ SORTING LOGIC: sort events chronologically
  const rawEvents = schedule[day] ?? [];
  const events = [...rawEvents].sort((a, b) => {
    return parseTime(a.time) - parseTime(b.time);
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="relative bg-[#18181B] border border-white/10 w-full max-w-xl max-h-[85vh] rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-8 border-b border-white/5 bg-white/2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl">
                <CalIcon className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  February {day}, {YEAR}
                </h3>
                <p className="text-neutral-500 text-sm font-medium">
                  {events.length} {events.length === 1 ? "event" : "events"}{" "}
                  scheduled
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-neutral-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline Body */}
          <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
            {events.length > 0 ? (
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[13px] top-6 bottom-6 w-0.5 bg-linear-to-b from-purple-500/50 via-purple-500/20 to-transparent" />

                <div className="space-y-6">
                  {events.map((event, idx) => (
                    <motion.div
                      key={`${event.title}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-12">
                      {/* Timeline Node (Circle) */}
                      <div className="absolute -left-0.5 top-5 w-4 h-4 rounded-full bg-[#18181B] border-[3px] border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)] z-10" />

                      {/* Event Card */}
                      <div className="group bg-neutral-900/40 border border-white/5 p-6 rounded-4xl hover:bg-neutral-800/60 transition-all duration-300">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs tracking-widest uppercase">
                            <Clock className="w-3.5 h-3.5" /> {event.time}
                          </div>
                          <span className="px-3 py-1 rounded-lg bg-neutral-800 text-[10px] text-neutral-400 uppercase font-black tracking-tight">
                            {event.category}
                          </span>
                        </div>

                        <h4 className="text-white font-bold text-xl mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                          {event.title}
                        </h4>

                        <div className="flex items-center gap-2 text-neutral-500 text-sm">
                          <MapPin className="w-4 h-4 text-neutral-600" />
                          {event.location}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-neutral-600 font-medium">
                No events scheduled for this day.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ---------------- MAIN CALENDAR PAGE ---------------- */

export default function MilanCalendar() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const schedule = useMemo(() => {
    const base = getCalendarSchedule();
    if (!base[INAUG_DAY]) base[INAUG_DAY] = [];

    const alreadyAdded = base[INAUG_DAY].some(
      (ev) => ev.title === INAUGURAL_EVENT.title,
    );
    if (!alreadyAdded) {
      base[INAUG_DAY].unshift(INAUGURAL_EVENT);
    }

    return base;
  }, []);

  const highlightDays = useMemo(() => {
    return Object.keys(schedule).map(Number);
  }, [schedule]);

  const calendarCells = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < FIRST_DAY_OFFSET; i++) cells.push(null);
    for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
    while (cells.length < 35) cells.push(null);
    return cells;
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-10 bg-[#0F0F0F] border border-white/5 rounded-[3rem] shadow-3xl">
      {/* Header */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black text-white tracking-tighter">
          February{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500">
            {YEAR}
          </span>
        </motion.h2>
        <p className="text-[11px] text-neutral-500 mt-4 tracking-[0.3em] font-bold uppercase">
          OFFICIAL SCHEDULE · SRM IST
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-4">
        {DAYS_OF_WEEK.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-black text-neutral-600 pb-6 uppercase tracking-widest">
            {d}
          </div>
        ))}

        {calendarCells.map((day, idx) => {
          const isHighlighted = day !== null && highlightDays.includes(day);

          return day ? (
            <motion.div
              key={`day-${day}`}
              whileHover={isHighlighted ? { scale: 1.05, y: -2 } : {}}
              whileTap={isHighlighted ? { scale: 0.95 } : {}}
              onClick={() => isHighlighted && setSelectedDay(day)}
              className={`
                aspect-square rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative
                ${
                  isHighlighted
                    ? "bg-linear-to-br from-purple-600/30 to-blue-600/30 border border-purple-500/40 text-white shadow-xl shadow-purple-500/10"
                    : "bg-white/3 border border-white/5 text-neutral-700 hover:bg-white/8"
                }
              `}>
              <span
                className={`text-2xl font-black ${isHighlighted ? "text-white" : "opacity-30"}`}>
                {day}
              </span>

              {isHighlighted && (
                <>
                  <span className="text-[8px] mt-1 font-bold opacity-60 uppercase tracking-tighter">
                    View Events
                  </span>
                  {/* Status Indicator Dot */}
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.7)]" />
                </>
              )}
            </motion.div>
          ) : (
            <div
              key={`pad-${idx}`}
              className="aspect-square"
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-500/40 border border-purple-500" />
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
            Events Available
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white/5 border border-white/10" />
          <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
            Empty Day
          </span>
        </div>
      </div>

      <ScheduleModal
        isOpen={selectedDay !== null}
        day={selectedDay}
        schedule={schedule}
        onClose={() => setSelectedDay(null)}
      />
    </div>
  );
}
