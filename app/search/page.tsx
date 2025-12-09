"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Star, MapPin, Filter, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockSalons } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    service: searchParams.get("service") || "",
    location: searchParams.get("location") || "",
    priceRange: "",
    rating: "",
    sortBy: "distance",
  })

  // Filter salons based on search criteria
  const filteredSalons = useMemo(() => {
    let results = [...mockSalons]

    // Filter by service category
    if (filters.service) {
      results = results.filter((salon) =>
        salon.services.some((service) =>
          service.category.toLowerCase().includes(filters.service.toLowerCase())
        )
      )
    }

    // Filter by location (mock - just check if location is in address)
    if (filters.location) {
      results = results.filter((salon) =>
        salon.address.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Filter by price range
    if (filters.priceRange) {
      const priceMap: Record<string, string[]> = {
        low: ["$"],
        medium: ["$$"],
        high: ["$$$", "$$$$"],
      }
      const allowedPrices = priceMap[filters.priceRange] || []
      if (allowedPrices.length > 0) {
        results = results.filter((salon) => allowedPrices.includes(salon.price))
      }
    }

    // Filter by rating
    if (filters.rating) {
      const minRating = parseFloat(filters.rating)
      results = results.filter((salon) => salon.rating >= minRating)
    }

    // Sort results
    if (filters.sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating)
    } else if (filters.sortBy === "price") {
      const priceOrder = { $: 1, "$$": 2, "$$$": 3, "$$$$": 4 }
      results.sort((a, b) => priceOrder[a.price] - priceOrder[b.price])
    } else {
      // Sort by distance (mock - just keep original order)
      results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }

    return results
  }, [filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    setFilters({
      service: "",
      location: "",
      priceRange: "",
      rating: "",
      sortBy: "distance",
    })
  }

  const activeFiltersCount = Object.values(filters).filter((v) => v && v !== "distance").length

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tìm thấy {filteredSalons.length} salon
            </h1>
            <p className="text-muted-foreground">
              {searchParams.get("location") && `in ${searchParams.get("location")}`}
              {searchParams.get("service") && ` • ${searchParams.get("service")}`}
            </p>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    Bộ lọc
                  </h2>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Xóa tất cả
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Service Type Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Loại dịch vụ
                    </label>
                    <select
                      value={filters.service}
                      onChange={(e) => handleFilterChange("service", e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Tất cả dịch vụ</option>
                      <option value="haircut">Cắt tóc</option>
                      <option value="massage">Spa & Massage</option>
                      <option value="nails">Làm móng</option>
                      <option value="skincare">Chăm sóc da</option>
                      <option value="barber">Barber</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Địa điểm
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập địa điểm"
                      value={filters.location}
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Mức giá
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Tất cả mức giá</option>
                      <option value="low">$ - Tiết kiệm</option>
                      <option value="medium">$$ - Trung bình</option>
                      <option value="high">$$$ - Cao cấp</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Đánh giá tối thiểu
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange("rating", e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Mọi đánh giá</option>
                      <option value="4.5">4.5+ sao</option>
                      <option value="4.0">4.0+ sao</option>
                      <option value="3.5">3.5+ sao</option>
                      <option value="3.0">3.0+ sao</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button & Sort */}
              <div className="lg:hidden mb-4 flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-1"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                </select>
              </div>

              {/* Mobile Filters Panel */}
              {showFilters && (
                <div className="lg:hidden mb-4 bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Bộ lọc</h3>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Loại dịch vụ
                      </label>
                      <select
                        value={filters.service}
                        onChange={(e) => handleFilterChange("service", e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                      >
                      <option value="">Tất cả dịch vụ</option>
                      <option value="haircut">Cắt tóc</option>
                      <option value="massage">Spa & Massage</option>
                      <option value="nails">Làm móng</option>
                      <option value="skincare">Chăm sóc da</option>
                      <option value="barber">Barber</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Địa điểm
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập địa điểm"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Mức giá
                      </label>
                      <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                      >
                      <option value="">Tất cả mức giá</option>
                      <option value="low">$ - Tiết kiệm</option>
                      <option value="medium">$$ - Trung bình</option>
                      <option value="high">$$$ - Cao cấp</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Đánh giá tối thiểu
                      </label>
                      <select
                        value={filters.rating}
                        onChange={(e) => handleFilterChange("rating", e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                      >
                      <option value="">Mọi đánh giá</option>
                      <option value="4.5">4.5+ sao</option>
                      <option value="4.0">4.0+ sao</option>
                      <option value="3.5">3.5+ sao</option>
                      <option value="3.0">3.0+ sao</option>
                      </select>
                    </div>
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Xóa bộ lọc
                    </Button>
                  </div>
                </div>
              )}

              {/* Sort - Desktop */}
              <div className="hidden lg:flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {filteredSalons.length} kết quả
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sắp xếp theo:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="distance">Khoảng cách</option>
                    <option value="rating">Đánh giá</option>
                    <option value="price">Giá</option>
                  </select>
                </div>
              </div>

              {/* Salon Results */}
              {filteredSalons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSalons.map((salon) => (
                    <Link
                      key={salon.id}
                      href={`/salons/${salon.id}`}
                      className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={salon.image || "/placeholder.svg"}
                          alt={salon.name}
                          className="w-full h-full object-cover"
                        />
                        {salon.badge && (
                          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            {salon.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold text-foreground mb-2 line-clamp-1">{salon.name}</h3>

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

                        {/* Address */}
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
                          {salon.address}
                        </p>

                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                          Xem chi tiết
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Không tìm thấy salon nào phù hợp với tiêu chí của bạn.</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

