import { Card, CardContent } from "@/components/ui/card"
import { Heart, Shield, Clock, Users } from "lucide-react"

export function AboutUs() {
  const features = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Personalized healthcare services tailored to each individual's unique needs and circumstances.",
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Strict adherence to healthcare privacy regulations ensuring your medical information stays secure.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock availability for urgent healthcare needs and emergency situations.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Licensed healthcare professionals with extensive experience in adult foster care services.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">About GIA Adult Foster Care</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're dedicated to providing exceptional adult foster care services throughout Massachusetts, combining
            traditional compassionate care with modern digital healthcare management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <feature.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-background rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl lg:text-3xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground text-lg">
                To revolutionize adult foster care in Massachusetts by combining compassionate, personalized healthcare
                services with cutting-edge digital tools that streamline administrative processes while maintaining the
                highest standards of patient privacy and care quality.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Streamlined appointment scheduling and management</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Secure patient-provider communication platform</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Comprehensive care coordination and documentation</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
              <div className="space-y-4">
                <Heart className="h-16 w-16 text-primary mx-auto" />
                <h4 className="text-xl font-semibold">Serving Massachusetts Since 2010</h4>
                <p className="text-muted-foreground">
                  Over a decade of trusted healthcare services for adults in foster care settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
