"use client"

import { useState } from "react"
import { Building2, Edit, MoreHorizontal, Plus, Trash2, Users } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface Department {
  id: string
  name: string
  description: string
  head: {
    name: string
    avatar?: string
  }
  employeeCount: number
  activeProjects: number
  color: string
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    description: "Software development and technical infrastructure",
    head: { name: "Michael Chen" },
    employeeCount: 45,
    activeProjects: 8,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "2",
    name: "Design",
    description: "Product design, UI/UX, and brand identity",
    head: { name: "Emily Rodriguez", avatar: "/avatars/emily.jpg" },
    employeeCount: 12,
    activeProjects: 5,
    color: "bg-accent/10 text-accent",
  },
  {
    id: "3",
    name: "Marketing",
    description: "Brand marketing, content, and campaigns",
    head: { name: "James Wilson" },
    employeeCount: 18,
    activeProjects: 6,
    color: "bg-success/10 text-success",
  },
  {
    id: "4",
    name: "Sales",
    description: "Business development and customer acquisition",
    head: { name: "David Brown" },
    employeeCount: 24,
    activeProjects: 3,
    color: "bg-warning/10 text-warning",
  },
  {
    id: "5",
    name: "Human Resources",
    description: "Employee relations, recruitment, and culture",
    head: { name: "Sarah Johnson" },
    employeeCount: 8,
    activeProjects: 2,
    color: "bg-destructive/10 text-destructive",
  },
  {
    id: "6",
    name: "Finance",
    description: "Financial planning, accounting, and budgeting",
    head: { name: "Lisa Wang" },
    employeeCount: 10,
    activeProjects: 2,
    color: "bg-muted text-muted-foreground",
  },
]

export default function DepartmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const totalEmployees = mockDepartments.reduce((sum, d) => sum + d.employeeCount, 0)
  const totalProjects = mockDepartments.reduce((sum, d) => sum + d.activeProjects, 0)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Administration" },
          { label: "Departments" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Departments</h1>
              <p className="text-muted-foreground">
                Manage organizational structure and departments
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Department
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create Department</DialogTitle>
                  <DialogDescription>
                    Add a new department to your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Department Name</Label>
                    <Input id="name" placeholder="e.g., Customer Support" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the department..."
                      className="resize-none"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="head">Department Head</Label>
                    <Select>
                      <SelectTrigger id="head">
                        <SelectValue placeholder="Select department head" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="michael">Michael Chen</SelectItem>
                        <SelectItem value="emily">Emily Rodriguez</SelectItem>
                        <SelectItem value="james">James Wilson</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Create Department</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{mockDepartments.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalEmployees}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalProjects}</p>
              </CardContent>
            </Card>
          </div>

          {/* Departments Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockDepartments.map((department) => (
              <Card key={department.id} className="relative overflow-hidden">
                <div className={cn("absolute top-0 left-0 w-1 h-full", department.color.replace("/10", ""))} />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-2 rounded-lg", department.color)}>
                      <Building2 className="h-5 w-5" />
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
                          Edit Department
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          View Employees
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-lg mt-2">{department.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {department.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={department.head.avatar || "/placeholder.svg"} alt={department.head.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {department.head.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{department.head.name}</p>
                      <p className="text-xs text-muted-foreground">Department Head</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{department.employeeCount} employees</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {department.activeProjects} projects
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
