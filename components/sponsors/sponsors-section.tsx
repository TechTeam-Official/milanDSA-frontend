"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Timer } from "lucide-react";

// Define strict types to satisfy TypeScript without @ts-ignore
interface Sponsor {
  name: string;
  role: string;
  span: string;
  description?: string;
  image?: string; // Made optional to prevent TS errors on mystery cards
  href?: string;
}

// 1. PLACEHOLDER DATA FOR THE BENTO GRID
// Typed explicitly so TS knows 'image' is optional but valid to access
const CURRENT_SPONSORS: Sponsor[] = [
  {
    name: "Revealing Soon",
    role: "Lead Partner",
    description: "Announcement incoming.",
    span: "md:col-span-2",
  },
  {
    name: "Revealing Soon",
    role: "Beverage Partner",
    span: "md:col-span-1",
  },
  {
    name: "Revealing Soon",
    role: "Music Partner",
    span: "md:col-span-1",
  },
  {
    name: "Revealing Soon",
    role: "Energy Partner",
    description: "Powering the event.",
    span: "md:col-span-2",
  },
  {
    name: "Revealing Soon",
    role: "Media Partner",
    span: "md:col-span-1",
  },
  {
    name: "Revealing Soon",
    role: "Food Partner",
    span: "md:col-span-1",
  },
  {
    name: "Revealing Soon",
    role: "Social Partner",
    span: "md:col-span-1",
  },
  {
    name: "Revealing Soon",
    role: "Food Partner",
    span: "md:col-span-1",
  },
];

// 2. REAL BRANDS MOVED TO LEGACY
const PAST_SPONSORS = [
  { name: "The Hindu", image: "/sponsors/the-hindu.png", year: "2026" },
  { name: "Coca-Cola", image: "/sponsors/coca-cola.png", year: "2026" },
  { name: "JioSaavn", image: "/sponsors/jiosaavn.png", year: "2026" },
  { name: "Red Bull", image: "/sponsors/red-bull.png", year: "2026" },
  { name: "Times of India", image: "/sponsors/toi.png", year: "2026" },
  { name: "McDonald's", image: "/sponsors/mcdonalds.png", year: "2026" },
  { name: "Snapchat", image: "/sponsors/snapchat.png", year: "2026" },
  { name: "Subway", image: "/sponsors/subway.png", year: "2026" },
  { name: "Greentrends", image: "/sponsors/green-trends.png", year: "2024" },
  { name: "Payed", image: "/sponsors/payed.png", year: "2025" },
  { name: "Fever FM", image: "/sponsors/fever-fm.png", year: "2023" },
  { name: "Zebronics", image: "/sponsors/zebronics.png", year: "2024" },
  { name: "Eazydiner", image: "/sponsors/eazydiner.png", year: "2023" },
  { name: "WCC", image: "/sponsors/wcc.png", year: "2024" },
  { name: "Dabur Honey", image: "/sponsors/dabur-honey.png", year: "2022" },
  { name: "Unschool", image: "/sponsors/unschool.png", year: "2023" },
  {
    name: "Drunken Monkey",
    image: "/sponsors/drunken-monkey.png",
    year: "2024",
  },
  {
    name: "Dabur Gulabari",
    image: "/sponsors/dabur-gulabari.png",
    year: "2022",
  },
  { name: "ComicByte", image: "/sponsors/comic-byte.png", year: "2025" },
  { name: "Mr Burger", image: "/sponsors/mr-burger.png", year: "2023" },
  { name: "Coding Ninjas", image: "/sponsors/coding-ninjas.png", year: "2024" },
];

