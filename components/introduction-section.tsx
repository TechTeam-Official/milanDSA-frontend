'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function IntroductionSection() {
  return (
    <section className="relative bg-[#FDFBF7] text-neutral-900 pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden -mt-20 z-10">
      {/* Texture & Halo */}
      <div className="indian-texture-light" />
      {/* Large Soft Heritage Halo (Warm Ivory/Gold) */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(201,162,77,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Ornamental Motifs (Top-Left) */}
      <div className="im-ornament im-ornament-arch im-ornament-corner-tl top-0 left-0 opacity-10" />
      <div className="im-rhythm-line im-line-curved top-10 left-10 opacity-5 rotate-45" />

      {/* Floating Accent Dots */}
      <div className="im-accent-dot top-24 right-[10%] bg-[#0F766E] shadow-[0_0_8px_#0F766E] opacity-60" />
      <div className="im-accent-dot top-1/2 left-[5%] bg-[#C9A24D] shadow-[0_0_8px_#C9A24D] opacity-40" />
      <div className="im-accent-dot bottom-32 right-[15%] bg-[#0F766E] opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative max-w-4xl mx-auto text-center space-y-12">

          {/* 🏛️ Heritage Architectural Panel (Royal Scroll Mode) */}
          <div className="absolute -inset-6 md:-inset-12 rounded-[4px] border-4 border-double border-[#C9A24D]/40 bg-[#FDFBF7] -z-10 overflow-hidden shadow-[0_0_80px_rgba(201,162,77,0.15)]">

            {/* 📜 Background Watermark (Crowd/Heritage) */}
            <div className="absolute inset-0 opacity-[0.12] mix-blend-multiply sepia-[0.8] pointer-events-none">
              <Image
                src="/milan/hero-main.png"
                alt="Heritage Background"
                fill
                className="object-cover blur-[1px]"
              />
            </div>

            {/* 🌅 Vignette Glow (Center Light, Edges Dark) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(201,162,77,0.1)_100%)] pointer-events-none" />

            {/* ✨ Royal Corner Ornaments */}
            {/* Top Left */}
            <div className="absolute top-2 left-2 w-16 h-16 pointer-events-none opacity-80">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#C9A24D]">
                <path d="M0 0 V40 Q0 10 30 10 H80" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 10 V30 Q10 20 20 20 H30" stroke="currentColor" strokeWidth="1" />
                <circle cx="5" cy="5" r="3" fill="currentColor" />
              </svg>
            </div>
            {/* Top Right */}
            <div className="absolute top-2 right-2 w-16 h-16 pointer-events-none opacity-80 rotate-90">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#C9A24D]">
                <path d="M0 0 V40 Q0 10 30 10 H80" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 10 V30 Q10 20 20 20 H30" stroke="currentColor" strokeWidth="1" />
                <circle cx="5" cy="5" r="3" fill="currentColor" />
              </svg>
            </div>
            {/* Bottom Left */}
            <div className="absolute bottom-2 left-2 w-16 h-16 pointer-events-none opacity-80 -rotate-90">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#C9A24D]">
                <path d="M0 0 V40 Q0 10 30 10 H80" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 10 V30 Q10 20 20 20 H30" stroke="currentColor" strokeWidth="1" />
                <circle cx="5" cy="5" r="3" fill="currentColor" />
              </svg>
            </div>
            {/* Bottom Right */}
            <div className="absolute bottom-2 right-2 w-16 h-16 pointer-events-none opacity-80 rotate-180">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#C9A24D]">
                <path d="M0 0 V40 Q0 10 30 10 H80" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 10 V30 Q10 20 20 20 H30" stroke="currentColor" strokeWidth="1" />
                <circle cx="5" cy="5" r="3" fill="currentColor" />
              </svg>
            </div>

            {/* 👑 Top Center Crown/Arch Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-8 bg-[#C9A24D]/10 rounded-b-full border-b border-l border-r border-[#C9A24D]/40 backdrop-blur-sm flex justify-center">
              <div className="w-2 h-2 rounded-full bg-[#C9A24D] mt-2 shadow-[0_0_10px_#C9A24D]" />
            </div>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#3A2A5E] via-neutral-800 to-[#0F766E] mb-4 im-text-shadow py-2">
              About MILAN
            </h2>
            <div className="inline-block relative">
              <span className="text-xl md:text-2xl font-semibold text-[#0F766E] tracking-wider">
                #Live The Change
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-neutral-600 font-light leading-relaxed"
          >
            <p>
              MILAN is a National-level inter-college cultural festival organized by the Directorate of Student Affairs at SRM Institute of Science and Technology. It serves as a vibrant platform for students to &ldquo;Celebrate Life&rdquo;, showcase diverse talents, and foster unity, promote creativity, teamwork, and cultural exchange among students from across India.
            </p>
            <p>
              Originating from the Sanskrit word meaning &ldquo;unification&rdquo; or &ldquo;coming together,&rdquo; MILAN brings together young minds in a grand celebration of art, culture, and talent across multiple domains. Established in 2008, the festival has grown into a massive gathering that continues to inspire collaboration, expression, and community spirit year after year.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Extended Divider with Indigo-to-Teal Gradient */}
            <div className="h-1 w-48 bg-gradient-to-r from-[#3A2A5E] to-[#0F766E] rounded-full mx-auto mt-8 opacity-80" />
          </motion.div>
        </div>
      </div>

      {/* Bio-divider */}
      <div className="indian-gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  )
}
