import { Bell, Star, CreditCard } from "lucide-react"

const features = [
  {
    icon: Bell,
    title: "Nhắc nhở thông minh",
    description: "Nhận thông báo tự động trước lịch hẹn để không bao giờ bỏ lỡ cuộc hẹn.",
  },
  {
    icon: Star,
    title: "Đánh giá thực",
    description: "Đọc các đánh giá đã được xác minh từ khách hàng thật để tìm salon phù hợp nhất.",
  },
  {
    icon: CreditCard,
    title: "Thanh toán không tiền mặt",
    description: "Thanh toán an toàn trực tuyến với nhiều phương thức thanh toán cho trải nghiệm mượt mà.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-20 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">Tại sao chọn ZenBook?</h3>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Chúng tôi cam kết làm cho việc đặt lịch làm đẹp và chăm sóc sức khỏe trở nên dễ dàng và đáng tin cậy.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
