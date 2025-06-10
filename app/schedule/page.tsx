"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search, ArrowLeft, Plus, List, CalendarDays } from "lucide-react"
import Link from "next/link"
import { AdminAppointmentModal } from "@/components/admin-appointment-modal"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { CreateAppointmentModal } from "@/components/create-appointment-modal"

// Mock data for appointments including reschedule requests
const allAppointments = [
  {
    id: "1",
    date: "2024-01-10",
    time: "9:00 AM",
    doctor: "Dr. Sarah Wilson",
    patient: "John Patient",
    type: "Physical Exam",
    status: "completed",
    category: "previous",
    title: "Annual Physical Exam",
    description: "Completed annual physical examination",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$150.00",
  },
  {
    id: "2",
    date: "2024-01-15",
    time: "10:00 AM",
    doctor: "Dr. Sarah Wilson",
    patient: "John Patient",
    type: "Annual Physical Exam",
    status: "confirmed",
    category: "current",
    title: "Annual Physical Exam",
    description: "Annual physical examination",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$150.00",
  },
  {
    id: "3",
    date: "2024-01-22",
    time: "2:30 PM",
    doctor: "Dr. Michael Chen",
    patient: "Mary Johnson",
    type: "Follow-up",
    status: "reschedule_pending",
    category: "upcoming",
    title: "Follow-up Consultation",
    description: "Follow-up consultation with reschedule request",
    location: "GIA AFC Satellite Office, Cambridge, MA",
    price: "$75.00",
  },
  {
    id: "4",
    date: "2024-01-25",
    time: "11:00 AM",
    doctor: "Dr. Emily Rodriguez",
    patient: "Robert Smith",
    type: "Consultation",
    status: "confirmed",
    category: "upcoming",
    title: "General Consultation",
    description: "General health consultation",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "$100.00",
  },
]

export default function SchedulePage() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDoctor, setFilterDoctor] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [appointments, setAppointments] = useState(allAppointments)

  const handleAppointmentClick = (appointment: any) => {
    // Convert to the format expected by AdminAppointmentModal
    const modalAppointment = {
      id: appointment.id,
      time: appointment.time,
      doctor: appointment.doctor,
      patient: appointment.patient,
      type: appointment.type,
      status: appointment.status,
      doctorDetails: {
        id: "doc1",
        name: appointment.doctor,
        specialization: "Internal Medicine",
        phone: "(555) 234-5678",
        email: "doctor@afc.com",
      },
      patientDetails: {
        id: "pat1",
        name: appointment.patient,
        phone: "(555) 123-4567",
        email: "patient@email.com",
        ssn: "***-**-1234",
      },
      appointmentDetails: {
        title: appointment.title,
        description: appointment.description,
        location: appointment.location,
        price: appointment.price,
      },
    }
    setSelectedAppointment(modalAppointment)
    setIsModalOpen(true)
  }

  const handleCreateAppointment = (appointmentData: any) => {
    const newAppointment = {
      id: Date.now().toString(),
      title: appointmentData.type,
      date: appointmentData.date,
      time: appointmentData.time,
      doctor: appointmentData.doctor || "Admin Created",
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
    return appointments
      .filter((apt) => apt.category === category)
      .filter(
        (apt) =>
          apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apt.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((apt) => filterDoctor === "all" || apt.doctor === filterDoctor)
      .filter((apt) => filterStatus === "all" || apt.status === filterStatus)
  }

  const doctors = [...new Set(appointments.map((apt) => apt.doctor))]
  const statuses = [...new Set(appointments.map((apt) => apt.status))]

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Schedule Management</h1>
              <p className="text-muted-foreground">View and manage all appointments</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="flex border rounded-lg">
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
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Appointment
            </Button>
          </div>
        </div>

        {viewMode === "calendar" ? (
          <Card>
            <CardHeader>
              <CardTitle>Calendar Overview</CardTitle>
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
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="previous">Previous</TabsTrigger>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="reschedule">Reschedule Requests</TabsTrigger>
              </TabsList>

              <TabsContent value="previous" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Previous Appointments</CardTitle>
                    <CardDescription>Completed appointments history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filterAppointments(appointments, "previous").map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{appointment.type}</h3>
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
                                  {appointment.doctor} • {appointment.patient}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="current" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Appointments</CardTitle>
                    <CardDescription>Today's scheduled appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filterAppointments(appointments, "current").map((appointment) => (
                        <div
                          key={appointment.id}
                          className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{appointment.type}</h3>
                                <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                                  {appointment.status}
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
                                  {appointment.doctor} • {appointment.patient}
                                </div>
                              </div>
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
                    <CardDescription>Future scheduled appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filterAppointments(appointments, "upcoming")
                        .filter((apt) => apt.status !== "reschedule_pending")
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold">{appointment.type}</h3>
                                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                                    {appointment.status}
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
                                    {appointment.doctor} • {appointment.patient}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reschedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reschedule Requests</CardTitle>
                    <CardDescription>Appointments with pending reschedule requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments
                        .filter((apt) => apt.status === "reschedule_pending")
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold">{appointment.type}</h3>
                                  <Badge variant="secondary">Reschedule Pending</Badge>
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
                                    {appointment.doctor} • {appointment.patient}
                                  </div>
                                </div>
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

        <AdminAppointmentModal
          appointment={selectedAppointment}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
