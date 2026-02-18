"use client"

import { useState } from "react"
import { Check, Circle, Clock, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type TaskStatus = "todo" | "in_progress" | "completed"
type TaskPriority = "low" | "medium" | "high"

interface Task {
  id: string
  title: string
  description: string
  project: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete Q1 Marketing Report",
    description: "Compile and analyze Q1 marketing campaign results",
    project: "Marketing Analytics",
    status: "in_progress",
    priority: "high",
    dueDate: "Feb 5, 2026",
    createdAt: "Jan 25, 2026",
  },
  {
    id: "2",
    title: "Review product specifications",
    description: "Review and provide feedback on new product specs",
    project: "Product Launch",
    status: "todo",
    priority: "medium",
    dueDate: "Feb 10, 2026",
    createdAt: "Jan 28, 2026",
  },
  {
    id: "3",
    title: "Update client presentation",
    description: "Update slides with latest performance metrics",
    project: "Client Projects",
    status: "todo",
    priority: "high",
    dueDate: "Feb 3, 2026",
    createdAt: "Jan 30, 2026",
  },
  {
    id: "4",
    title: "Team meeting notes",
    description: "Document action items from weekly team meeting",
    project: "Internal",
    status: "completed",
    priority: "low",
    dueDate: "Jan 31, 2026",
    createdAt: "Jan 28, 2026",
  },
  {
    id: "5",
    title: "Database optimization",
    description: "Optimize slow queries identified in performance review",
    project: "Infrastructure",
    status: "in_progress",
    priority: "medium",
    dueDate: "Feb 7, 2026",
    createdAt: "Jan 20, 2026",
  },
]

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-destructive/10 text-destructive",
}

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  completed: "Completed",
}

export default function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState<TaskStatus | "all">("all")

  const filteredTasks = filter === "all" 
    ? mockTasks 
    : mockTasks.filter(task => task.status === filter)

  const taskCounts = {
    all: mockTasks.length,
    todo: mockTasks.filter(t => t.status === "todo").length,
    in_progress: mockTasks.filter(t => t.status === "in_progress").length,
    completed: mockTasks.filter(t => t.status === "completed").length,
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Tasks" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Tasks</h1>
              <p className="text-muted-foreground">
                Manage and track your daily tasks
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Create a new task for yourself
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Task title..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your task..."
                      className="resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="due">Due Date</Label>
                      <Input id="due" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Select>
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing Analytics</SelectItem>
                        <SelectItem value="product">Product Launch</SelectItem>
                        <SelectItem value="client">Client Projects</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="infra">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "All Tasks", value: taskCounts.all, key: "all" as const },
              { label: "To Do", value: taskCounts.todo, key: "todo" as const },
              { label: "In Progress", value: taskCounts.in_progress, key: "in_progress" as const },
              { label: "Completed", value: taskCounts.completed, key: "completed" as const },
            ].map((stat) => (
              <button
                key={stat.key}
                onClick={() => setFilter(stat.key)}
                className={cn(
                  "p-4 rounded-lg border text-left transition-colors",
                  filter === stat.key
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </button>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-9" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>All Tasks</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter("todo")}>To Do</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("in_progress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("completed")}>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tasks List */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors",
                      task.status === "completed" && "opacity-60"
                    )}
                  >
                    <Checkbox
                      checked={task.status === "completed"}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn(
                          "font-medium",
                          task.status === "completed" && "line-through"
                        )}>
                          {task.title}
                        </span>
                        <Badge className={cn("text-xs", priorityStyles[task.priority])}>
                          {task.priority}
                        </Badge>
                        {task.status === "in_progress" && (
                          <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Circle className="h-3 w-3 fill-current" />
                          {task.project}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {task.dueDate}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Task actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
