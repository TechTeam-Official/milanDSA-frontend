"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { shouldSkipIntro, markIntroSeen } from "./intro_fallback";

const INTRO_DURATION = 6000; // 6s safety buffer
const READY_TIMEOUT = 500; // 300–500ms fallback window

export default function IntroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // ✅ Mount Effect: Defer checks to next tick to avoid synchronous cascading renders
  useEffect(() => {
    const initTimer = setTimeout(() => {
      // 1. Check device width
      setIsMobile(window.innerWidth < 768);

      // 2. Check if intro should be shown
      if (!shouldSkipIntro()) {
        setShow(true);
      }
    }, 0);

    return () => clearTimeout(initTimer);
  }, []);

  // ✅ Timer Effect: Handle timeouts only when showing
  useEffect(() => {
    if (!show) return;

    // Skip if video doesn't become ready fast enough
    const readyTimer = setTimeout(() => {
      if (!videoReady) {
        markIntroSeen();
        setShow(false);
      }
    }, READY_TIMEOUT);

    // Absolute stop after intro duration
    const endTimer = setTimeout(() => {
      markIntroSeen();
      setShow(false);
    }, INTRO_DURATION);

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(endTimer);
    };
  }, [show, videoReady]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}>
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={() => setVideoReady(true)}
          className="w-full h-full object-cover">
          {isMobile ? (
            <>
              <source
                src="/intro/mobile/milan_intro_vid.webm"
                type="video/webm"
              />
              <source
                src="/intro/mobile/milan_intro_vid.mp4"
                type="video/mp4"
              />
            </>
          ) : (
            <>
              <source
                src="/intro/desktop/intro_video_desktop.webm"
                type="video/webm"
              />
              <source
                src="/intro/desktop/intro_video_desktop.mp4"
                type="video/mp4"
              />
            </>
          )}
        </video>

        {/* Skip button */}
        <button
          onClick={() => {
            markIntroSeen();
            setShow(false);
          }}
          className="absolute bottom-6 right-6 text-xs text-white/70 hover:text-white transition">
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
