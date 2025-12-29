"use client"

import { useState, Suspense, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { useAppContext } from "@/lib/context/app-context"
import { getSalonById, getServiceById } from "@/lib/mock-data"
import { toast } from "sonner"
import Header from "@/components/header"
import Footer from "@/components/footer"

function ReviewsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, addReview, getBookingById } = useAppContext()
  const bookingIdParam = searchParams.get("bookingId")
  const salonIdParam = searchParams.get("salonId")
  const bookingId = bookingIdParam ? parseInt(bookingIdParam) : null
  const salonId = salonIdParam ? parseInt(salonIdParam) : null

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const booking = bookingId ? getBookingById(bookingId) : null
  const salon = salonId ? getSalonById(salonId) : booking ? getSalonById(booking.salonId) : null
  const service = booking && salon ? getServiceById(booking.salonId, booking.serviceId) : null

  useEffect(() => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để viết đánh giá")
      router.push("/login")
    }
  }, [user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("Vui lòng đăng nhập để viết đánh giá")
      return
    }

    if (rating === 0) {
      toast.error("Vui lòng chọn đánh giá")
      return
    }

    if (comment.trim().length < 10) {
      toast.error("Nhận xét phải có ít nhất 10 ký tự")
      return
    }

    if (!salon) {
      toast.error("Không tìm thấy thông tin salon")
      return
    }

    try {
      const newReview = addReview({
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        rating,
        comment: comment.trim(),
        serviceName: service?.name || booking?.serviceName,
        salonId: salon.id,
        bookingId: bookingId || undefined,
      })

      toast.success("Đánh giá đã được gửi thành công!", {
        description: "Cảm ơn bạn đã chia sẻ trải nghiệm của mình.",
      })

      // Redirect to salon detail or bookings page
      if (salonId || salon) {
        router.push(`/salons/${salonId || salon.id}`)
      } else if (bookingId) {
        router.push(`/bookings/${bookingId}`)
      } else {
        router.push("/bookings")
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi đánh giá", {
        description: "Vui lòng thử lại sau.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Viết đánh giá</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Chia sẻ trải nghiệm của bạn để giúp người khác đưa ra quyết định tốt hơn
              </p>
              {salon && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-foreground">{salon.name}</p>
                  {service && (
                    <p className="text-xs text-muted-foreground mt-1">Dịch vụ: {service.name}</p>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Đánh giá *</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoveredRating || rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {rating} {rating === 1 ? "sao" : "sao"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Nhận xét của bạn *</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                    rows={6}
                    required
                    minLength={10}
                  />
                  <p className="text-xs text-muted-foreground">
                    Tối thiểu 10 ký tự. Hãy trung thực và hữu ích!
                    {comment.length > 0 && (
                      <span className={comment.length < 10 ? "text-destructive" : "text-primary"}>
                        {" "}
                        ({comment.length}/10)
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" className="gap-2" disabled={rating === 0 || comment.trim().length < 10}>
                    <Send className="w-4 h-4" />
                    Gửi đánh giá
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={salonId ? `/salons/${salonId}` : "/bookings"}>Hủy</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default function ReviewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ReviewsContent />
    </Suspense>
  )
}

