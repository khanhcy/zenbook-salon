"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Booking, Review, Salon } from "@/lib/mock-data"
import { mockBookings, mockSalons } from "@/lib/mock-data"
import { calculateTier, POINTS } from "@/lib/utils/loyalty"
import { toast } from "sonner"

// Types
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  dateOfBirth?: string
  avatar?: string
  memberSince: string
  loyaltyPoints?: number
  loyaltyTier?: "bronze" | "silver" | "gold" | "platinum"
}

interface AppContextType {
  // User
  user: User | null
  setUser: (user: User | null) => void
  login: (email: string, password: string) => boolean
  logout: () => void
  register: (userData: Partial<User> & { email: string; password: string }) => boolean

  // Bookings
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking
  updateBooking: (id: number, updates: Partial<Booking>) => void
  cancelBooking: (id: number) => void
  getBookingById: (id: number) => Booking | undefined

  // Favorites
  favoriteSalons: number[]
  toggleFavorite: (salonId: number) => void
  isFavorite: (salonId: number) => boolean

  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "date">) => Review
  getReviewsBySalonId: (salonId: number) => Review[]

  // Loyalty
  addLoyaltyPoints: (points: number) => void

  // Loading
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Storage keys
const STORAGE_KEYS = {
  USER: "zenbook_user",
  BOOKINGS: "zenbook_bookings",
  FAVORITES: "zenbook_favorites",
  REVIEWS: "zenbook_reviews",
}

