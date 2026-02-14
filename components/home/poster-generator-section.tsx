"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Download, Share2, History } from "lucide-react"
import { useState, useEffect } from "react"
import Image from 'next/image'

const backgroundImages = [
  "/milan/legacy/legacy-1.jpg", // Placeholder paths - user needs to provide these or I'll use generic
  "/milan/legacy/legacy-2.jpg",
  "/milan/legacy/legacy-3.jpg",
]

export function PosterGeneratorSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="legacy" className="relative w-full py-24 indian-dark-bg overflow-hidden min-h-[80vh] flex items-center">
      {/* ✨ Sheesh Mahal Mirror Pattern */}
      <div className="im-pattern-mirror" />
      <div className="indian-noise" />

      {/* Floating Accent Dots (Gold & Copper) */}
      <div className="im-accent-dot top-20 right-20 opacity-60 bg-[#C9A24D] shadow-[0_0_12px_#C9A24D]" />
      <div className="im-accent-dot bottom-20 left-10 opacity-40 bg-[#B87333] shadow-[0_0_12px_#B87333]" />

      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 opacity-30">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Note: In a real scenario, we'd valid image paths. Using a dark gradient fallback if images missing */}
            <div className="absolute inset-0 bg-[#0B0B0F]" />
            {/* <Image src={backgroundImages[currentImage]} alt="Legacy" fill className="object-cover" /> */}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/80 to-[#0B0B0F]/40" />
      </div>

      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#C9A24D]/30 bg-[#C9A24D]/10 text-[#C9A24D] text-sm font-bold uppercase tracking-widest hover:bg-[#C9A24D]/20 transition-colors"
            >
              <History size={16} />
              <span>A Legacy Unfolds</span>
            </motion.button>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl tracking-tighter text-white leading-[1.3] drop-shadow-[0_4px_12px_rgba(201,162,77,0.3)]"
            >
              Celebrate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24D] via-[#D97706] to-[#B87333] py-2 inline-block">
                40 Years Of SRM
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 font-light"
            >
              <p>
                As SRMIST celebrates 40 years of excellence, be a part of the legacy and celebrate with us by creating your own memories using our self design poster to capture excellence, innovation, and student journeys by blending creativity with responsible artificial intelligence.
              </p>
              <p className="font-medium text-white">
                Come together to honour four decades of memories, milestones, innovations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
            >
              <a
                href="https://www.srmmilan.aaruush.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#C9A24D] text-black font-bold rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(201,162,77,0.4)] hover:bg-[#D97706] transition-all hover:scale-105 active:scale-95 group"
              >
                <span>Generate Poster</span>
              </a>
            </motion.div>
          </div>

          {/* Right Preview - Kept the poster preview but styled for Legacy */}
          <div className="relative flex justify-center lg:justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[320px] h-[480px] md:w-[360px] md:h-[540px] bg-neutral-900 rounded-lg overflow-hidden shadow-[0_0_50px_-10px_rgba(184,115,51,0.2)] border border-[#B87333] ring-1 ring-[#B87333]/50 group cursor-pointer"
            >

              <Image
                src="/milan/poster-example.png"
                alt="First Day Confusion Poster"
                fill
                className="object-cover"
              />

              {/* Glitch Overlay Effect (Subtle) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D97706]/20 to-transparent pointer-events-none mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="indian-gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
