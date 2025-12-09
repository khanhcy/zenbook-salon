"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Scissors } from "lucide-react"

export default function HeroSection() {
  const router = useRouter()
  const [searchState, setSearchState] = useState({
    service: "",
    location: "",
    date: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchState.service) params.set("service", searchState.service)
    if (searchState.location) params.set("location", searchState.location)
    if (searchState.date) params.set("date", searchState.date)
    
    router.push(`/search?${params.toString()}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Đặt lịch thư giãn trong vài giây.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
            Không cần gọi điện. Giá cả minh bạch. Thợ đã được xác minh.
          </p>
        </div>

        {/* Search Widget */}
        <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Scissors className="w-4 h-4 text-primary" />
                Loại dịch vụ
              </label>
              <select
                value={searchState.service}
                onChange={(e) => setSearchState({ ...searchState, service: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                <option value="">Chọn dịch vụ</option>
                <option value="haircut">Cắt tóc</option>
                <option value="massage">Spa & Massage</option>
                <option value="nails">Làm móng</option>
                <option value="skincare">Chăm sóc da</option>
                <option value="barber">Barber</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Địa điểm
              </label>
              <input
                type="text"
                placeholder="Nhập địa điểm"
                value={searchState.location}
                onChange={(e) => setSearchState({ ...searchState, location: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Date/Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Ngày
              </label>
              <input
                type="date"
                value={searchState.date}
                onChange={(e) => setSearchState({ ...searchState, date: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-8 rounded-lg transition"
          >
            Tìm kiếm ngay
          </Button>
        </div>
      </div>
    </section>
  )
}
