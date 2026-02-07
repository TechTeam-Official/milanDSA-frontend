"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <main className="min-h-screen overflow-x-hidden selection:bg-[#C9A24D]/30 selection:text-[#3A2A5E] indian-light-bg">
      <div className="indian-texture-light" />
      {/* 1. HERO — INDIAN MAXIMALISM CROWD */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center z-20 w-full rounded-b-[4rem] shadow-2xl overflow-hidden indian-dark-bg">

        {/* 🎆 Background Image (Crowd) - Matches Landing Page Opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/BackgroundImages/Events.png"
            alt="Milan Events Crowd"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for better text readability (Matches Landing Page) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        </div>

        {/* Small Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-30 mb-6 px-4 py-1.5 rounded-full border border-[#C9A24D]/30 bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(201,162,77,0.2)]">
          Experience the Royal Magic
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 text-8xl md:text-[10rem] font-serif text-white leading-[0.9] tracking-tighter mb-8 im-text-shadow">
          Events<span className="text-[#D97706]">.</span>
        </motion.h1>

        {/* ✅ NEW SUBTEXT ADDED HERE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-30 text-neutral-200 text-lg md:text-xl font-medium max-w-2xl leading-relaxed drop-shadow-md">
          Experience 40+ exhilarating events at MILAN’26!{" "}
          <br className="hidden md:block" />
          And win Cash Prizes worth{" "}
          <span className="text-[#C9A24D] font-bold">10 Lakhs+</span>
        </motion.p>
      </section>

      {/* 2. DISCOVER CATEGORIES */}
      <section className="relative z-10 indian-light-bg py-32 -mt-12 pt-44 border-t border-[#C9A24D]/20">
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
                      className={`cursor-pointer ${span > 1 ? `md:col-span-${span}` : ""
                        }`}>
                      <BentoCard
                        name={meta.title}
                        description={meta.description}
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
        className="relative z-20 py-40 indian-dark-bg text-white rounded-t-[5rem] border-t-4 border-[#C9A24D]">
        <div className="indian-gold-divider absolute top-0 left-0 right-0 transform -translate-y-1/2" />
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
