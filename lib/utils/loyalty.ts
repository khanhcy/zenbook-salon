// Loyalty Program Utilities

export type LoyaltyTier = "bronze" | "silver" | "gold" | "platinum"

export interface TierInfo {
  name: string
  emoji: string
  minPoints: number
  maxPoints: number
  discount: number
  benefits: string[]
  color: string
}

export const TIERS: Record<LoyaltyTier, TierInfo> = {
  bronze: {
    name: "Bronze",
    emoji: "🥉",
    minPoints: 0,
    maxPoints: 99,
    discount: 0,
    benefits: ["Khách hàng mới", "Tích điểm cho mọi giao dịch"],
    color: "text-amber-600",
  },
  silver: {
    name: "Silver",
    emoji: "🥈",
    minPoints: 100,
    maxPoints: 299,
    discount: 5,
    benefits: ["Giảm 5% cho mọi dịch vụ", "Ưu tiên hỗ trợ"],
    color: "text-gray-400",
  },
  gold: {
    name: "Gold",
    emoji: "🥇",
    minPoints: 300,
    maxPoints: 599,
    discount: 10,
    benefits: ["Giảm 10% cho mọi dịch vụ", "Ưu tiên đặt lịch", "Quà tặng đặc biệt"],
    color: "text-yellow-500",
  },
  platinum: {
    name: "Platinum",
    emoji: "💎",
    minPoints: 600,
    maxPoints: Infinity,
    discount: 15,
    benefits: [
      "Giảm 15% cho mọi dịch vụ",
      "Ưu tiên cao nhất",
      "Quà tặng sinh nhật",
      "Dịch vụ chăm sóc đặc biệt",
    ],
    color: "text-purple-500",
  },
}

// Calculate tier based on points
export function calculateTier(points: number = 0): LoyaltyTier {
  if (points >= TIERS.platinum.minPoints) return "platinum"
  if (points >= TIERS.gold.minPoints) return "gold"
  if (points >= TIERS.silver.minPoints) return "silver"
  return "bronze"
}

// Get tier info
export function getTierInfo(tier: LoyaltyTier): TierInfo {
  return TIERS[tier]
}

// Get next tier info
export function getNextTierInfo(currentTier: LoyaltyTier): TierInfo | null {
  const tierOrder: LoyaltyTier[] = ["bronze", "silver", "gold", "platinum"]
  const currentIndex = tierOrder.indexOf(currentTier)
  if (currentIndex === tierOrder.length - 1) return null // Already at highest tier
  return TIERS[tierOrder[currentIndex + 1]]
}

// Calculate progress to next tier
export function calculateProgressToNextTier(
  currentPoints: number,
  currentTier: LoyaltyTier
): { progress: number; pointsNeeded: number; nextTier: TierInfo | null } {
  const nextTier = getNextTierInfo(currentTier)
  if (!nextTier) {
    return { progress: 100, pointsNeeded: 0, nextTier: null }
  }

  const currentTierInfo = TIERS[currentTier]
  const pointsInCurrentTier = currentPoints - currentTierInfo.minPoints
  const pointsNeededForNextTier = nextTier.minPoints - currentPoints
  const totalPointsInCurrentTier = currentTierInfo.maxPoints - currentTierInfo.minPoints + 1

  const progress = Math.min(100, Math.max(0, (pointsInCurrentTier / totalPointsInCurrentTier) * 100))

  return {
    progress: Math.round(progress),
    pointsNeeded: pointsNeededForNextTier,
    nextTier,
  }
}

// Calculate discount amount
export function calculateDiscount(price: number, tier: LoyaltyTier): number {
  const tierInfo = TIERS[tier]
  return Math.round((price * tierInfo.discount) / 100)
}

// Apply tier discount to price (returns final price)
export function applyTierDiscount(price: number, tier: LoyaltyTier): number {
  const discount = calculateDiscount(price, tier)
  return price - discount
}

// Points earned for actions
export const POINTS = {
  BOOKING_COMPLETED: 10,
  REVIEW_SUBMITTED: 5,
  REFERRAL: 20,
} as const
