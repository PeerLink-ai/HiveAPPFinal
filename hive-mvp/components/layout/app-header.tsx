"use client"

import type React from "react"

import Link from "next/link"
import {
  CircleUser,
  Menu,
  LogOut,
  Settings,
  Sparkles,
  ImagePlus,
  Feather,
  LayoutDashboard,
  Video,
  CalendarDays,
  FileText,
  Bell,
  CheckCircle2,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth"
import Image from "next/image"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"

// Define navigation items for the top bar
const topNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/insights", label: "Content Insights", icon: Video },
  {
    label: "Content Creation",
    icon: Sparkles,
    dropdown: [
      { href: "/create?section=thumbnail", label: "Thumbnail Creator", icon: ImagePlus },
      { href: "/create?section=content", label: "Content Generator", icon: Feather },
    ],
  },
  { href: "/planning", label: "Content Planning", icon: CalendarDays },
  { href: "/reports", label: "Analytics Reports", icon: FileText },
]

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "New comment on 'My Epic Travel Vlog'",
    description: "John Doe commented: 'Amazing video! Loved the Bali scenes.'",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Performance Alert: 'Viral Dance Challenge' trending!",
    description: "Your TikTok video is gaining significant traction. Check insights!",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Report Ready: Monthly Performance Overview",
    description: "Your monthly analytics report for May is ready for download.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "4",
    title: "New feature: AI Content Generator",
    description: "Explore our new AI-powered tool to draft your next script or post.",
    time: "3 days ago",
    read: true,
  },
]

export function AppHeader() {
  const { user, logout } = useAuth()
  const { isMobile } = useSidebar()
  const pathname = usePathname()
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchQuery, setSearchQuery] = useState("")

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/insights?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-100 bg-white px-6 shadow-sm sticky top-0 z-30">
      {/* Mobile Sheet Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 bg-card">
          {/* Mobile Sidebar Content */}
          <div className="flex h-16 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Image src="/placeholder.svg?width=32&height=32" alt="Hive Logo" width={32} height={32} />
              <span className="text-lg font-bold text-foreground">Hive</span>
            </Link>
          </div>
          <nav className="grid gap-2 p-4 text-base font-medium">
            {topNavItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.href} asChild>
                        <Link href={subItem.href} className="flex items-center gap-2">
                          <subItem.icon className="h-4 w-4" />
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                    pathname === item.href && "text-primary bg-primary/10",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/profile-setup"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10",
                pathname === "/profile-setup" && "text-primary bg-primary/10",
              )}
            >
              <Settings className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex items-center gap-1 flex-1 justify-start">
        {topNavItems.map((item) =>
          item.dropdown ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-10 px-4 rounded-full text-sm font-medium transition-colors",
                      pathname.startsWith("/create") && "bg-primary/10 text-primary hover:bg-primary/10",
                      "hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 rounded-xl border-0 shadow-xl shadow-gray-200/50 bg-white/95 backdrop-blur-sm"
              >
                {item.dropdown.map((subItem) => (
                  <DropdownMenuItem key={subItem.href} asChild>
                    <Link
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50",
                        pathname === subItem.href && "bg-primary/5 text-primary",
                      )}
                    >
                      <subItem.icon className="h-4 w-4" />
                      {subItem.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center h-10 px-4 rounded-full text-sm font-medium transition-colors",
                  pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/10",
                  "hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </motion.div>
          ),
        )}
      </nav>

      {/* Search Input */}
      <div className="relative ml-auto flex-1 max-w-xs hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search content, reports, etc."
          className="w-full rounded-full pl-9 pr-4 h-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="relative ml-4 mr-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 rounded-xl border-0 shadow-xl shadow-gray-200/50 bg-white/95 backdrop-blur-sm"
          >
            <DropdownMenuLabel className="font-semibold flex items-center justify-between">
              Notifications
              {unreadNotificationsCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:bg-primary/5"
                >
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start gap-1 px-4 py-3 cursor-pointer",
                      !notification.read ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-gray-50",
                    )}
                  >
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            ) : (
              <DropdownMenuItem className="text-center text-muted-foreground py-4">
                No new notifications.
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {user?.avatar ? (
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.username || "User"}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white shadow-sm"
                />
              ) : (
                <CircleUser className="h-7 w-7 text-gray-500" />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.username || "User Name"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile-setup">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
