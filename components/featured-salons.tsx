"use client"

import { useState } from "react"
import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const salons = [
  {
    id: 1,
    name: "Serenity Salon & Spa",
    image: "/luxury-salon-spa.jpg",
    rating: 4.8,
    reviews: 342,
    distance: "0.5 km",
    price: "$$",
    badge: "Đặt lịch ngay",
  },
  {
    id: 2,
    name: "Zen Hair Studio",
    image: "/modern-hair-salon.png",
    rating: 4.9,
    reviews: 528,
    distance: "1.2 km",
    price: "$$$",
    badge: "Đặt lịch ngay",
  },
  {
    id: 3,
    name: "Pure Wellness Center",
    image: "/wellness-spa-center.jpg",
    rating: 4.7,
    reviews: 215,
    distance: "2.1 km",
    price: "$$",
    badge: "Đặt lịch ngay",
  },
  {
    id: 4,
    name: "The Cut & Color Co.",
    image: "/professional-barber-salon.jpg",
    rating: 4.6,
    reviews: 189,
    distance: "1.8 km",
    price: "$",
    badge: "Đặt lịch ngay",
  },
]

export default function FeaturedSalons() {
  const [selectedId, setSelectedId] = useState<number | null>(1)

  return (
    <section className="py-16 md:py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Salon nổi bật</h3>
        <p className="text-muted-foreground mb-8">Các salon và spa được đánh giá cao nhất trong khu vực của bạn</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {salons.map((salon) => (
            <div
              key={salon.id}
              onClick={() => setSelectedId(salon.id)}
              className={`bg-card border-2 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                selectedId === salon.id ? "border-primary shadow-lg" : "border-border hover:border-primary/50"
              }`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img src={salon.image || "/placeholder.svg"} alt={salon.name} className="w-full h-full object-cover" />
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {salon.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-bold text-foreground mb-2 line-clamp-2">{salon.name}</h4>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-semibold text-foreground">{salon.rating}</span>
                  <span className="text-sm text-muted-foreground">({salon.reviews})</span>
                </div>

                {/* Location & Price */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {salon.distance}
                  </div>
                  <span className="text-primary font-semibold">{salon.price}</span>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
