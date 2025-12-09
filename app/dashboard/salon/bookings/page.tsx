"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, User, Search, Filter, CheckCircle, XCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockBookings, getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { format } from "date-fns"

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

export default function SalonBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  // Filter bookings
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.stylistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.salonName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" &&
        format(new Date(booking.date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) ||
      (dateFilter === "upcoming" && new Date(booking.date) > new Date())

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleConfirm = (bookingId: number) => {
    if (confirm("Confirm this booking?")) {
      alert("Booking confirmed!")
    }
  }

  const handleCancel = (bookingId: number) => {
    if (confirm("Cancel this booking?")) {
      alert("Booking cancelled!")
    }
  }

  const handleComplete = (bookingId: number) => {
    if (confirm("Mark this booking as completed?")) {
      alert("Booking marked as completed!")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Quản lý lịch hẹn</h1>
                <p className="text-muted-foreground">Quản lý tất cả lịch hẹn của salon</p>
              </div>
              <Button asChild>
                  <Link href="/dashboard/salon">Quay lại Bảng điều khiển</Link>
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm lịch hẹn..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="pending">Chờ xác nhận</SelectItem>
                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Calendar className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả ngày</SelectItem>
                      <SelectItem value="today">Hôm nay</SelectItem>
                      <SelectItem value="upcoming">Sắp tới</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Lịch hẹn ({filteredBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã đặt lịch</TableHead>
                        <TableHead>Ngày & Giờ</TableHead>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead>Thợ</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => {
                        const status = statusConfig[booking.status]
                        return (
                          <TableRow key={booking.id}>
                            <TableCell className="font-mono text-sm">
                              #{booking.id.toString().padStart(6, "0")}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">
                                  {format(new Date(booking.date), "MMM dd, yyyy")}
                                </p>
                                <p className="text-sm text-muted-foreground">{booking.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium text-foreground">{booking.serviceName}</p>
                            </TableCell>
                            <TableCell>
                              <p className="text-foreground">{booking.stylistName}</p>
                            </TableCell>
                            <TableCell>
                              <p className="text-foreground">Customer Name</p>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium text-foreground">
                                {booking.price.toLocaleString("vi-VN")} VND
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge className={status.color}>{status.label}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/bookings/${booking.id}`}>
                                    <Eye className="w-4 h-4" />
                                  </Link>
                                </Button>
                                {booking.status === "pending" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleConfirm(booking.id)}
                                    className="gap-1"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Confirm
                                  </Button>
                                )}
                                {booking.status === "confirmed" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleComplete(booking.id)}
                                    className="gap-1"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Complete
                                  </Button>
                                )}
                                {(booking.status === "pending" || booking.status === "confirmed") && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleCancel(booking.id)}
                                    className="gap-1"
                                  >
                                    <XCircle className="w-4 h-4" />
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Không tìm thấy lịch hẹn</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setDateFilter("all")
                  }}>
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-foreground">{mockBookings.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockBookings.filter((b) => b.status === "pending").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Confirmed</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockBookings.filter((b) => b.status === "confirmed").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockBookings.filter((b) => b.status === "completed").length}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

