"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const people = [
    {
        name: "Mithoon",
        role: "Music Composer",
        // Removed subRole
        image: "/ProShowPasses/Mithoon.png",
        type: "headliner",
        landscape: true,
        fit: "cover",
        date: "19.02.2026",
    },
    {
        name: "Santhosh Narayanan",
        role: "Music Director",
        // Removed subRole
        image: "/ProShowPasses/SaNa.png",
        type: "headliner",
        size: "large",
        fit: "cover",
        date: "20.02.2026",
    },
    {
        name: "Sreeleela",
        role: "Chief Guest",
        subRole: "Inaugural",
        image: "/ProShowPasses/Sreeleela.png",
        type: "headliner",
        fit: "cover",
        featured: true,
        date: "19.02.2026",
    },
    {
        name: "Office Gaana",
        role: "Live Band",
        image: "/ProShowPasses/Office-Gaana.png",
        type: "opener",
        landscape: false,
        fit: "cover",
        position: "object-center",
        date: "21.02.2026",
    },
    {
        name: "DJ Viola",
        role: "DJ",
        image: "/ProShowPasses/Viola.png",
        type: "opener",
        landscape: true,
        fit: "cover",
        position: "object-center",
        date: "21.02.2026",
    },
    {
        name: "Anishma Anilkumar",
        role: "Chief Guest",
        subRole: "Valedictory",
        image: "/ProShowPasses/Anishma.png",
        type: "opener",
        landscape: false,
        fit: "cover",
        position: "object-top",
        date: "22.02.2026",
    },

];

export function ArtistsSection() {
    // Unified list for the Bento Grid


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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A2A5E] via-[#0B0B0F] to-[#0F766E] py-2 inline-block">
                            Proshows
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-neutral-600 max-w-2xl mx-auto text-lg font-light">
                        Big voices. Crazy performances. Non-stop music, memories, and magic. Where campus energy meets culture.
                    </motion.p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[300px]">
                    {/* Re-organize artists for the grid: Featured first, then others mixed */}
                    {[
                        people.find((p) => p.featured),
                        people.find((p) => p.name === "Mithoon"),
                        people.find((p) => p.name === "Santhosh Narayanan"),
                        people.find((p) => p.name === "Anishma Anilkumar"),
                        people.find((p) => p.name === "Office Gaana"),
                        people.find((p) => p.name === "DJ Viola"),
                    ]
                        .filter(Boolean)
                        .map((person, idx) => {
                            // Determine if item should be large (2x2)
                            // @ts-ignore
                            const isLarge = person?.featured || person?.size === "large";

                            return (
                                <motion.div
                                    key={person?.name || idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className={`relative group rounded-3xl overflow-hidden bg-[#FFFFF0] border border-[#C9A24D] shadow-lg hover:shadow-2xl transition-all duration-500 ${isLarge ? "md:col-span-2 md:row-span-2" :
                                        // @ts-ignore
                                        person?.landscape ? "md:col-span-2 md:row-span-1" :
                                            "md:col-span-1 md:row-span-1"
                                        }`}
                                >
                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                                    {/* Default Gradient for text legibility at bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10" />

                                    {/* Image Container */}
                                    <div className={`relative w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                                        // @ts-ignore
                                        person?.fit === "cover" ? "p-0" : (isLarge ? "p-8" : "p-4")
                                        }`}>
                                        <div className="relative w-full h-full">
                                            {person?.image && (
                                                <Image
                                                    src={person.image}
                                                    alt={person.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    quality={person.name === "Office Gaana" ? 60 : 85}
                                                    className={`transition-all duration-500 ${isLarge ? "group-hover:scale-110" : "group-hover:scale-110"} ${
                                                        // @ts-ignore
                                                        person?.position ? person.position :
                                                            // @ts-ignore
                                                            person?.fit === "cover" ? "object-cover object-top" :
                                                                // @ts-ignore
                                                                person?.fit === "contain" ? "object-contain object-center" :
                                                                    "object-contain object-bottom"
                                                        }`}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-30">
                                        <div className="bg-[#FFFFF0]/90 backdrop-blur-sm border border-[#C9A24D]/30 p-4 rounded-xl shadow-lg transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-between h-full max-h-[140px]">
                                            <div>
                                                <h3 className={`font-bold text-[#3B2D5F] leading-tight break-words ${isLarge ? "text-3xl" : "text-lg"}`}>
                                                    {person?.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="h-0.5 w-6 bg-[#D97706] shrink-0" />
                                                    <p className="text-[#0F766E] font-medium tracking-wide uppercase text-[10px] md:text-xs">
                                                        {person?.role}
                                                    </p>
                                                </div>
                                                {person?.subRole && (
                                                    <p className="text-neutral-500 text-[10px] mt-1">{person?.subRole}</p>
                                                )}
                                            </div>

                                            {/* Date at the bottom-right or simply below */}
                                            {/* @ts-ignore */}
                                            {person?.date && (
                                                <div className="text-right mt-2">
                                                    <p className="text-[#D97706] font-serif font-bold text-base md:text-lg whitespace-nowrap">
                                                        {/* @ts-ignore */}
                                                        {person.date}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Mobile / Default view label if not hovering (optional) */}
                                        <div className="md:hidden absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold">{person?.name}</h3>
                                            <p className="text-xs opacity-80">{person?.role}</p>
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="indian-gold-divider absolute bottom-0 left-0 right-0" />
        </section>
    );
}
