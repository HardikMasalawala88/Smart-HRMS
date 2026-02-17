"use client"

import { AlertTriangle, Clock, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MissingTimesheet {
  id: string
  name: string
  avatar?: string
  department: string
  lastSubmission: string
  missedWeeks: number
}

const mockMissingTimesheets: MissingTimesheet[] = [
  {
    id: "1",
    name: "Alex Thompson",
    department: "Engineering",
    lastSubmission: "2 weeks ago",
    missedWeeks: 2,
  },
  {
    id: "2",
    name: "Maria Garcia",
    avatar: "/avatars/maria.jpg",
    department: "Design",
    lastSubmission: "1 week ago",
    missedWeeks: 1,
  },
  {
    id: "3",
    name: "Tom Wilson",
    department: "Marketing",
    lastSubmission: "1 week ago",
    missedWeeks: 1,
  },
]

export function TimesheetReminder() {
  return (
    <Card className="border-warning/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <div>
              <CardTitle className="text-base">Missing Timesheets</CardTitle>
              <CardDescription>Employees who haven't submitted timesheets</CardDescription>
            </div>
          </div>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Send className="h-3.5 w-3.5" />
            Send Reminders
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockMissingTimesheets.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                <AvatarFallback className="bg-warning/10 text-warning text-xs">
                  {employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{employee.name}</p>
                <p className="text-xs text-muted-foreground">{employee.department}</p>
              </div>
              <div className="text-right shrink-0">
                <Badge variant="outline" className="text-warning border-warning/50">
                  {employee.missedWeeks} week{employee.missedWeeks > 1 ? "s" : ""} missed
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Last: {employee.lastSubmission}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
