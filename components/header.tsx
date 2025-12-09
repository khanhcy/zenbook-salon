"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, LogIn, Menu, X, User, BookOpen, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/search", label: "Tìm kiếm" },
    { href: "/bookings", label: "Lịch hẹn của tôi" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-foreground">ZenBook</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <Link href="/search" className="relative w-full">
              <input
                type="text"
                placeholder="Tìm salon, dịch vụ hoặc thợ..."
                className="w-full px-4 py-2 bg-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground pointer-events-none" />
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/salon"
              className="hidden sm:block text-sm font-medium text-foreground hover:text-primary transition"
            >
              Dành cho Salon
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Tài khoản</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Hồ sơ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookings" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Lịch hẹn của tôi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/salon" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Quản lý Salon
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Đăng nhập
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dashboard/salon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary transition"
              >
                Dành cho Salon
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary transition"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
