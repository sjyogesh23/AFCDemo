import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Compassionate Care for <span className="text-primary">Massachusetts</span> Residents
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                GIA's Adult Foster Care program provides personalized healthcare services with HIPAA-compliant digital
                workflows for streamlined patient care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Healthcare Providers</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">HIPAA Compliant</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <div className="h-full w-full rounded-xl bg-background/80 backdrop-blur-sm border flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Heart className="h-16 w-16 text-primary mx-auto" />
                  <h3 className="text-2xl font-semibold">Your Health, Our Priority</h3>
                  <p className="text-muted-foreground">
                    Secure, streamlined healthcare management designed for Massachusetts residents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
