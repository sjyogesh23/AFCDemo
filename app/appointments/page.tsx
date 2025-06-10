"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search, ArrowLeft, Plus, List, CalendarDays } from "lucide-react"
import Link from "next/link"
import { AppointmentModal } from "@/components/appointment-modal"
import { BookAppointmentModal } from "@/components/book-appointment-modal"
import { CreateAppointmentModal } from "@/components/create-appointment-modal"
import { AppointmentCalendar } from "@/components/appointment-calendar"

// Mock data for appointments
const allAppointments = [
  {
    id: "1",
    title: "Annual Physical Exam",
    date: "2024-01-10",
    time: "9:00 AM",
    doctor: "Dr. Sarah Wilson",
    patient: "John Patient",
    type: "Physical Exam",
    status: "completed",
    category: "past",
    description: "Completed annual physical examination",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$150.00",
  },
  {
    id: "2",
    title: "Follow-up Consultation",
    date: "2024-01-15",
    time: "10:00 AM",
    doctor: "Dr. Sarah Wilson",
    patient: "John Patient",
    type: "Follow-up",
    status: "confirmed",
    category: "upcoming",
    description: "Follow-up consultation",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$75.00",
  },
  {
    id: "3",
    title: "General Consultation",
    date: "2024-01-22",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    patient: "Mary Johnson",
    type: "Consultation",
    status: "pending",
    category: "upcoming",
    description: "General health consultation",
    location: "GIA AFC Satellite Office, Cambridge, MA",
    price: "$100.00",
  },
]

export default function AppointmentsPage() {
  const { user } = useAuth()
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDoctor, setFilterDoctor] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [appointments, setAppointments] = useState(allAppointments)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

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
      category: "upcoming",
      status: "pending",
    }
    setAppointments((prev) => [...prev, newAppointment])
  }

  const handleCreateAppointment = (appointmentData: any) => {
    const newAppointment = {
      id: Date.now().toString(),
      title: appointmentData.type,
      date: appointmentData.date,
      time: appointmentData.time,
      doctor: user?.name || "Dr. Current User",
      patient: appointmentData.patient,
      type: appointmentData.type,
      status: "confirmed",
      category: "upcoming",
      description: appointmentData.description,
      location: appointmentData.location,
      price: appointmentData.price,
    }
    setAppointments((prev) => [...prev, newAppointment])
  }

  const filterAppointments = (appointments: any[], category: string) => {
    let filtered = appointments.filter((apt) => apt.category === category)

    // For doctors, only show their own appointments
    if (user?.role === "doctor") {
      filtered = filtered.filter((apt) => apt.doctor === user.name)
    }

    return filtered
      .filter(
        (apt) =>
          apt.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((apt) => (user?.role === "doctor" ? true : filterDoctor === "all" || apt.doctor === filterDoctor))
      .filter((apt) => filterStatus === "all" || apt.status === filterStatus)
  }

  const doctors = [...new Set(appointments.map((apt) => apt.doctor).filter(Boolean))]
  const statuses = [...new Set(appointments.map((apt) => apt.status))]

  return (
    <div className="container py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-muted-foreground">Manage your appointments</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="flex">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-r-none"
              >
                <List className="h-4 w-4 mr-2" />
                List View
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className="rounded-l-none"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
            </div>
            {user?.role === "patient" && (
              <Button onClick={() => setIsBookModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            )}
            {user?.role === "doctor" && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Appointment
              </Button>
            )}
          </div>
        </div>

        {viewMode === "calendar" ? (
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Visual overview of all appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar appointments={appointments} onAppointmentClick={handleAppointmentClick} />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {user?.role !== "doctor" && (
                    <div className="space-y-2">
                      <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Doctors</SelectItem>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor} value={doctor}>
                              {doctor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setFilterDoctor("all")
                      setFilterStatus("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Appointments Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="past">Past Appointments</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="past" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Past Appointments</CardTitle>
                    <CardDescription>Your completed appointments history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filterAppointments(appointments, "past").map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{appointment.title}</h3>
                                <Badge variant="outline">{appointment.status}</Badge>
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
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {user?.role === "patient" ? appointment.doctor : appointment.patient}
                                </div>
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
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled future appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filterAppointments(appointments, "upcoming").map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border border-gray-700 rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex items-center justify-between">
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
                                  {appointment.status === "reschedule_pending"
                                    ? "Reschedule Pending"
                                    : appointment.status}
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
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {user?.role === "patient" ? appointment.doctor : appointment.patient}
                                </div>
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
              </TabsContent>
            </Tabs>
          </>
        )}

        <AppointmentModal
          appointment={selectedAppointment}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userRole={user?.role || "patient"}
          onRescheduleUpdate={handleRescheduleUpdate}
          onCancelAppointment={handleCancelAppointment}
        />

        <BookAppointmentModal
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
          onBookAppointment={handleBookAppointment}
        />

        <CreateAppointmentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateAppointment={handleCreateAppointment}
        />
      </div>
    </div>
  )
}
