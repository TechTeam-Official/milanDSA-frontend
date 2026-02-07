"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GalleryHorizontal } from "lucide-react";
import { BentoGalleryGrid } from "@/components/ui/bento-gallery-grid";
import { sessionShuffle } from "@/lib/sessionShuffle";

export function GalleryClient({ initialImages }: { initialImages: string[] }) {
  const [galleryImages, setGalleryImages] = useState<string[]>(initialImages);

  // Scroll indicator fade
  const { scrollYProgress } = useScroll();
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shuffled = sessionShuffle<string>(
        "milan-gallery-session",
        initialImages,
      );
      setGalleryImages(shuffled);
    }, 0);

    return () => clearTimeout(timer);
  }, [initialImages]);

  return (
    <div className="w-full snap-y snap-mandatory selection:bg-purple-200">
      {/* ================= HERO SECTION ================= */}
      <section className="h-screen w-full flex items-center justify-center text-center bg-gradient-to-br from-purple-950 via-black to-black text-white snap-start snap-always relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[140px] rounded-full" />

        <div className="relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-purple-300 text-sm mb-8">
            <GalleryHorizontal size={14} />
            <span className="uppercase tracking-widest font-semibold">
              Milan Moments
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, type: "spring" }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500">
            Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            A visual archive of energy, expression, and unforgettable nights —
            where <span className="text-purple-300">culture</span>,{" "}
            <span className="text-blue-300">music</span>,{" "}
            <span className="text-white">memories</span> collide.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-12"
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-[30px] h-[50px] border-2 border-white/20 rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/30">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="min-h-screen w-full bg-black snap-start snap-always py-24">
        <div className="container mx-auto px-4">
          <BentoGalleryGrid images={galleryImages} />
        </div>
      </motion.section>
    </div>
  );
}
