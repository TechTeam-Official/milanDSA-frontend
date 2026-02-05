"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

// Data
const CURRENT_SPONSORS = [
  {
    name: "The Hindu",
    role: "Lead Partner",
    description: "India's National Newspaper since 1878.",
    image: "/sponsors/the-hindu.png",
    href: "https://www.thehindu.com/",
    span: "md:col-span-2",
  },
  {
    name: "Coca-Cola",
    role: "Beverage Partner",
    description: "Real Magic.",
    image: "/sponsors/coca-cola.png",
    href: "https://www.coca-cola.com/",
    span: "md:col-span-1",
  },
  {
    name: "JioSaavn",
    role: "Music Partner",
    description: "Music for everyone.",
    image: "/sponsors/jiosaavn.png",
    href: "https://www.jiosaavn.com/",
    span: "md:col-span-1",
  },
  {
    name: "Red Bull",
    role: "Energy Partner",
    description: "Gives You Wiings.",
    image: "/sponsors/red-bull.png",
    href: "https://www.redbull.com/",
    span: "md:col-span-2",
  },
  {
    name: "Times of India",
    role: "Media Partner",
    description: "Let Truth Prevail.",
    image: "/sponsors/toi.png",
    href: "https://timesofindia.indiatimes.com/",
    span: "md:col-span-1",
  },
  {
    name: "McDonald's",
    role: "Food Partner",
    description: "I'm Lovin' It.",
    image: "/sponsors/mcdonalds.png",
    href: "https://www.mcdonalds.com/",
    span: "md:col-span-1",
  },
  {
    name: "Snapchat",
    role: "Social Partner",
    description: "Share the moment.",
    image: "/sponsors/snapchat.png",
    href: "https://www.snapchat.com/",
    span: "md:col-span-1",
  },
  {
    name: "Subway",
    role: "Food Partner",
    description: "Eat Fresh.",
    image: "/sponsors/subway.png",
    href: "https://www.subway.com/",
    span: "md:col-span-1",
  },
];

const PAST_SPONSORS = [
  { name: "Greentrends", image: "/sponsors/green-trends.png", year: "2024" },
  { name: "Payed", image: "/sponsors/payed.png", year: "2025" },
  { name: "Fever FM", image: "/sponsors/fever-fm.png", year: "2023" },
  { name: "Zebronics", image: "/sponsors/zebronics.png", year: "2024" },
  { name: "Eazydiner", image: "/sponsors/eazydiner.png", year: "2023" },
  { name: "Snitch", image: "/sponsors/snitch.png", year: "2025" },
  { name: "WCC", image: "/sponsors/wcc.png", year: "2024" },
  { name: "Dabur Honey", image: "/sponsors/dabur-honey.png", year: "2022" },
  { name: "Unschool", image: "/sponsors/unschool.png", year: "2023" },
  { name: "Drunken Monkey", image: "/sponsors/drunken-monkey.png", year: "2024" },
  { name: "Dabur Gulabari", image: "/sponsors/dabur-gulabari.png", year: "2022" },
  { name: "ComicByte", image: "/sponsors/comic-byte.png", year: "2025" },
  { name: "Mr Burger", image: "/sponsors/mr-burger.png", year: "2023" },
  { name: "Coding Ninjas", image: "/sponsors/coding-ninjas.png", year: "2024" },
  { name: "Subway", image: "/sponsors/subway.png", year: "2022" },
  { name: "Snapchat", image: "/sponsors/snapchat.png", year: "2025" },
];

