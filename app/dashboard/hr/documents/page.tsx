"use client"

import React from "react"

import { useState } from "react"
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  Download, 
  Eye, 
  FileText, 
  Filter, 
  Search, 
  User, 
  X 
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type DocumentStatus = "pending" | "approved" | "rejected"

interface EmployeeDocument {
  id: string
  name: string
  type: string
  status: DocumentStatus
  uploadedAt: string
  fileSize: string
  reviewedBy?: string
  reviewedAt?: string
}

interface EmployeeWithDocuments {
  id: string
  name: string
  email: string
  avatar: string
  department: string
  employeeId: string
  documents: EmployeeDocument[]
}

const mockEmployees: EmployeeWithDocuments[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    avatar: "",
    department: "Engineering",
    employeeId: "EMP001",
    documents: [
      {
        id: "d1",
        name: "Government ID",
        type: "ID Verification",
        status: "approved",
        uploadedAt: "Jan 15, 2026",
        fileSize: "2.4 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 16, 2026",
      },
      {
        id: "d2",
        name: "Employment Contract",
        type: "Contract",
        status: "approved",
        uploadedAt: "Jan 10, 2026",
        fileSize: "1.8 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 11, 2026",
      },
      {
        id: "d3",
        name: "Tax Form W-4",
        type: "Tax Document",
        status: "pending",
        uploadedAt: "Jan 28, 2026",
        fileSize: "856 KB",
      },
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    avatar: "",
    department: "Design",
    employeeId: "EMP002",
    documents: [
      {
        id: "d4",
        name: "Government ID",
        type: "ID Verification",
        status: "approved",
        uploadedAt: "Jan 12, 2026",
        fileSize: "1.9 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 13, 2026",
      },
      {
        id: "d5",
        name: "Professional Certification",
        type: "Certification",
        status: "pending",
        uploadedAt: "Jan 25, 2026",
        fileSize: "3.2 MB",
      },
      {
        id: "d6",
        name: "Background Check",
        type: "Authorization",
        status: "rejected",
        uploadedAt: "Jan 20, 2026",
        fileSize: "1.2 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 22, 2026",
      },
    ],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    avatar: "",
    department: "Marketing",
    employeeId: "EMP003",
    documents: [
      {
        id: "d7",
        name: "Government ID",
        type: "ID Verification",
        status: "approved",
        uploadedAt: "Jan 18, 2026",
        fileSize: "2.1 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 19, 2026",
      },
      {
        id: "d8",
        name: "Employment Contract",
        type: "Contract",
        status: "approved",
        uploadedAt: "Jan 18, 2026",
        fileSize: "1.5 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 19, 2026",
      },
      {
        id: "d9",
        name: "Tax Form W-4",
        type: "Tax Document",
        status: "approved",
        uploadedAt: "Jan 18, 2026",
        fileSize: "780 KB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 20, 2026",
      },
      {
        id: "d10",
        name: "Emergency Contact Form",
        type: "Form",
        status: "approved",
        uploadedAt: "Jan 19, 2026",
        fileSize: "420 KB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 20, 2026",
      },
    ],
  },
  {
    id: "4",
    name: "David Park",
    email: "david.park@company.com",
    avatar: "",
    department: "Engineering",
    employeeId: "EMP004",
    documents: [
      {
        id: "d11",
        name: "Government ID",
        type: "ID Verification",
        status: "pending",
        uploadedAt: "Jan 30, 2026",
        fileSize: "2.8 MB",
      },
      {
        id: "d12",
        name: "Employment Contract",
        type: "Contract",
        status: "pending",
        uploadedAt: "Jan 30, 2026",
        fileSize: "1.6 MB",
      },
    ],
  },
  {
    id: "5",
    name: "Jessica Williams",
    email: "jessica.williams@company.com",
    avatar: "",
    department: "HR",
    employeeId: "EMP005",
    documents: [
      {
        id: "d13",
        name: "Government ID",
        type: "ID Verification",
        status: "approved",
        uploadedAt: "Jan 5, 2026",
        fileSize: "2.2 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 6, 2026",
      },
      {
        id: "d14",
        name: "Employment Contract",
        type: "Contract",
        status: "approved",
        uploadedAt: "Jan 5, 2026",
        fileSize: "1.9 MB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 6, 2026",
      },
      {
        id: "d15",
        name: "Tax Form W-4",
        type: "Tax Document",
        status: "approved",
        uploadedAt: "Jan 5, 2026",
        fileSize: "650 KB",
        reviewedBy: "HR Team",
        reviewedAt: "Jan 7, 2026",
      },
    ],
  },
]

const statusConfig: Record<DocumentStatus, { badge: string; icon: React.ElementType; label: string }> = {
  pending: { badge: "bg-warning/10 text-warning border-warning/20", icon: Clock, label: "Pending" },
  approved: { badge: "bg-success/10 text-success border-success/20", icon: Check, label: "Approved" },
  rejected: { badge: "bg-destructive/10 text-destructive border-destructive/20", icon: X, label: "Rejected" },
}

