import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, UserPlus, Shield } from "lucide-react"

export function RegisterSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of Massachusetts residents who trust GIA AFC for their healthcare needs. Registration is
            simple and secure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Patient Registration</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Register as a patient to access our comprehensive healthcare management platform.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Massachusetts SSN verification required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Secure appointment scheduling</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Access to digital health records</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Direct communication with providers</span>
                    </div>
                  </div>
                </div>

                <Link href="/register" className="block">
                  <Button className="w-full" size="lg">
                    Register as Patient
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-muted/50">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Healthcare Providers</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Already registered? Sign in to access your dashboard and manage patient care.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Secure patient management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Appointment scheduling tools</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">HIPAA-compliant communication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">Administrative support</span>
                    </div>
                  </div>
                </div>

                <Link href="/signin" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Healthcare provider registration is managed by our administrative team.
            <Link href="/contact" className="text-primary hover:underline ml-1">
              Contact us for more information.
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
