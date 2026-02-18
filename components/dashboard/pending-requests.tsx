"use client"

import { Calendar, Check, FileText, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type RequestType = "leave" | "document"

interface PendingRequest {
  id: string
  type: RequestType
  user: {
    name: string
    avatar?: string
    department: string
  }
  title: string
  details: string
  date: string
  priority: "low" | "medium" | "high"
}

const mockRequests: PendingRequest[] = [
  {
    id: "1",
    type: "leave",
    user: { name: "John Smith", avatar: "/avatars/john.jpg", department: "Engineering" },
    title: "Annual Leave",
    details: "Feb 15 - Feb 22, 2026 (5 days)",
    date: "Submitted today",
    priority: "medium",
  },
  {
    id: "2",
    type: "document",
    user: { name: "Anna Lee", department: "Marketing" },
    title: "ID Verification",
    details: "Passport copy uploaded",
    date: "Submitted yesterday",
    priority: "high",
  },
  {
    id: "3",
    type: "leave",
    user: { name: "Robert Taylor", department: "Sales" },
    title: "Sick Leave",
    details: "Feb 5, 2026 (1 day)",
    date: "Submitted 2 days ago",
    priority: "high",
  },
  {
    id: "4",
    type: "document",
    user: { name: "Lisa Wang", avatar: "/avatars/lisa.jpg", department: "Design" },
    title: "Employment Contract",
    details: "Signed contract uploaded",
    date: "Submitted 3 days ago",
    priority: "low",
  },
]

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
}

export function PendingRequests() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Leave and document requests awaiting approval</CardDescription>
          </div>
          <Badge variant="outline">{mockRequests.length} pending</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {request.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{request.user.name}</span>
                  <span className="text-xs text-muted-foreground">{request.user.department}</span>
                  <Badge className={cn("text-xs h-5", priorityColors[request.priority])}>
                    {request.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {request.type === "leave" ? (
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium">{request.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{request.details}</p>
                <p className="text-xs text-muted-foreground mt-1">{request.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Reject</span>
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-success hover:text-success hover:bg-success/10">
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Approve</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
