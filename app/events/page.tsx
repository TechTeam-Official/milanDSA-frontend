"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Components
import { BentoCard } from "@/components/event/BentoGrid";
import MilanCalendar from "@/components/event/MilanCalendar";
import EventDetailsModal, {
  EventItem,
} from "@/components/event/EventDetailsModal";

// Data & Helpers
import { adaptedEventsData } from "./eventAdapter";
import { buildBentoRows } from "@/lib/bentoLayout";

import {
  Music,
  Theater,
  Palette,
  Gamepad2,
  Brain,
  BookOpen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------------
   Category Meta (PURE DATA)
----------------------------------- */
const CATEGORY_META = {
  movies_and_dramatics: {
    title: "Movies & Dramatics",
    description: "7 events • Stage, scripts, films and performances",
    icon: Theater,
  },
  creative_arts: {
    title: "Creative Arts",
    description: "5 events • Design, sketching and visual creativity",
    icon: Palette,
  },
  music: {
    title: "Music",
    description: "7 events • Bands, vocals, rap and instruments",
    icon: Music,
  },
  dance: {
    title: "Dance",
    description: "6 events • Solo, crew, classical and street styles",
    icon: Music,
  },
  fashion: {
    title: "Fashion",
    description: "2 events • Runway, styling and personality",
    icon: Sparkles,
  },
  astrophilia: {
    title: "Astrophilia",
    description: "2 events • Space, science and innovation",
    icon: Brain,
  },
  literary: {
    title: "Literary",
    description: "4 events • Debate, poetry and speaking",
    icon: BookOpen,
  },
  gaming: {
    title: "Gaming",
    description: "3 events • Esports and competitive gaming",
    icon: Gamepad2,
  },
} satisfies Record<
  string,
  { title: string; description: string; icon: LucideIcon }
>;

type CategoryKey = keyof typeof CATEGORY_META;

export default function EventsPage() {
  const [activeCategoryKey, setActiveCategoryKey] =
    useState<CategoryKey | null>(null);

  const bentoRows = useMemo(
    () => buildBentoRows(Object.keys(CATEGORY_META) as CategoryKey[]),
    [],
  );

  const activeEvents = activeCategoryKey
    ? (adaptedEventsData[activeCategoryKey] as EventItem[])
    : [];

  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-purple-500/30 bg-[#F5F5F7]">
      {/* 1. FULL PAGE DARK SECTION: Hero (Yin) */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center z-20 bg-neutral-950 w-full rounded-b-[4rem] shadow-2xl overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 relative z-10">
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold tracking-[0.3em] uppercase text-purple-400">
            Experience the Magic
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl md:text-[10rem] font-black tracking-tighter text-white mb-8 relative z-10">
          Events<span className="text-purple-600">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-xl text-neutral-400 font-light leading-relaxed relative z-10">
          A curated showcase of talent, innovation, and community spirit.
          Explore the celebrations that define MILAN &apos;26.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 uppercase text-[9px] tracking-[0.4em] font-bold">
          Scroll to discover
        </motion.div>
      </section>

      {/* 2. LIGHT SECTION: Discover Categories (Yang) */}
      <section className="relative z-10 bg-[#F5F5F7] py-32 -mt-12 pt-44">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-5xl font-black text-neutral-900 tracking-tight">
                Discover Categories
              </h2>
              <p className="mt-3 text-neutral-500 font-medium">
                Browse events by interest
              </p>
            </div>
            <div className="hidden md:block h-0.5 flex-1 bg-neutral-200 ml-16 mb-5" />
          </header>

          <div className="flex flex-col gap-8">
            {bentoRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-1 md:grid-cols-${row.pattern.columns} gap-8`}>
                {row.keys.map((key, index) => {
                  const meta = CATEGORY_META[key];
                  const span = row.pattern.spans[index];

                  return (
                    <motion.div
                      key={key}
                      whileHover={{ y: -8, scale: 1.01 }}
                      onClick={() => setActiveCategoryKey(key as CategoryKey)}
                      className={`cursor-pointer ${
                        span > 1 ? `md:col-span-${span}` : ""
                      }`}>
                      <BentoCard
                        name={meta.title}
                        description={meta.description}
                        href="#"
                        cta="View Events"
                        Icon={meta.icon}
                        className="h-80 bg-white border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-[2.5rem]"
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DARK SECTION: Calendar (Yin) */}
      <section
        id="schedule"
        className="relative z-20 py-40 bg-neutral-950 text-white rounded-t-[5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-6">
          <MilanCalendar />
        </div>
      </section>

      {/* Modal Overlay */}
      {activeCategoryKey && (
        <EventDetailsModal
          isOpen={!!activeCategoryKey}
          onClose={() => setActiveCategoryKey(null)}
          title={CATEGORY_META[activeCategoryKey].title}
          description={CATEGORY_META[activeCategoryKey].description}
          events={activeEvents}
        />
      )}
    </main>
  );
}
