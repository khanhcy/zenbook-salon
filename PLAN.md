# Kế hoạch chỉnh sửa dự án ZenBook để hoàn thiện Demo

## 📋 Tổng quan
Dự án hiện tại đã có cấu trúc tốt nhưng các chức năng chủ yếu chỉ hiển thị (display-only) hoặc dùng `alert()`. Để làm cho nó giống một demo hoàn chỉnh, cần thêm state management và các tương tác thực tế.

---

## 🎯 Mục tiêu chính

1. **State Management**: Quản lý state toàn cục cho bookings, favorites, user
2. **Tương tác thực tế**: Thay thế `alert()` bằng các hành động thực tế
3. **UX tốt hơn**: Thêm loading states, toast notifications, validation
4. **Dữ liệu phong phú**: Mở rộng mock data để demo đầy đủ hơn

---

## 📝 Chi tiết từng phần

### 1. State Management (Context API)
**File mới**: `lib/context/app-context.tsx`

**Chức năng**:
- Quản lý bookings (thêm, sửa, xóa, hủy)
- Quản lý favorite salons
- Quản lý user session
- Quản lý reviews
- Lưu vào localStorage để persist data

**Các state cần quản lý**:
```typescript
- user: { id, name, email, ... }
- bookings: Booking[]
- favoriteSalons: number[] // salon IDs
- reviews: Review[]
```

---

### 2. Cải thiện chức năng Đặt lịch
**File**: `app/bookings/new/page.tsx`

**Thay đổi**:
- ❌ Xóa: `alert("Booking confirmed!")`
- ✅ Thêm: Gọi context để thêm booking mới vào state
- ✅ Hiển thị toast notification thành công
- ✅ Redirect đến trang booking detail
- ✅ Tự động tạo booking ID mới

**Validation**:
- Kiểm tra đã chọn service, stylist, date, time
- Kiểm tra date không được trong quá khứ
- Kiểm tra time slot còn trống (mock)

---

### 3. Chức năng Favorite Salons
**Files**: 
- `app/salons/[id]/page.tsx`
- `app/profile/page.tsx`
- `components/header.tsx` (nếu cần)

**Thay đổi**:
- Thêm nút "Yêu thích" (Heart icon) trên trang salon detail
- Lưu/xóa favorite vào context
- Hiển thị danh sách favorites trong profile
- Thêm badge "Đã yêu thích" cho salon đã favorite

---

### 4. Cải thiện Hủy/Đổi lịch
**File**: `app/bookings/[id]/page.tsx`, `app/bookings/page.tsx`

**Thay đổi**:
- ❌ Xóa: `alert("Booking cancelled!")`
- ✅ Cập nhật booking status trong context
- ✅ Hiển thị toast notification
- ✅ Cập nhật UI ngay lập tức
- ✅ Đổi lịch: Redirect đến booking form với data pre-filled

---

### 5. Chức năng Review
**File**: `app/reviews/page.tsx`

**Thay đổi**:
- ❌ Xóa: `alert("Review submitted!")`
- ✅ Lưu review vào context
- ✅ Cập nhật rating của salon trong mock data
- ✅ Hiển thị review mới trong salon detail page
- ✅ Validation: rating bắt buộc, comment tối thiểu 10 ký tự

---

### 6. Login/Register với Session
**Files**: 
- `app/login/page.tsx`
- `app/register/page.tsx`
- `lib/context/app-context.tsx`

**Thay đổi**:
- Lưu user vào context khi login/register
- Lưu vào localStorage để persist
- Hiển thị user name trong header
- Thêm logout functionality
- Mock authentication: bất kỳ email/password nào cũng login được (demo)

---

### 7. Toast Notifications
**File mới**: Setup toast provider (đã có sonner trong dependencies)

**Thay đổi**:
- Thay tất cả `alert()` bằng toast notifications
- Toast types: success, error, info, warning
- Tự động dismiss sau 3-5 giây

**Sử dụng**:
```typescript
import { toast } from "sonner"
toast.success("Booking confirmed!")
toast.error("Something went wrong")
```

---

### 8. Mở rộng Mock Data
**File**: `lib/mock-data.ts`

**Thêm**:
- Nhiều bookings hơn (10-15 bookings với các status khác nhau)
- Nhiều reviews hơn cho mỗi salon
- Thêm user mock data
- Thêm favorite salons mặc định
- Thêm dates trong tương lai cho bookings

---

### 9. Loading States & Skeletons
**Files**: Tất cả các trang có data fetching

**Thêm**:
- Skeleton loaders cho:
  - Salon cards trong search
  - Booking cards
  - Profile sections
- Loading spinners cho:
  - Form submissions
  - Navigation transitions

**Component mới**: `components/ui/skeleton.tsx` (có thể đã có)

---

### 10. Cải thiện Profile Page
**File**: `app/profile/page.tsx`

**Thay đổi**:
- ❌ Xóa: `alert("Profile updated!")`
- ✅ Lưu profile changes vào context
- ✅ Lưu vào localStorage
- ✅ Hiển thị toast notification
- ✅ Cập nhật UI ngay lập tức
- ✅ Validation cho email, phone format

---

### 11. Form Validation
**Files**: Tất cả các form

**Thêm validation cho**:
- Booking form: required fields, date validation
- Review form: rating required, comment min length
- Profile form: email format, phone format
- Login/Register: email format, password strength (demo)

**Sử dụng**: `zod` (đã có trong dependencies) hoặc native HTML5 validation