export function SponsorsSection() {
  const mid = Math.ceil(PAST_SPONSORS.length / 2);
  const row1 = PAST_SPONSORS.slice(0, mid);
  const row2 = PAST_SPONSORS.slice(mid);

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-neutral-900 overflow-x-hidden selection:bg-purple-200">
      
      {/* Hero Section (Matches Events Page) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10 bg-neutral-950 w-full rounded-b-[3rem] shadow-xl overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 relative z-10">
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm font-medium tracking-wide uppercase text-neutral-300">
            OUR PARTNERS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-8 relative z-10">
          Sponsors<span className="text-purple-500">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-xl md:text-2xl text-neutral-400 font-light leading-relaxed relative z-10">
          Collaborating with industry leaders to create unforgettable experiences.{" "}
          <br className="hidden md:block" />
          Powering the spirit of Milan 2026.
        </motion.p>
      </section>

      {/* Current Sponsors Grid (Dynamic Bento) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
         <div className="mb-12 flex items-center justify-between">
           <h2 className="text-3xl md:text-5xl font-bold text-neutral-900">
             Current Partners
           </h2>
           <div className="hidden md:block h-px flex-1 bg-neutral-200 ml-8" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            
            {CURRENT_SPONSORS.map((sponsor, idx) => (
               <motion.div 
                 key={sponsor.name}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className={`${sponsor.span} relative min-h-[240px] rounded-[2.5rem] bg-white border border-neutral-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col md:flex-row items-center justify-between p-8 gap-6`}
               >
                  {/* Left Side: Content */}
                   <div className="relative z-10 flex flex-col items-start space-y-3 w-full md:w-3/5 h-full justify-between">
                      <div>
                        <span className="px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                            {sponsor.role}
                        </span>
                        <h3 className="text-2xl font-bold text-neutral-900 tracking-tight mt-3">{sponsor.name}</h3>
                        {sponsor.span === 'md:col-span-2' && (
                           <p className="text-neutral-400 text-sm font-medium leading-relaxed mt-2 max-w-sm">{sponsor.description}</p>
                        )}
                      </div>
                      
                      <a href={sponsor.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-neutral-900 text-[10px] font-bold uppercase tracking-wide border-b border-neutral-200 hover:border-black transition-colors pb-0.5 mt-auto">
                         Visit Partner <ExternalLink size={10} />
                      </a>
                   </div>

                  {/* Right Side: Logo */}
                  <div className="relative z-10 w-full md:w-2/5 h-32 md:h-full flex items-center justify-center md:justify-end">
                      <div className={`relative w-full h-full ${sponsor.span === 'md:col-span-2' ? 'max-h-[140px]' : 'max-h-[80px]'} transition-all duration-500`}>
                          <Image 
                            src={sponsor.image} 
                            alt={sponsor.name} 
                            fill 
                            className="object-contain object-center md:object-right"
                          />
                      </div>
                  </div>
               </motion.div>
            ))}

         </div>
      </section>

      {/* Past Sponsors (Dark Section) */}
      <section className="relative z-10 py-40 bg-neutral-950 text-white flex flex-col justify-center">
         <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Legacy Partners</h2>
            <p className="text-neutral-400 text-lg font-light">Trusted by over 100+ brands throughout our history.</p>
         </div>

         <div className="w-full overflow-hidden relative flex flex-col gap-10">
             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />
             
             {/* Row 1 */}
             <div className="flex w-max animate-scroll gap-8">
                {[...row1, ...row1, ...row1, ...row1].map((sponsor, idx) => (
                   <div key={`row1-${sponsor.name}-${idx}`} className="w-[280px] h-[160px] bg-neutral-900/30 rounded-2xl border border-neutral-800 flex items-center justify-center p-8 transition-all duration-500 hover:bg-neutral-900 hover:border-neutral-700 hover:scale-105">
                      <div className="relative w-full h-full">
                         <Image src={sponsor.image} alt={sponsor.name} fill className="object-contain" />
                      </div>
                   </div>
                ))}
             </div>

             {/* Row 2 - Reverse Scroll */}
             <div className="flex w-max animate-scroll gap-8" style={{ animationDirection: 'reverse' }}>
                {[...row2, ...row2, ...row2, ...row2].map((sponsor, idx) => (
                   <div key={`row2-${sponsor.name}-${idx}`} className="w-[280px] h-[160px] bg-neutral-900/30 rounded-2xl border border-neutral-800 flex items-center justify-center p-8 transition-all duration-500 hover:bg-neutral-900 hover:border-neutral-700 hover:scale-105">
                      <div className="relative w-full h-full">
                         <Image src={sponsor.image} alt={sponsor.name} fill className="object-contain" />
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* Modern CTA */}
      <section className="relative z-10 py-24 px-6 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
            Want to Partner With Milan?
          </h2>
          <p className="text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with a vibrant community of over 50,000 students. Let&apos;s create something impactful together.
          </p>
          <a
            href="mailto:sponsorship@milan.srm"
            className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 gap-2 shadow-lg hover:shadow-xl"
          >
            Become a Partner <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </main>
  );
}