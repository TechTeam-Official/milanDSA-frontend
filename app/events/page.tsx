"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// Components
import { BentoCard } from "@/components/event/BentoGrid";
import { PosterBackground } from "@/components/event/PosterBackground";
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
  HelpCircle,
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
    poster: "/events/madbg.png",
  },
  creative_arts: {
    title: "Creative Arts",
    description: "5 events • Design, sketching and visual creativity",
    icon: Palette,
    poster: "/events/crbg.png",
  },
  music: {
    title: "Music",
    description: "7 events • Bands, vocals, rap and instruments",
    icon: Music,
    poster: "/events/musicbg.png",
  },
  dance: {
    title: "Dance",
    description: "6 events • Solo, crew, classical and street styles",
    icon: Music,
    poster: "/events/dancebg.png",
  },
  fashion: {
    title: "Fashion",
    description: "2 events • Runway, styling and personality",
    icon: Sparkles,
    poster: "/events/fashion bg.png",
  },
  astrophilia: {
    title: "Astrophilia",
    description: "2 events • Space, science and innovation",
    icon: Brain,
    poster: "/events/astrobg.png",
  },
  literary: {
    title: "Literary",
    description: "4 events • Debate, poetry and speaking",
    icon: BookOpen,
    poster: "/events/litbg.png",
  },
  gaming: {
    title: "Gaming",
    description: "3 events • Esports and competitive gaming",
    icon: Gamepad2,
    poster: "/events/gambg.png",
  },
  quiz: {
    title: "Quiz",
    description: "Events • Trivia, puzzles and brain teasers",
    icon: HelpCircle,
    poster: "/events/quizbg.png",
  },
} satisfies Record<
  string,
  {
    title: string;
    description: string;
    icon: LucideIcon;
    poster: string;
  }
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
      {/* 1. HERO — UPDATED WITH SUBTEXT */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center z-20 bg-neutral-950 w-full rounded-b-[4rem] shadow-2xl overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />

        {/* Small Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          Experience the Magic
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl md:text-[10rem] font-black text-white leading-[0.9] tracking-tighter mb-8">
          Events<span className="text-purple-600">.</span>
        </motion.h1>

        {/* ✅ NEW SUBTEXT ADDED HERE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          Experience 40+ exhilarating events at MILAN’26!{" "}
          <br className="hidden md:block" />
          And win Cash Prizes worth{" "}
          <span className="text-white font-bold">10 Lakhs+</span>
        </motion.p>
      </section>

      {/* 2. DISCOVER CATEGORIES */}
      <section className="relative z-10 bg-[#F5F5F7] py-32 -mt-12 pt-44">
        <div className="max-w-7xl mx-auto px-6">
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
                      onClick={() => setActiveCategoryKey(key)}
                      className={`cursor-pointer ${
                        span > 1 ? `md:col-span-${span}` : ""
                      }`}>
                      <BentoCard
                        name={meta.title}
                        description={meta.description}
                        href="#"
                        cta="View Events"
                        Icon={meta.icon}
                        background={
                          <PosterBackground
                            src={meta.poster}
                            alt={meta.title}
                          />
                        }
                        className="h-80 rounded-[2.5rem]"
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CALENDAR */}
      <section
        id="schedule"
        className="relative z-20 py-40 bg-neutral-950 text-white rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <MilanCalendar />
        </div>
      </section>

      {/* MODAL */}
      {activeCategoryKey && (
        <EventDetailsModal
          isOpen
          onClose={() => setActiveCategoryKey(null)}
          title={CATEGORY_META[activeCategoryKey].title}
          description={CATEGORY_META[activeCategoryKey].description}
          events={activeEvents}
        />
      )}
    </main>
  );
}
