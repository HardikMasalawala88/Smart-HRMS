"use client"

import * as React from "react"
import { useState } from "react"
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  Users,
  AlertCircle,
  Info,
  Trash2,
  Settings,
  Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock notifications data
const initialNotifications = [
  {
    id: "1",
    type: "leave",
    title: "Leave Request Approved",
    message: "Your vacation leave request for Feb 15-20 has been approved by Sarah Johnson.",
    timestamp: "2026-02-02T10:30:00",
    read: false,
    icon: Calendar,
    actionUrl: "/dashboard/leave",
  },
  {
    id: "2",
    type: "task",
    title: "New Task Assigned",
    message: "You have been assigned to 'Complete Q1 Report' by Michael Brown. Due: Feb 10, 2026.",
    timestamp: "2026-02-02T09:15:00",
    read: false,
    icon: FileText,
    actionUrl: "/dashboard/tasks",
  },
  {
    id: "3",
    type: "message",
    title: "New Message from Emily Chen",
    message: "Hey, can we discuss the design review meeting scheduled for tomorrow?",
    timestamp: "2026-02-02T08:45:00",
    read: false,
    icon: MessageSquare,
    actionUrl: "/dashboard/chat",
  },
  {
    id: "4",
    type: "system",
    title: "Timesheet Reminder",
    message: "Don't forget to submit your timesheet for the week ending Feb 1. Deadline: Today 5:00 PM.",
    timestamp: "2026-02-01T14:00:00",
    read: true,
    icon: Clock,
    actionUrl: "/dashboard/timesheets",
  },
  {
    id: "5",
    type: "team",
    title: "New Team Member",
    message: "Welcome Alex Thompson to the Engineering team! Say hello in the team chat.",
    timestamp: "2026-02-01T11:30:00",
    read: true,
    icon: Users,
    actionUrl: "/dashboard/chat",
  },
  {
    id: "6",
    type: "alert",
    title: "Document Expiring Soon",
    message: "Your professional certification document will expire in 30 days. Please upload an updated version.",
    timestamp: "2026-02-01T09:00:00",
    read: true,
    icon: AlertCircle,
    actionUrl: "/dashboard/documents",
  },
  {
    id: "7",
    type: "leave",
    title: "Leave Request Pending",
    message: "John Smith has requested sick leave for Feb 5. Awaiting your approval.",
    timestamp: "2026-01-31T16:45:00",
    read: true,
    icon: Calendar,
    actionUrl: "/dashboard/hr/leave-approvals",
  },
  {
    id: "8",
    type: "system",
    title: "Password Change Required",
    message: "Your password will expire in 7 days. Please update it in your account settings.",
    timestamp: "2026-01-31T10:00:00",
    read: true,
    icon: Info,
    actionUrl: "/dashboard/settings",
  },
  {
    id: "9",
    type: "task",
    title: "Task Completed",
    message: "Emily Chen marked 'UI Mockups Review' as complete.",
    timestamp: "2026-01-30T17:30:00",
    read: true,
    icon: FileText,
    actionUrl: "/dashboard/tasks",
  },
  {
    id: "10",
    type: "message",
    title: "Mentioned in Discussion",
    message: "David Lee mentioned you in the 'Project Planning' channel.",
    timestamp: "2026-01-30T14:15:00",
    read: true,
    icon: MessageSquare,
    actionUrl: "/dashboard/chat",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.read
    return n.type === activeTab
  })

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAllRead = () => {
    setNotifications(notifications.filter((n) => !n.read))
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "leave":
        return "bg-success/10 text-success"
      case "task":
        return "bg-primary/10 text-primary"
      case "message":
        return "bg-accent/10 text-accent"
      case "system":
        return "bg-muted text-muted-foreground"
      case "team":
        return "bg-primary/10 text-primary"
      case "alert":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Notifications" },
        ]}
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your latest activities and alerts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={clearAllRead}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Read Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Notification Settings
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <Bell className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <p className="text-xs text-muted-foreground">New notifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter((n) => n.type === "message").length}
              </div>
              <p className="text-xs text-muted-foreground">Chat notifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter((n) => n.type === "task").length}
              </div>
              <p className="text-xs text-muted-foreground">Task updates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notifications.filter((n) => n.type === "alert").length}
              </div>
              <p className="text-xs text-muted-foreground">Important alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-6">
                <TabsTrigger value="all">
                  All
                  {notifications.length > 0 && (
                    <Badge variant="secondary" className="ml-1.5 h-5 px-1.5">
                      {notifications.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  {unreadCount > 0 && (
                    <Badge className="ml-1.5 h-5 px-1.5">{unreadCount}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="message" className="hidden md:flex">Messages</TabsTrigger>
                <TabsTrigger value="task" className="hidden md:flex">Tasks</TabsTrigger>
                <TabsTrigger value="leave" className="hidden md:flex">Leave</TabsTrigger>
                <TabsTrigger value="alert" className="hidden md:flex">Alerts</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 cursor-pointer",
                        !notification.read && "bg-primary/5"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                          getTypeColor(notification.type)
                        )}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
