import TeamClient from "./TeamClient";
import { getTeamData } from "@/lib/team-data";

export const metadata = {
  title: "Our Team",
  description: "Meet the team behind the event",
};

export default function TeamPage() {
  const teamData = getTeamData();

  return <TeamClient teamData={teamData} />;
}
