"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, MapPin, User, Phone, Mail, X, RefreshCw, QrCode, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { mockBookings, getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { format } from "date-fns"

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  confirmed: { label: "Confirmed", variant: "default" as const, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  completed: { label: "Completed", variant: "outline" as const, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  cancelled: { label: "Cancelled", variant: "destructive" as const, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const bookingId = parseInt(params.id as string)
  const booking = mockBookings.find((b) => b.id === bookingId)

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy lịch hẹn</h1>
            <p className="text-muted-foreground mb-4">Lịch hẹn bạn đang tìm không tồn tại.</p>
            <Button onClick={() => router.push("/bookings")}>Quay lại Lịch hẹn</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const salon = getSalonById(booking.salonId)
  const status = statusConfig[booking.status]

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      alert("Booking cancelled successfully!")
      router.push("/bookings")
    }
  }

  const handleReschedule = () => {
    router.push(`/bookings/new?salonId=${booking.salonId}`)
  }

  // Mock QR Code - In real app, this would be generated from booking ID
  const qrCodeData = `BOOKING-${booking.id}-${booking.salonId}`

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <Link href="/bookings" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
              ← Quay lại Lịch hẹn
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Chi tiết đặt lịch</h1>
                <p className="text-muted-foreground">Mã đặt lịch: #{booking.id.toString().padStart(6, "0")}</p>
              </div>
              <Badge className={status.color}>{status.label}</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Salon Info Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Thông tin Salon</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{salon?.name || booking.salonName}</h3>
                    <p className="text-sm text-muted-foreground">{salon?.description || "Premium salon and spa"}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Address</p>
                        <p className="text-sm text-muted-foreground">{salon?.address || "Address not available"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Phone</p>
                        <p className="text-sm text-muted-foreground">{salon?.phone || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Email</p>
                        <p className="text-sm text-muted-foreground">{salon?.email || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Booking Details Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Chi tiết đặt lịch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.date), "EEEE, MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Time</p>
                      <p className="text-sm text-muted-foreground">{booking.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Service</p>
                      <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Stylist</p>
                      <p className="text-sm text-muted-foreground">{booking.stylistName}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Info Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Thông tin thanh toán</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Service Price</p>
                    <p className="text-sm font-medium text-foreground">
                      {booking.price.toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <p className="text-base font-semibold text-foreground">Total</p>
                    <p className="text-xl font-bold text-primary">
                      {booking.price.toLocaleString("vi-VN")} VND
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Payment Status: <span className="text-foreground font-medium">Paid</span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              {(booking.status === "pending" || booking.status === "confirmed") && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Thao tác</h2>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleReschedule} variant="outline" className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      Đổi lịch
                    </Button>
                    <Button onClick={handleCancel} variant="destructive" className="gap-2">
                      <X className="w-4 h-4" />
                      Hủy đặt lịch
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="space-y-6">
                {/* QR Code Card */}
                <Card className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Mã QR Check-in</h3>
                  <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
                    {/* Mock QR Code - In real app, use a QR code library */}
                    <div className="w-48 h-48 bg-muted border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground font-mono">{qrCodeData}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Show this QR code at the salon for check-in
                  </p>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download QR Code
                  </Button>
                </Card>

                {/* Quick Info Card */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin nhanh</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Booking Date</p>
                      <p className="font-medium text-foreground">
                        {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Status</p>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Total Amount</p>
                      <p className="text-lg font-bold text-primary">
                        {booking.price.toLocaleString("vi-VN")} VND
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Help Card */}
                <Card className="p-6 bg-muted/50">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Cần hỗ trợ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions or need to make changes to your booking, please contact the salon
                    directly or our support team.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={`/salons/${booking.salonId}`}>View Salon</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Liên hệ hỗ trợ
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

