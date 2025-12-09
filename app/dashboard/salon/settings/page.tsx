"use client"

import { useState } from "react"
import Link from "next/link"
import { Save, MapPin, Phone, Mail, Clock, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"

const SALON_ID = 1

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function SalonSettingsPage() {
  const salon = getSalonById(SALON_ID)
  const [salonInfo, setSalonInfo] = useState({
    name: salon?.name || "",
    description: salon?.description || "",
    address: salon?.address || "",
    phone: salon?.phone || "",
    email: salon?.email || "",
  })

  const [businessHours, setBusinessHours] = useState(
    salon?.hours || {
      Monday: "9:00 AM - 8:00 PM",
      Tuesday: "9:00 AM - 8:00 PM",
      Wednesday: "9:00 AM - 8:00 PM",
      Thursday: "9:00 AM - 8:00 PM",
      Friday: "9:00 AM - 9:00 PM",
      Saturday: "8:00 AM - 9:00 PM",
      Sunday: "10:00 AM - 6:00 PM",
    }
  )

  const [galleryImages, setGalleryImages] = useState<string[]>(
    salon?.images || [salon?.image || ""].filter(Boolean)
  )

  const handleSalonInfoChange = (field: string, value: string) => {
    setSalonInfo({ ...salonInfo, [field]: value })
  }

  const handleBusinessHoursChange = (day: string, value: string) => {
    setBusinessHours({ ...businessHours, [day]: value })
  }

  const handleAddGalleryImage = () => {
    const url = prompt("Nhập URL ảnh:")
    if (url) {
      setGalleryImages([...galleryImages, url])
    }
  }

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  const handleSave = () => {
      alert("Đã lưu cài đặt thành công!")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Cài đặt Salon</h1>
                <p className="text-muted-foreground">Quản lý thông tin và tùy chọn của salon</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/salon">Quay lại Bảng điều khiển</Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Thông tin Salon</TabsTrigger>
              <TabsTrigger value="hours">Giờ làm việc</TabsTrigger>
              <TabsTrigger value="gallery">Thư viện ảnh</TabsTrigger>
            </TabsList>

            {/* Salon Info Tab */}
            <TabsContent value="info" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Salon Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Salon Name</Label>
                    <Input
                      id="name"
                      value={salonInfo.name}
                      onChange={(e) => handleSalonInfoChange("name", e.target.value)}
                      placeholder="Enter salon name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={salonInfo.description}
                      onChange={(e) => handleSalonInfoChange("description", e.target.value)}
                      placeholder="Describe your salon..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={salonInfo.address}
                      onChange={(e) => handleSalonInfoChange("address", e.target.value)}
                      placeholder="Enter salon address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={salonInfo.phone}
                        onChange={(e) => handleSalonInfoChange("phone", e.target.value)}
                        placeholder="+84 123 456 789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={salonInfo.email}
                        onChange={(e) => handleSalonInfoChange("email", e.target.value)}
                        placeholder="salon@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Hours Tab */}
            <TabsContent value="hours" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <Label htmlFor={day.toLowerCase()} className="font-medium text-foreground">
                        {day}
                      </Label>
                      <Input
                        id={day.toLowerCase()}
                        value={businessHours[day as keyof typeof businessHours]}
                        onChange={(e) => handleBusinessHoursChange(day, e.target.value)}
                        placeholder="9:00 AM - 8:00 PM"
                        className="w-48"
                      />
                    </div>
                  ))}
                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Hours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                          onClick={() => handleRemoveGalleryImage(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddGalleryImage}
                      className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition flex items-center justify-center bg-muted/50"
                    >
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Add Image</p>
                      </div>
                    </button>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Gallery
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

