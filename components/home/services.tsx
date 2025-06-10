import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Phone, Stethoscope, Users, Shield } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Stethoscope,
      title: "Medical Care Coordination",
      description:
        "Comprehensive medical care coordination with licensed healthcare providers, ensuring continuity of care and proper medication management.",
    },
    {
      icon: Calendar,
      title: "Appointment Management",
      description:
        "Streamlined scheduling system for medical appointments, therapy sessions, and routine check-ups with automated reminders.",
    },
    {
      icon: FileText,
      title: "Digital Health Records",
      description:
        "Secure, HIPAA-compliant digital health records accessible to authorized healthcare providers and patients.",
    },
    {
      icon: Phone,
      title: "24/7 Support Line",
      description:
        "Round-the-clock support for urgent healthcare needs, medication questions, and emergency situations.",
    },
    {
      icon: Users,
      title: "Care Team Coordination",
      description:
        "Seamless communication between patients, doctors, caregivers, and administrative staff through our integrated platform.",
    },
    {
      icon: Shield,
      title: "HIPAA Compliance",
      description:
        "Full compliance with healthcare privacy regulations, ensuring your medical information remains secure and confidential.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive healthcare services designed to meet the unique needs of adults in foster care settings
            throughout Massachusetts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/5 rounded-lg">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Why Choose GIA AFC?</h3>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years of Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Patients Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
