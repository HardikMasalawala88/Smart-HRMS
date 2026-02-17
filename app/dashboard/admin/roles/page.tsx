"use client"

import * as React from "react"
import { useState } from "react"
import {
  Shield,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Check,
  X,
  Lock,
  Unlock,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock roles data
const initialRoles = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    userCount: 2,
    isSystem: true,
    permissions: {
      dashboard: { view: true, edit: true, delete: true },
      employees: { view: true, edit: true, delete: true },
      leave: { view: true, edit: true, delete: true },
      timesheets: { view: true, edit: true, delete: true },
      documents: { view: true, edit: true, delete: true },
      departments: { view: true, edit: true, delete: true },
      projects: { view: true, edit: true, delete: true },
      roles: { view: true, edit: true, delete: true },
      settings: { view: true, edit: true, delete: true },
    },
  },
  {
    id: "2",
    name: "Admin",
    description: "Organization-level administrative access",
    userCount: 5,
    isSystem: true,
    permissions: {
      dashboard: { view: true, edit: true, delete: false },
      employees: { view: true, edit: true, delete: true },
      leave: { view: true, edit: true, delete: true },
      timesheets: { view: true, edit: true, delete: true },
      documents: { view: true, edit: true, delete: true },
      departments: { view: true, edit: true, delete: true },
      projects: { view: true, edit: true, delete: true },
      roles: { view: true, edit: true, delete: false },
      settings: { view: true, edit: true, delete: false },
    },
  },
  {
    id: "3",
    name: "HR Manager",
    description: "HR department management access",
    userCount: 8,
    isSystem: true,
    permissions: {
      dashboard: { view: true, edit: false, delete: false },
      employees: { view: true, edit: true, delete: false },
      leave: { view: true, edit: true, delete: false },
      timesheets: { view: true, edit: true, delete: false },
      documents: { view: true, edit: true, delete: false },
      departments: { view: true, edit: false, delete: false },
      projects: { view: true, edit: false, delete: false },
      roles: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "4",
    name: "Team Lead",
    description: "Team management and project oversight",
    userCount: 15,
    isSystem: false,
    permissions: {
      dashboard: { view: true, edit: false, delete: false },
      employees: { view: true, edit: false, delete: false },
      leave: { view: true, edit: true, delete: false },
      timesheets: { view: true, edit: true, delete: false },
      documents: { view: true, edit: false, delete: false },
      departments: { view: true, edit: false, delete: false },
      projects: { view: true, edit: true, delete: false },
      roles: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
  {
    id: "5",
    name: "Employee",
    description: "Standard employee access",
    userCount: 142,
    isSystem: true,
    permissions: {
      dashboard: { view: true, edit: false, delete: false },
      employees: { view: false, edit: false, delete: false },
      leave: { view: true, edit: true, delete: false },
      timesheets: { view: true, edit: true, delete: false },
      documents: { view: true, edit: true, delete: false },
      departments: { view: false, edit: false, delete: false },
      projects: { view: true, edit: false, delete: false },
      roles: { view: false, edit: false, delete: false },
      settings: { view: false, edit: false, delete: false },
    },
  },
]

const permissionModules = [
  { key: "dashboard", label: "Dashboard" },
  { key: "employees", label: "Employees" },
  { key: "leave", label: "Leave Management" },
  { key: "timesheets", label: "Timesheets" },
  { key: "documents", label: "Documents" },
  { key: "departments", label: "Departments" },
  { key: "projects", label: "Projects" },
  { key: "roles", label: "Roles & Permissions" },
  { key: "settings", label: "System Settings" },
]

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<typeof initialRoles[0] | null>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: Object.fromEntries(
      permissionModules.map((m) => [m.key, { view: false, edit: false, delete: false }])
    ),
  })

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddRole = () => {
    const role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      userCount: 0,
      isSystem: false,
      permissions: newRole.permissions,
    }
    setRoles([...roles, role])
    setNewRole({
      name: "",
      description: "",
      permissions: Object.fromEntries(
        permissionModules.map((m) => [m.key, { view: false, edit: false, delete: false }])
      ),
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const togglePermission = (
    moduleKey: string,
    permType: "view" | "edit" | "delete",
    isEditing: boolean
  ) => {
    if (isEditing && editingRole) {
      setEditingRole({
        ...editingRole,
        permissions: {
          ...editingRole.permissions,
          [moduleKey]: {
            ...editingRole.permissions[moduleKey as keyof typeof editingRole.permissions],
            [permType]: !editingRole.permissions[moduleKey as keyof typeof editingRole.permissions][permType],
          },
        },
      })
    } else {
      setNewRole({
        ...newRole,
        permissions: {
          ...newRole.permissions,
          [moduleKey]: {
            ...newRole.permissions[moduleKey as keyof typeof newRole.permissions],
            [permType]: !newRole.permissions[moduleKey as keyof typeof newRole.permissions][permType],
          },
        },
      })
    }
  }

  const totalUsers = roles.reduce((acc, role) => acc + role.userCount, 0)
  const systemRoles = roles.filter((r) => r.isSystem).length
  const customRoles = roles.filter((r) => !r.isSystem).length

  return (
    <div className="flex flex-col flex-1">
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Administration", href: "/dashboard/admin/departments" },
          { label: "Roles & Permissions" },
        ]}
      />

      <div className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Roles & Permissions</h1>
            <p className="text-muted-foreground">
              Manage user roles and access permissions across the organization
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions for your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="e.g., Project Manager"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    placeholder="Describe the role responsibilities..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Module</TableHead>
                          <TableHead className="text-center">View</TableHead>
                          <TableHead className="text-center">Edit</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionModules.map((module) => (
                          <TableRow key={module.key}>
                            <TableCell className="font-medium">{module.label}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={newRole.permissions[module.key as keyof typeof newRole.permissions]?.view}
                                onCheckedChange={() => togglePermission(module.key, "view", false)}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={newRole.permissions[module.key as keyof typeof newRole.permissions]?.edit}
                                onCheckedChange={() => togglePermission(module.key, "edit", false)}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={newRole.permissions[module.key as keyof typeof newRole.permissions]?.delete}
                                onCheckedChange={() => togglePermission(module.key, "delete", false)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRole} disabled={!newRole.name}>
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
              <p className="text-xs text-muted-foreground">Active role definitions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Roles</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemRoles}</div>
              <p className="text-xs text-muted-foreground">Built-in protected roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
              <Unlock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customRoles}</div>
              <p className="text-xs text-muted-foreground">User-defined roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Users with assigned roles</p>
            </CardContent>
          </Card>
        </div>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>All Roles</CardTitle>
                <CardDescription>
                  View and manage all roles in your organization
                </CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {role.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{role.userCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={role.isSystem ? "secondary" : "outline"}>
                        {role.isSystem ? "System" : "Custom"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingRole(role)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Users
                          </DropdownMenuItem>
                          {!role.isSystem && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteRole(role.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Role
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Role Dialog */}
        <Dialog open={!!editingRole} onOpenChange={(open) => !open && setEditingRole(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
              <DialogDescription>
                Modify permissions for this role. Changes will affect all users with this role.
              </DialogDescription>
            </DialogHeader>
            {editingRole && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Module</TableHead>
                          <TableHead className="text-center">View</TableHead>
                          <TableHead className="text-center">Edit</TableHead>
                          <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permissionModules.map((module) => (
                          <TableRow key={module.key}>
                            <TableCell className="font-medium">{module.label}</TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={editingRole.permissions[module.key as keyof typeof editingRole.permissions]?.view}
                                onCheckedChange={() => togglePermission(module.key, "view", true)}
                                disabled={editingRole.isSystem && editingRole.name === "Super Admin"}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={editingRole.permissions[module.key as keyof typeof editingRole.permissions]?.edit}
                                onCheckedChange={() => togglePermission(module.key, "edit", true)}
                                disabled={editingRole.isSystem && editingRole.name === "Super Admin"}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={editingRole.permissions[module.key as keyof typeof editingRole.permissions]?.delete}
                                onCheckedChange={() => togglePermission(module.key, "delete", true)}
                                disabled={editingRole.isSystem && editingRole.name === "Super Admin"}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingRole(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (editingRole) {
                    setRoles(roles.map((r) => (r.id === editingRole.id ? editingRole : r)))
                    setEditingRole(null)
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
