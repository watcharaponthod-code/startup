import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ExamplesSection } from "@/components/landing/examples-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background noise scanlines">
      <Navbar />
      <HeroSection />
      <section id="features">
        <HowItWorks />
      </section>
      <section id="examples">
        <ExamplesSection />
      </section>
      <TestimonialsSection />
      <section id="pricing">
        <PricingSection />
      </section>
      <Footer />
    </main>
  )
}
