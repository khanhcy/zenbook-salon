"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, User, X, RefreshCw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockBookings, getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { format } from "date-fns"

const statusConfig = {
  pending: { label: "Chờ xác nhận", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  confirmed: { label: "Đã xác nhận", variant: "default" as const, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  completed: { label: "Hoàn thành", variant: "outline" as const, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  cancelled: { label: "Đã hủy", variant: "destructive" as const, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

export default function BookingsPage() {
  const [bookings] = useState(mockBookings)

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "pending" || booking.status === "confirmed"
  )
  const pastBookings = bookings.filter((booking) => booking.status === "completed")
  const cancelledBookings = bookings.filter((booking) => booking.status === "cancelled")

  const handleCancel = (bookingId: number) => {
    if (confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?")) {
      alert("Đã hủy lịch hẹn thành công!")
      // In real app, this would update the booking status
    }
  }

  const handleReschedule = (bookingId: number) => {
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
      // Redirect to booking page with pre-filled data
      window.location.href = `/bookings/new?salonId=${booking.salonId}`
    }
  }

  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => {
    const salon = getSalonById(booking.salonId)
    const status = statusConfig[booking.status]

    return (
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{salon?.name || booking.salonName}</h3>
              <Badge className={status.color}>{status.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{salon?.address || "Chưa có địa chỉ"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Ngày</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(booking.date), "PPP")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Giờ</p>
              <p className="text-sm text-muted-foreground">{booking.time}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Dịch vụ</p>
              <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Thợ</p>
              <p className="text-sm text-muted-foreground">{booking.stylistName}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Tổng giá</p>
            <p className="text-lg font-bold text-primary">
              {booking.price.toLocaleString("vi-VN")} VND
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/bookings/${booking.id}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                Xem chi tiết
              </Button>
            </Link>
            {booking.status === "pending" || booking.status === "confirmed" ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReschedule(booking.id)}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Đổi lịch
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancel(booking.id)}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Hủy
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-12">
      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground mb-4">{message}</p>
      <Link href="/search">
        <Button>Browse Salons</Button>
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Lịch hẹn của tôi</h1>
            <p className="text-muted-foreground">Quản lý các cuộc hẹn và đặt lịch của bạn</p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                Sắp tới ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Đã qua ({pastBookings.length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Đã hủy ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Bạn chưa có lịch hẹn sắp tới. Hãy đặt lịch hẹn tiếp theo của bạn!" />
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Không tìm thấy lịch hẹn đã qua." />
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-6">
              {cancelledBookings.length > 0 ? (
                <div className="space-y-4">
                  {cancelledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Không có lịch hẹn đã hủy." />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

