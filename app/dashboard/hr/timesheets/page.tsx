"use client"

import * as React from "react"
import { useState } from "react"
import {
  Clock,
  Search,
  Filter,
  Download,
  Check,
  X,
  ChevronDown,
  Calendar,
  User,
  Building2,
  MoreHorizontal,
  Eye,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock timesheet data
const timesheetSubmissions = [
  {
    id: "1",
    employee: {
      id: "EMP001",
      name: "John Smith",
      email: "john.smith@acme.com",
      avatar: "/avatars/john.jpg",
      department: "Engineering",
    },
    weekStarting: "2026-01-26",
    weekEnding: "2026-02-01",
    totalHours: 42.5,
    regularHours: 40,
    overtimeHours: 2.5,
    status: "pending",
    submittedAt: "2026-02-01T17:30:00",
    entries: [
      { date: "2026-01-26", project: "Mobile App v2", hours: 8, description: "Sprint planning and feature development" },
      { date: "2026-01-27", project: "Mobile App v2", hours: 8.5, description: "API integration work" },
      { date: "2026-01-28", project: "Mobile App v2", hours: 8, description: "Bug fixes and testing" },
      { date: "2026-01-29", project: "Internal Tools", hours: 9, description: "Dashboard improvements" },
      { date: "2026-01-30", project: "Mobile App v2", hours: 9, description: "Code review and deployment" },
    ],
  },
  {
    id: "2",
    employee: {
      id: "EMP002",
      name: "Emily Chen",
      email: "emily.chen@acme.com",
      avatar: "/avatars/emily.jpg",
      department: "Design",
    },
    weekStarting: "2026-01-26",
    weekEnding: "2026-02-01",
    totalHours: 40,
    regularHours: 40,
    overtimeHours: 0,
    status: "approved",
    submittedAt: "2026-02-01T16:00:00",
    approvedAt: "2026-02-02T09:15:00",
    approvedBy: "Sarah Johnson",
    entries: [
      { date: "2026-01-26", project: "Brand Refresh", hours: 8, description: "Logo variations" },
      { date: "2026-01-27", project: "Brand Refresh", hours: 8, description: "Color palette finalization" },
      { date: "2026-01-28", project: "Mobile App v2", hours: 8, description: "UI mockups" },
      { date: "2026-01-29", project: "Mobile App v2", hours: 8, description: "Icon design" },
      { date: "2026-01-30", project: "Brand Refresh", hours: 8, description: "Guidelines document" },
    ],
  },
  {
    id: "3",
    employee: {
      id: "EMP003",
      name: "Michael Brown",
      email: "michael.brown@acme.com",
      avatar: "/avatars/michael.jpg",
      department: "Engineering",
    },
    weekStarting: "2026-01-26",
    weekEnding: "2026-02-01",
    totalHours: 35,
    regularHours: 35,
    overtimeHours: 0,
    status: "rejected",
    submittedAt: "2026-02-01T18:00:00",
    rejectedAt: "2026-02-02T10:30:00",
    rejectedBy: "Sarah Johnson",
    rejectionReason: "Missing project details for Wednesday and Thursday. Please update and resubmit.",
    entries: [
      { date: "2026-01-26", project: "Backend Services", hours: 8, description: "API optimization" },
      { date: "2026-01-27", project: "Backend Services", hours: 7, description: "Database migration" },
      { date: "2026-01-28", project: "", hours: 6, description: "" },
      { date: "2026-01-29", project: "", hours: 7, description: "" },
      { date: "2026-01-30", project: "Backend Services", hours: 7, description: "Testing" },
    ],
  },
  {
    id: "4",
    employee: {
      id: "EMP004",
      name: "Sarah Wilson",
      email: "sarah.wilson@acme.com",
      avatar: "/avatars/sarah-w.jpg",
      department: "Marketing",
    },
    weekStarting: "2026-01-26",
    weekEnding: "2026-02-01",
    totalHours: 45,
    regularHours: 40,
    overtimeHours: 5,
    status: "pending",
    submittedAt: "2026-02-01T19:00:00",
    entries: [
      { date: "2026-01-26", project: "Q1 Campaign", hours: 9, description: "Campaign strategy meeting" },
      { date: "2026-01-27", project: "Q1 Campaign", hours: 9, description: "Content creation" },
      { date: "2026-01-28", project: "Q1 Campaign", hours: 9, description: "Social media scheduling" },
      { date: "2026-01-29", project: "Analytics Review", hours: 9, description: "Monthly report" },
      { date: "2026-01-30", project: "Q1 Campaign", hours: 9, description: "Ad copy review" },
    ],
  },
  {
    id: "5",
    employee: {
      id: "EMP005",
      name: "David Lee",
      email: "david.lee@acme.com",
      avatar: "/avatars/david.jpg",
      department: "Sales",
    },
    weekStarting: "2026-01-26",
    weekEnding: "2026-02-01",
    totalHours: 40,
    regularHours: 40,
    overtimeHours: 0,
    status: "approved",
    submittedAt: "2026-02-01T17:00:00",
    approvedAt: "2026-02-02T08:45:00",
    approvedBy: "Sarah Johnson",
    entries: [
      { date: "2026-01-26", project: "Client Outreach", hours: 8, description: "Prospect calls" },
      { date: "2026-01-27", project: "Client Outreach", hours: 8, description: "Demo presentations" },
      { date: "2026-01-28", project: "Client Outreach", hours: 8, description: "Follow-up emails" },
      { date: "2026-01-29", project: "Team Training", hours: 8, description: "New product training" },
      { date: "2026-01-30", project: "Client Outreach", hours: 8, description: "Contract negotiations" },
    ],
  },
]

const departments = ["All Departments", "Engineering", "Design", "Marketing", "Sales", "HR", "Finance"]

export default function HRTimesheetsPage() {
  const [timesheets, setTimesheets] = useState(timesheetSubmissions)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("All Departments")
  const [selectedTimesheet, setSelectedTimesheet] = useState<typeof timesheetSubmissions[0] | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  const filteredTimesheets = timesheets.filter((ts) => {
    const matchesSearch =
      ts.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ts.employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ts.employee.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || ts.status === statusFilter
    const matchesDepartment =
      departmentFilter === "All Departments" || ts.employee.department === departmentFilter
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleApprove = (id: string) => {
    setTimesheets(
      timesheets.map((ts) =>
        ts.id === id
          ? { ...ts, status: "approved", approvedAt: new Date().toISOString(), approvedBy: "Sarah Johnson" }
          : ts
      )
    )
    setSelectedTimesheet(null)
  }

  const handleReject = () => {
    if (selectedTimesheet) {
      setTimesheets(
        timesheets.map((ts) =>
          ts.id === selectedTimesheet.id
            ? {
                ...ts,
                status: "rejected",
                rejectedAt: new Date().toISOString(),
                rejectedBy: "Sarah Johnson",
                rejectionReason,
              }
            : ts
        )
      )
      setSelectedTimesheet(null)
      setIsRejectDialogOpen(false)
      setRejectionReason("")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
      case "approved":
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const pendingCount = timesheets.filter((ts) => ts.status === "pending").length
  const approvedCount = timesheets.filter((ts) => ts.status === "approved").length
  const rejectedCount = timesheets.filter((ts) => ts.status === "rejected").length
  const totalHours = timesheets.reduce((acc, ts) => acc + ts.totalHours, 0)
  const totalOvertime = timesheets.reduce((acc, ts) => acc + ts.overtimeHours, 0)

  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "HR Management", href: "/dashboard/hr/employees" },
          { label: "Timesheet Review" },
        ]}
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Timesheet Review</h1>
            <p className="text-muted-foreground">
              Review and approve employee timesheet submissions
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Check className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <X className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <p className="text-xs text-muted-foreground">Needs revision</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">All submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Overtime</CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOvertime.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Extra hours logged</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>Review and manage timesheet submissions</CardDescription>
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-full md:w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Week Period</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead className="hidden lg:table-cell">Overtime</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTimesheets.map((ts) => (
                  <TableRow key={ts.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={ts.employee.avatar || "/placeholder.svg"} alt={ts.employee.name} />
                          <AvatarFallback>
                            {ts.employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{ts.employee.name}</div>
                          <div className="text-xs text-muted-foreground">{ts.employee.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {formatDate(ts.weekStarting)} - {formatDate(ts.weekEnding)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{ts.totalHours}h</div>
                      <Progress value={(ts.totalHours / 45) * 100} className="h-1 w-16 mt-1" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {ts.overtimeHours > 0 ? (
                        <Badge variant="outline" className="bg-accent/10 text-accent">
                          +{ts.overtimeHours}h
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(ts.status)}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {formatDate(ts.submittedAt)}
                      <br />
                      {formatTime(ts.submittedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {ts.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-success hover:text-success bg-transparent"
                              onClick={() => handleApprove(ts.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-destructive hover:text-destructive bg-transparent"
                              onClick={() => {
                                setSelectedTimesheet(ts)
                                setIsRejectDialogOpen(true)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedTimesheet(ts)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Details Dialog */}
        <Dialog open={!!selectedTimesheet && !isRejectDialogOpen} onOpenChange={(open) => !open && setSelectedTimesheet(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Timesheet Details</DialogTitle>
              <DialogDescription>
                Week of {selectedTimesheet && formatDate(selectedTimesheet.weekStarting)} -{" "}
                {selectedTimesheet && formatDate(selectedTimesheet.weekEnding)}
              </DialogDescription>
            </DialogHeader>
            {selectedTimesheet && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedTimesheet.employee.avatar || "/placeholder.svg"} alt={selectedTimesheet.employee.name} />
                    <AvatarFallback>
                      {selectedTimesheet.employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedTimesheet.employee.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedTimesheet.employee.department} | {selectedTimesheet.employee.id}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    {getStatusBadge(selectedTimesheet.status)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-2xl font-bold">{selectedTimesheet.totalHours}h</div>
                    <div className="text-xs text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-2xl font-bold">{selectedTimesheet.regularHours}h</div>
                    <div className="text-xs text-muted-foreground">Regular</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-2xl font-bold text-accent">{selectedTimesheet.overtimeHours}h</div>
                    <div className="text-xs text-muted-foreground">Overtime</div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTimesheet.entries.map((entry, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">
                            {new Date(entry.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </TableCell>
                          <TableCell>{entry.project || <span className="text-destructive">Missing</span>}</TableCell>
                          <TableCell>{entry.hours}h</TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {entry.description || <span className="text-destructive">Missing</span>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {selectedTimesheet.status === "rejected" && selectedTimesheet.rejectionReason && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="text-sm font-medium text-destructive mb-1">Rejection Reason</div>
                    <div className="text-sm">{selectedTimesheet.rejectionReason}</div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              {selectedTimesheet?.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    className="text-destructive bg-transparent"
                    onClick={() => setIsRejectDialogOpen(true)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(selectedTimesheet.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
              {selectedTimesheet?.status !== "pending" && (
                <Button variant="outline" onClick={() => setSelectedTimesheet(null)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Timesheet</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this timesheet submission.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this timesheet is being rejected..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
              >
                Reject Timesheet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
