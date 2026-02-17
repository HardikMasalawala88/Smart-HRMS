"use client"

import { useState } from "react"
import { Calendar, Check, Clock, Plus, X } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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

type LeaveStatus = "pending" | "approved" | "rejected"
type LeaveType = "annual" | "sick" | "personal" | "unpaid"

interface LeaveRequest {
  id: string
  type: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: LeaveStatus
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    type: "annual",
    startDate: "Feb 15, 2026",
    endDate: "Feb 22, 2026",
    days: 5,
    reason: "Family vacation",
    status: "pending",
    submittedAt: "Feb 1, 2026",
  },
  {
    id: "2",
    type: "sick",
    startDate: "Jan 20, 2026",
    endDate: "Jan 21, 2026",
    days: 2,
    reason: "Not feeling well",
    status: "approved",
    submittedAt: "Jan 20, 2026",
    reviewedBy: "Sarah Johnson",
    reviewedAt: "Jan 20, 2026",
  },
  {
    id: "3",
    type: "personal",
    startDate: "Dec 24, 2025",
    endDate: "Dec 26, 2025",
    days: 3,
    reason: "Personal matters",
    status: "approved",
    submittedAt: "Dec 15, 2025",
    reviewedBy: "Sarah Johnson",
    reviewedAt: "Dec 16, 2025",
  },
  {
    id: "4",
    type: "annual",
    startDate: "Nov 10, 2025",
    endDate: "Nov 10, 2025",
    days: 1,
    reason: "Appointment",
    status: "rejected",
    submittedAt: "Nov 5, 2025",
    reviewedBy: "Sarah Johnson",
    reviewedAt: "Nov 6, 2025",
  },
]

const leaveBalance = {
  annual: { used: 7, total: 20 },
  sick: { used: 2, total: 10 },
  personal: { used: 3, total: 5 },
}

const statusStyles: Record<LeaveStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
}

const typeStyles: Record<LeaveType, string> = {
  annual: "bg-primary/10 text-primary",
  sick: "bg-destructive/10 text-destructive",
  personal: "bg-accent/10 text-accent",
  unpaid: "bg-muted text-muted-foreground",
}

export default function LeaveRequestsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Leave Requests" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Leave Requests</h1>
              <p className="text-muted-foreground">
                Manage your leave requests and view your balance
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Request Leave
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request Leave</DialogTitle>
                  <DialogDescription>
                    Submit a new leave request for approval
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Leave Type</Label>
                    <Select>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start">Start Date</Label>
                      <Input id="start" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end">End Date</Label>
                      <Input id="end" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your reason for leave..."
                      className="resize-none"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Leave Balance Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Annual Leave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {leaveBalance.annual.total - leaveBalance.annual.used}
                  </span>
                  <span className="text-muted-foreground">
                    / {leaveBalance.annual.total} days
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${((leaveBalance.annual.total - leaveBalance.annual.used) / leaveBalance.annual.total) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Sick Leave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {leaveBalance.sick.total - leaveBalance.sick.used}
                  </span>
                  <span className="text-muted-foreground">
                    / {leaveBalance.sick.total} days
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-destructive rounded-full"
                    style={{
                      width: `${((leaveBalance.sick.total - leaveBalance.sick.used) / leaveBalance.sick.total) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Personal Leave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {leaveBalance.personal.total - leaveBalance.personal.used}
                  </span>
                  <span className="text-muted-foreground">
                    / {leaveBalance.personal.total} days
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${((leaveBalance.personal.total - leaveBalance.personal.used) / leaveBalance.personal.total) * 100}%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leave Requests List */}
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
              <CardDescription>All your submitted leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaveRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("capitalize", typeStyles[request.type])}>
                            {request.type}
                          </Badge>
                          <Badge variant="outline" className={cn(statusStyles[request.status])}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {request.startDate} - {request.endDate} ({request.days} days)
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 sm:text-center">
                      <p className="text-sm">{request.reason}</p>
                    </div>
                    <div className="text-sm text-muted-foreground sm:text-right">
                      <p>Submitted: {request.submittedAt}</p>
                      {request.reviewedBy && (
                        <p>
                          Reviewed by {request.reviewedBy} on {request.reviewedAt}
                        </p>
                      )}
                    </div>
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
