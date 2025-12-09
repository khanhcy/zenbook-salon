import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

