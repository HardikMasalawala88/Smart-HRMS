"use client"

import React from "react"

import { useState } from "react"
import { Check, Clock, Download, Eye, FileText, Upload, X } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type DocumentStatus = "required" | "pending" | "approved" | "rejected"

interface Document {
  id: string
  name: string
  type: string
  status: DocumentStatus
  uploadedAt?: string
  expiresAt?: string
  fileSize?: string
  reviewedBy?: string
  reviewNote?: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Government ID",
    type: "ID Verification",
    status: "approved",
    uploadedAt: "Jan 15, 2026",
    expiresAt: "Jan 15, 2031",
    fileSize: "2.4 MB",
    reviewedBy: "HR Team",
  },
  {
    id: "2",
    name: "Employment Contract",
    type: "Contract",
    status: "approved",
    uploadedAt: "Jan 10, 2026",
    fileSize: "1.8 MB",
    reviewedBy: "HR Team",
  },
  {
    id: "3",
    name: "Tax Form W-4",
    type: "Tax Document",
    status: "pending",
    uploadedAt: "Jan 28, 2026",
    fileSize: "856 KB",
  },
  {
    id: "4",
    name: "Professional Certification",
    type: "Certification",
    status: "required",
  },
  {
    id: "5",
    name: "Background Check Authorization",
    type: "Authorization",
    status: "rejected",
    uploadedAt: "Jan 20, 2026",
    fileSize: "1.2 MB",
    reviewedBy: "HR Team",
    reviewNote: "Document is illegible. Please upload a clearer copy.",
  },
  {
    id: "6",
    name: "Emergency Contact Form",
    type: "Form",
    status: "required",
  },
]

const statusStyles: Record<DocumentStatus, { badge: string; icon: React.ElementType }> = {
  required: { badge: "bg-destructive/10 text-destructive", icon: Clock },
  pending: { badge: "bg-warning/10 text-warning", icon: Clock },
  approved: { badge: "bg-success/10 text-success", icon: Check },
  rejected: { badge: "bg-destructive/10 text-destructive", icon: X },
}

export default function DocumentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const documentCounts = {
    total: mockDocuments.length,
    approved: mockDocuments.filter(d => d.status === "approved").length,
    pending: mockDocuments.filter(d => d.status === "pending").length,
    required: mockDocuments.filter(d => d.status === "required" || d.status === "rejected").length,
  }

  const completionRate = Math.round((documentCounts.approved / documentCounts.total) * 100)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Documents" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Documents</h1>
              <p className="text-muted-foreground">
                Upload and manage your required documents
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                  <DialogDescription>
                    Upload a required document for verification
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="docType">Document Type</Label>
                    <Select>
                      <SelectTrigger id="docType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">ID Verification</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="tax">Tax Document</SelectItem>
                        <SelectItem value="cert">Certification</SelectItem>
                        <SelectItem value="auth">Authorization</SelectItem>
                        <SelectItem value="form">Form</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                    <Input id="file" type="file" className="hidden" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Progress Card */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Document Completion</CardTitle>
                <span className="text-2xl font-bold text-primary">{completionRate}%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={completionRate} className="h-2" />
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    {documentCounts.approved} Approved
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-warning" />
                    {documentCounts.pending} Pending
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                    {documentCounts.required} Required
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockDocuments.map((doc) => {
              const { badge, icon: StatusIcon } = statusStyles[doc.status]
              return (
                <Card key={doc.id} className={cn(
                  doc.status === "required" && "border-destructive/50",
                  doc.status === "rejected" && "border-destructive/50"
                )}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          doc.status === "approved" ? "bg-success/10" : "bg-primary/10"
                        )}>
                          <FileText className={cn(
                            "h-5 w-5",
                            doc.status === "approved" ? "text-success" : "text-primary"
                          )} />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{doc.name}</CardTitle>
                          <CardDescription className="text-xs">{doc.type}</CardDescription>
                        </div>
                      </div>
                      <Badge className={cn("capitalize", badge)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {doc.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {doc.status === "required" ? (
                      <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                        <Upload className="h-4 w-4" />
                        Upload Now
                      </Button>
                    ) : doc.status === "rejected" ? (
                      <div className="space-y-2">
                        <p className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                          {doc.reviewNote}
                        </p>
                        <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                          <Upload className="h-4 w-4" />
                          Re-upload
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Uploaded: {doc.uploadedAt}</span>
                          <span>{doc.fileSize}</span>
                        </div>
                        {doc.expiresAt && (
                          <p className="text-xs text-muted-foreground">
                            Expires: {doc.expiresAt}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
