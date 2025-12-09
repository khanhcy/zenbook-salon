# ZenBook - Hệ thống đặt lịch Salon/Spa

Ứng dụng web đặt lịch cắt tóc/spa với giao diện hiện đại, được xây dựng bằng Next.js 16.

## ✨ Tính năng

### Dành cho Khách hàng
- 🔍 Tìm kiếm salon theo dịch vụ, địa điểm, giá cả
- 📅 Đặt lịch hẹn nhanh chóng với nhiều bước
- 📱 Quản lý lịch hẹn (sắp tới, đã qua, đã hủy)
- ⭐ Xem đánh giá và thông tin chi tiết salon
- 👤 Quản lý hồ sơ cá nhân
- ❤️ Lưu salon yêu thích

### Dành cho Salon
- 📊 Dashboard với thống kê tổng quan
- 📅 Quản lý lịch hẹn
- 💇 Quản lý dịch vụ và giá cả
- 👨‍💼 Quản lý thợ/stylist
- 📈 Analytics & Báo cáo
- ⚙️ Cài đặt salon (thông tin, giờ làm việc, gallery)

## 🚀 Công nghệ sử dụng

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Form**: react-hook-form + zod
- **Carousel**: embla-carousel-react
- **Calendar**: react-day-picker

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🌐 Deploy

### Vercel (Khuyến nghị)

1. Đẩy code lên GitHub
2. Truy cập [vercel.com](https://vercel.com)
3. Import project từ GitHub
4. Vercel sẽ tự động detect và deploy

Hoặc sử dụng Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Các platform khác
- **Netlify**: Kết nối GitHub repository
- **Railway**: Deploy từ GitHub
- **Render**: Tạo Web Service mới

## 📁 Cấu trúc dự án

```
├── app/                    # Next.js App Router pages
│   ├── bookings/          # Trang quản lý lịch hẹn
│   ├── dashboard/         # Dashboard cho salon
│   ├── profile/           # Trang hồ sơ người dùng
│   ├── salons/            # Trang chi tiết salon
│   └── search/            # Trang tìm kiếm
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utilities và mock data
└── public/               # Static assets
```

## 🎨 Giao diện

- Responsive design cho mobile và desktop
- Dark mode support
- Modern UI với Tailwind CSS
- Smooth animations và transitions

## 📝 Lưu ý

Đây là phiên bản demo với mock data. Để sử dụng trong production, cần:
- Kết nối với backend API
- Database để lưu trữ dữ liệu
- Authentication system
- Payment integration
- Email/SMS notifications

## 📄 License

MIT

## 👥 Tác giả

ZenBook Team