export default function HRDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedEmployees, setExpandedEmployees] = useState<Set<string>>(new Set(["1", "2"]))

  const departments = [...new Set(mockEmployees.map(e => e.department))]

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    
    const matchesStatus = statusFilter === "all" || 
      employee.documents.some(doc => doc.status === statusFilter)
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const toggleEmployee = (employeeId: string) => {
    setExpandedEmployees(prev => {
      const newSet = new Set(prev)
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId)
      } else {
        newSet.add(employeeId)
      }
      return newSet
    })
  }

  const getEmployeeStats = (documents: EmployeeDocument[]) => {
    return {
      total: documents.length,
      approved: documents.filter(d => d.status === "approved").length,
      pending: documents.filter(d => d.status === "pending").length,
      rejected: documents.filter(d => d.status === "rejected").length,
    }
  }

  const totalStats = {
    employees: mockEmployees.length,
    documents: mockEmployees.reduce((acc, emp) => acc + emp.documents.length, 0),
    pending: mockEmployees.reduce((acc, emp) => acc + emp.documents.filter(d => d.status === "pending").length, 0),
    approved: mockEmployees.reduce((acc, emp) => acc + emp.documents.filter(d => d.status === "approved").length, 0),
    rejected: mockEmployees.reduce((acc, emp) => acc + emp.documents.filter(d => d.status === "rejected").length, 0),
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "HR", href: "/dashboard/hr/employees" },
          { label: "All Documents" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Employee Documents</h1>
              <p className="text-muted-foreground">
                View and manage all employee documents by person
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Documents</CardDescription>
                <CardTitle className="text-3xl">{totalStats.documents}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  From {totalStats.employees} employees
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Approved</CardDescription>
                <CardTitle className="text-3xl text-success">{totalStats.approved}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {Math.round((totalStats.approved / totalStats.documents) * 100)}% of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Review</CardDescription>
                <CardTitle className="text-3xl text-warning">{totalStats.pending}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Awaiting verification
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Rejected</CardDescription>
                <CardTitle className="text-3xl text-destructive">{totalStats.rejected}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Need re-upload
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or employee ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Documents List */}
          <div className="space-y-4">
            {filteredEmployees.map(employee => {
              const stats = getEmployeeStats(employee.documents)
              const isExpanded = expandedEmployees.has(employee.id)
              const filteredDocs = statusFilter === "all" 
                ? employee.documents 
                : employee.documents.filter(d => d.status === statusFilter)

              return (
                <Collapsible
                  key={employee.id}
                  open={isExpanded}
                  onOpenChange={() => toggleEmployee(employee.id)}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={employee.avatar || undefined} alt={employee.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {employee.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">{employee.name}</CardTitle>
                                <Badge variant="outline" className="text-xs">
                                  {employee.employeeId}
                                </Badge>
                              </div>
                              <CardDescription className="flex items-center gap-2">
                                {employee.email} 
                                <span className="text-muted-foreground/50">|</span>
                                {employee.department}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-success" />
                                {stats.approved}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-warning" />
                                {stats.pending}
                              </span>
                              {stats.rejected > 0 && (
                                <span className="flex items-center gap-1">
                                  <span className="h-2 w-2 rounded-full bg-destructive" />
                                  {stats.rejected}
                                </span>
                              )}
                            </div>
                            <Badge variant="secondary">
                              {stats.total} docs
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-muted/50">
                                <TableHead>Document</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Uploaded</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Reviewed</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredDocs.map(doc => {
                                const { badge, icon: StatusIcon } = statusConfig[doc.status]
                                return (
                                  <TableRow key={doc.id}>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{doc.name}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {doc.type}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {doc.uploadedAt}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {doc.fileSize}
                                    </TableCell>
                                    <TableCell>
                                      <Badge className={cn("capitalize border", badge)}>
                                        <StatusIcon className="h-3 w-3 mr-1" />
                                        {doc.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                      {doc.reviewedBy ? (
                                        <span className="text-xs">
                                          {doc.reviewedBy}
                                          <br />
                                          <span className="text-muted-foreground/70">{doc.reviewedAt}</span>
                                        </span>
                                      ) : (
                                        <span className="text-muted-foreground/50">-</span>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <Eye className="h-4 w-4" />
                                          <span className="sr-only">View</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <Download className="h-4 w-4" />
                                          <span className="sr-only">Download</span>
                                        </Button>
                                        {doc.status === "pending" && (
                                          <>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                                              <Check className="h-4 w-4" />
                                              <span className="sr-only">Approve</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                              <X className="h-4 w-4" />
                                              <span className="sr-only">Reject</span>
                                            </Button>
                                          </>
                                        )}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )
            })}

            {filteredEmployees.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <User className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No employees found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
