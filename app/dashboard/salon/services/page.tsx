"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Clock, DollarSign, Search } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getSalonById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock salon ID - in real app, this would come from auth/session
const SALON_ID = 1

const serviceCategories = [
  "Haircut",
  "Massage",
  "Nails",
  "Skincare",
  "Barber",
]

export default function SalonServicesPage() {
  const salon = getSalonById(SALON_ID)
  const [services, setServices] = useState(salon?.services || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<typeof services[0] | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  })

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenDialog = (service?: typeof services[0]) => {
    if (service) {
      setEditingService(service)
      setFormData({
        name: service.name,
        price: service.price.toString(),
        duration: service.duration.toString(),
        category: service.category,
        description: service.description || "",
      })
    } else {
      setEditingService(null)
      setFormData({
        name: "",
        price: "",
        duration: "",
        category: "",
        description: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingService(null)
    setFormData({
      name: "",
      price: "",
      duration: "",
      category: "",
      description: "",
    })
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.duration || !formData.category) {
      alert("Please fill in all required fields")
      return
    }

    if (editingService) {
      // Update existing service
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                name: formData.name,
                price: parseInt(formData.price),
                duration: parseInt(formData.duration),
                category: formData.category,
                description: formData.description,
              }
            : s
        )
      )
      alert("Service updated successfully!")
    } else {
      // Add new service
      const newService = {
        id: Math.max(...services.map((s) => s.id), 0) + 1,
        name: formData.name,
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        category: formData.category,
        description: formData.description || undefined,
      }
      setServices([...services, newService])
      alert("Service added successfully!")
    }
    handleCloseDialog()
  }

  const handleDelete = (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== serviceId))
      alert("Service deleted successfully!")
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Quản lý dịch vụ</h1>
                <p className="text-muted-foreground">Quản lý dịch vụ và giá cả của salon</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/salon">Quay lại Bảng điều khiển</Link>
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm dịch vụ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingService ? "Edit Service" : "Add New Service"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingService
                          ? "Update the service information below."
                          : "Fill in the details to add a new service to your salon."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Service Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Men's Haircut"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (VND) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="200000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (minutes) *</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            placeholder="45"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceCategories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Optional service description..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={handleCloseDialog}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>
                        {editingService ? "Cập nhật" : "Thêm"} dịch vụ
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
                      placeholder="Tìm kiếm dịch vụ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle>Services ({filteredServices.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredServices.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên dịch vụ</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Thời lượng</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.name}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-muted rounded-md text-sm">
                              {service.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">
                                {service.price.toLocaleString("vi-VN")} VND
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{service.duration} mins</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground line-clamp-1">
                              {service.description || "—"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenDialog(service)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(service.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Không tìm thấy dịch vụ nào phù hợp." : "Chưa có dịch vụ nào."}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => handleOpenDialog()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm dịch vụ đầu tiên
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
                <p className="text-sm text-muted-foreground mb-1">Total Services</p>
                <p className="text-2xl font-bold text-foreground">{services.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Average Price</p>
                <p className="text-2xl font-bold text-foreground">
                  {services.length > 0
                    ? `${Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString("vi-VN")} VND`
                    : "—"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Categories</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(services.map((s) => s.category)).size}
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

