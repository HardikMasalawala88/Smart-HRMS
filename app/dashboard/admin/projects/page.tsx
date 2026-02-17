"use client"

import { useState } from "react"
import { Calendar, Edit, FolderKanban, MoreHorizontal, Plus, Trash2, Users } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
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

type ProjectStatus = "planning" | "in_progress" | "on_hold" | "completed"

interface Project {
  id: string
  name: string
  description: string
  department: string
  status: ProjectStatus
  progress: number
  startDate: string
  endDate: string
  teamSize: number
  lead: {
    name: string
    avatar?: string
  }
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    department: "Design",
    status: "in_progress",
    progress: 65,
    startDate: "Jan 1, 2026",
    endDate: "Mar 31, 2026",
    teamSize: 8,
    lead: { name: "Emily Rodriguez" },
  },
  {
    id: "2",
    name: "Mobile App v2.0",
    description: "New version of mobile app with enhanced features",
    department: "Engineering",
    status: "in_progress",
    progress: 40,
    startDate: "Dec 1, 2025",
    endDate: "Apr 30, 2026",
    teamSize: 12,
    lead: { name: "Michael Chen" },
  },
  {
    id: "3",
    name: "Q1 Marketing Campaign",
    description: "Multi-channel marketing campaign for Q1 product launch",
    department: "Marketing",
    status: "planning",
    progress: 15,
    startDate: "Feb 1, 2026",
    endDate: "Mar 31, 2026",
    teamSize: 6,
    lead: { name: "James Wilson" },
  },
  {
    id: "4",
    name: "CRM Integration",
    description: "Integration of new CRM system across sales team",
    department: "Sales",
    status: "on_hold",
    progress: 30,
    startDate: "Nov 1, 2025",
    endDate: "Feb 28, 2026",
    teamSize: 5,
    lead: { name: "David Brown" },
  },
  {
    id: "5",
    name: "Employee Portal",
    description: "Internal employee self-service portal development",
    department: "HR",
    status: "completed",
    progress: 100,
    startDate: "Sep 1, 2025",
    endDate: "Dec 31, 2025",
    teamSize: 4,
    lead: { name: "Sarah Johnson" },
  },
  {
    id: "6",
    name: "Data Analytics Platform",
    description: "Build internal analytics and reporting dashboard",
    department: "Engineering",
    status: "in_progress",
    progress: 75,
    startDate: "Oct 15, 2025",
    endDate: "Feb 15, 2026",
    teamSize: 6,
    lead: { name: "Sophia Kim" },
  },
]

const statusStyles: Record<ProjectStatus, { badge: string; label: string }> = {
  planning: { badge: "bg-muted text-muted-foreground", label: "Planning" },
  in_progress: { badge: "bg-primary/10 text-primary", label: "In Progress" },
  on_hold: { badge: "bg-warning/10 text-warning", label: "On Hold" },
  completed: { badge: "bg-success/10 text-success", label: "Completed" },
}

export default function AdminProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const projectCounts = {
    total: mockProjects.length,
    in_progress: mockProjects.filter((p) => p.status === "in_progress").length,
    planning: mockProjects.filter((p) => p.status === "planning").length,
    completed: mockProjects.filter((p) => p.status === "completed").length,
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Administration" },
          { label: "Projects" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
              <p className="text-muted-foreground">
                Manage and track organizational projects
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Project</DialogTitle>
                  <DialogDescription>
                    Start a new project for your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input id="name" placeholder="e.g., New Product Launch" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the project goals and scope..."
                      className="resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lead">Project Lead</Label>
                      <Select>
                        <SelectTrigger id="lead">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="michael">Michael Chen</SelectItem>
                          <SelectItem value="emily">Emily Rodriguez</SelectItem>
                          <SelectItem value="james">James Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{projectCounts.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{projectCounts.in_progress}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-muted-foreground">{projectCounts.planning}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-success">{projectCounts.completed}</p>
              </CardContent>
            </Card>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Team
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge className={cn(statusStyles[project.status].badge)}>
                      {statusStyles[project.status].label}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>

                    {/* Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={project.lead.avatar || "/placeholder.svg"} alt={project.lead.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {project.lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{project.lead.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.teamSize} members
                      </Badge>
                    </div>

                    {/* Department */}
                    <Badge variant="outline" className="text-xs">
                      {project.department}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
