"use client"

import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import Image from "next/image"
import { motion } from "framer-motion"

interface Guest {
  name: string
  designation: string
  thumbnail: string
}

const row1Guests: Guest[] = [
  {
    name: "Shreya Ghoshal",
    designation: "Playback Singer",
    thumbnail: "/milan/guests/Shreya-Ghoshal-Photoshoot-v2.png",
  },
  {
    name: "Asha Bhosle",
    designation: "Legendary Singer",
    thumbnail: "/milan/guests/asha_bhosle.png",
  },
  {
    name: "Vijay Deverakonda",
    designation: "Actor",
    thumbnail: "/milan/guests/Vijay_devarakonda.png",
  },
  {
    name: "Kamal Haasan",
    designation: "Legendary Actor",
    thumbnail: "/milan/guests/Kamal_Hasan.png",
  },
  {
    name: "Aditya Roy Kapur",
    designation: "Actor",
    thumbnail: "/milan/guests/Aditya_Roy_Kapur.png",
  },
  {
    name: "John Abraham",
    designation: "Actor",
    thumbnail: "/milan/guests/John-Abraham-feature.png",
  },
  {
    name: "Amit Trivedi",
    designation: "Music Composer",
    thumbnail: "/milan/guests/amit_trivedi.png",
  },
  {
    name: "Bassjackers",
    designation: "DJ Duo",
    thumbnail: "/milan/guests/bassjackers.png",
  },
  {
    name: "Vishal–Shekhar",
    designation: "Music Duo",
    thumbnail: "/milan/guests/Vishal_shekar.png",
  },
  {
    name: "Mammootty",
    designation: "Legendary Actor",
    thumbnail: "/milan/guests/mammothy.png",
  },
  {
    name: "Devi Sri Prasad",
    designation: "Music Composer",
    thumbnail: "/milan/guests/devi_sri_prasad.png",
  },
  {
    name: "Jonita Gandhi",
    designation: "Playback Singer",
    thumbnail: "/milan/guests/jonita_gandhi-v2.png",
  },
  {
    name: "Vidya Vox",
    designation: "Singer",
    thumbnail: "/milan/guests/vidya_vox.png",
  },
]

const row2Guests: Guest[] = [
  {
    name: "Nani",
    designation: "Natural Star",
    thumbnail: "/milan/guests/nani.png",
  },
  {
    name: "Shruti Haasan",
    designation: "Actor & Singer",
    thumbnail: "/milan/guests/shruti_hasaan.png",
  },
  {
    name: "Kayadu Lohar",
    designation: "Actor",
    thumbnail: "/milan/guests/kayadu_lohar.png",
  },
  {
    name: "Thaman S",
    designation: "Music Composer",
    thumbnail: "/milan/guests/Thaman_S.png",
  },
  {
    name: "Taapsee Pannu",
    designation: "Actor",
    thumbnail: "/milan/guests/taapsee_pannu.png",
  },
  {
    name: "Rakul Preet Singh",
    designation: "Actor",
    thumbnail: "/milan/guests/rakul-preet-singh.png",
  },
  {
    name: "Abish Mathew",
    designation: "Comedian",
    thumbnail: "/milan/guests/Abish-Mathew.png",
  },
  {
    name: "Sorabh Pant",
    designation: "Comedian",
    thumbnail: "/milan/guests/sorabh_pant.png",
  },
  {
    name: "Diego Miranda",
    designation: "DJ",
    thumbnail: "/milan/guests/diego_Miranda.png",
  },
  {
    name: "KEVU",
    designation: "DJ",
    thumbnail: "/milan/guests/SOMNII-KEVU.png",
  },
  {
    name: "Ritviz",
    designation: "Musician",
    thumbnail: "/milan/guests/ritviz.png",
  },
  {
    name: "Thaikkudam Bridge",
    designation: "Band",
    thumbnail: "/milan/guests/thaikuddam_bridge.png",
  },
  {
    name: "Andrea Jeremiah",
    designation: "Actor & Singer",
    thumbnail: "/milan/guests/andrea_jeremeiah.png",
  },
]

const velocity = [0.5, -0.5]

export function GuestShowcase() {
  // Duplicate for seamless infinite scroll motion matching previous behavior
  const row1 = [...row1Guests, ...row1Guests, ...row1Guests, ...row1Guests]
  const row2 = [...row2Guests, ...row2Guests, ...row2Guests, ...row2Guests]

  return (
    <section className="relative w-full py-24 overflow-hidden indian-light-bg text-neutral-900">
      {/* Texture & Halo */}
      <div className="indian-texture-light" />
      <div className="im-halo im-halo-indigo absolute bottom-[-10%] left-[-10%]" />

      {/* Ornament */}
      <div className="im-ornament im-ornament-arch im-ornament-corner-br bottom-0 right-0" />

      <div className="w-full flex flex-col space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 im-text-shadow">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A2A5E] via-[#0B0B0F] to-[#0F766E] py-2 inline-block">
              Legacy of Legends
            </span>
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl font-light">
            Celebrating icons who have graced MILAN with their presence over the years.
          </p>
        </div>

        {/* Guest Cards - First Row (Left to Right) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F2EC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#EFE9DF] to-transparent z-10 pointer-events-none" />

          <ScrollVelocity velocity={velocity[0]} className="py-4">
            {row1.map((guest, index) => (
              <div
                key={`${guest.name}-${index}`}
                className="relative h-[280px] w-[220px] md:h-[320px] md:w-[260px] flex-shrink-0 group mx-4 rounded-xl overflow-hidden border border-[#C9A24D] bg-[#0B0B0F]"
              >
                <Image
                  src={guest.thumbnail}
                  alt={guest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-lg text-white mb-1 leading-tight">{guest.name}</h3>
                  <p className="text-xs font-medium text-[#C9A24D] tracking-wide uppercase">{guest.designation}</p>
                </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>

        {/* Guest Cards - Second Row (Right to Left) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F2EC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#EFE9DF] to-transparent z-10 pointer-events-none" />

          <ScrollVelocity velocity={velocity[1]} className="py-4">
            {row2.map((guest, index) => (
              <div
                key={`${guest.name}-reverse-${index}`}
                className="relative h-[280px] w-[220px] md:h-[320px] md:w-[260px] flex-shrink-0 group mx-4 rounded-xl overflow-hidden border border-[#C9A24D] bg-[#0B0B0F]"
              >
                <Image
                  src={guest.thumbnail}
                  alt={guest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-lg text-white mb-1 leading-tight">{guest.name}</h3>
                  <p className="text-xs font-medium text-[#0F766E] tracking-wide uppercase">{guest.designation}</p>
                </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>
      </div>
    </section>
  )
}