export function SponsorsSection() {
  const mid = Math.ceil(PAST_SPONSORS.length / 2);
  const row1 = PAST_SPONSORS.slice(0, mid);
  const row2 = PAST_SPONSORS.slice(mid);

  return (
    <main className="min-h-screen bg-[#021812] text-neutral-900 overflow-x-hidden selection:bg-[#556B2F]/30 selection:text-[#C9A24D]">
      <div className="fixed inset-0 pointer-events-none indian-noise opacity-20 mix-blend-overlay z-0" />
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-30 bg-transparent w-full rounded-b-[4rem] shadow-2xl overflow-hidden border-b border-[#556B2F]/30">

        {/* 🎆 Background Image with Cinematic Green Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/BackgroundImages/Sponsors.png"
            alt="Sponsors Background"
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Cinematic Deep Emerald Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#022C22]/80 via-[#064E3B]/40 to-[#022C22] z-10" />
          {/* Gold Dust Particles (Simulated via Noise) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay z-10" />
        </div>

        {/* Small Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-30 mb-6 px-4 py-1.5 rounded-full border border-[#C9A24D]/30 bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(201,162,77,0.2)]">
          OUR PARTNERS
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 text-8xl md:text-[10rem] font-black text-white leading-[0.9] tracking-tighter mb-8 im-text-shadow">
          Sponsors<span className="text-[#556B2F]">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-30 text-lg md:text-xl font-medium text-neutral-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          We extend our deepest gratitude to all our sponsors who have made
          MILAN possible through their generous support and partnership.
        </motion.p>
      </section>

      {/* 3. GRID SECTION — CURRENT PARTNERS (LIGHT) */}
      <section className="relative z-10 w-full bg-[#EFF2EE] py-24 -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl md:text-5xl font-black text-[#022C22] tracking-tighter">
              Current Partners<span className="text-[#C9A24D]">.</span>
            </h2>
            <div className="hidden md:block h-px flex-1 bg-[#556B2F]/20 ml-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {CURRENT_SPONSORS.map((sponsor, idx) => (
              <motion.div
                key={`${sponsor.name}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                // Linter Fix: min-h-[240px] -> min-h-60
                className={`${sponsor.span} relative min-h-60 rounded-[2.5rem] bg-white border border-[#556B2F]/10 shadow-sm hover:shadow-[0_4px_20px_rgba(6,78,59,0.1)] hover:border-[#556B2F]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col md:flex-row items-center justify-between p-8 gap-6`}>
                {/* Left Side: Content */}
                <div className="relative z-10 flex flex-col items-start space-y-3 w-full md:w-3/5 h-full justify-between">
                  <div>

                    <h3 className="text-2xl font-bold text-[#022C22] tracking-tight mt-3 group-hover:text-[#C9A24D] transition-colors">
                      {sponsor.name}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[#556B2F] text-[10px] font-bold uppercase tracking-wide border-b border-transparent pb-0.5 mt-auto cursor-default group-hover:text-[#C9A24D] transition-colors">
                    Stay Tuned
                  </div>
                </div>

                {/* Right Side: Logo or Mystery Icon */}
                <div className="relative z-10 w-full md:w-2/5 h-32 md:h-full flex items-center justify-center md:justify-end">
                  <div
                    // Linter Fix: max-h-[80px] -> max-h-20
                    className={`relative w-full h-full ${sponsor.span === "md:col-span-2" ? "max-h-[140px]" : "max-h-20"} transition-all duration-500 flex items-center justify-center md:justify-end`}>
                    {/* TS Error Fixed: image is now optional on the interface, so accessing it is valid */}
                    {sponsor.image ? (
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        fill
                        className="object-contain object-center md:object-right opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-neutral-50 rounded-2xl flex items-center justify-center border border-neutral-100 group-hover:border-[#C9A24D]/30 transition-colors">
                        <Timer
                          className="text-[#556B2F] group-hover:text-[#C9A24D] transition-colors"
                          size={32}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Sponsors (Legacy) — DARK SECTION */}
      <section className="relative z-20 py-32 bg-[#031E18] text-white flex flex-col justify-center rounded-t-[5rem] -mt-12 border-t-4 border-[#C9A24D] shadow-[0_-4px_20px_rgba(0,0,0,0.2)] overflow-hidden">
        {/* 🌟 Top Glow / Spot "Bright at any spot" */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 h-64 bg-[#556B2F]/30 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

          {/* Header */}
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 im-text-shadow">
              Legacy Partners<span className="text-[#C9A24D]">.</span>
            </h2>
            <p className="text-[#E2D4B7]/80 text-xl font-serif max-w-2xl mx-auto">
              Trusted by over 100+ brands throughout our history.
            </p>
          </div>

          {/* Marquee Container */}
          <div className="w-full overflow-hidden relative flex flex-col gap-10">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#031E18] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#031E18] to-transparent z-20 pointer-events-none" />

            {/* Row 1 */}
            <div className="flex w-max animate-scroll gap-6 hover:[animation-play-state:paused]">
              {[...row1, ...row1, ...row1, ...row1].map((sponsor, idx) => (
                <div
                  key={`row1-${sponsor.name}-${idx}`}
                  className="w-[240px] h-36 bg-[#041D16] rounded-2xl border border-[#556B2F]/20 flex items-center justify-center p-6 transition-all duration-300 hover:bg-[#064E3B]/20 hover:border-[#C9A24D]/60 hover:shadow-[0_0_15px_rgba(201,162,77,0.1)] transform-gpu">
                  <div className="relative w-full h-full">
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      fill
                      sizes="200px"
                      className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 - Reverse Scroll */}
            <div
              className="flex w-max animate-scroll gap-6"
              style={{ animationDirection: "reverse" }}>
              {[...row2, ...row2, ...row2, ...row2].map((sponsor, idx) => (
                <div
                  key={`row2-${sponsor.name}-${idx}`}
                  className="w-[240px] h-36 bg-[#041D16] rounded-2xl border border-[#556B2F]/20 flex items-center justify-center p-6 transition-all duration-300 hover:bg-[#064E3B]/20 hover:border-[#C9A24D]/60 hover:shadow-[0_0_15px_rgba(201,162,77,0.1)] transform-gpu">
                  <div className="relative w-full h-full">
                    <Image
                      src={sponsor.image}
                      alt={sponsor.name}
                      fill
                      sizes="200px"
                      className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                    />
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}
