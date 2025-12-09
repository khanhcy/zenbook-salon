import { Scissors, Droplet, Sparkles, Leaf, BarChart3 } from "lucide-react"

const services = [
  { icon: Scissors, label: "Cắt tóc", color: "bg-primary/10 text-primary" },
  { icon: Droplet, label: "Spa & Massage", color: "bg-secondary/20 text-primary" },
  { icon: Sparkles, label: "Làm móng", color: "bg-primary/10 text-primary" },
  { icon: Leaf, label: "Chăm sóc da", color: "bg-secondary/20 text-primary" },
  { icon: BarChart3, label: "Barber", color: "bg-primary/10 text-primary" },
]

export default function ServiceCategories() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Dịch vụ của chúng tôi</h3>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.label}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border hover:shadow-md hover:border-primary/30 transition cursor-pointer"
              >
                <div className={`p-4 rounded-full ${service.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{service.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
