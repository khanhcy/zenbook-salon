"use client"

import { useParams, useRouter } from "next/navigation"
import { Star, MapPin, Clock, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function SalonDetailPage() {
  const params = useParams()
  const router = useRouter()
  const salonId = parseInt(params.id as string)
  const salon = getSalonById(salonId)

  if (!salon) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy Salon</h1>
            <p className="text-muted-foreground mb-4">Salon bạn đang tìm không tồn tại.</p>
            <Button onClick={() => router.push("/search")}>Quay lại Tìm kiếm</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = salon.images && salon.images.length > 0 ? salon.images : [salon.image]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Image Carousel */}
        <section className="relative">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-muted">
            {images.length > 1 ? (
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="h-full w-full">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${salon.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            ) : (
              <img
                src={salon.image || "/placeholder.svg"}
                alt={salon.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </section>

        {/* Salon Info Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {salon.name}
                  </h1>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{salon.rating}</span>
                      <span className="text-muted-foreground">({salon.reviews} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{salon.distance}</span>
                    </div>
                    <span className="text-primary font-semibold">{salon.price}</span>
                  </div>
                </div>
                {salon.badge && (
                  <div className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    {salon.badge}
                  </div>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{salon.description}</p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Địa chỉ</p>
                    <p className="text-sm text-muted-foreground">{salon.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Số điện thoại</p>
                    <p className="text-sm text-muted-foreground">{salon.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Email</p>
                    <p className="text-sm text-muted-foreground">{salon.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Giờ làm việc</p>
                    <div className="text-sm text-muted-foreground">
                      {Object.entries(salon.hours).map(([day, hours]) => (
                        <p key={day}>
                          {day}: {hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="md:sticky md:top-24 h-fit">
              <Button
                onClick={() => router.push(`/bookings/new?salonId=${salon.id}`)}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 text-lg"
                size="lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Đặt lịch ngay
              </Button>
            </div>
          </div>

          {/* Tabs for Services, Stylists, Reviews */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Dịch vụ</TabsTrigger>
              <TabsTrigger value="stylists">Thợ</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {salon.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{service.name}</h3>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        )}
                      </div>
                      <span className="text-lg font-bold text-primary">
                        {service.price.toLocaleString("vi-VN")} VND
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} phút</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Stylists Tab */}
            <TabsContent value="stylists" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {salon.stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition"
                  >
                    <div className="mb-3">
                      <img
                        src={stylist.image || "/placeholder.svg"}
                        alt={stylist.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover mb-3"
                      />
                      <h3 className="font-semibold text-foreground">{stylist.name}</h3>
                      <p className="text-sm text-muted-foreground">{stylist.specialty}</p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{stylist.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              {salon.reviewsList.length > 0 ? (
                <div className="space-y-4">
                  {salon.reviewsList.map((review) => (
                    <div key={review.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{review.userName}</p>
                          {review.serviceName && (
                            <p className="text-sm text-muted-foreground">{review.serviceName}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  )
}

