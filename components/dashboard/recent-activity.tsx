"use client"

import { Calendar, Check, Clock, FileText, MessageSquare, User, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type ActivityType = "leave_approved" | "leave_rejected" | "document_uploaded" | "timesheet_submitted" | "task_completed" | "message"

interface Activity {
  id: string
  type: ActivityType
  user: {
    name: string
    avatar?: string
  }
  description: string
  timestamp: string
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "leave_approved",
    user: { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg" },
    description: "Approved leave request for John Smith",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    type: "document_uploaded",
    user: { name: "Emily Rodriguez" },
    description: "Uploaded employment contract",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    type: "timesheet_submitted",
    user: { name: "Michael Chen" },
    description: "Submitted weekly timesheet (42 hrs)",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    type: "task_completed",
    user: { name: "James Wilson" },
    description: "Completed Q4 Marketing Report",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    type: "leave_rejected",
    user: { name: "Sarah Johnson" },
    description: "Rejected leave request for Anna Lee",
    timestamp: "3 hours ago",
  },
  {
    id: "6",
    type: "message",
    user: { name: "Sophia Kim" },
    description: "Posted in Engineering channel",
    timestamp: "4 hours ago",
  },
]

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "leave_approved":
      return { icon: Check, color: "text-success bg-success/10" }
    case "leave_rejected":
      return { icon: X, color: "text-destructive bg-destructive/10" }
    case "document_uploaded":
      return { icon: FileText, color: "text-primary bg-primary/10" }
    case "timesheet_submitted":
      return { icon: Clock, color: "text-accent bg-accent/10" }
    case "task_completed":
      return { icon: Check, color: "text-success bg-success/10" }
    case "message":
      return { icon: MessageSquare, color: "text-muted-foreground bg-muted" }
    default:
      return { icon: User, color: "text-muted-foreground bg-muted" }
  }
}

export function RecentActivity() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across the organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const { icon: Icon, color } = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg shrink-0", color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    <span className="text-muted-foreground">{activity.description}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
