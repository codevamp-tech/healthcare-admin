"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isChatPage = pathname === "/chat"

    return (
        <SidebarProvider defaultOpen={true}>
            {!isChatPage && <AppSidebar />}
            <SidebarInset>
                {!isChatPage && (
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
                        <SidebarTrigger className="-ml-1" />
                    </header>
                )}
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
