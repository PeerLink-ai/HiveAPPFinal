"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  FileText,
  Video,
  LayoutDashboard,
  UserCircle,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Sparkles,
  Brain,
} from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar" // Import sidebar primitives
import { motion } from "framer-motion" // Import motion for animations
import { cn } from "@/lib/utils" // Import cn for conditional class names

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/insights", label: "Content Insights", icon: Video },
  { href: "/planning", label: "Content Planning", icon: CalendarDays },
  { href: "/create", label: "Content Creation", icon: Sparkles },
  { href: "/reports", label: "Analytics Reports", icon: FileText },
  { href: "/ai-studio", label: "AI Studio", icon: Brain }, // New AI Studio link
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Header */}
      <SidebarHeader className="p-6 border-b border-gray-100 group-data-[collapsible=icon]:p-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
          >
            <Image
              src="/placeholder.svg?width=24&height=24"
              alt="Hive Logo"
              width={24}
              height={24}
              className="text-white"
            />
          </motion.div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Hive
            </span>
            <span className="text-xs text-gray-500 font-medium">Analytics Platform</span>
          </div>
        </Link>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="flex-1 p-6 group-data-[collapsible=icon]:p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/create" && pathname.startsWith("/create"))
              return (
                <SidebarMenuItem key={item.href}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                        "hover:bg-primary/5 hover:text-primary",
                        isActive
                          ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-4 border-primary shadow-sm"
                          : "text-gray-600 border-l-4 border-transparent",
                        "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2",
                      )}
                    >
                      <Link href={item.href}>
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary shadow-sm"
                              : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="flex-1 group-data-[collapsible=icon]:hidden">{item.label}</span>
                        {isActive && (
                          <div className="h-2 w-2 rounded-full bg-primary/60 group-data-[collapsible=icon]:hidden" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/profile-setup"}
                  tooltip="Profile Settings"
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/5 hover:text-primary",
                    pathname === "/profile-setup"
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-4 border-primary shadow-sm"
                      : "text-gray-600 border-l-4 border-transparent",
                    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2",
                  )}
                >
                  <Link href="/profile-setup">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                        pathname === "/profile-setup"
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700",
                      )}
                    >
                      <UserCircle className="h-4 w-4" />
                    </div>
                    <span className="flex-1 group-data-[collapsible=icon]:hidden">Profile Settings</span>
                    {pathname === "/profile-setup" && (
                      <div className="h-2 w-2 rounded-full bg-primary/60 group-data-[collapsible=icon]:hidden" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </motion.div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="p-4 border-t border-gray-100 group-data-[collapsible=icon]:p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group w-full h-14 rounded-xl bg-white shadow-md shadow-gray-200/50 hover:shadow-lg hover:shadow-gray-200/60 transition-all duration-200 ease-out",
                "border border-gray-100 hover:border-gray-200 p-3",
                "data-[state=open]:shadow-lg data-[state=open]:scale-[1.02]",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
                "group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center",
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1 group-data-[collapsible=icon]:justify-center">
                {user?.avatar ? (
                  <div className="relative">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.username || "User"}
                      width={36}
                      height={36}
                      className="rounded-xl border-2 border-white shadow-sm group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:rounded-full"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white group-data-[collapsible=icon]:hidden" />
                  </div>
                ) : (
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-sm group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:rounded-full">
                    <UserCircle className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{user?.username || "User"}</span>
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs px-2 py-0.5 rounded-full border-0">
                      Pro
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</span>
                </div>
                <ChevronDown className="ml-auto h-4 w-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform group-data-[collapsible=icon]:hidden" />
              </div>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-64 rounded-xl border-0 shadow-xl shadow-gray-200/50 bg-white/95 backdrop-blur-sm mb-2"
          >
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-gray-900">{user?.username || "User"}</p>
                <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            <div className="p-2 space-y-1">
              <DropdownMenuItem asChild>
                <Link href="/profile-setup" className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-50">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-50">
                <Bell className="mr-3 h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Notifications</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="text-sm font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  )
}
