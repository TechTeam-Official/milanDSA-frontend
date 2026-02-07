"use client";

import ExpandableItem from "./ExpandableItem";
import { ImageData } from "@/components/ui/img-sphere";
import { TeamJSON } from "@/lib/team-data";

interface Props {
  isMobile: boolean;
  expandedItems: Set<string>;
  setExpandedItems: React.Dispatch<React.SetStateAction<Set<string>>>;
  coreRoles: string[];
  clubs: string[];
  getRandomImage: (id: string) => ImageData;
  setSelectedConvenor: (img: ImageData | null) => void;
  setSelectedSphereImage: (img: ImageData | null) => void;
  teamData: TeamJSON;
}

const LABEL_MAP: Record<string, string> = {
  "Operations & Resources": "Operations and Resource Management",
  "Publicity & Social Media": "Publicity",
  "Public Relations": "Public Relations",
  Media: "Media",
  EMCEE: "EMCEE",
  Hospitality: "Hospitality",
  Sponsorship: "Sponsorship",
  Content: "Content",
  "Transport & Acc": "Transportation and Accommodation",
  "Tech Team and GD": "Tech and Graphic Design",
  "Certificate & Prizes": "Certificate and Prize Distribution",
  Treasurer: "Treasurer",
  Discipline: "Discipline",
  "Music Club": "Music",
  "Dance Club": "Dance",
  "Astrophillia Club": "Astrophillia",
  "Quiz Club": "Quiz",
  "Creative Arts Club": "Creative Arts",
  "Gaming Club": "Gaming",
  "Self Defence Club": "Self Defence",
  "Fashion Club": "Fashion",
  "Movie & Dramatics Club": "Movies and Dramatics",
  "Literary Club": "Literary",
  "Rotaract Club": "Rotaract",
  "Social Club": "Social",
  "Women Empowerment Club": "Women Empowerment",
  "Festival Club": "Festival",
};

export default function MobileLists(props: Props) {
  if (!props.isMobile) return null;

  const getMembersForLabel = (uiLabel: string) => {
    if (!props.teamData) return [];
    const targetLabel = LABEL_MAP[uiLabel] || uiLabel;
    const normalize = (str: string) => str.toLowerCase().trim();
    const searchTarget = normalize(targetLabel);

    const foundEntry = Object.entries(props.teamData).find(
      ([, team]) => normalize(team.label) === searchTarget,
    );

    if (!foundEntry) return [];

    const [key, team] = foundEntry;
    return team.members.map((member) => ({
      ...member,
      teamKey: key,
      image:
        member.thumb || (member as unknown as { image: string }).image || "",
    }));
  };

  return (
    <div className="relative w-full px-6 pb-40">
      <div className="flex flex-col gap-8 mt-[25vh]">
        {/* CORE TEAM SECTION */}
        {/* CLEAR GLASS EFFECT: 
            - bg-white/50: 50% opacity (no blur)
            - border-white/60: Subtle crisp edge
            - shadow-xl: Lifts it off the globe
        */}
        <div className="bg-[#E0C3A0]/90 backdrop-blur-sm border border-[#1F4D4A]/10 rounded-3xl p-6 shadow-xl shadow-[#1F4D4A]/10">
          <h3 className="font-black text-4xl mb-6 text-[#2A1E1A] tracking-tight border-b border-[#1F4D4A]/10 pb-4">
            Core Team
          </h3>
          <div className="space-y-6 text-[#2A1E1A] font-medium text-lg">
            {props.coreRoles.map((role) => (
              <ExpandableItem
                key={role}
                item={role}
                category="core"
                members={getMembersForLabel(role)}
                {...props}
                disableHover
              />
            ))}
          </div>
        </div>

        {/* CLUBS SECTION */}
        <div className="bg-[#E0C3A0]/90 backdrop-blur-sm border border-[#1F4D4A]/10 rounded-3xl p-6 shadow-xl shadow-[#1F4D4A]/10">
          <h3 className="font-black text-4xl mb-6 text-[#2A1E1A] tracking-tight border-b border-[#1F4D4A]/10 pb-4">
            Clubs
          </h3>
          <div className="space-y-6 text-[#2A1E1A] font-medium text-lg">
            {props.clubs.map((club) => (
              <ExpandableItem
                key={club}
                item={club}
                category="club"
                members={getMembersForLabel(club)}
                {...props}
                disableHover
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
