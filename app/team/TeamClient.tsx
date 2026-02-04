"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

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

  const sphereImages = useMemo<ImageData[]>(() => {
    const images: ImageData[] = [];
    Object.values(teamData).forEach((team: TeamJSON[string]) => {
      team.members.forEach((member: Member) => {
        if (member.thumb && member.thumb.length > 0) {
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
      // Large dimensions
      const size = mobile ? Math.min(w, h) * 1.0 : Math.min(w, h) * 0.9;
      setDimensions({ width: size, height: size });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // --- SCALE ADJUSTMENTS ---
  // Large Radius for immersive feel
  const sphereRadius = dimensions.width * (isMobile ? 0.5 : 0.45);
  // Large Images (0.16) to match desktop feel
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
    <main className="w-full h-screen relative bg-[#F5F5F7] text-neutral-900 overflow-hidden selection:bg-purple-200">
      {/* 1. BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-200/40 via-transparent to-transparent blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent blur-[100px]" />
      </div>

      {/* 2. HEADER */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-20 pointer-events-none">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900">
          Our
          <br />
          Team<span className="text-purple-600">.</span>
        </h1>
      </div>

      {/* 3. GLOBE BACKGROUND (Sharp, no opacity fade) */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${isMobile ? "z-0 opacity-100" : "z-10 pointer-events-none"}`}>
        <div
          className={isMobile ? "pointer-events-none" : "pointer-events-auto"}>
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

      {/* 4. MOBILE LIST */}
      {isMobile && (
        <div className="absolute inset-0 z-30 overflow-y-auto overflow-x-hidden scrollbar-hide">
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
      )}

      {/* 5. DESKTOP LISTS */}
      {!isMobile && (
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

      {/* 6. MODALS & HOVERS */}
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
  );
}
