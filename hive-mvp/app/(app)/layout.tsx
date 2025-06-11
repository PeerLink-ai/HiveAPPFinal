import type React from "react"
import { AppHeader } from "@/components/layout/app-header"
import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* The main Sidebar component, handling desktop collapse and mobile sheet */}
        <Sidebar collapsible="icon">
          {/* AppSidebar now contains the content of the sidebar */}
          <AppSidebar />
          {/* SidebarRail for resizing/toggling on desktop */}
          <SidebarRail />
        </Sidebar>
        {/* SidebarInset wraps the main content area, adjusting its margin based on sidebar state */}
        <SidebarInset>
          <AppHeader />
          <div className="flex-1 p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-full">{children}</div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
