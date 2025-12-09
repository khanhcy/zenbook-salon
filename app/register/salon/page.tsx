"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, MapPin, Phone, Mail, Clock, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"

const STEPS = [
  { id: 1, title: "Thông tin Salon" },
  { id: 2, title: "Địa điểm" },
  { id: 3, title: "Dịch vụ" },
  { id: 4, title: "Xem lại" },
]

export default function SalonRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    services: [{ name: "", price: "", duration: "" }],
  })

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData({ ...formData, services: newServices })
  }

  const handleAddService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: "", price: "", duration: "" }],
    })
  }

  const handleRemoveService = (index: number) => {
    if (formData.services.length > 1) {
      setFormData({
        ...formData,
        services: formData.services.filter((_, i) => i !== index),
      })
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    alert("Salon registration submitted! (Demo mode)")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep > step.id
                          ? "bg-primary text-primary-foreground"
                          : currentStep === step.id
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.id}
                    </div>
                    <p className="text-xs mt-2 text-center hidden sm:block">{step.title}</p>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-colors ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Đăng ký Salon của bạn</CardTitle>
              <CardDescription>
                Bước {currentStep} / {STEPS.length}: {STEPS[currentStep - 1].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Business Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Tên Salon *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="pl-10"
                        placeholder="Enter your salon name"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your salon..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10"
                          placeholder="+84 123 456 789"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10"
                          placeholder="salon@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-10"
                        placeholder="Street address"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ho Chi Minh City"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Services */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Dịch vụ *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddService}>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm dịch vụ
                    </Button>
                  </div>
                  {formData.services.map((service, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Service {index + 1}</span>
                        {formData.services.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveService(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Service Name</Label>
                          <Input
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                            placeholder="e.g., Men's Cut"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price (VND)</Label>
                          <Input
                            type="number"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                            placeholder="200000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration (mins)</Label>
                          <Input
                            type="number"
                            value={service.duration}
                            onChange={(e) => handleServiceChange(index, "duration", e.target.value)}
                            placeholder="45"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Xem lại thông tin của bạn</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Business Name:</span>{" "}
                        <span className="font-medium">{formData.businessName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>{" "}
                        <span className="font-medium">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        <span className="font-medium">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Address:</span>{" "}
                        <span className="font-medium">
                          {formData.address}, {formData.city}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Services:</span>{" "}
                        <span className="font-medium">{formData.services.length}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Đơn đăng ký của bạn sẽ được xem xét và bạn sẽ được thông báo khi được phê duyệt.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                  Back
                </Button>
                {currentStep < 4 ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit Registration</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

