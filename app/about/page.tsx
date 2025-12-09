import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

const features = [
  "Instant booking in seconds",
  "Transparent pricing",
  "Verified stylists",
  "No phone calls needed",
  "Real customer reviews",
  "Secure online payments",
]

const stats = [
  { label: "Salons", value: "500+" },
  { label: "Happy Customers", value: "50K+" },
  { label: "Bookings", value: "200K+" },
  { label: "Cities", value: "10+" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/20 to-background py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About ZenBook</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing the way people book beauty and wellness services. No more phone
              calls, no more waiting. Just instant, transparent, and convenient booking.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At ZenBook, we believe that booking beauty and wellness services should be as
                  simple as ordering food online. We're on a mission to make self-care accessible,
                  convenient, and transparent for everyone.
                </p>
                <p className="text-muted-foreground">
                  Whether you're a busy professional looking for a quick haircut or someone planning
                  a relaxing spa day, ZenBook connects you with the best salons and stylists in your
                  area.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <p className="font-medium text-foreground">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Team</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              We're a passionate team of developers, designers, and beauty enthusiasts working
              together to make booking services easier for everyone.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

