import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ServiceCategories from "@/components/service-categories"
import FeaturedSalons from "@/components/featured-salons"
import SalonDetail from "@/components/salon-detail"
import WhyChooseUs from "@/components/why-choose-us"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServiceCategories />
      <FeaturedSalons />
      <SalonDetail />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}
