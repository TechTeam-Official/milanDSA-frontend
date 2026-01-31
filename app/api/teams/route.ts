import { NextResponse } from "next/server";

// 1. DIRECT IMPORTS (static at build time)
import clubTeamData from "../../team/club-team.json";
import coreTeamData from "../../team/core-team.json";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour ISR

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

type Member = RawMember & {
  image: string;
};

type TeamBlock = {
  label: string;
  members: Member[];
};

type TeamJSON = Record<string, TeamBlock>;

// --- CONFIG ---
const RAW_DATA: Record<string, RawTeamBlock> = {
  ...clubTeamData,
  ...coreTeamData,
} as Record<string, RawTeamBlock>;

const KEY_TO_FOLDER: Record<string, string> = {
  // --- CLUBS ---
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

  // --- CORE ---
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

export async function GET() {
  const result: TeamJSON = {};

  for (const [teamKey, teamData] of Object.entries(RAW_DATA)) {
    const folderName = KEY_TO_FOLDER[teamKey] ?? teamKey;
    const encodedFolder = encodeURIComponent(folderName);

    const members: Member[] = teamData.members.map((member) => ({
      ...member,
      // 🔥 Uppercase JPG as requested
      image: `/Teams/${encodedFolder}/${member.code}.JPG`,
    }));

    if (members.length > 0) {
      result[teamKey] = {
        label: teamData.label,
        members,
      };
    }
  }

  return NextResponse.json(result, {
    headers: {
      // Extra CDN friendliness
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
