'use client'

import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function ConditionalFooter() {
  const pathname = usePathname()

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/login") || pathname?.startsWith("/checkout")) {
    return null
  }

  return <Footer />
}
