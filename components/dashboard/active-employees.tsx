"use client"

import { Award, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ActiveEmployee {
  id: string
  name: string
  avatar?: string
  department: string
  score: number
  tasksCompleted: number
  hoursLogged: number
}

const mockActiveEmployees: ActiveEmployee[] = [
  {
    id: "1",
    name: "Michael Chen",
    avatar: "/avatars/michael.jpg",
    department: "Engineering",
    score: 98,
    tasksCompleted: 24,
    hoursLogged: 42,
  },
  {
    id: "2",
    name: "Emily Rodriguez",
    avatar: "/avatars/emily.jpg",
    department: "Design",
    score: 95,
    tasksCompleted: 18,
    hoursLogged: 40,
  },
  {
    id: "3",
    name: "James Wilson",
    avatar: "/avatars/james.jpg",
    department: "Marketing",
    score: 92,
    tasksCompleted: 21,
    hoursLogged: 38,
  },
  {
    id: "4",
    name: "Sophia Kim",
    avatar: "/avatars/sophia.jpg",
    department: "Engineering",
    score: 90,
    tasksCompleted: 19,
    hoursLogged: 41,
  },
  {
    id: "5",
    name: "David Brown",
    avatar: "/avatars/david.jpg",
    department: "Sales",
    score: 88,
    tasksCompleted: 16,
    hoursLogged: 39,
  },
]

export function ActiveEmployees() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Most Active Employees
            </CardTitle>
            <CardDescription>Based on tasks, timesheets & engagement</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
            This Week
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActiveEmployees.map((employee, index) => (
            <div key={employee.id} className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {index < 3 && (
                  <div className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground ${
                    index === 0 ? "bg-accent" : index === 1 ? "bg-primary" : "bg-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{employee.name}</p>
                  <span className="text-sm font-semibold text-primary">{employee.score}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{employee.department}</p>
                <Progress value={employee.score} className="h-1.5 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