// Helper functions for localStorage
const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },
  remove: (key: string) => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage or defaults
  const [user, setUserState] = useState<User | null>(() =>
    storage.get(STORAGE_KEYS.USER, null)
  )

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = storage.get<Booking[]>(STORAGE_KEYS.BOOKINGS, [])
    // If no saved bookings, use mock data
    return saved.length > 0 ? saved : mockBookings
  })

  const [favoriteSalons, setFavoriteSalons] = useState<number[]>(() =>
    storage.get(STORAGE_KEYS.FAVORITES, [])
  )

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = storage.get<Review[]>(STORAGE_KEYS.REVIEWS, [])
    return saved
  })

  const [isLoading, setIsLoading] = useState(false)

  // Sync to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      storage.set(STORAGE_KEYS.USER, user)
    } else {
      storage.remove(STORAGE_KEYS.USER)
    }
  }, [user])

  useEffect(() => {
    storage.set(STORAGE_KEYS.BOOKINGS, bookings)
  }, [bookings])

  useEffect(() => {
    storage.set(STORAGE_KEYS.FAVORITES, favoriteSalons)
  }, [favoriteSalons])

  useEffect(() => {
    storage.set(STORAGE_KEYS.REVIEWS, reviews)
  }, [reviews])

  // User functions
  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser)
  }, [])

  const login = useCallback((email: string, password: string): boolean => {
    // Mock authentication - accept any email/password for demo
    const existingUser = storage.get<User | null>(STORAGE_KEYS.USER, null)
    
    if (existingUser) {
      setUserState(existingUser)
      return true
    }

    // Create new user if doesn't exist
    const newUser: User = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      memberSince: new Date().toISOString(),
      loyaltyPoints: 0,
      loyaltyTier: "bronze",
    }
    setUserState(newUser)
    return true
  }, [])

  const register = useCallback(
    (userData: Partial<User> & { email: string; password: string }): boolean => {
      const newUser: User = {
        id: Date.now(),
        name: userData.name || userData.email.split("@")[0],
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dateOfBirth: userData.dateOfBirth,
        memberSince: new Date().toISOString(),
        loyaltyPoints: 0,
        loyaltyTier: "bronze",
      }
      setUserState(newUser)
      return true
    },
    []
  )

  const logout = useCallback(() => {
    setUserState(null)
  }, [])

  // Booking functions
  const addBooking = useCallback(
    (bookingData: Omit<Booking, "id" | "createdAt">): Booking => {
      const newBooking: Booking = {
        ...bookingData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      setBookings((prev) => [...prev, newBooking])
      return newBooking
    },
    []
  )

  // Function to add loyalty points
  const addLoyaltyPoints = useCallback(
    (points: number) => {
      if (!user) return

      const newPoints = (user.loyaltyPoints || 0) + points
      const newTier = calculateTier(newPoints)
      const oldTier = user.loyaltyTier || "bronze"

      setUserState({
        ...user,
        loyaltyPoints: newPoints,
        loyaltyTier: newTier,
      })

      // Show tier upgrade notification
      if (newTier !== oldTier) {
        toast.success(`Chúc mừng! Bạn đã lên hạng ${newTier}!`, {
          description: `Bạn hiện có ${newPoints} điểm và đang ở hạng ${newTier}`,
          duration: 5000,
        })
      }
    },
    [user]
  )

  const updateBooking = useCallback((id: number, updates: Partial<Booking>) => {
    setBookings((prev) => {
      const updatedBookings = prev.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking))
      
      // Auto-add points when booking is completed
      if (updates.status === "completed" && user) {
        const booking = prev.find((b) => b.id === id)
        if (booking && booking.status !== "completed") {
          const oldPoints = user.loyaltyPoints || 0
          addLoyaltyPoints(POINTS.BOOKING_COMPLETED)
          // Show points notification (tier upgrade is handled in addLoyaltyPoints)
          const newPoints = oldPoints + POINTS.BOOKING_COMPLETED
          const newTier = calculateTier(newPoints)
          const oldTier = user.loyaltyTier || "bronze"
          if (newTier === oldTier) {
            toast.success(`Bạn đã nhận được ${POINTS.BOOKING_COMPLETED} điểm!`, {
              description: `Tổng điểm: ${newPoints} điểm`,
            })
          }
        }
      }
      
      return updatedBookings
    })
  }, [user, addLoyaltyPoints])

  const cancelBooking = useCallback((id: number) => {
    updateBooking(id, { status: "cancelled" })
  }, [updateBooking])

  const getBookingById = useCallback(
    (id: number) => {
      return bookings.find((b) => b.id === id)
    },
    [bookings]
  )

  // Favorite functions
  const toggleFavorite = useCallback((salonId: number) => {
    setFavoriteSalons((prev) => {
      if (prev.includes(salonId)) {
        return prev.filter((id) => id !== salonId)
      } else {
        return [...prev, salonId]
      }
    })
  }, [])

  const isFavorite = useCallback(
    (salonId: number) => {
      return favoriteSalons.includes(salonId)
    },
    [favoriteSalons]
  )

  // Review functions
  const addReview = useCallback(
    (reviewData: Omit<Review, "id" | "date">): Review => {
      const newReview: Review = {
        ...reviewData,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      }
      setReviews((prev) => [...prev, newReview])
      
      // Auto-add points when review is submitted
      if (user) {
        const oldPoints = user.loyaltyPoints || 0
        addLoyaltyPoints(POINTS.REVIEW_SUBMITTED)
        // Show points notification (tier upgrade is handled in addLoyaltyPoints)
        const newPoints = oldPoints + POINTS.REVIEW_SUBMITTED
        const newTier = calculateTier(newPoints)
        const oldTier = user.loyaltyTier || "bronze"
        if (newTier === oldTier) {
          toast.success(`Bạn đã nhận được ${POINTS.REVIEW_SUBMITTED} điểm!`, {
            description: `Tổng điểm: ${newPoints} điểm`,
          })
        }
      }
      
      return newReview
    },
    [user, addLoyaltyPoints]
  )

  const getReviewsBySalonId = useCallback(
    (salonId: number) => {
      return reviews.filter((review) => review.salonId === salonId)
    },
    [reviews]
  )

  const value: AppContextType = {
    user,
    setUser,
    login,
    logout,
    register,
    bookings,
    addBooking,
    updateBooking,
    cancelBooking,
    getBookingById,
    favoriteSalons,
    toggleFavorite,
    isFavorite,
    reviews,
    addReview,
    getReviewsBySalonId,
    addLoyaltyPoints,
    isLoading,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

