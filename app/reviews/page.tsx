"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ReviewsPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const salonId = searchParams.get("salonId")

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }
    alert("Review submitted successfully! Thank you for your feedback.")
    // In real app, this would submit the review
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Share your experience to help others make better decisions
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Rating *</Label>
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
                        {rating} {rating === 1 ? "star" : "stars"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review *</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={6}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 10 characters. Be honest and helpful!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit" className="gap-2">
                    <Send className="w-4 h-4" />
                    Submit Review
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/bookings">Cancel</Link>
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

