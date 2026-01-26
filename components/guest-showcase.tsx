"use client"

import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import Image from "next/image"

interface Guest {
  name: string
  designation: string
  thumbnail: string
}

const row1Guests: Guest[] = [
  {
    name: "Shreya Ghoshal",
    designation: "Playback Singer",
    thumbnail: "/milan/guests/Shreya Ghoshal_processed_by_imagy.png",
  },
  {
    name: "Asha Bhosle",
    designation: "Legendary Singer",
    thumbnail: "/milan/guests/Asha Bhosle_processed_by_imagy.png",
  },
  {
    name: "Vijay Deverakonda",
    designation: "Actor",
    thumbnail: "/milan/guests/Vijay Deverakonda_processed_by_imagy.png",
  },
  {
    name: "Kamal Haasan",
    designation: "Legendary Actor",
    thumbnail: "/milan/guests/Kamal Hassan_processed_by_imagy.png",
  },
  {
    name: "Aditya Roy Kapur",
    designation: "Actor",
    thumbnail: "/milan/guests/Aditya Roy Kapur_processed_by_imagy.png",
  },
  {
    name: "John Abraham",
    designation: "Actor",
    thumbnail: "/milan/guests/John Abraham_processed_by_imagy.png",
  },
  {
    name: "Amit Trivedi",
    designation: "Music Composer",
    thumbnail: "/milan/guests/Amit Trivedi_processed_by_imagy.png",
  },
  {
    name: "Bassjackers",
    designation: "DJ Duo",
    thumbnail: "/milan/guests/Bassjackers_processed_by_imagy.png",
  },
  {
    name: "Vishal–Shekhar",
    designation: "Music Duo",
    thumbnail: "/milan/guests/Vishal–Shekhar_processed_by_imagy.png",
  },
  {
    name: "Mammootty",
    designation: "Legendary Actor",
    thumbnail: "/milan/guests/Mammootty_processed_by_imagy.png",
  },
  {
    name: "Devi Sri Prasad",
    designation: "Music Composer",
    thumbnail: "/milan/guests/Devi Sri Prasad_processed_by_imagy.png",
  },
  {
    name: "Jonita Gandhi",
    designation: "Playback Singer",
    thumbnail: "/milan/guests/Jonita Gandhi_processed_by_imagy.png",
  },
  {
    name: "Vidya Vox",
    designation: "Singer",
    thumbnail: "/milan/guests/Vidya Vox_processed_by_imagy.png",
  },
]

const row2Guests: Guest[] = [
  {
    name: "Nani",
    designation: "Natural Star",
    thumbnail: "/milan/guests/Nani_processed_by_imagy.png",
  },
  {
    name: "Shruti Haasan",
    designation: "Actor & Singer",
    thumbnail: "/milan/guests/Shruti Haasan_processed_by_imagy.png",
  },
  {
    name: "Kayadu Lohar",
    designation: "Actor",
    thumbnail: "/milan/guests/Kayadu Lohar_processed_by_imagy.png",
  },
  {
    name: "Thaman S",
    designation: "Music Composer",
    thumbnail: "/milan/guests/Thaman S_processed_by_imagy.png",
  },
  {
    name: "Taapsee Pannu",
    designation: "Actor",
    thumbnail: "/milan/guests/Taapsee Pannu_processed_by_imagy.png",
  },
  {
    name: "Rakul Preet Singh",
    designation: "Actor",
    thumbnail: "/milan/guests/Rakul Preet Singh_processed_by_imagy.png",
  },
  {
    name: "Abish Mathew",
    designation: "Comedian",
    thumbnail: "/milan/guests/Abish Mathew_processed_by_imagy.png",
  },
  {
    name: "Sorabh Pant",
    designation: "Comedian",
    thumbnail: "/milan/guests/Sorabh Pant_processed_by_imagy.png",
  },
  {
    name: "Diego Miranda",
    designation: "DJ",
    thumbnail: "/milan/guests/Diego Miranda_processed_by_imagy.png",
  },
  {
    name: "KEVU",
    designation: "DJ",
    thumbnail: "/milan/guests/KEVU_processed_by_imagy.png",
  },
  {
    name: "Ritviz",
    designation: "Musician",
    thumbnail: "/milan/guests/Ritviz_processed_by_imagy.png",
  },
  {
    name: "Thaikkudam Bridge",
    designation: "Band",
    thumbnail: "/milan/guests/Thaikkudam Bridge_processed_by_imagy.png",
  },
  {
    name: "Andrea Jeremiah",
    designation: "Actor & Singer",
    thumbnail: "/milan/guests/Andrea Jeremiah_processed_by_imagy.png",
  },
]

const velocity = [0.5, -0.5]

export function GuestShowcase() {
  // Duplicate for seamless infinite scroll motion matching previous behavior
  const row1 = [...row1Guests, ...row1Guests, ...row1Guests, ...row1Guests]
  const row2 = [...row2Guests, ...row2Guests, ...row2Guests, ...row2Guests]

  return (
    <section className="relative w-full py-24 overflow-hidden bg-white text-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-50 via-white to-white -z-10" />
      
      <div className="w-full flex flex-col space-y-16">
        {/* Section Header */}
        <div className="text-center px-4">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-black to-neutral-600 mb-4">
               Our Past Headliners
             </h2>
             <p className="text-neutral-600 max-w-2xl mx-auto">
               The stars who made Milan unforgettable
             </p>
        </div>

        {/* Marquee Title wrapper if needed, or just remove if redundant with header. 
            Let's keep the scrolling title as a stylistic background element? 
            Actually, let's remove the huge scrolling text to make it cleaner and focus on the images.
        */}

        {/* Guest Cards - First Row (Left to Right) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <ScrollVelocity velocity={velocity[0]} className="py-4">
            {row1.map((guest, index) => (
              <div
                key={`${guest.name}-${index}`}
                className="relative h-[280px] w-[220px] md:h-[320px] md:w-[260px] flex-shrink-0 group mx-4 rounded-xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm"
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
                    <p className="text-xs font-medium text-indigo-400 tracking-wide uppercase">{guest.designation}</p>
                  </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>

        {/* Guest Cards - Second Row (Right to Left) - Full Width */}
        <div className="w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <ScrollVelocity velocity={velocity[1]} className="py-4">
            {row2.map((guest, index) => (
              <div
                key={`${guest.name}-reverse-${index}`}
                 className="relative h-[280px] w-[220px] md:h-[320px] md:w-[260px] flex-shrink-0 group mx-4 rounded-xl overflow-hidden border border-white/10 bg-neutral-900/50 backdrop-blur-sm"
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
                    <p className="text-xs font-medium text-pink-400 tracking-wide uppercase">{guest.designation}</p>
                  </div>
              </div>
            ))}
          </ScrollVelocity>
        </div>
      </div>
    </section>
  )
}
