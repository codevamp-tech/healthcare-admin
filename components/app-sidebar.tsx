"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Search,
  FolderTree,
  FileImage,
  Settings,
  Activity,
  Calendar,
  CreditCard,
  FlaskConical,
  Pill,
  ClipboardList,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    title: "Search Insights",
    href: "/search-insights",
    icon: Search,
  },
  {
    title: "Folder Explorer",
    href: "/folder-explorer",
    icon: FolderTree,
  },
  {
    title: "Documents & Imaging",
    href: "/imaging",
    icon: FileImage,
  },
  {
    title: "Lab Results",
    href: "/lab-results",
    icon: FlaskConical,
  },
  {
    title: "Prescriptions",
    href: "/prescriptions",
    icon: Pill,
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Medical Records",
    href: "/medical-records",
    icon: ClipboardList,
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar overflow-y-auto">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 flex-shrink-0">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">MedicalHub</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4 flex-shrink-0">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              DR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Dr. Admin</p>
              <p className="text-xs text-muted-foreground truncate">admin@medicalhub.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
