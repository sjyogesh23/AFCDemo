import { Hero } from "@/components/home/hero"
import { AboutUs } from "@/components/home/about-us"
import { Services } from "@/components/home/services"
import { RegisterSection } from "@/components/home/register-section"

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <AboutUs />
      <Services />
      <RegisterSection />
    </div>
  )
}
