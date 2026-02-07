"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const people = [
  {
    name: "Dr. Prince Kalyanasundaram",
    role: "Deputy Director",
    subRole: "Directorate of Student Affairs",
    image: "/Directors_Images/PrinceKalyanasundaram.png",
    type: "director",
  },
  {
    name: "Dr. Nisha Ashokan",
    role: "Director",
    subRole: "Directorate of Student Affairs",
    image: "/Directors_Images/NishaAshokan.png",
    type: "director",
    featured: true,
  },
  {
    name: "Dr. S. Pradeep",
    role: "Assistant Director",
    subRole: "Directorate of Student Affairs",
    image: "/Directors_Images/SPradeep.png",
    type: "director",
  },
  {
    name: "Dhandayuthapani B",
    role: "Event Manager",
    image: "/Managers_Images/Dhandayuthapani.png",
    type: "manager",
  },
  {
    name: "Rajiv D",
    role: "Event Manager",
    image: "/Managers_Images/RajivD.png",
    type: "manager",
  },
];

export function DirectorsManagersSection() {
  const directors = people.filter((p) => p.type === "director");
  const managers = people.filter((p) => p.type === "manager");

  // Re-order directors to put Featured (Nisha) in the middle for visual symmetry
  const sortedDirectors = [
    directors.find((d) => !d.featured && d.name.includes("Prince")),
    directors.find((d) => d.featured),
    directors.find((d) => !d.featured && d.name.includes("Pradeep")),
  ].filter(Boolean);

  return (
    <section className="relative w-full py-24 indian-light-bg text-neutral-900 overflow-hidden">
      {/* Background Texture & Decor */}
      <div className="indian-texture-light" />
      <div className="im-halo im-halo-teal absolute top-[-10%] right-[-10%]" />

      {/* Rhythm Lines */}
      <div className="im-rhythm-line im-line-curved top-20 left-10 opacity-10" />
      <div className="im-rhythm-line im-line-v bottom-0 left-[10%] h-32" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif tracking-tighter uppercase im-text-shadow">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A2A5E] via-[#0B0B0F] to-[#0F766E]">
              The Visionaries
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-neutral-600 max-w-2xl mx-auto text-lg font-light">
            The architects behind the grand spectacle of Milan.
          </motion.p>
        </div>

        {/* Directors Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {sortedDirectors.map((person, idx) => (
            <motion.div
              key={person?.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-1 rounded-2xl bg-transparent group ${person?.featured ? "md:-mt-12 md:mb-12 z-20" : "z-10"}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-[#3B2D5F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />

              <div className="relative h-full bg-[#FFFFF0] rounded-xl overflow-hidden border border-[#C9A24D] shadow-[0_4px_20px_rgba(59,45,95,0.1)] p-6 flex flex-col items-center text-center hover:border-[#D97706] transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`relative mb-6 rounded-full overflow-hidden border-2 border-[#C9A24D]/30 group-hover:border-[#C9A24D] transition-all duration-300 shadow-md ${person?.featured ? "w-48 h-48" : "w-32 h-32"}`}>
                  <Image
                    src={person?.image || ""}
                    alt={person?.name || ""}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <h3
                  className={`text-[#3B2D5F] mb-2 ${person?.featured ? "text-2xl" : "text-xl"}`}>
                  {person?.name}
                </h3>

                <div className="h-0.5 w-12 bg-[#C9A24D] mb-4 group-hover:w-24 transition-all duration-300" />

                <p className="text-[#0F766E] font-medium tracking-wide uppercase text-sm mb-1">
                  {person?.role}
                </p>
                {person?.subRole && (
                  <p className="text-neutral-500 text-xs">{person?.subRole}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative border-t border-[#C9A24D]/30 pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFFF0] px-6 py-1 text-[#C9A24D] text-sm tracking-widest uppercase font-semibold border border-[#C9A24D] rounded-full shadow-sm">
            Event Operations
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {managers.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 group bg-[#FFFFF0] border border-[#C9A24D] shadow-lg shadow-[#3B2D5F]/5 rounded-full pr-12 py-4 pl-4 hover:border-[#D97706] hover:shadow-[#D97706]/10 transiton-all duration-300 w-full md:w-[480px]">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border border-[#C9A24D]/20">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                </div>
                <div className="text-left">
                  <h4 className="text-neutral-900 text-xl group-hover:text-purple-600 transition-colors">
                    {person.name}
                  </h4>
                  <p className="text-neutral-500 text-sm uppercase tracking-wider">
                    {person.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="indian-gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
