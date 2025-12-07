"use client";

import { TeamSphere } from "@/components/team-sphere"
import { TeamIntroAnimation } from "@/components/team-intro-animation"
import { useState, useEffect } from "react"

export default function Team() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if animation has been shown in this session
    if (typeof window !== 'undefined') {
      // For testing: uncomment the line below to always show animation
      // sessionStorage.removeItem('teamAnimationShown');

      const hasSeenAnimation = sessionStorage.getItem('teamAnimationShown');
      if (hasSeenAnimation) {
        setShowIntro(false);
      }
    }
    setIsLoading(false);
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem('teamAnimationShown', 'true');
    setShowIntro(false);
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  if (showIntro) {
    return <TeamIntroAnimation onComplete={handleAnimationComplete} />;
  }

  return <TeamSphere />
}
