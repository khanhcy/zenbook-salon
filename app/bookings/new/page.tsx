"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Clock, Check, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { getSalonById, getServiceById, getStylistById } from "@/lib/mock-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { format } from "date-fns"

const STEPS = [
  { id: 1, title: "Chọn dịch vụ" },
  { id: 2, title: "Chọn thợ" },
  { id: 3, title: "Chọn ngày & giờ" },
  { id: 4, title: "Xem lại & Xác nhận" },
]

const TIME_SLOTS = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

export default function NewBookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const salonIdParam = searchParams.get("salonId")
  const salonId = salonIdParam ? parseInt(salonIdParam) : null

  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [selectedStylistId, setSelectedStylistId] = useState<number | null>(null)

  const salon = salonId ? getSalonById(salonId) : null

  useEffect(() => {
    if (!salonId || !salon) {
      router.push("/search")
    }
  }, [salonId, salon, router])

  if (!salon) {
    return null
  }

  const selectedService = selectedServiceId ? getServiceById(salonId, selectedServiceId) : null
  const selectedStylist = selectedStylistId ? getStylistById(salonId, selectedStylistId) : null

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedServiceId !== null
      case 2:
        return selectedStylistId !== null
      case 3:
        return selectedDate !== undefined && selectedTime !== ""
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirm = () => {
    // Mock booking confirmation
    alert(
      `Booking confirmed!\n\nSalon: ${salon.name}\nService: ${selectedService?.name}\nStylist: ${selectedStylist?.name}\nDate: ${format(selectedDate!, "PPP")}\nTime: ${selectedTime}`
    )
    router.push("/bookings")
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1) // Tomorrow

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
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
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 text-center hidden sm:block ${
                        currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
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

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Chọn dịch vụ</h2>
                    <p className="text-muted-foreground mb-6">Chọn dịch vụ bạn muốn đặt lịch</p>
                    <div className="space-y-3">
                      {salon.services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                            selectedServiceId === service.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-foreground">{service.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" /> {service.duration} phút
                              </p>
                            </div>
                            <p className="font-bold text-primary">
                              {service.price.toLocaleString("vi-VN")} VND
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Choose Stylist */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Chọn thợ</h2>
                    <p className="text-muted-foreground mb-6">Chọn thợ bạn muốn</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {salon.stylists.map((stylist) => (
                        <div
                          key={stylist.id}
                          onClick={() => setSelectedStylistId(stylist.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition text-center ${
                            selectedStylistId === stylist.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="mb-3">
                            <img
                              src={stylist.image || "/placeholder.svg"}
                              alt={stylist.name}
                              className="w-20 h-20 rounded-full mx-auto object-cover"
                            />
                          </div>
                          <p className="font-semibold text-foreground text-sm">{stylist.name}</p>
                          <p className="text-xs text-muted-foreground">{stylist.specialty}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Pick Date & Time */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Chọn ngày & giờ</h2>
                    <p className="text-muted-foreground mb-6">Chọn ngày và giờ bạn muốn</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Chọn ngày</h3>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < minDate}
                          className="rounded-md border"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Chọn giờ</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 rounded-lg border-2 transition font-medium text-sm ${
                                selectedTime === time
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Confirm */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Xem lại & Xác nhận</h2>
                    <p className="text-muted-foreground mb-6">Vui lòng xem lại thông tin đặt lịch của bạn</p>
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Salon</p>
                        <p className="font-semibold text-foreground">{salon.name}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Service</p>
                        <p className="font-semibold text-foreground">{selectedService?.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Thời lượng: {selectedService?.duration} phút
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Stylist</p>
                        <p className="font-semibold text-foreground">{selectedStylist?.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedStylist?.specialty}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                        <p className="font-semibold text-foreground">
                          {selectedDate && format(selectedDate, "PPP")} at {selectedTime}
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">Total Price</p>
                          <p className="text-2xl font-bold text-primary">
                            {selectedService?.price.toLocaleString("vi-VN")} VND
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                      Quay lại
                  </Button>
                  {currentStep < 4 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="gap-2"
                    >
                      Tiếp theo
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleConfirm} className="gap-2">
                      <Check className="w-4 h-4" />
                      Xác nhận đặt lịch
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Tóm tắt đặt lịch</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Salon</p>
                    <p className="font-semibold text-foreground">{salon.name}</p>
                  </div>
                  {selectedService && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Dịch vụ
                      </p>
                      <p className="font-semibold text-foreground">{selectedService.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedService.duration} phút
                      </p>
                    </div>
                  )}
                  {selectedStylist && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Thợ
                      </p>
                      <p className="font-semibold text-foreground">{selectedStylist.name}</p>
                    </div>
                  )}
                  {selectedDate && selectedTime && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        Ngày & Giờ
                      </p>
                      <p className="font-semibold text-foreground">
                        {format(selectedDate, "MMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">{selectedTime}</p>
                    </div>
                  )}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">Total Price</p>
                      <p className="text-xl font-bold text-primary">
                        {selectedService
                          ? `${selectedService.price.toLocaleString("vi-VN")} VND`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

