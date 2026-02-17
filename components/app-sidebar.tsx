"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Calendar,
  ChevronDown,
  ClipboardList,
  FileText,
  FolderKanban,
  Home,
  MessageSquare,
  Settings,
  Shield,
  Users,
  UserCog,
  Clock,
  Bell,
  Award,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// User role types
type UserRole = "superadmin" | "admin" | "hr" | "employee"

interface User {
  name: string
  email: string
  avatar?: string
  role: UserRole
  organization?: string
}

// Navigation items by role
const getNavigationByRole = (role: UserRole) => {
  const baseNavigation = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      roles: ["superadmin", "admin", "hr", "employee"],
    },
  ]

  const employeeNavigation = [
    {
      title: "My Tasks",
      icon: ClipboardList,
      href: "/dashboard/tasks",
      roles: ["employee"],
    },
    {
      title: "Leave Requests",
      icon: Calendar,
      href: "/dashboard/leave",
      roles: ["employee"],
    },
    {
      title: "Timesheets",
      icon: Clock,
      href: "/dashboard/timesheets",
      roles: ["employee"],
    },
    {
      title: "My Documents",
      icon: FileText,
      href: "/dashboard/documents",
      roles: ["employee"],
    },
    {
      title: "My Projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
      roles: ["employee"],
    },
  ]

  const hrNavigation = [
    {
      title: "Employee Management",
      icon: Users,
      href: "/dashboard/hr/employees",
      roles: ["hr", "admin"],
    },
    {
      title: "Leave Approvals",
      icon: Calendar,
      href: "/dashboard/hr/leave-approvals",
      roles: ["hr", "admin"],
    },
    {
      title: "Document Review",
      icon: FileText,
      href: "/dashboard/hr/documents",
      roles: ["hr", "admin"],
    },
    {
      title: "Timesheet Review",
      icon: Clock,
      href: "/dashboard/hr/timesheets",
      roles: ["hr", "admin"],
    },
  ]

  const adminNavigation = [
    {
      title: "Departments",
      icon: Building2,
      href: "/dashboard/admin/departments",
      roles: ["admin"],
    },
    {
      title: "Projects",
      icon: FolderKanban,
      href: "/dashboard/admin/projects",
      roles: ["admin"],
    },
    {
      title: "Roles & Permissions",
      icon: Shield,
      href: "/dashboard/admin/roles",
      roles: ["admin"],
    },
  ]

  const superAdminNavigation = [
    {
      title: "Organizations",
      icon: Building2,
      href: "/dashboard/superadmin/organizations",
      roles: ["superadmin"],
    },
    {
      title: "All Users",
      icon: Users,
      href: "/dashboard/superadmin/users",
      roles: ["superadmin"],
    },
    {
      title: "System Settings",
      icon: Settings,
      href: "/dashboard/superadmin/settings",
      roles: ["superadmin"],
    },
  ]

  const commonNavigation = [
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/dashboard/chat",
      roles: ["superadmin", "admin", "hr", "employee"],
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/dashboard/notifications",
      roles: ["superadmin", "admin", "hr", "employee"],
    },
  ]

  const allItems = [
    ...baseNavigation,
    ...employeeNavigation,
    ...hrNavigation,
    ...adminNavigation,
    ...superAdminNavigation,
    ...commonNavigation,
  ]

  return allItems.filter((item) => item.roles.includes(role))
}

// Mock user data - this would come from auth context in production
const mockUser: User = {
  name: "Sarah Johnson",
  email: "sarah.johnson@acme.com",
  avatar: "/avatars/sarah.jpg",
  role: "admin",
  organization: "Acme Corporation",
}

interface AppSidebarProps {
  user?: User
}

export function AppSidebar({ user = mockUser }: AppSidebarProps) {
  const pathname = usePathname()
  const navigation = getNavigationByRole(user.role)

  // Group navigation items
  const mainNav = navigation.filter((item) =>
    ["Dashboard", "My Tasks", "Leave Requests", "Timesheets", "My Documents", "My Projects"].includes(item.title)
  )
  const hrNav = navigation.filter((item) =>
    ["Employee Management", "Leave Approvals", "Document Review", "Timesheet Review"].includes(item.title)
  )
  const adminNav = navigation.filter((item) =>
    ["Departments", "Projects", "Roles & Permissions"].includes(item.title)
  )
  const superAdminNav = navigation.filter((item) =>
    ["Organizations", "All Users", "System Settings"].includes(item.title)
  )
  const utilityNav = navigation.filter((item) =>
    ["Messages", "Notifications"].includes(item.title)
  )

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "superadmin":
        return "bg-primary/10 text-primary"
      case "admin":
        return "bg-accent/10 text-accent"
      case "hr":
        return "bg-success/10 text-success"
      case "employee":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "superadmin":
        return "Super Admin"
      case "admin":
        return "Admin"
      case "hr":
        return "HR"
      case "employee":
        return "Employee"
      default:
        return role
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Award className="h-4 w-4" />
              </div>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">Smart HRMS</span>
                <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user.organization || "Organization"}
                </span>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* HR Section */}
        {hrNav.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>HR Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {hrNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Admin Section */}
        {adminNav.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Super Admin Section */}
        {superAdminNav.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {superAdminNav.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}

        {/* Utility Navigation */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className={cn(
                      "truncate text-xs px-1.5 py-0.5 rounded w-fit",
                      getRoleBadgeColor(user.role)
                    )}>
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                side="top"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <UserCog className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
