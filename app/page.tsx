import { Hero } from "@/components/hero"
import { DirectorsManagersSection } from "@/components/directors-managers-section"
import { MilanTimelineSection } from "@/components/milan-timeline-section"
import { GuestShowcase } from "@/components/guest-showcase"
import { PosterGeneratorSection } from "@/components/poster-generator-section"
import { IntroductionSection } from "@/components/introduction-section"

export default function Home() {
  return (
    <>
      <Hero />
      <IntroductionSection />
      <PosterGeneratorSection />
      <DirectorsManagersSection />
      <MilanTimelineSection />
      <GuestShowcase />
    </>
  )
}
