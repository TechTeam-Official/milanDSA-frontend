import TeamClient from "./TeamClient";
import { getTeamData } from "@/lib/team-data";

export const metadata = {
  title: "Our Team",
  description: "Crew Behind the magic of Milan'26",
};

export const dynamic = "force-dynamic";

export default function TeamPage() {
  const teamData = getTeamData();


  return <TeamClient teamData={teamData} />;
}
