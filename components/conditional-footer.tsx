'use client'

import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function ConditionalFooter() {
  const pathname = usePathname()

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/login") || pathname?.startsWith("/checkout")) {
    return null
  }

  let variant: "default" | "events" | "sponsors" | "passes" = "default";

  if (pathname?.startsWith("/events")) {
    variant = "events";
  } else if (pathname?.startsWith("/sponsors")) {
    variant = "sponsors";
  } else if (pathname?.startsWith("/passes")) {
    variant = "passes";
  }

  return <Footer variant={variant} />
}
