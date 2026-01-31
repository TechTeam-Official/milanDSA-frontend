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

// 🔥 MAP: UI Sidebar Name -> JSON Label Name
const LABEL_MAP: Record<string, string> = {
  // CORE
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

  // CLUBS
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

    // 1. Resolve the correct label using the map, or fallback to the original
    const targetLabel = LABEL_MAP[uiLabel] || uiLabel;

    // 2. Normalize for comparison (lowercase, trim)
    const normalize = (str: string) => str.toLowerCase().trim();
    const searchTarget = normalize(targetLabel);

    // 3. Find the matching team in JSON
    // Fix: Use `[, team]` to ignore the key without creating an unused variable
    const foundEntry = Object.entries(props.teamData).find(
      ([, team]) => normalize(team.label) === searchTarget,
    );

    if (!foundEntry) {
      return [];
    }

    const [key, team] = foundEntry;

    return team.members.map((member) => ({
      ...member,
      teamKey: key,
      // Fix: Polyfill 'image' without @ts-ignore.
      // Use member.thumb, or check if 'image' exists on member (casted to unknown first to avoid TS error if type is missing it)
      image:
        member.thumb || (member as unknown as { image: string }).image || "",
    }));
  };

  return (
    <div className="absolute right-4 top-32 w-1/2 md:hidden space-y-6">
      {/* CORE TEAM */}
      <div>
        <h3 className="font-semibold mb-2">Core Team</h3>
        {props.coreRoles.slice(0, 5).map((role) => (
          <ExpandableItem
            key={role}
            item={role}
            category="core"
            // Fix: Removed `as any`. The return type now satisfies the structure.
            members={getMembersForLabel(role)}
            {...props}
            disableHover
          />
        ))}
      </div>

      {/* CLUBS */}
      <div>
        <h3 className="font-semibold mb-2">Clubs</h3>
        {props.clubs.map((club) => (
          <ExpandableItem
            key={club}
            item={club}
            category="club"
            // Fix: Removed `as any`.
            members={getMembersForLabel(club)}
            {...props}
            disableHover
          />
        ))}
      </div>
    </div>
  );
}
