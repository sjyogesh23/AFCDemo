"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Plus, Users, CheckCircle } from "lucide-react"
import { CreateAppointmentModal } from "@/components/create-appointment-modal"
import { AppointmentModal } from "@/components/appointment-modal"

// Mock data for today's schedule
const todaySchedule = [
  {
    id: "1",
    time: "9:00 AM",
    patient: "John Patient",
    type: "Physical Exam",
    status: "attended",
    description: "Annual physical examination",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$150.00",
  },
  {
    id: "2",
    time: "10:30 AM",
    patient: "Mary Johnson",
    type: "Follow-up",
    status: "pending",
    description: "Blood pressure monitoring follow-up",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$75.00",
  },
  {
    id: "3",
    time: "2:00 PM",
    patient: "Robert Smith",
    type: "Consultation",
    status: "pending",
    description: "General health consultation",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$100.00",
  },
]

export function DoctorDashboard() {
  const { user } = useAuth()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [schedule, setSchedule] = useState(todaySchedule)

  // Add state for appointment modal
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateAppointment = (appointmentData: any) => {
    const newAppointment = {
      id: Date.now().toString(),
      time: appointmentData.time,
      patient: appointmentData.patient,
      type: appointmentData.type,
      status: "pending",
      description: appointmentData.description,
      location: appointmentData.location,
      price: appointmentData.price,
    }
    setSchedule((prev) => [...prev, newAppointment])
  }

  const attendedCount = schedule.filter((s) => s.status === "attended").length
  const pendingCount = schedule.filter((s) => s.status === "pending").length

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{schedule.length}</div>
                <div className="text-sm text-muted-foreground">Today's Appointments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{attendedCount}</div>
                <div className="text-sm text-muted-foreground">Attended</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Active Patients</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your appointments for today</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Appointment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.map((appointment) => (
              <div key={appointment.id} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{appointment.type}</h3>
                      <Badge variant={appointment.status === "attended" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {appointment.patient}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{appointment.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{appointment.price}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedAppointment({
                            id: appointment.id,
                            title: appointment.type,
                            date: new Date().toISOString().split("T")[0],
                            time: appointment.time,
                            patient: appointment.patient,
                            description: appointment.description,
                            location: appointment.location,
                            price: appointment.price,
                            status: appointment.status,
                          })
                          setIsModalOpen(true)
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateAppointmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAppointment={handleCreateAppointment}
      />

      <AppointmentModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userRole="doctor"
      />
    </div>
  )
}
