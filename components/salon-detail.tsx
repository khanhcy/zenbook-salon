"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const stylists = [
  { id: 1, name: "Sarah", specialty: "Hair Styling", image: "/female-stylist.jpg" },
  { id: 2, name: "Marcus", specialty: "Barber Cuts", image: "/male-barber.png" },
  { id: 3, name: "Emma", specialty: "Color Specialist", image: "/female-colorist.jpg" },
]

const services = [
  { id: 1, name: "Men's Cut", price: "200k VND", duration: "45 mins" },
  { id: 2, name: "Full Body Massage", price: "500k VND", duration: "60 mins" },
  { id: 3, name: "Facial Treatment", price: "350k VND", duration: "45 mins" },
  { id: 4, name: "Hair Coloring", price: "800k VND", duration: "90 mins" },
]

const timeSlots = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function SalonDetail() {
  const [selectedService, setSelectedService] = useState(0)
  const [selectedStylist, setSelectedStylist] = useState(0)
  const [selectedTime, setSelectedTime] = useState("")

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Đặt lịch hẹn</h3>
          <p className="text-muted-foreground">Serenity Salon & Spa</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Services */}
          <div className="md:col-span-2 space-y-8">
            {/* Service Selection */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">1. Chọn dịch vụ</h4>
              <div className="space-y-2">
                {services.map((service, idx) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(idx)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedService === idx ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </p>
                      </div>
                      <p className="font-bold text-primary">{service.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylist Selection */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">2. Chọn thợ</h4>
              <div className="grid grid-cols-3 gap-4">
                {stylists.map((stylist, idx) => (
                  <div
                    key={stylist.id}
                    onClick={() => setSelectedStylist(idx)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition text-center ${
                      selectedStylist === idx ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="mb-3">
                      <img
                        src={stylist.image || "/placeholder.svg"}
                        alt={stylist.name}
                        className="w-16 h-16 rounded-full mx-auto object-cover"
                      />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{stylist.name}</p>
                    <p className="text-xs text-muted-foreground">{stylist.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">3. Chọn giờ</h4>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 rounded-lg border-2 transition font-medium text-sm ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="bg-card border border-border rounded-2xl p-6 h-fit">
            <h4 className="text-lg font-semibold text-foreground mb-4">Tóm tắt đặt lịch</h4>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Dịch vụ</p>
                <p className="font-semibold text-foreground">{services[selectedService].name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Thợ</p>
                <p className="font-semibold text-foreground">{stylists[selectedStylist].name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Thời lượng</p>
                <p className="font-semibold text-foreground">{services[selectedService].duration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Giờ</p>
                <p className="font-semibold text-foreground">{selectedTime || "Chưa chọn"}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Tổng giá</p>
              <p className="text-3xl font-bold text-primary">{services[selectedService].price}</p>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-semibold">
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
