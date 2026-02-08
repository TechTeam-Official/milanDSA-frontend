"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Calendar as CalIcon } from "lucide-react";

import {
  getCalendarSchedule,
  type CalendarEvent,
} from "../../app/events/calendarAdapter";

import { useModal } from "@/context/ui-context";

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
  const { setModalOpen } = useModal();

  // Fixed: Hook must be before any early return
  React.useEffect(() => {
    if (isOpen) {
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setModalOpen(false);
      document.body.style.overflow = "";
    }
    return () => {
      setModalOpen(false);
      document.body.style.overflow = "";
    };
  }, [isOpen, setModalOpen]);

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
          className="relative indian-dark-bg border border-[#C9A24D]/20 w-full max-w-xl max-h-[85vh] rounded-xl md:rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 md:p-8 border-b border-[#C9A24D]/10 bg-[#FDFBF7]/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-2 md:p-3 bg-[#C9A24D]/10 rounded-2xl">
                <CalIcon className="w-5 h-5 md:w-6 md:h-6 text-[#C9A24D]" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  February {day}, {YEAR}
                </h3>
                <p className="text-[#C9A24D]/80 text-xs md:text-sm font-medium">
                  {events.length} {events.length === 1 ? "event" : "events"}{" "}
                  scheduled
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
            {events.length > 0 ? (
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-[13px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#C9A24D]/50 via-[#C9A24D]/20 to-transparent" />

                <div className="space-y-6">
                  {events.map((event, idx) => (
                    <motion.div
                      key={`${event.title}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-12">
                      {/* Timeline Node (Circle) */}
                      <div className="absolute -left-0.5 top-5 w-4 h-4 rounded-full bg-[#2A1B1A] border-[3px] border-[#D97706] shadow-[0_0_10px_#D97706] z-10" />

                      {/* Event Card */}
                      <div className="group bg-[#0B0B0F]/60 border border-[#C9A24D]/10 p-4 md:p-6 rounded-3xl md:rounded-4xl hover:bg-[#0B0B0F]/80 hover:border-[#C9A24D]/30 transition-all duration-300">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-2 text-[#C9A24D] font-bold text-xs tracking-widest uppercase">
                            <Clock className="w-3.5 h-3.5" /> {event.time}
                          </div>
                          <span className="px-3 py-1 rounded-lg bg-neutral-800 text-[10px] text-neutral-400 uppercase font-black tracking-tight">
                            {event.category}
                          </span>
                        </div>

                        <h4 className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-[#C9A24D] transition-colors leading-tight">
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
    <div className="w-full max-w-5xl mx-auto p-4 md:p-10 indian-dark-bg border border-[#C9A24D]/30 rounded-2xl md:rounded-[3rem] shadow-3xl relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 md:mb-14 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tighter">
          February{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24D] to-[#D97706]">
            {YEAR}
          </span>
        </motion.h2>
        <p className="text-[11px] text-[#C9A24D]/80 mt-4 tracking-[0.3em] font-bold uppercase">
          OFFICIAL SCHEDULE · SRM IST
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 relative z-10">
        {DAYS_OF_WEEK.map((d) => (
          <div
            key={d}
            className="text-center text-[8px] md:text-[10px] font-black text-[#B87333] pb-2 md:pb-6 uppercase tracking-widest">
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
                aspect-square rounded-xl md:rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative
                ${isHighlighted
                  ? "bg-gradient-to-br from-[#C9A24D]/20 to-[#B87333]/20 border border-[#C9A24D] text-white shadow-[0_0_15px_rgba(201,162,77,0.2)]"
                  : "bg-[#FDFBF7]/5 border border-[#C9A24D]/10 text-neutral-400 hover:bg-[#C9A24D]/5 hover:border-[#C9A24D]/30"
                }
              `}>
              <span
                className={`text-lg md:text-2xl font-black ${isHighlighted ? "text-[#C9A24D]" : "opacity-30"}`}>
                {day}
              </span>

              {isHighlighted && (
                <>
                  <span className="hidden md:block text-[8px] mt-1 font-bold opacity-80 uppercase tracking-tighter text-[#FDFBF7]">
                    View Events
                  </span>
                  {/* Status Indicator Dot */}
                  <div className="absolute top-1 right-1 md:top-3 md:right-3 w-1.5 h-1.5 md:w-1.5 md:h-1.5 rounded-full bg-[#0F766E] shadow-[0_0_8px_#0F766E]" />
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
          <div className="w-3 h-3 rounded-full bg-[#C9A24D]/40 border border-[#C9A24D]" />
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