---

### 12. Dashboard Salon - CRUD Operations
**Files**: 
- `app/dashboard/salon/services/page.tsx`
- `app/dashboard/salon/stylists/page.tsx`
- `app/dashboard/salon/settings/page.tsx`

**Thêm chức năng**:
- **Services**: Thêm, sửa, xóa service
- **Stylists**: Thêm, sửa, xóa stylist
- **Settings**: Cập nhật thông tin salon
- Lưu vào context/mock data
- Hiển thị toast notifications

### 13. Chương trình Khách hàng thân thiết (Loyalty Program) ⭐ NEW
**Files mới**: 
- `app/loyalty/page.tsx` - Trang hiển thị chương trình loyalty
- `lib/mock-data.ts` - Thêm interface và data cho loyalty

**Chức năng**:
- **Points System**: Tích điểm khi đặt lịch và hoàn thành
  - 1 booking completed = 10 points
  - 1 review = 5 points
  - 1 referral = 20 points
  
- **Membership Tiers**:
  - 🥉 **Bronze** (0-99 points): Khách hàng mới
  - 🥈 **Silver** (100-299 points): Khách hàng thân thiết
  - 🥇 **Gold** (300-599 points): Khách hàng VIP
  - 💎 **Platinum** (600+ points): Khách hàng cao cấp

- **Benefits theo tier**:
  - Silver: Giảm 5% cho mọi dịch vụ
  - Gold: Giảm 10% + Ưu tiên đặt lịch
  - Platinum: Giảm 15% + Quà tặng sinh nhật + Ưu tiên cao nhất

- **UI Components**:
  - Hiển thị tier badge trong profile
  - Progress bar đến tier tiếp theo
  - Lịch sử tích điểm
  - Danh sách rewards có thể đổi
  - Hiển thị points trong header (nếu có)

- **Tích hợp**:
  - Tự động cộng points khi booking completed
  - Tự động cộng points khi review được submit
  - Áp dụng discount tự động khi đặt lịch (dựa trên tier)
  - Hiển thị tier badge trong booking confirmation

---

## 🗂️ Cấu trúc file mới

```
lib/
  ├── context/
  │   └── app-context.tsx          # Context provider cho state management
  ├── hooks/
  │   └── use-app-context.ts       # Custom hook để sử dụng context
  └── utils/
      └── storage.ts               # Utilities cho localStorage
```

---

## 🎨 UI/UX Improvements

1. **Toast Notifications**: Thay thế tất cả `alert()`
2. **Loading States**: Skeleton loaders cho tất cả data fetching
3. **Empty States**: Cải thiện empty states với icons và CTA buttons
4. **Error Handling**: Hiển thị error messages thân thiện
5. **Success Feedback**: Visual feedback khi thao tác thành công

---

## 📊 Data Flow

```
User Action → Context Update → State Change → UI Update → localStorage Sync
```

**Ví dụ Booking Flow**:
1. User điền form đặt lịch
2. Click "Xác nhận"
3. Context thêm booking mới vào state
4. Lưu vào localStorage
5. Hiển thị toast success
6. Redirect đến booking detail
7. UI tự động cập nhật danh sách bookings

---

## ✅ Checklist Implementation

### Phase 1: Foundation
- [ ] Tạo AppContext với state management
- [ ] Setup localStorage persistence
- [ ] Setup toast notifications
- [ ] Tạo custom hooks

### Phase 2: Core Features
- [ ] Cải thiện booking flow (create, cancel, reschedule)
- [ ] Thêm favorite salons
- [ ] Cải thiện review system
- [ ] Login/Register với session

### Phase 3: UX Enhancements
- [ ] Thêm loading states
- [ ] Thêm validation
- [ ] Cải thiện error handling
- [ ] Mở rộng mock data

### Phase 4: Dashboard Features
- [ ] CRUD cho services
- [ ] CRUD cho stylists
- [ ] Cập nhật salon settings

### Phase 5: Loyalty Program
- [ ] Tạo loyalty system với points và tiers
- [ ] Tích hợp auto-calculate points từ bookings
- [ ] Hiển thị tier badge và progress
- [ ] Áp dụng discount tự động theo tier

---

## 🚀 Thứ tự ưu tiên

1. **High Priority** (Làm trước):
   - State Management (Context)
   - Booking flow hoàn chỉnh
   - Toast notifications
   - Favorite salons

2. **Medium Priority**:
   - Review system
   - Login/Register session
   - Profile updates
   - Loading states
   - **Loyalty Program** (Khách hàng thân thiết) ⭐

3. **Low Priority** (Nice to have):
   - Dashboard CRUD
   - Advanced validation
   - More mock data

---

## 📝 Notes

- Tất cả thay đổi sẽ dùng localStorage để persist data (demo mode)
- Không cần backend API, tất cả mock data
- Focus vào UX và flow hoàn chỉnh
- Đảm bảo responsive trên mobile

---

## 🎯 Kết quả mong đợi

Sau khi hoàn thành, demo sẽ có:
- ✅ Tất cả chức năng hoạt động mượt mà
- ✅ State được quản lý tập trung
- ✅ Data persist qua localStorage
- ✅ UX tốt với toast, loading states
- ✅ Flow hoàn chỉnh từ booking → review → favorite
- ✅ Dashboard salon có thể quản lý services/stylists

---

**Tác giả**: Auto (AI Assistant)  
**Ngày tạo**: 2024  
**Version**: 1.0

