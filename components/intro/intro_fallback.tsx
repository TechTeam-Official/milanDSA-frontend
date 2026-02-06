"use client";

/**
 * IntroFallback
 * -------------------
 * Responsibilities:
 * - Decide whether intro should be skipped
 * - Handle:
 *   - already seen (session)
 *   - slow network
 *   - reduced motion
 */

const SESSION_KEY = "milan_intro_seen";

export function shouldSkipIntro(): boolean {
  if (typeof window === "undefined") return true;

  if (sessionStorage.getItem(SESSION_KEY)) return true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const connection = navigator.connection?.effectiveType;
  if (connection === "slow-2g" || connection === "2g") {
    return true;
  }

  return false;
}

export function markIntroSeen() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, "true");
}
