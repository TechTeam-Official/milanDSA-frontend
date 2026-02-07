'use client'

import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function ConditionalFooter() {
  const pathname = usePathname()

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/login") || pathname?.startsWith("/checkout")) {
    return null
  }

  let variant: "default" | "events" | "sponsors" = "default";

  if (pathname?.startsWith("/events")) {
    variant = "events";
  } else if (pathname?.startsWith("/sponsors")) {
    variant = "sponsors";
  }

  return <Footer variant={variant} />
}
