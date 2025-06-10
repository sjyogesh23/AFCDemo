"use client"

import { useAuth } from "@/components/auth-provider"
import { PatientDashboard } from "@/components/dashboard/patient-dashboard"
import { DoctorDashboard } from "@/components/dashboard/doctor-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Heart className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">Please sign in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  switch (user.role) {
    case "patient":
      return <PatientDashboard />
    case "doctor":
      return <DoctorDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Invalid User Role</h2>
              <p className="text-muted-foreground">Please contact support for assistance.</p>
            </CardContent>
          </Card>
        </div>
      )
  }
}
