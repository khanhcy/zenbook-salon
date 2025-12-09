"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, DollarSign, Calendar, Users, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { mockBookings, getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"

const SALON_ID = 1

// Mock analytics data
const revenueData = [
  { month: "Jan", revenue: 15000000 },
  { month: "Feb", revenue: 18000000 },
  { month: "Mar", revenue: 22000000 },
  { month: "Apr", revenue: 19000000 },
  { month: "May", revenue: 25000000 },
  { month: "Jun", revenue: 28000000 },
]

const bookingTrends = [
  { week: "Week 1", bookings: 45 },
  { week: "Week 2", bookings: 52 },
  { week: "Week 3", bookings: 48 },
  { week: "Week 4", bookings: 61 },
]

const popularServices = [
  { name: "Men's Cut", bookings: 120, revenue: 24000000 },
  { name: "Women's Haircut", bookings: 95, revenue: 28500000 },
  { name: "Full Body Massage", bookings: 78, revenue: 39000000 },
  { name: "Facial Treatment", bookings: 65, revenue: 22750000 },
  { name: "Hair Coloring", bookings: 42, revenue: 33600000 },
]

export default function SalonAnalyticsPage() {
  const salon = getSalonById(SALON_ID)
  const [timeRange, setTimeRange] = useState("month")

  const totalRevenue = mockBookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.price, 0)

  const totalBookings = mockBookings.length
  const completedBookings = mockBookings.filter((b) => b.status === "completed").length
  const averageRating = salon?.rating || 4.8

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Phân tích & Báo cáo</h1>
                <p className="text-muted-foreground">Theo dõi hiệu suất và thông tin chi tiết của salon</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/salon">Quay lại Bảng điều khiển</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">
                      {(totalRevenue / 1000000).toFixed(1)}M VND
                    </p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{totalBookings}</p>
                    <p className="text-xs text-blue-600 mt-1">+8% from last month</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{completedBookings}</p>
                    <p className="text-xs text-purple-600 mt-1">Completion rate: 85%</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
                    <p className="text-2xl font-bold text-foreground">{averageRating}</p>
                    <p className="text-xs text-yellow-600 mt-1">Based on {salon?.reviews || 342} reviews</p>
                  </div>
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Xu hướng doanh thu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => `${(value / 1000000).toFixed(1)}M VND`}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Booking Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Popular Services */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-right p-3 text-sm font-medium text-muted-foreground">Bookings</th>
                      <th className="text-right p-3 text-sm font-medium text-muted-foreground">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularServices.map((service, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium text-foreground">{service.name}</td>
                        <td className="p-3 text-right text-foreground">{service.bookings}</td>
                        <td className="p-3 text-right font-semibold text-foreground">
                          {(service.revenue / 1000000).toFixed(1)}M VND
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

