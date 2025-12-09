"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Heart, Bell, Settings, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockBookings, mockSalons } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { format } from "date-fns"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    address: "123 Main Street, District 1, Ho Chi Minh City",
    dateOfBirth: "1990-01-15",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    promotionalEmails: false,
    reviewReminders: true,
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value })
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings({ ...notificationSettings, [field]: value })
  }

  const handleSaveProfile = () => {
    alert("Profile updated successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification settings updated successfully!")
  }

  const recentBookings = mockBookings.slice(0, 3)
  const favoriteSalons = mockSalons.slice(0, 2)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hồ sơ của tôi</h1>
            <p className="text-muted-foreground">Quản lý cài đặt và tùy chọn tài khoản của bạn</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
              <TabsTrigger value="bookings">Lịch hẹn</TabsTrigger>
              <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
              <TabsTrigger value="notifications">Thông báo</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-6">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="/placeholder-user.jpg" alt={profileData.name} />
                          <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" size="sm">
                            Change Photo
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            JPG, PNG or GIF. Max size 2MB
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => handleProfileChange("name", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => handleProfileChange("email", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => handleProfileChange("phone", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="dob"
                              type="date"
                              value={profileData.dateOfBirth}
                              onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="address"
                              value={profileData.address}
                              onChange={(e) => handleProfileChange("address", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-border">
                        <Button onClick={handleSaveProfile} className="gap-2">
                          <Save className="w-4 h-4" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Bookings</p>
                        <p className="text-2xl font-bold text-foreground">{mockBookings.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Favorite Salons</p>
                        <p className="text-2xl font-bold text-foreground">{favoriteSalons.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="text-sm font-medium text-foreground">January 2024</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Settings className="w-4 h-4" />
                        Account Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        Change Password
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => {
                        const salon = mockSalons.find((s) => s.id === booking.salonId)
                        return (
                          <div
                            key={booking.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
                          >
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{salon?.name || booking.salonName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {booking.serviceName} • {format(new Date(booking.date), "MMM dd, yyyy")} at {booking.time}
                              </p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/bookings/${booking.id}`}>View</a>
                            </Button>
                          </div>
                        )
                      })}
                      <div className="pt-4 border-t border-border">
                        <Button variant="outline" className="w-full" asChild>
                          <a href="/bookings">View All Bookings</a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No bookings yet</p>
                      <Button asChild>
                        <a href="/search">Browse Salons</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Favorite Salons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favoriteSalons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favoriteSalons.map((salon) => (
                        <div
                          key={salon.id}
                          className="border border-border rounded-lg overflow-hidden hover:shadow-md transition"
                        >
                          <div className="relative h-32 overflow-hidden bg-muted">
                            <img
                              src={salon.image || "/placeholder.svg"}
                              alt={salon.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground mb-1">{salon.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{salon.address}</p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">{salon.rating}</span>
                                <span className="text-xs text-muted-foreground">({salon.reviews})</span>
                              </div>
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/salons/${salon.id}`}>View</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Chưa có salon yêu thích nào</p>
                      <Button asChild>
                        <a href="/search">Khám phá Salon</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("emailNotifications", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("smsNotifications", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="booking-reminders">Booking Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded before your appointments
                        </p>
                      </div>
                      <Switch
                        id="booking-reminders"
                        checked={notificationSettings.bookingReminders}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("bookingReminders", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="promotional-emails">Promotional Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive special offers and promotions
                        </p>
                      </div>
                      <Switch
                        id="promotional-emails"
                        checked={notificationSettings.promotionalEmails}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("promotionalEmails", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="review-reminders">Review Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Remind me to leave a review after service
                        </p>
                      </div>
                      <Switch
                        id="review-reminders"
                        checked={notificationSettings.reviewReminders}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("reviewReminders", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button onClick={handleSaveNotifications} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

