import clubTeamData from "@/app/team/club-team.json";
import coreTeamData from "@/app/team/core-team.json";

// --- TYPES ---
type RawMember = {
  code: string;
  name: string;
  position: string;
};

type RawTeamBlock = {
  label: string;
  members: RawMember[];
};

export type Member = RawMember & {
  thumb: string; // for sphere
  full: string; // for modal / hover
};

export type TeamBlock = {
  label: string;
  members: Member[];
};

export type TeamJSON = Record<string, TeamBlock>;

// --- CONFIG ---
const KEY_TO_FOLDER: Record<string, string> = {
  MAD: "MOVIES AND DRAMATICS",
  SO: "SOCIAL",
  CA: "CREATIVE ARTS",
  G: "GAMING",
  LIT: "LITERARY",
  FA: "FASHION",
  FS: "FESTIVAL",
  AS: "ASTROPHILLIA",
  DA: "DANCE",
  MU: "MUSIC",
  WE: "WOMEN EMPOWERMENT",
  Q: "QUIZ",
  RO: "ROTRACT",
  SD: "SELF DEFENCE",
  ORM: "OPERATIONS & RESOURCE MANAGEMENT",
  P: "PUBLICITY",
  PR: "PUBLIC RELATIONS",
  M: "MEDIA",
  E: "EMCEE",
  H: "HOSPITALITY",
  S: "SPONSORSHIP",
  C: "CONTENT",
  TA: "TRANSPORT AND ACCODAMATION",
  TG: "TECH AND GRAPHICS",
  CP: "CERTIFICATES AND PRIZE DISTRIBUTION",
  TR: "TREASURER",
  DS: "DISCIPLINE",
};

const RAW_DATA = {
  ...clubTeamData,
  ...coreTeamData,
} as Record<string, RawTeamBlock>;

/**
 * Generates team data with full and thumbnail image paths.
 */
export function getTeamData(): TeamJSON {
  const result: TeamJSON = {};

  for (const [teamKey, teamData] of Object.entries(RAW_DATA)) {
    // folder name in Teams directory
    const folder = KEY_TO_FOLDER[teamKey] ?? teamKey;

    result[teamKey] = {
      label: teamData.label,
      members: teamData.members.map((m) => {
        // Ensure the file exists (optional, but prevents 404)
        const thumbPath = `/Teams/thumbs/${folder}/${m.code}.JPG`;
        const fullPath = `/Teams/full/${folder}/${m.code}.JPG`;

        return {
          ...m,
          thumb: thumbPath,
          full: fullPath,
        };
      }),
    };
  }

  return result;
}
