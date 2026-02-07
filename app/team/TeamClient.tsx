"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

import type { ImageData } from "@/components/ui/img-sphere";
import { TeamJSON, Member } from "@/lib/team-data";
import "./styles.css";

import MobileLists from "@/components/teams/MobileLists";
import DesktopLists from "@/components/teams/DesktopLists";
import HoverPreview from "@/components/teams/HoverPreview";
import ConvenorModal from "@/components/teams/ConvenorModal";

const SphereImageGrid = dynamic(() => import("@/components/ui/img-sphere"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

const CORE_TEAM_ROLES = [
  "Operations & Resources",
  "Tech Team and GD",
  "Hospitality",
  "Public Relations",
  "Publicity & Social Media",
  "Transport & Acc",
  "Content",
  "EMCEE",
  "Media",
  "Certificate & Prizes",
  "Sponsorship",
  "Treasurer",
  "Discipline",
];

const CLUB_CONVENORS = [
  "Music Club",
  "Dance Club",
  "Astrophillia Club",
  "Quiz Club",
  "Creative Arts Club",
  "Gaming Club",
  "Self Defence Club",
  "Fashion Club",
  "Women Empowerment Club",
  "Movie & Dramatics Club",
  "Social Club",
  "Literary Club",
  "Rotaract Club",
  "Festival Club",
];

export default function TeamClient({ teamData }: { teamData: TeamJSON }) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [hoveredConvenor, setHoveredConvenor] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedConvenor, setSelectedConvenor] = useState<ImageData | null>(
    null,
  );
  const [selectedSphereImage, setSelectedSphereImage] =
    useState<ImageData | null>(null);

  // Tracks scroll progress of the container for the indicator fade
  const { scrollYProgress } = useScroll();
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const sphereImages = useMemo<ImageData[]>(() => {
    const images: ImageData[] = [];
    Object.values(teamData).forEach((team: TeamJSON[string]) => {
      team.members.forEach((member: Member) => {
        if (member.thumb?.length) {
          images.push({
            id: member.code,
            src: member.thumb,
            alt: member.name,
            title: member.name,
            description: member.position,
          });
        }
      });
    });
    return images;
  }, [teamData]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setIsMobile(mobile);
      const size = mobile ? Math.min(w, h) : Math.min(w, h) * 0.9;
      setDimensions({ width: size, height: size });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sphereRadius = dimensions.width * (isMobile ? 0.5 : 0.45);
  const baseImageScale = isMobile ? 0.16 : 0.2;

  const getMemberImage = (id: string): ImageData => {
    const found = sphereImages.find((img) => img.id === id);
    if (found) return found;
    return {
      id: "placeholder",
      src: "/Teams/thumbs/placeholder.jpg",
      alt: "Loading...",
      title: "Loading...",
      description: "",
    };
  };

  const handleMemberSelect = (img: ImageData | null) => {
    if (img) {
      setHoveredConvenor(null);
      setPopupPosition(null);
      setSelectedConvenor({
        ...img,
        src: img.src.replace("/thumbs/", "/full/"),
      });
      setSelectedSphereImage(img);
    } else {
      setSelectedConvenor(null);
    }
  };

  return (
    /** * MAIN SCROLL CONTAINER
     * Added 'scrollbar-hide' to ensure internal scrollbar doesn't show.
     * Added 'snap-y snap-mandatory' for the page-to-page effect.
     */
    <div className="w-full snap-y snap-mandatory">
      {/* ================= HERO SECTION ================= */}
      <section className="h-screen w-full relative z-10 flex items-center justify-center text-center bg-linear-to-br from-purple-950 via-black to-black text-white snap-start snap-always">
        <div className="px-6">
          <div className="inline-block px-4 py-1 mb-6 text-xs tracking-widest uppercase rounded-full border border-purple-500/40 text-purple-300">
            Milan&apos;26
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tight">
            Our Team<span className="text-purple-500">.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-neutral-400 text-lg md:text-xl">
            Crew Behind the magic of Milan&apos;26
          </p>
        </div>

        {/* --- SCROLL INDICATOR (Animated Mouse) --- */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-[30px] h-[50px] border-2 border-white/20 rounded-full flex justify-center p-2">
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
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/30">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ================= TEAMS SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-screen w-full bg-[#F5F5F7] text-neutral-900 relative overflow-hidden snap-start snap-always">
        <main className="w-full h-full relative overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-200/40 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-200/40 blur-[120px]" />
          </div>

          {/* Header */}
          <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900 leading-[0.85]">
              Our
              <br />
              Team<span className="text-purple-600">.</span>
            </h1>
          </div>

          {/* Globe */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isMobile ? "z-0 opacity-100" : "z-10 pointer-events-none"
            }`}>
            <div
              className={
                isMobile ? "pointer-events-none" : "pointer-events-auto"
              }>
              <SphereImageGrid
                images={sphereImages}
                containerSize={dimensions.width}
                sphereRadius={sphereRadius}
                baseImageScale={baseImageScale}
                autoRotate
                autoRotateSpeed={0.5}
                momentumDecay={0.96}
                maxRotationSpeed={6}
                perspective={1000}
                selectedImage={selectedSphereImage}
                onImageSelect={handleMemberSelect}
              />
            </div>
          </div>

          {isMobile ? (
            <div className="absolute inset-0 z-30 overflow-y-auto scrollbar-hide">
              <MobileLists
                isMobile
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                coreRoles={CORE_TEAM_ROLES}
                clubs={CLUB_CONVENORS}
                getRandomImage={getMemberImage}
                setSelectedConvenor={handleMemberSelect}
                setSelectedSphereImage={setSelectedSphereImage}
                teamData={teamData}
              />
            </div>
          ) : (
            <DesktopLists
              teamData={teamData}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
              coreRoles={CORE_TEAM_ROLES}
              clubs={CLUB_CONVENORS}
              getRandomImage={getMemberImage}
              setSelectedConvenor={handleMemberSelect}
              setSelectedSphereImage={setSelectedSphereImage}
              setHoveredConvenor={setHoveredConvenor}
              setPopupPosition={setPopupPosition}
            />
          )}

          {!selectedConvenor && hoveredConvenor && popupPosition && (
            <HoverPreview
              hoveredConvenor={hoveredConvenor}
              popupPosition={popupPosition}
              getRandomImage={getMemberImage}
            />
          )}

          {selectedConvenor && (
            <ConvenorModal
              convenor={selectedConvenor}
              onClose={() => setSelectedConvenor(null)}
            />
          )}
        </main>
      </motion.section>
    </div>
  );
}
