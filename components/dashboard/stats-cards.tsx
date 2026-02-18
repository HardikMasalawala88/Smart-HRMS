"use client"

import React from "react"

import { ArrowDown, ArrowUp, Calendar, Clock, FileText, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ElementType
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center gap-1 mt-1">
            {trend && (
              <span
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? (
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface StatsCardsProps {
  role: "superadmin" | "admin" | "hr" | "employee"
}

export function StatsCards({ role }: StatsCardsProps) {
  // Different stats based on role
  const getStats = () => {
    switch (role) {
      case "superadmin":
        return [
          {
            title: "Total Organizations",
            value: 24,
            icon: Users,
            trend: { value: 12, isPositive: true },
            description: "from last month",
          },
          {
            title: "Total Employees",
            value: "1,284",
            icon: Users,
            trend: { value: 8, isPositive: true },
            description: "across all orgs",
          },
          {
            title: "Active Users",
            value: "956",
            icon: Users,
            trend: { value: 4, isPositive: true },
            description: "this week",
          },
          {
            title: "System Health",
            value: "99.9%",
            icon: Clock,
            description: "uptime",
          },
        ]
      case "admin":
        return [
          {
            title: "Total Employees",
            value: 156,
            icon: Users,
            trend: { value: 5, isPositive: true },
            description: "from last month",
          },
          {
            title: "Pending Leaves",
            value: 12,
            icon: Calendar,
            trend: { value: 3, isPositive: false },
            description: "needs approval",
          },
          {
            title: "Active Projects",
            value: 8,
            icon: FileText,
            description: "in progress",
          },
          {
            title: "Departments",
            value: 6,
            icon: Users,
            description: "total",
          },
        ]
      case "hr":
        return [
          {
            title: "Pending Leave Requests",
            value: 12,
            icon: Calendar,
            description: "needs review",
          },
          {
            title: "Documents to Review",
            value: 8,
            icon: FileText,
            description: "pending approval",
          },
          {
            title: "Missing Timesheets",
            value: 5,
            icon: Clock,
            description: "this week",
          },
          {
            title: "New Employees",
            value: 3,
            icon: Users,
            trend: { value: 2, isPositive: true },
            description: "this month",
          },
        ]
      case "employee":
      default:
        return [
          {
            title: "Leave Balance",
            value: "18 days",
            icon: Calendar,
            description: "remaining this year",
          },
          {
            title: "Tasks Due",
            value: 5,
            icon: FileText,
            description: "this week",
          },
          {
            title: "Hours Logged",
            value: "38h",
            icon: Clock,
            description: "this week",
          },
          {
            title: "Active Projects",
            value: 3,
            icon: Users,
            description: "assigned",
          },
        ]
    }
  }

  const stats = getStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
