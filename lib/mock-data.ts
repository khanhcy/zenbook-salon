// Mock data for ZenBook demo

export interface Salon {
  id: number
  name: string
  image: string
  images?: string[]
  rating: number
  reviews: number
  distance: string
  price: "$" | "$$" | "$$$" | "$$$$"
  badge?: string
  address: string
  phone: string
  email: string
  hours: {
    [key: string]: string
  }
  description: string
  services: Service[]
  stylists: Stylist[]
  reviewsList: Review[]
}

export interface Service {
  id: number
  name: string
  price: number
  duration: number // in minutes
  description?: string
  category: string
}

export interface Stylist {
  id: number
  name: string
  specialty: string
  image: string
  rating: number
  bio?: string
}

export interface Review {
  id: number
  userId: number
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  serviceName?: string
}

export interface Booking {
  id: number
  salonId: number
  salonName: string
  serviceId: number
  serviceName: string
  stylistId: number
  stylistName: string
  date: string
  time: string
  price: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}

export const mockSalons: Salon[] = [
  {
    id: 1,
    name: "Serenity Salon & Spa",
    image: "/luxury-salon-spa.jpg",
    images: ["/luxury-salon-spa.jpg", "/modern-hair-salon.png", "/wellness-spa-center.jpg"],
    rating: 4.8,
    reviews: 342,
    distance: "0.5 km",
    price: "$$",
    badge: "Instant Booking",
    address: "123 Nguyen Hue Street, District 1, Ho Chi Minh City",
    phone: "+84 28 1234 5678",
    email: "info@serenitysalon.com",
    hours: {
      Monday: "9:00 AM - 8:00 PM",
      Tuesday: "9:00 AM - 8:00 PM",
      Wednesday: "9:00 AM - 8:00 PM",
      Thursday: "9:00 AM - 8:00 PM",
      Friday: "9:00 AM - 9:00 PM",
      Saturday: "8:00 AM - 9:00 PM",
      Sunday: "10:00 AM - 6:00 PM",
    },
    description:
      "A luxurious salon and spa offering premium hair care, facial treatments, and relaxation services in the heart of the city.",
    services: [
      { id: 1, name: "Men's Cut", price: 200000, duration: 45, category: "Haircut" },
      { id: 2, name: "Women's Haircut", price: 300000, duration: 60, category: "Haircut" },
      { id: 3, name: "Full Body Massage", price: 500000, duration: 60, category: "Massage" },
      { id: 4, name: "Facial Treatment", price: 350000, duration: 45, category: "Skincare" },
      { id: 5, name: "Hair Coloring", price: 800000, duration: 90, category: "Haircut" },
    ],
    stylists: [
      { id: 1, name: "Sarah", specialty: "Hair Styling", image: "/female-stylist.jpg", rating: 4.9 },
      { id: 2, name: "Marcus", specialty: "Barber Cuts", image: "/male-barber.png", rating: 4.8 },
      { id: 3, name: "Emma", specialty: "Color Specialist", image: "/female-colorist.jpg", rating: 4.7 },
    ],
    reviewsList: [
      {
        id: 1,
        userId: 1,
        userName: "Nguyen Van A",
        rating: 5,
        comment: "Excellent service! Sarah did an amazing job with my hair.",
        date: "2024-01-15",
        serviceName: "Women's Haircut",
      },
      {
        id: 2,
        userId: 2,
        userName: "Tran Thi B",
        rating: 4,
        comment: "Great experience, very professional staff.",
        date: "2024-01-10",
        serviceName: "Facial Treatment",
      },
    ],
  },
  {
    id: 2,
    name: "Zen Hair Studio",
    image: "/modern-hair-salon.png",
    images: ["/modern-hair-salon.png", "/luxury-salon-spa.jpg"],
    rating: 4.9,
    reviews: 528,
    distance: "1.2 km",
    price: "$$$",
    badge: "Instant Booking",
    address: "456 Le Loi Boulevard, District 3, Ho Chi Minh City",
    phone: "+84 28 2345 6789",
    email: "hello@zenhairstudio.com",
    hours: {
      Monday: "10:00 AM - 7:00 PM",
      Tuesday: "10:00 AM - 7:00 PM",
      Wednesday: "10:00 AM - 7:00 PM",
      Thursday: "10:00 AM - 7:00 PM",
      Friday: "10:00 AM - 8:00 PM",
      Saturday: "9:00 AM - 8:00 PM",
      Sunday: "Closed",
    },
    description: "Modern hair studio specializing in trendy cuts, colors, and styling for all hair types.",
    services: [
      { id: 6, name: "Men's Cut", price: 250000, duration: 45, category: "Haircut" },
      { id: 7, name: "Women's Haircut", price: 400000, duration: 60, category: "Haircut" },
      { id: 8, name: "Hair Coloring", price: 1000000, duration: 120, category: "Haircut" },
      { id: 9, name: "Hair Styling", price: 300000, duration: 45, category: "Haircut" },
    ],
    stylists: [
      { id: 4, name: "David", specialty: "Modern Cuts", image: "/male-barber.png", rating: 4.9 },
      { id: 5, name: "Lisa", specialty: "Hair Color", image: "/female-stylist.jpg", rating: 5.0 },
    ],
    reviewsList: [
      {
        id: 3,
        userId: 3,
        userName: "Le Van C",
        rating: 5,
        comment: "Best haircut I've ever had! Highly recommend.",
        date: "2024-01-20",
        serviceName: "Men's Cut",
      },
    ],
  },
  {
    id: 3,
    name: "Pure Wellness Center",
    image: "/wellness-spa-center.jpg",
    images: ["/wellness-spa-center.jpg"],
    rating: 4.7,
    reviews: 215,
    distance: "2.1 km",
    price: "$$",
    badge: "Instant Booking",
    address: "789 Dong Khoi Street, District 1, Ho Chi Minh City",
    phone: "+84 28 3456 7890",
    email: "contact@purewellness.com",
    hours: {
      Monday: "9:00 AM - 9:00 PM",
      Tuesday: "9:00 AM - 9:00 PM",
      Wednesday: "9:00 AM - 9:00 PM",
      Thursday: "9:00 AM - 9:00 PM",
      Friday: "9:00 AM - 9:00 PM",
      Saturday: "9:00 AM - 9:00 PM",
      Sunday: "9:00 AM - 7:00 PM",
    },
    description: "A comprehensive wellness center offering spa treatments, massages, and beauty services.",
    services: [
      { id: 10, name: "Full Body Massage", price: 600000, duration: 90, category: "Massage" },
      { id: 11, name: "Thai Massage", price: 500000, duration: 60, category: "Massage" },
      { id: 12, name: "Facial Treatment", price: 400000, duration: 60, category: "Skincare" },
      { id: 13, name: "Body Scrub", price: 450000, duration: 45, category: "Skincare" },
    ],
    stylists: [
      { id: 6, name: "Anna", specialty: "Massage Therapy", image: "/female-stylist.jpg", rating: 4.8 },
      { id: 7, name: "Mike", specialty: "Thai Massage", image: "/male-barber.png", rating: 4.7 },
    ],
    reviewsList: [],
  },
  {
    id: 4,
    name: "The Cut & Color Co.",
    image: "/professional-barber-salon.jpg",
    images: ["/professional-barber-salon.jpg"],
    rating: 4.6,
    reviews: 189,
    distance: "1.8 km",
    price: "$",
    badge: "Instant Booking",
    address: "321 Pasteur Street, District 3, Ho Chi Minh City",
    phone: "+84 28 4567 8901",
    email: "info@cutandcolor.com",
    hours: {
      Monday: "8:00 AM - 7:00 PM",
      Tuesday: "8:00 AM - 7:00 PM",
      Wednesday: "8:00 AM - 7:00 PM",
      Thursday: "8:00 AM - 7:00 PM",
      Friday: "8:00 AM - 8:00 PM",
      Saturday: "8:00 AM - 8:00 PM",
      Sunday: "9:00 AM - 5:00 PM",
    },
    description: "Affordable barbershop offering quality cuts and styling for men and women.",
    services: [
      { id: 14, name: "Men's Cut", price: 150000, duration: 30, category: "Barber" },
      { id: 15, name: "Beard Trim", price: 100000, duration: 20, category: "Barber" },
      { id: 16, name: "Hair Wash", price: 80000, duration: 15, category: "Barber" },
    ],
    stylists: [
      { id: 8, name: "Tom", specialty: "Classic Cuts", image: "/male-barber.png", rating: 4.6 },
      { id: 9, name: "John", specialty: "Beard Styling", image: "/male-barber.png", rating: 4.5 },
    ],
    reviewsList: [],
  },
]

