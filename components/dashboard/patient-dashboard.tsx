"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Edit, CalendarIcon, Users, AlertCircle, Plus } from "lucide-react"
import { AppointmentModal } from "@/components/appointment-modal"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { BookAppointmentModal } from "@/components/book-appointment-modal"

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    title: "Annual Physical Exam",
    date: "2024-01-15",
    time: "10:00 AM",
    doctor: "Dr. Sarah Wilson",
    description: "Routine annual physical examination and health screening",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$150.00",
    status: "confirmed",
    documents: ["Lab Results", "Prescription"],
  },
  {
    id: "2",
    title: "Follow-up Consultation",
    date: "2024-01-22",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    description: "Follow-up for blood pressure monitoring",
    location: "GIA AFC Satellite Office, Cambridge, MA",
    price: "$75.00",
    status: "pending",
    documents: [],
  },
]

export function PatientDashboard() {
  const { user } = useAuth()
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [appointments, setAppointments] = useState(mockAppointments)

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleRescheduleUpdate = (appointmentId: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: "reschedule_pending", date: newDate, time: newTime } : apt,
      ),
    )
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId))
  }

  const handleBookAppointment = (appointmentData: any) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      status: "pending",
      documents: [],
    }
    setAppointments((prev) => [...prev, newAppointment])
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{appointments.length}</div>
                <div className="text-sm text-muted-foreground">Total Appointments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "confirmed").length}</div>
                <div className="text-sm text-muted-foreground">Confirmed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "pending").length}</div>
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
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-lg">{user?.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SSN</p>
              <p className="text-lg">{user?.ssn}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Appointments List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </div>
              <Button size="sm" onClick={() => setIsBookModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-700 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors "
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{appointment.title}</h3>
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : appointment.status === "reschedule_pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {appointment.status === "reschedule_pending" ? "Reschedule Pending" : appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-4 w-4 mr-1" />
                        {appointment.doctor}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{appointment.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Calendar View
            </CardTitle>
            <CardDescription>Visual appointment calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentCalendar appointments={appointments} onAppointmentClick={handleAppointmentClick} />
          </CardContent>
        </Card>
      </div>

      <AppointmentModal
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userRole="patient"
        onRescheduleUpdate={handleRescheduleUpdate}
        onCancelAppointment={handleCancelAppointment}
      />

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />

      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  )
}
