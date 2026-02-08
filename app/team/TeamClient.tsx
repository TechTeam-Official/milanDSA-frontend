"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

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
  "Operations & Resource Management",
  "Tech & Graphic Design",
  "Hospitality",
  "Public Relations",
  "Publicity & Social Media",
  "Transportation & Accommodation",
  "Content",
  "EMCEE",
  "Media",
  "Certificate & Prize Distribution",
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

const WEB_TEAM_ROLES = [
  "Developers",
  "Designers",
  "Contributors",
];

export default function TeamClient({ teamData }: { teamData: TeamJSON }) {
  console.log("TeamClient rendered with new colors");
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

  const allMemberImages = useMemo<ImageData[]>(() => {
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
            // Keep track if it's customImage for filtering
            custom: !!member.customImage,
          } as ImageData & { custom?: boolean });
        }
      });
    });
    return images;
  }, [teamData]);

  const sphereImages = useMemo(() => {
    return allMemberImages.filter((img) => !(img as any).custom);
  }, [allMemberImages]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Treat tablet and iPad Pro (<= 1024px) as "mobile-like" layout (sequential flow)
      const mobileOrTablet = w <= 1024;
      setIsMobile(mobileOrTablet);
      const size = mobileOrTablet ? Math.min(w, h) : Math.min(w, h) * 0.9;
      setDimensions({ width: size, height: size });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sphereRadius = dimensions.width * (isMobile ? 0.5 : 0.45);
  const baseImageScale = isMobile ? 0.16 : 0.2;

  const getMemberImage = (id: string): ImageData => {
    const found = allMemberImages.find((img) => img.id === id);
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
    <div className="w-full overflow-x-hidden bg-[#F3E8D7]">
      {/* ================= HERO SECTION ================= */}
      <section
        className="h-screen w-full relative z-20 flex items-center justify-center text-center text-[#2A1E1A] rounded-b-[4rem] shadow-[0_0_50px_rgba(31,77,74,0.1)] border-b border-[#1F4D4A]/10 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/BackgroundImages/Teams.png"
            alt="Milan Team Background"
            fill
            className="object-cover opacity-90"
            priority
          />
          {/* Subtle Vignette for Focus & Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)] mix-blend-multiply pointer-events-none" />

          {/* Soft Bottom Fade for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />
        </div>

        <div className="px-6 relative z-10 text-white drop-shadow-lg -translate-y-12">
          <div className="inline-block px-4 py-1 mb-6 text-xs tracking-widest uppercase rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-[#B89B5E] shadow-lg">
            Milan&apos;26
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-white drop-shadow-xl">
            Our Team<span className="text-[#B89B5E]">.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-white/90 text-lg md:text-xl drop-shadow-md font-medium">
            Crew Behind the magic
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-[#B89B5E] rounded-full mx-auto mt-12"
          />
        </div>


        {/* --- SCROLL INDICATOR (Animated Mouse) --- */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
          <div className="w-[30px] h-[50px] border-2 border-white/40 rounded-full flex justify-center p-2 backdrop-blur-sm">
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
              className="w-1.5 h-1.5 bg-[#B89B5E] rounded-full shadow-[0_0_8px_#B89B5E]"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] font-semibold text-white/60">
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
        style={{ backgroundColor: "#F3E8D7" }}
        className={`w-full text-[#2A1E1A] relative overflow-hidden z-10 ${isMobile ? "min-h-screen flex flex-col" : "h-[110vh] -mt-12 snap-start snap-always"}`}>
        <main className="w-full h-full relative overflow-hidden">
          {/* Ambient Background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#E0C3A0]/40 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#B89B5E]/30 blur-[120px]" />
          </div>

          {/* Header */}


          {/* Globe */}
          <div
            className={isMobile
              ? "relative w-full shrink-0 z-10 flex items-center justify-center py-16"
              : "absolute inset-0 z-10 pointer-events-none"
            }>
            <div
              className={`pointer-events-auto ${isMobile ? "" : "w-full h-full flex items-center justify-center md:pr-64"}`}>
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
            <div className="relative w-full z-20 pointer-events-auto">
              <MobileLists
                isMobile
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                coreRoles={CORE_TEAM_ROLES}
                clubs={CLUB_CONVENORS}
                webRoles={WEB_TEAM_ROLES}
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
              webRoles={WEB_TEAM_ROLES}
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

        </main>
      </motion.section>

      {selectedConvenor && (
        <ConvenorModal
          convenor={selectedConvenor}
          onClose={() => setSelectedConvenor(null)}
        />
      )}
    </div>
  );
}
