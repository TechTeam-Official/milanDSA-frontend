"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles, Hourglass, Share2 } from "lucide-react";
import { UploadModal } from "@/components/explore/upload-modal";
import { AIGeneratorModal } from "@/components/explore/ai-generator-modal";

// --------------------------------------------------------------------------
// CONFIGURATION
// --------------------------------------------------------------------------
const IS_COMING_SOON = false;

// --------------------------------------------------------------------------
// COMPONENT 1: COMING SOON (Email Section Removed)
// --------------------------------------------------------------------------
const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/BackgroundImages/Exlpore.png"
          alt="Explore Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/30 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-8">
          <span className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium tracking-[0.2em] uppercase text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Hourglass className="w-3 h-3 animate-spin-slow" />
            In The Works
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-white leading-none">
          Brewing<span className="text-purple-500">.</span>
        </h1>

        <p className="text-base md:text-xl text-neutral-400 font-light max-w-4xl mx-auto leading-relaxed mb-10">
          As SRMIST celebrates 40 years of excellence, create your own memories
          by blending creativity with responsible AI.
          <br className="hidden md:block" />
          Come together to honour four decades of memories, milestones, and
          innovations.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"></motion.div>
      </motion.div>

    </div>
  );
};

// --------------------------------------------------------------------------
// COMPONENT 2: POLAROID HELPER
// --------------------------------------------------------------------------
interface PolaroidProps {
  rotate: string;
  label: string;
  delay: number;
  artId: number;
}

const Polaroid = ({ rotate, label, delay, artId }: PolaroidProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: rotate }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="relative group cursor-pointer"
    style={{ rotate }}>
    <div className="w-64 bg-white p-4 pb-16 shadow-2xl transform transition-transform duration-300 hover:scale-105 hover:z-10 hover:rotate-0 border border-neutral-200">
      <div className="aspect-4/5 bg-neutral-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-linear-to-br from-neutral-200 to-neutral-300 group-hover:from-purple-200 group-hover:to-blue-200 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 font-mono text-xs uppercase tracking-widest">
          {label}
        </div>
      </div>
      <div className="absolute bottom-6 left-0 w-full text-center px-4">
        <p className="font-handwriting text-neutral-600 text-sm font-medium opacity-70">
          Generated Art #{artId}
        </p>
      </div>
    </div>
  </motion.div>
);

// --------------------------------------------------------------------------
// COMPONENT 3: MAIN CONTENT
// --------------------------------------------------------------------------
const MainContent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const studentName = mounted
    ? localStorage.getItem("studentName") || "Guest Explorer"
    : "Guest Explorer";

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const handleUpload = async () => { };

  const { scrollYProgress } = useScroll();
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="bg-black text-white selection:bg-purple-500/30 overflow-x-hidden relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/BackgroundImages/Exlpore.png"
          alt="Explore Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      {/* 1. HERO — MATCHING EVENTS PAGE STRUCTURE */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center z-20 w-full rounded-b-[4rem] shadow-2xl overflow-hidden bg-black border-b border-purple-500/20">

        {/* 🎆 Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/BackgroundImages/Exlpore.png"
            alt="Explore Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        </div>

        {/* Small Pill Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-30 mb-6 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          Experience The Magic
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-30 text-8xl md:text-[10rem] font-serif text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-lg">
          Design<span className="text-purple-500">.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-30 text-neutral-200 text-lg md:text-xl font-medium max-w-2xl leading-relaxed drop-shadow-md">
          Self-design posters with AI. <br className="hidden md:block" />
          Explore the celebrations that define our culture.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-30 h-1 bg-purple-500 rounded-full mx-auto mt-12"
        />

        {/* Generate Button (Replaces Scroll Indicator) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
        >
          <a
            href="https://www.srmmilan.aaruush.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#A855F7] text-white font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:bg-[#9333EA] transition-all hover:scale-105 active:scale-95 group"
          >
            <span>Generate Poster</span>
          </a>
        </motion.div>
      </section>

      {/* Community Gallery Section Hidden */}



      <AnimatePresence>
        {uploadModalOpen && (
          <UploadModal
            isOpen={uploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            onUpload={handleUpload}
            studentName={studentName}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiModalOpen && (
          <AIGeneratorModal
            isOpen={aiModalOpen}
            onClose={() => setAiModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ExplorePage() {
  if (IS_COMING_SOON) {
    return <ComingSoon />;
  }
  return <MainContent />;
}
