import { Hero } from "@/components/home/hero"
import { ArtistsSection } from "@/components/home/artists-section"
import { MilanTimelineSection } from "@/components/home/milan-timeline-section"
import { GuestShowcase } from "@/components/home/guest-showcase"
import { PosterGeneratorSection } from "@/components/home/poster-generator-section"
import { IntroductionSection } from "@/components/home/introduction-section"


export default function Home() {
  return (
    <>
      <Hero />
      <IntroductionSection />
      <PosterGeneratorSection />
      <ArtistsSection />
      <MilanTimelineSection />
      <GuestShowcase />
    </>
  )
}
