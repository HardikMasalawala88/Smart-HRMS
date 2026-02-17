import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActiveEmployees } from "@/components/dashboard/active-employees"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { PendingRequests } from "@/components/dashboard/pending-requests"
import { TimesheetReminder } from "@/components/dashboard/timesheet-reminder"

// Mock role - in production this would come from auth context
const userRole = "admin" as const

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: "Dashboard" }]} />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">
              Here's what's happening in your organization today.
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards role={userRole} />

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pending Requests - Full width on mobile, half on desktop */}
            <PendingRequests />

            {/* Timesheet Reminder */}
            <TimesheetReminder />
          </div>

          {/* Secondary Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Active Employees */}
            <ActiveEmployees />

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  )
}
