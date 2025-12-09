"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, DollarSign, Users, Star, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockBookings, getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { format } from "date-fns"

export default function SalonDashboardPage() {
  // Mock salon data - in real app, this would come from auth/session
  const salonId = 1
  const salon = getSalonById(salonId)

  // Calculate stats from bookings
  const todayBookings = mockBookings.filter((b) => {
    const bookingDate = new Date(b.date)
    const today = new Date()
    return bookingDate.toDateString() === today.toDateString()
  })

  const upcomingBookings = mockBookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  )

  const totalRevenue = mockBookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.price, 0)

  const recentBookings = mockBookings.slice(0, 5)

  const stats = [
    {
      title: "Today's Bookings",
      value: todayBookings.length.toString(),
      change: "+2 from yesterday",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Total Revenue",
      value: `${(totalRevenue / 1000000).toFixed(1)}M`,
      change: "+12% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Upcoming Appointments",
      value: upcomingBookings.length.toString(),
      change: "Next: Tomorrow",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
    {
      title: "Average Rating",
      value: salon?.rating.toFixed(1) || "4.8",
      change: `${salon?.reviews || 342} reviews`,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bảng điều khiển Salon</h1>
            <p className="text-muted-foreground">Chào mừng trở lại! Đây là những gì đang diễn ra tại salon của bạn.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Lịch hẹn gần đây</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/salon/bookings">Xem tất cả</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => {
                        const statusConfig = {
                          pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
                          confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800" },
                          completed: { label: "Completed", color: "bg-green-100 text-green-800" },
                          cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
                        }
                        const status = statusConfig[booking.status]

                        return (
                          <div
                            key={booking.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <p className="font-semibold text-foreground">{booking.serviceName}</p>
                                <Badge className={status.color}>{status.label}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {booking.stylistName} • {format(new Date(booking.date), "MMM dd")} at {booking.time}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">
                                {booking.price.toLocaleString("vi-VN")} VND
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No bookings yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Calendar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/salon/bookings">
                      <Calendar className="w-4 h-4 mr-2" />
                      Manage Bookings
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/salon/services">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Manage Services
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/salon/stylists">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Stylists
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/dashboard/salon/settings">
                      <XCircle className="w-4 h-4 mr-2" />
                      Salon Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Lịch trình hôm nay</CardTitle>
                </CardHeader>
                <CardContent>
                  {todayBookings.length > 0 ? (
                    <div className="space-y-3">
                      {todayBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{booking.time}</p>
                            <p className="text-xs text-muted-foreground">{booking.serviceName}</p>
                          </div>
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Không có lịch hẹn hôm nay
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

