import { LandingNav } from "@/components/landing/nav"
import { LandingFooter } from "@/components/landing/footer"
import { FAQ } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Benefits } from "@/components/landing/benefits"
import { Features } from "@/components/landing/features"
import { Services } from "@/components/landing/services"
import { PricingSection } from "@/components/landing/pricing"


export default async function HomePage() {
  return (
    <>
      <LandingNav />
      <Hero />
      <Benefits />
      <Features />
      <Services />
      <PricingSection />
      <FAQ />
      <LandingFooter />
    </>
  );
}