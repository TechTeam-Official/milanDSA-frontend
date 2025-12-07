"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TeamIntroAnimationProps {
  onComplete: () => void;
}

export function TeamIntroAnimation({ onComplete }: TeamIntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ourTextRef = useRef<HTMLHeadingElement>(null);
  const teamTextRef = useRef<HTMLHeadingElement>(null);
  const directorsTextRef = useRef<HTMLDivElement>(null);
  const managersTextRef = useRef<HTMLDivElement>(null);

  // Director image refs
  const nishaRef = useRef<HTMLImageElement>(null);
  const princeRef = useRef<HTMLImageElement>(null);
  const pradeepRef = useRef<HTMLImageElement>(null);

  // Manager image refs
  const dhandayuthapaniRef = useRef<HTMLImageElement>(null);
  const rajivRef = useRef<HTMLImageElement>(null);

  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Ensure refs exist
      if (!ourTextRef.current || !teamTextRef.current || !containerRef.current) {
        console.warn("Animation refs not ready");
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationComplete(true);
        }
      });

      // Initial setup - hide everything except Nisha and Directors text and OUR TEAM
      gsap.set([princeRef.current, pradeepRef.current], {
        opacity: 0,
        scale: 0.8,
        x: 0,
        y: 0,
        zIndex: 1
      });

      gsap.set([managersTextRef.current, dhandayuthapaniRef.current, rajivRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(nishaRef.current, {
        zIndex: 3
      });

      // Set initial position for Our and Team text (top center, stacked vertically)
      gsap.set(ourTextRef.current, {
        top: "13%",
        left: "50%",
        x: "-50%",
        y: 0,
        opacity: 0
      });
      gsap.set(teamTextRef.current, {
        top: "25%",
        left: "50%",
        x: "-50%",
        y: 0,
        opacity: 0
      });

      // STAGE 1: OUR TEAM text and Nisha's picture in center with Directors text
      tl.to([ourTextRef.current, teamTextRef.current], {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      })
      .from(directorsTextRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .from(nishaRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // STAGE 2: Prince and Pradeep come from behind Nisha and position left/right
      const isMobileView = window.innerWidth < 768;
      const moveDistance = isMobileView ? -180 : -220;

      tl.to([princeRef.current, pradeepRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "+=0.5")
      .to(princeRef.current, {
        x: moveDistance,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(pradeepRef.current, {
        x: -moveDistance,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8");

      // STAGE 3: Move directors up, show managers
      tl.to([nishaRef.current, princeRef.current, pradeepRef.current, directorsTextRef.current], {
        y: -200,
        duration: 1,
        ease: "power3.inOut"
      }, "+=0.5")
      // Simultaneously move OUR TEAM text to final position (matching team-sphere positions)
      .to(ourTextRef.current, {
        top: isMobileView ? "4.5rem" : "3.75rem", // top-18 mobile, top-15 desktop
        left: isMobileView ? "1rem" : "2.5rem", // left-4 mobile, left-10 desktop
        fontSize: isMobileView ? "3.75rem" : "10rem", // text-6xl mobile, text-[10rem] desktop
        x: 0,
        y: 0,
        clearProps: "transform",
        duration: 1,
        ease: "power3.inOut"
      }, "-=1")
      .to(teamTextRef.current, {
        top: isMobileView ? "7.5rem" : "11.5rem", // top-30 mobile, top-46 desktop
        left: isMobileView ? "1.25rem" : "3rem", // left-5 mobile, left-12 desktop
        fontSize: isMobileView ? "3.75rem" : "10rem", // text-6xl mobile, text-[10rem] desktop
        x: 0,
        y: 0,
        clearProps: "transform",
        duration: 1,
        ease: "power3.inOut"
      }, "-=1")
      .to(managersTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5")
      .to([dhandayuthapaniRef.current, rajivRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2
      }, "-=0.4");

      // Hold for a moment before exit
      tl.to({}, { duration: 1 });

      // EXIT ANIMATION: White background vanishes like a veil, images collect and slide out
      tl.to(containerRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 1,
        ease: "power2.inOut"
      })
      // Images collect together first (move to center-right)
      .to([nishaRef.current, princeRef.current, pradeepRef.current, dhandayuthapaniRef.current, rajivRef.current], {
        x: window.innerWidth * 0.3,
        y: -window.innerHeight * 0.15,
        scale: 0.6,
        duration: 0.6,
        ease: "power2.inOut"
      }, "-=0.5")
      // Then slide to top right corner with stagger effect
      .to([nishaRef.current, princeRef.current, pradeepRef.current, dhandayuthapaniRef.current, rajivRef.current], {
        x: window.innerWidth * 1.2,
        y: -window.innerHeight * 0.8,
        scale: 0.1,
        opacity: 0,
        duration: 0.7,
        ease: "power3.in",
        stagger: 0.06
      })
      // Directors and Managers text vanish
      .to([directorsTextRef.current, managersTextRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in"
      }, "-=1.2")
      // OUR TEAM text stays visible - we just fade out the container background
      // The text will remain visible and be picked up by TeamSphere component
      .to(containerRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete();
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete, isMounted]);

  // Don't render if animation is complete
  if (animationComplete) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Skip button */}
      <button
        onClick={() => {
          setAnimationComplete(true);
          onComplete();
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] px-4 py-2 sm:px-6 sm:py-3 bg-gray-900 text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors shadow-lg"
      >
        Skip Animation
      </button>

      {/* OUR TEAM text - split into "Our" and "Team" matching team-sphere structure */}
      <h1
        ref={ourTextRef}
        className="absolute text-6xl font-bold text-gray-900 tracking-tight md:text-[10rem] z-50"
      >
        Our
      </h1>
      <h1
        ref={teamTextRef}
        className="absolute text-6xl font-bold text-gray-900 tracking-tight md:text-[10rem] z-50"
      >
        Team
      </h1>

      {/* Directors Section */}
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* Directors Text */}
        <div ref={directorsTextRef} className="mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Directors
          </h2>
        </div>

        {/* Directors Images Container */}
        <div className="relative flex items-center justify-center">
          {/* Prince - Left */}
          <img
            ref={princeRef}
            src="/Directors_Images/PrinceKalyanasundaram.png"
            alt="Prince Kalyanasundaram"
            className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
          />

          {/* Nisha - Center (on top) */}
          <img
            ref={nishaRef}
            src="/Directors_Images/NishaAshokan.png"
            alt="Nisha Ashokan"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white relative z-10"
          />

          {/* Pradeep - Right */}
          <img
            ref={pradeepRef}
            src="/Directors_Images/SPradeep.png"
            alt="S Pradeep"
            className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
          />
        </div>
      </div>

      {/* Managers Section */}
      <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-8 md:mt-12">
        {/* Managers Text */}
        <div ref={managersTextRef} className="mb-4 md:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Managers
          </h2>
        </div>

        {/* Managers Images */}
        <div className="flex gap-8 sm:gap-12 md:gap-16">
          <img
            ref={dhandayuthapaniRef}
            src="/Managers_Images/Dhandayuthapani.png"
            alt="Dhandayuthapani"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
          />
          <img
            ref={rajivRef}
            src="/Managers_Images/RajivD.png"
            alt="Rajiv D"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-2 md:border-4 border-white"
          />
        </div>
      </div>
    </div>
  );
}
