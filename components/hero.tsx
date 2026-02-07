'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Ticket, History } from "lucide-react"

export function Hero() {
  const { scrollYProgress } = useScroll()
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  return (
    <section className="relative h-screen w-full overflow-hidden rounded-b-[4rem] shadow-[0_0_50px_rgba(58,42,94,0.4)] border-b border-[#3A2A5E]/40 z-20">
      {/* Background Image with Scale Animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src="/milan/hero-main.png"
          alt="Milan SRM Cultural Fest"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-start text-center px-4 md:px-6 pt-40 md:pt-52 select-none">

        {/* Main Content Wrapper with Entrance & Float Animation */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ willChange: 'transform' }}
          className="flex flex-col items-center w-full max-w-5xl mx-auto"
        >
          {/* Anti-gravity Float Layer - Animation Removed as per request */}
          <div className="flex flex-col items-center w-full">
            {/* Animated Badge */}
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="text-xs md:text-sm font-bold tracking-widest text-neutral-200 uppercase">
                Directorate of Student Affairs
              </span>
            </div>

            {/* Introduction Text */}


            {/* Main Title Image */}
            <div className="relative w-full max-w-5xl h-32 md:h-56 mx-auto my-2">
              <Image
                src="/milan/milan-logo-main.png"
                alt="MILAN 2026"
                fill
                className="object-contain"
                priority
              />
            </div>

          </div>
        </motion.div>

        {/* Bottom Content (Date + Buttons) - Positioned above scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2
          }}
          className="absolute bottom-28 md:bottom-32 left-0 right-0 z-20 flex flex-col items-center gap-6 px-4"
        >
          {/* Date */}
          <div className="text-center">
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
              <span className="text-white font-serif block text-xl md:text-2xl tracking-wide">19th February to 22nd February</span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <a
              href="/passes"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black transition-all hover:scale-105 hover:bg-neutral-100 active:scale-95 w-64 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Grab Your Passes
              <Ticket className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 -z-10 rounded-full bg-white blur-xl opacity-0 transition-opacity group-hover:opacity-30" />
            </a>

            <a
              href="#legacy"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95 w-64 whitespace-nowrap"
            >
              40 Years of SRMIST
              <History className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
      >
        <div className="w-[30px] h-[50px] border-2 border-[#C9A24D]/40 rounded-full flex justify-center p-2 backdrop-blur-sm">
          <motion.div
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-[#C9A24D] rounded-full shadow-[0_0_8px_#C9A24D]"
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/60">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