export const mockBookings: Booking[] = [
  {
    id: 1,
    salonId: 1,
    salonName: "Serenity Salon & Spa",
    serviceId: 1,
    serviceName: "Men's Cut",
    stylistId: 1,
    stylistName: "Sarah",
    date: "2024-02-15",
    time: "10:00",
    price: 200000,
    status: "confirmed",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: 2,
    salonId: 2,
    salonName: "Zen Hair Studio",
    serviceId: 6,
    serviceName: "Men's Cut",
    stylistId: 4,
    stylistName: "David",
    date: "2024-01-25",
    time: "14:30",
    price: 250000,
    status: "completed",
    createdAt: "2024-01-15T14:30:00Z",
  },
  {
    id: 3,
    salonId: 1,
    salonName: "Serenity Salon & Spa",
    serviceId: 3,
    serviceName: "Full Body Massage",
    stylistId: 1,
    stylistName: "Sarah",
    date: "2024-02-20",
    time: "15:00",
    price: 500000,
    status: "pending",
    createdAt: "2024-01-22T09:00:00Z",
  },
]

export const serviceCategories = [
  { id: "haircut", name: "Haircut", icon: "Scissors" },
  { id: "massage", name: "Spa & Massage", icon: "Droplet" },
  { id: "nails", name: "Nails", icon: "Sparkles" },
  { id: "skincare", name: "Skincare", icon: "Leaf" },
  { id: "barber", name: "Barber", icon: "BarChart3" },
]

// Helper functions
export function getSalonById(id: number): Salon | undefined {
  return mockSalons.find((salon) => salon.id === id)
}

export function getServiceById(salonId: number, serviceId: number): Service | undefined {
  const salon = getSalonById(salonId)
  return salon?.services.find((service) => service.id === serviceId)
}

export function getStylistById(salonId: number, stylistId: number): Stylist | undefined {
  const salon = getSalonById(salonId)
  return salon?.stylists.find((stylist) => stylist.id === stylistId)
}

export function getBookingsByStatus(status: Booking["status"]): Booking[] {
  return mockBookings.filter((booking) => booking.status === status)
}

