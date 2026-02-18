"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, Calendar, FileText, MessageSquare, Clock, Users, AlertCircle, X } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  breadcrumbs?: { label: string; href?: string }[]
}

// Mock notifications
const notifications = [
  {
    id: "1",
    type: "leave",
    title: "Leave Request Approved",
    message: "Your vacation leave for Feb 15-20 has been approved.",
    timestamp: "10m ago",
    read: false,
    icon: Calendar,
    href: "/dashboard/leave",
  },
  {
    id: "2",
    type: "task",
    title: "New Task Assigned",
    message: "Complete Q1 Report - Due: Feb 10",
    timestamp: "1h ago",
    read: false,
    icon: FileText,
    href: "/dashboard/tasks",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "Emily Chen: Can we discuss the design review?",
    timestamp: "2h ago",
    read: false,
    icon: MessageSquare,
    href: "/dashboard/chat",
  },
]

// Search items for command palette
const searchItems = [
  { title: "Dashboard", href: "/dashboard", category: "Pages" },
  { title: "My Tasks", href: "/dashboard/tasks", category: "Pages" },
  { title: "Leave Requests", href: "/dashboard/leave", category: "Pages" },
  { title: "Timesheets", href: "/dashboard/timesheets", category: "Pages" },
  { title: "Documents", href: "/dashboard/documents", category: "Pages" },
  { title: "Messages", href: "/dashboard/chat", category: "Pages" },
  { title: "Notifications", href: "/dashboard/notifications", category: "Pages" },
  { title: "Settings", href: "/dashboard/settings", category: "Pages" },
  { title: "Employee Management", href: "/dashboard/hr/employees", category: "HR" },
  { title: "Leave Approvals", href: "/dashboard/hr/leave-approvals", category: "HR" },
  { title: "Document Review", href: "/dashboard/hr/documents", category: "HR" },
  { title: "Timesheet Review", href: "/dashboard/hr/timesheets", category: "HR" },
  { title: "Departments", href: "/dashboard/admin/departments", category: "Admin" },
  { title: "Projects", href: "/dashboard/admin/projects", category: "Admin" },
  { title: "Roles & Permissions", href: "/dashboard/admin/roles", category: "Admin" },
]

export function DashboardHeader({ breadcrumbs }: DashboardHeaderProps) {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [localNotifications, setLocalNotifications] = useState(notifications)

  const unreadCount = localNotifications.filter((n) => !n.read).length

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const markAsRead = (id: string) => {
    setLocalNotifications(
      localNotifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "leave":
        return "bg-success/10 text-success"
      case "task":
        return "bg-primary/10 text-primary"
      case "message":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <span key={item.label} className="contents">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Search Button */}
        <Button
          variant="outline"
          className="hidden md:flex items-center gap-2 text-muted-foreground h-9 w-64 justify-start bg-transparent"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Mobile Search */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Command Dialog for Search */}
        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {searchItems
                .filter((item) => item.category === "Pages")
                .map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => {
                      router.push(item.href)
                      setSearchOpen(false)
                    }}
                  >
                    {item.title}
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="HR Management">
              {searchItems
                .filter((item) => item.category === "HR")
                .map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => {
                      router.push(item.href)
                      setSearchOpen(false)
                    }}
                  >
                    {item.title}
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Administration">
              {searchItems
                .filter((item) => item.category === "Admin")
                .map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => {
                      router.push(item.href)
                      setSearchOpen(false)
                    }}
                  >
                    {item.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        {/* Notifications */}
        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold">Notifications</h4>
              <Link
                href="/dashboard/notifications"
                className="text-xs text-primary hover:underline"
                onClick={() => setNotificationOpen(false)}
              >
                View All
              </Link>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {localNotifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                localNotifications.map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <Link
                      key={notification.id}
                      href={notification.href}
                      className={cn(
                        "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-0",
                        !notification.read && "bg-primary/5"
                      )}
                      onClick={() => {
                        markAsRead(notification.id)
                        setNotificationOpen(false)
                      }}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          getTypeColor(notification.type)
                        )}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className={cn("text-sm", !notification.read && "font-medium")}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </Link>
                  )
                })
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}
