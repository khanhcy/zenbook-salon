"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, User, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock salon ID - in real app, this would come from auth/session
const SALON_ID = 1

const specialties = [
  "Hair Styling",
  "Barber Cuts",
  "Color Specialist",
  "Massage Therapy",
  "Thai Massage",
  "Facial Treatment",
  "Nail Art",
  "Skincare",
]

export default function SalonStylistsPage() {
  const salon = getSalonById(SALON_ID)
  const [stylists, setStylists] = useState(salon?.stylists || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStylist, setEditingStylist] = useState<typeof stylists[0] | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    bio: "",
    image: "",
    rating: "4.5",
  })

  const filteredStylists = stylists.filter(
    (stylist) =>
      stylist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stylist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenDialog = (stylist?: typeof stylists[0]) => {
    if (stylist) {
      setEditingStylist(stylist)
      setFormData({
        name: stylist.name,
        specialty: stylist.specialty,
        bio: stylist.bio || "",
        image: stylist.image,
        rating: stylist.rating.toString(),
      })
    } else {
      setEditingStylist(null)
      setFormData({
        name: "",
        specialty: "",
        bio: "",
        image: "",
        rating: "4.5",
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingStylist(null)
    setFormData({
      name: "",
      specialty: "",
      bio: "",
      image: "",
      rating: "4.5",
    })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.specialty) {
      alert("Please fill in all required fields")
      return
    }

    if (editingStylist) {
      // Update existing stylist
      setStylists(
        stylists.map((s) =>
          s.id === editingStylist.id
            ? {
                ...s,
                name: formData.name,
                specialty: formData.specialty,
                bio: formData.bio || undefined,
                image: formData.image || s.image,
                rating: parseFloat(formData.rating),
              }
            : s
        )
      )
      alert("Stylist updated successfully!")
    } else {
      // Add new stylist
      const newStylist = {
        id: Math.max(...stylists.map((s) => s.id), 0) + 1,
        name: formData.name,
        specialty: formData.specialty,
        bio: formData.bio || undefined,
        image: formData.image || "/placeholder-user.jpg",
        rating: parseFloat(formData.rating),
      }
      setStylists([...stylists, newStylist])
      alert("Stylist added successfully!")
    }
    handleCloseDialog()
  }

  const handleDelete = (stylistId: number) => {
    if (confirm("Are you sure you want to delete this stylist?")) {
      setStylists(stylists.filter((s) => s.id !== stylistId))
      alert("Stylist deleted successfully!")
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Quản lý thợ</h1>
                <p className="text-muted-foreground">Quản lý thợ và thành viên trong đội của salon</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/salon">Quay lại Bảng điều khiển</Link>
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm thợ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingStylist ? "Edit Stylist" : "Add New Stylist"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingStylist
                          ? "Update the stylist information below."
                          : "Fill in the details to add a new stylist to your team."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage
                            src={formData.image || "/placeholder-user.jpg"}
                            alt={formData.name || "Stylist"}
                          />
                          <AvatarFallback>
                            {formData.name.charAt(0).toUpperCase() || "S"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/path/to/image.jpg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Sarah Johnson"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty *</Label>
                        <select
                          id="specialty"
                          value={formData.specialty}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select specialty</option>
                          {specialties.map((spec) => (
                            <option key={spec} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating</Label>
                        <Input
                          id="rating"
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          placeholder="4.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Brief description about the stylist..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleCloseDialog}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>
                        {editingStylist ? "Cập nhật" : "Thêm"} thợ
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                      placeholder="Tìm kiếm thợ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stylists Grid/Table */}
          <Card>
            <CardHeader>
              <CardTitle>Stylists ({filteredStylists.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStylists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStylists.map((stylist) => (
                    <div
                      key={stylist.id}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={stylist.image || "/placeholder-user.jpg"} alt={stylist.name} />
                            <AvatarFallback>{stylist.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{stylist.name}</h3>
                            <p className="text-sm text-muted-foreground">{stylist.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{stylist.rating}</span>
                        </div>
                      </div>
                      {stylist.bio && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{stylist.bio}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleOpenDialog(stylist)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(stylist.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Không tìm thấy thợ nào phù hợp." : "Chưa có thợ nào."}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => handleOpenDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm thợ đầu tiên
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Stylists</p>
                <p className="text-2xl font-bold text-foreground">{stylists.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
                <p className="text-2xl font-bold text-foreground">
                  {stylists.length > 0
                    ? (
                        stylists.reduce((sum, s) => sum + s.rating, 0) / stylists.length
                      ).toFixed(1)
                    : "—"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Specialties</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(stylists.map((s) => s.specialty)).size}
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

