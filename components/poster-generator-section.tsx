"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Download, Share2, History } from "lucide-react"
import { useState, useEffect } from "react"

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
    <section id="legacy" className="relative w-full py-24 bg-black overflow-hidden min-h-[80vh] flex items-center">
      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 opacity-40">
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
             <div className="absolute inset-0 bg-neutral-900" /> 
             {/* <Image src={backgroundImages[currentImage]} alt="Legacy" fill className="object-cover" /> */}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 text-sm font-bold uppercase tracking-widest hover:bg-yellow-500/20 transition-colors"
            >
              <History size={16} />
              <span>A Legacy Unfolds</span>
            </motion.button>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1.1]"
            >
              Celebrate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200">
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
               <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 group">
                 Generate Legacy Poster
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </motion.div>
          </div>

          {/* Right Preview - Kept the poster preview but styled for Legacy */}
          <div className="relative flex justify-center lg:justify-end">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative w-[320px] h-[480px] md:w-[360px] md:h-[540px] bg-neutral-900 rounded-2xl overflow-hidden shadow-[0_0_50px_-10px_rgba(234,179,8,0.3)] border border-yellow-500/20 group cursor-pointer"
             >
                {/* Vintage/Legacy Background Mockup */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                
                 {/* Poster Content Overlay */}
                 <div className="absolute inset-0 flex flex-col justify-between p-8 z-20 border-[12px] border-double border-yellow-500/30 m-4">
                    <div className="text-center pt-8">
                        <div className="text-[10px] font-bold tracking-[0.4em] text-yellow-200 uppercase mb-3">Est. 1985</div>
                        <h3 className="text-5xl font-black text-white drop-shadow-lg font-serif">
                          40
                        </h3>
                        <p className="text-xl text-yellow-100 font-serif italic">Years of Excellence</p>
                    </div>

                    <div className="text-center pb-8 space-y-2">
                        <p className="text-sm text-neutral-400 uppercase tracking-widest">Celebrating</p>
                       <p className="text-2xl font-bold text-white uppercase tracking-tight">
                         YOUR NAME
                       </p>
                       <p className="text-xs text-yellow-500/80 pt-2">#SRMIST40 #MILAN26</p>
                    </div>
                 </div>

                 {/* Glitch Overlay Effect (Subtle) */}
                 <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/20 to-transparent pointer-events-none mix-blend-overlay" />
                 
                 <div className="absolute bottom-4 right-4 z-40 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                      <Download size={16} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Share2 size={16} />
                    </button>
                 </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
