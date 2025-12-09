import { Mail, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-accent/20">
          {/* For Customers */}
          <div>
            <h5 className="font-bold mb-4">Dành cho Khách hàng</h5>
            <ul className="space-y-2 text-accent/80 hover:[&_a]:text-accent-foreground transition">
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Duyệt Salon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Lịch hẹn của tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Đánh giá & Xếp hạng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Thẻ quà tặng
                </a>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h5 className="font-bold mb-4">Dành cho Đối tác</h5>
            <ul className="space-y-2 text-accent/80">
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Trở thành Đối tác
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Bảng điều khiển
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Bảng giá
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-foreground transition">
                  Hỗ trợ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h5 className="font-bold mb-4">Kết nối với chúng tôi</h5>
            <div className="flex gap-4 mb-4">
              <a href="#" className="bg-accent/20 hover:bg-accent/30 p-2 rounded-full transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-accent/20 hover:bg-accent/30 p-2 rounded-full transition">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="bg-accent/20 hover:bg-accent/30 p-2 rounded-full transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-accent/80 text-sm">hello@zenbook.com</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-accent/70 text-sm">
          <p>&copy; 2025 ZenBook. Bảo lưu mọi quyền.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent-foreground transition">
              Chính sách Bảo mật
            </a>
            <a href="#" className="hover:text-accent-foreground transition">
              Điều khoản Dịch vụ
            </a>
            <a href="#" className="hover:text-accent-foreground transition">
              Chính sách Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
