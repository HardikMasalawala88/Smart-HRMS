"use client"

import { useState } from "react"
import { Calendar, Check, Filter, Search, X } from "lucide-react"
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
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type LeaveStatus = "pending" | "approved" | "rejected"
type LeaveType = "annual" | "sick" | "personal" | "unpaid"

interface LeaveRequest {
  id: string
  employee: {
    name: string
    email: string
    avatar?: string
    department: string
  }
  type: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: LeaveStatus
  submittedAt: string
  reviewedAt?: string
  reviewNote?: string
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employee: {
      name: "John Smith",
      email: "john.smith@acme.com",
      department: "Engineering",
    },
    type: "annual",
    startDate: "Feb 15, 2026",
    endDate: "Feb 22, 2026",
    days: 5,
    reason: "Family vacation to Hawaii. Have been planning this for a while and all flights and hotels are already booked.",
    status: "pending",
    submittedAt: "Feb 1, 2026",
  },
  {
    id: "2",
    employee: {
      name: "Anna Lee",
      email: "anna.lee@acme.com",
      avatar: "/avatars/anna.jpg",
      department: "Marketing",
    },
    type: "sick",
    startDate: "Feb 3, 2026",
    endDate: "Feb 4, 2026",
    days: 2,
    reason: "Feeling unwell, need to rest and recover.",
    status: "pending",
    submittedAt: "Feb 3, 2026",
  },
  {
    id: "3",
    employee: {
      name: "Robert Taylor",
      email: "robert.taylor@acme.com",
      department: "Sales",
    },
    type: "personal",
    startDate: "Feb 10, 2026",
    endDate: "Feb 10, 2026",
    days: 1,
    reason: "Personal appointment that cannot be rescheduled.",
    status: "pending",
    submittedAt: "Feb 2, 2026",
  },
  {
    id: "4",
    employee: {
      name: "Emily Chen",
      email: "emily.chen@acme.com",
      department: "Design",
    },
    type: "annual",
    startDate: "Jan 27, 2026",
    endDate: "Jan 31, 2026",
    days: 5,
    reason: "Year end vacation",
    status: "approved",
    submittedAt: "Jan 15, 2026",
    reviewedAt: "Jan 16, 2026",
  },
  {
    id: "5",
    employee: {
      name: "Mike Johnson",
      email: "mike.johnson@acme.com",
      department: "Engineering",
    },
    type: "unpaid",
    startDate: "Feb 20, 2026",
    endDate: "Feb 28, 2026",
    days: 7,
    reason: "Extended travel abroad",
    status: "rejected",
    submittedAt: "Jan 28, 2026",
    reviewedAt: "Jan 29, 2026",
    reviewNote: "Request conflicts with critical project deadline. Please reschedule.",
  },
]

const typeStyles: Record<LeaveType, string> = {
  annual: "bg-primary/10 text-primary",
  sick: "bg-destructive/10 text-destructive",
  personal: "bg-accent/10 text-accent",
  unpaid: "bg-muted text-muted-foreground",
}

const statusStyles: Record<LeaveStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
}

export default function LeaveApprovalsPage() {
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">("approve")

  const pendingRequests = mockLeaveRequests.filter((r) => r.status === "pending")
  const approvedRequests = mockLeaveRequests.filter((r) => r.status === "approved")
  const rejectedRequests = mockLeaveRequests.filter((r) => r.status === "rejected")

  const openReviewDialog = (request: LeaveRequest, action: "approve" | "reject") => {
    setSelectedRequest(request)
    setReviewAction(action)
    setIsReviewDialogOpen(true)
  }

  const LeaveCard = ({ request }: { request: LeaveRequest }) => (
    <Card className={cn(
      request.status === "pending" && "border-warning/30"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={request.employee.avatar || "/placeholder.svg"} alt={request.employee.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {request.employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <p className="font-medium">{request.employee.name}</p>
                <p className="text-xs text-muted-foreground">{request.employee.department}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={cn("capitalize", typeStyles[request.type])}>
                  {request.type}
                </Badge>
                <Badge variant="outline" className={cn(statusStyles[request.status])}>
                  {request.status}
                </Badge>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{request.startDate} - {request.endDate}</span>
              <span className="text-muted-foreground">({request.days} days)</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {request.reason}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Submitted: {request.submittedAt}
              </p>
              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => openReviewDialog(request, "reject")}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-success hover:text-success hover:bg-success/10"
                    onClick={() => openReviewDialog(request, "approve")}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              )}
              {request.reviewNote && (
                <p className="text-xs text-muted-foreground">
                  Note: {request.reviewNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "HR Management" },
          { label: "Leave Approvals" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leave Approvals</h1>
            <p className="text-muted-foreground">
              Review and manage employee leave requests
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-warning/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-warning">{pendingRequests.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Approved This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-success">{approvedRequests.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rejected This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive">{rejectedRequests.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by employee name..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Leave Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="sick">Sick</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending" className="gap-2">
                Pending
                <Badge className="h-5 w-5 p-0 justify-center bg-warning/10 text-warning">
                  {pendingRequests.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <LeaveCard key={request.id} request={request} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No pending leave requests</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            <TabsContent value="approved" className="mt-4">
              <div className="space-y-4">
                {approvedRequests.map((request) => (
                  <LeaveCard key={request.id} request={request} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="rejected" className="mt-4">
              <div className="space-y-4">
                {rejectedRequests.map((request) => (
                  <LeaveCard key={request.id} request={request} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" ? "Approve" : "Reject"} Leave Request
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approve"
                ? "Confirm approval of this leave request"
                : "Provide a reason for rejecting this request"}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="py-4">
              <div className="rounded-lg border border-border p-3 bg-muted/50">
                <p className="font-medium">{selectedRequest.employee.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedRequest.startDate} - {selectedRequest.endDate} ({selectedRequest.days} days)
                </p>
              </div>
              {reviewAction === "reject" && (
                <div className="mt-4 grid gap-2">
                  <Label htmlFor="reason">Rejection Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for rejection..."
                    className="resize-none"
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={reviewAction === "approve" ? "default" : "destructive"}
              onClick={() => setIsReviewDialogOpen(false)}
            >
              {reviewAction === "approve" ? "Approve Request" : "Reject Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
