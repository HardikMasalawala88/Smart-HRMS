"use client"

import { useState } from "react"
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, Plus, Save } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface TimesheetEntry {
  id: string
  project: string
  task: string
  hours: number[]
}

const mockTimesheetEntries: TimesheetEntry[] = [
  {
    id: "1",
    project: "Marketing Analytics",
    task: "Q1 Report Analysis",
    hours: [8, 7, 8, 6, 5, 0, 0],
  },
  {
    id: "2",
    project: "Product Launch",
    task: "Feature Development",
    hours: [0, 1, 0, 2, 3, 0, 0],
  },
  {
    id: "3",
    project: "Client Projects",
    task: "Client Meeting Prep",
    hours: [0, 0, 0, 0, 0, 0, 0],
  },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const weekDates = ["Jan 27", "Jan 28", "Jan 29", "Jan 30", "Jan 31", "Feb 1", "Feb 2"]

interface PreviousTimesheet {
  weekOf: string
  totalHours: number
  status: "submitted" | "approved" | "pending"
}

const previousTimesheets: PreviousTimesheet[] = [
  { weekOf: "Jan 20 - Jan 26, 2026", totalHours: 42, status: "approved" },
  { weekOf: "Jan 13 - Jan 19, 2026", totalHours: 40, status: "approved" },
  { weekOf: "Jan 6 - Jan 12, 2026", totalHours: 38, status: "approved" },
]

export default function TimesheetsPage() {
  const [entries, setEntries] = useState(mockTimesheetEntries)

  const calculateRowTotal = (hours: number[]) => hours.reduce((sum, h) => sum + h, 0)
  const calculateColumnTotal = (dayIndex: number) =>
    entries.reduce((sum, entry) => sum + entry.hours[dayIndex], 0)
  const calculateGrandTotal = () =>
    entries.reduce((sum, entry) => sum + calculateRowTotal(entry.hours), 0)

  const updateHours = (entryId: string, dayIndex: number, value: string) => {
    const numValue = Math.max(0, Math.min(24, parseInt(value) || 0))
    setEntries(prev =>
      prev.map(entry =>
        entry.id === entryId
          ? { ...entry, hours: entry.hours.map((h, i) => (i === dayIndex ? numValue : h)) }
          : entry
      )
    )
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Timesheets" },
        ]}
      />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Timesheets</h1>
              <p className="text-muted-foreground">
                Track and submit your weekly hours
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button className="gap-2">
                <Check className="h-4 w-4" />
                Submit Week
              </Button>
            </div>
          </div>

          {/* Week Selector */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <CardTitle className="text-lg">Week of Jan 27 - Feb 2, 2026</CardTitle>
                    <CardDescription>Current week</CardDescription>
                  </div>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">{calculateGrandTotal()}</span>
                  <span className="text-muted-foreground">/ 40 hrs</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Timesheet Grid */}
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Project / Task</TableHead>
                    {weekDays.map((day, i) => (
                      <TableHead key={day} className="w-[80px] text-center">
                        <div className="text-xs text-muted-foreground">{day}</div>
                        <div className="text-sm font-medium">{weekDates[i]}</div>
                      </TableHead>
                    ))}
                    <TableHead className="w-[80px] text-center">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{entry.project}</div>
                          <div className="text-xs text-muted-foreground">{entry.task}</div>
                        </div>
                      </TableCell>
                      {entry.hours.map((hours, dayIndex) => (
                        <TableCell key={dayIndex} className="p-1">
                          <Input
                            type="number"
                            min={0}
                            max={24}
                            value={hours || ""}
                            onChange={(e) => updateHours(entry.id, dayIndex, e.target.value)}
                            className={cn(
                              "h-10 w-16 text-center mx-auto",
                              dayIndex >= 5 && "bg-muted/50"
                            )}
                          />
                        </TableCell>
                      ))}
                      <TableCell className="text-center font-medium">
                        {calculateRowTotal(entry.hours)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/30 font-medium">
                    <TableCell>Daily Total</TableCell>
                    {weekDays.map((_, i) => (
                      <TableCell key={i} className="text-center">
                        {calculateColumnTotal(i)}
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-primary font-bold">
                      {calculateGrandTotal()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add Project Row */}
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Project Row
          </Button>

          {/* Previous Timesheets */}
          <Card>
            <CardHeader>
              <CardTitle>Previous Timesheets</CardTitle>
              <CardDescription>Your submitted timesheet history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {previousTimesheets.map((sheet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{sheet.weekOf}</p>
                        <p className="text-xs text-muted-foreground">{sheet.totalHours} hours logged</p>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        sheet.status === "approved"
                          ? "bg-success/10 text-success"
                          : sheet.status === "submitted"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {sheet.status}
                    </Badge>
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
