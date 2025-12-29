"use client"

import { useAppContext } from "@/lib/context/app-context"
import {
  getTierInfo,
  getNextTierInfo,
  calculateProgressToNextTier,
  TIERS,
  POINTS,
  type LoyaltyTier,
} from "@/lib/utils/loyalty"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Gift, Star, Calendar, MessageSquare, Users } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoyaltyPage() {
  const { user } = useAppContext()

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Vui lòng đăng nhập để xem chương trình khách hàng thân thiết</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const currentTier = user.loyaltyTier || "bronze"
  const currentPoints = user.loyaltyPoints || 0
  const tierInfo = getTierInfo(currentTier)
  const nextTier = getNextTierInfo(currentTier)
  const progress = calculateProgressToNextTier(currentPoints, currentTier)

  const allTiers: LoyaltyTier[] = ["bronze", "silver", "gold", "platinum"]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Chương trình Khách hàng thân thiết</h1>
            <p className="text-muted-foreground">Tích điểm và nhận nhiều ưu đãi đặc biệt</p>
          </div>

          {/* Current Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Trạng thái hiện tại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-6xl">{tierInfo.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{tierInfo.name}</h2>
                    <Badge className={tierInfo.color}>{tierInfo.name}</Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">{currentPoints} điểm</p>
                  {nextTier && (
                    <p className="text-sm text-muted-foreground">
                      Còn {progress.pointsNeeded} điểm để lên hạng {nextTier.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {nextTier && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiến độ đến {nextTier.name}</span>
                    <span className="font-medium">{progress.progress}%</span>
                  </div>
                  <Progress value={progress.progress} className="h-3" />
                </div>
              )}

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Quyền lợi hiện tại:</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {tierInfo.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* How to Earn Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Cách tích điểm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Hoàn thành đặt lịch</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    +{POINTS.BOOKING_COMPLETED} điểm
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Viết đánh giá</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    +{POINTS.REVIEW_SUBMITTED} điểm
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Giới thiệu bạn bè</span>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    +{POINTS.REFERRAL} điểm
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* All Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Tất cả các hạng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allTiers.map((tier) => {
                  const info = TIERS[tier]
                  const isCurrentTier = tier === currentTier
                  const isUnlocked = currentPoints >= info.minPoints

                  return (
                    <div
                      key={tier}
                      className={`p-4 rounded-lg border-2 ${
                        isCurrentTier
                          ? "border-primary bg-primary/5"
                          : isUnlocked
                            ? "border-border bg-muted/50"
                            : "border-border bg-muted/20 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{info.emoji}</span>
                          <span className={`font-semibold ${isCurrentTier ? "text-primary" : "text-foreground"}`}>
                            {info.name}
                          </span>
                          {isCurrentTier && <Badge className={info.color}>Hiện tại</Badge>}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {info.minPoints} - {info.maxPoints === Infinity ? "∞" : info.maxPoints} điểm
                        </span>
                      </div>
                      {info.discount > 0 && (
                        <p className="text-sm font-medium text-primary mb-2">Giảm {info.discount}% cho mọi dịch vụ</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {info.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
