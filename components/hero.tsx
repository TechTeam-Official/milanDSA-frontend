'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { Ticket, History } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
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

      <div className="relative z-10 flex h-full flex-col items-center justify-start text-center px-4 md:px-6 pt-24 md:pt-32 select-none">

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
            <p className="mb-2 text-lg md:text-xl font-light text-neutral-300 tracking-wider">
              Introducing the 18th Edition of
            </p>

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

            {/* Description / Date */}
            <div className="mt-6 max-w-4xl">
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light max-w-3xl mx-auto">
                <span className="text-white font-semibold block text-xl md:text-2xl tracking-wide">19th February to 22nd February</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href="/passes"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-black transition-all hover:scale-105 hover:bg-neutral-100 active:scale-95 w-64"
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
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/30 flex justify-center p-1 backdrop-blur-sm">
          <div className="h-2 w-1.5 rounded-full bg-white animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
