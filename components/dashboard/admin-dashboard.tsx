"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useDatabase } from "@/lib/database/database-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Users, AlertCircle, CheckCircle, X, Clock, UserCheck } from "lucide-react"
import { AdminAppointmentModal } from "@/components/admin-appointment-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Appointment } from "@/lib/database/schema"

export function AdminDashboard() {
  const { user } = useAuth()
  const database = useDatabase()
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Get today's appointments from the database
  const todayAppointments = database.getTodaysAppointments()

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleAttendance = (id: string) => {
    const appointment = database.getAppointmentById(id)
    if (appointment) {
      database.updateAppointment(id, {
        status: appointment.status === "attended" ? "pending" : "attended",
      })
    }
  }

  const activateToDoctor = (id: string) => {
    // Check if there's already an active patient
    const hasActivePatient = database.appointments.some((item) => item.isActiveWithDoctor)

    if (hasActivePatient) {
      alert("There is already an active patient with a doctor. Please wait for the current case to be closed.")
      return
    }

    database.setAppointmentActive(id, true)
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    // Get additional details for the modal
    const doctor = database.getDoctorById(appointment.doctorId)
    const patient = database.getPatientById(appointment.patientId)
    const details = database.getAppointmentDetailsById(appointment.id)

    const modalData = {
      ...appointment,
      doctorDetails: doctor,
      patientDetails: patient,
      appointmentDetails: {
        title: appointment.title,
        description: appointment.description,
        location: appointment.location,
        price: appointment.price,
        ...details,
      },
    }

    setSelectedAppointment(modalData)
    setIsModalOpen(true)
  }

  // Calculate statistics
  const totalPatients = database.patients.length
  const attendedToday = todayAppointments.filter((s) => s.status === "attended").length
  const yetToAttend = todayAppointments.filter((s) => s.status === "pending").length
  const activeDoctors = database.doctors.filter((d) => d.role === "doctor").length
  const totalAppointments = database.appointments.length
  const pendingRequests = database.rescheduleRequests.filter((r) => r.status === "pending").length

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <TooltipProvider>
      <div className="container py-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Healthcare operations overview</p>
            </div>

            {/* Digital Clock Style */}
            <div className="text-right">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{formatDate(currentTime)}</div>
                </div>
                <div className="w-12 h-12 rounded-full tech-gradient flex items-center justify-center shadow-md">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="tech-card tech-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="tech-icon-container p-3 rounded-lg">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{totalPatients}</div>
                      <div className="text-xs text-muted-foreground">Total Patients</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total number of registered patients in the system</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="tech-card tech-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="tech-icon-container-success p-3 rounded-lg">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{attendedToday}</div>
                      <div className="text-xs text-muted-foreground">Attended Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Patients who have attended their appointments today</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="tech-card tech-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="tech-icon-container-warning p-3 rounded-lg">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{yetToAttend}</div>
                      <div className="text-xs text-muted-foreground">Yet to Attend</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Patients scheduled for today who haven't attended yet</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="tech-card tech-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="tech-icon-container p-3 rounded-lg">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{activeDoctors}</div>
                      <div className="text-xs text-muted-foreground">Active Doctors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of doctors currently active in the system</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="tech-card tech-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="tech-icon-container p-3 rounded-lg">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{totalAppointments}</div>
                      <div className="text-xs text-muted-foreground">Appointments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total number of appointments in the system</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="tech-card tech-card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="tech-icon-container-error p-3 rounded-lg">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{pendingRequests}</div>
                      <div className="text-xs text-muted-foreground">Pending Requests</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of pending reschedule and other requests</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Today's Schedule */}
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="tech-icon-container mr-3">
                <Calendar className="h-5 w-5" />
              </div>
              Today's Schedule
            </CardTitle>
            <CardDescription>Monitor daily appointments and attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => {
                const doctor = database.getDoctorById(appointment.doctorId)
                const patient = database.getPatientById(appointment.patientId)

                return (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors hover:border-blue-200 dark:hover:border-blue-800"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium min-w-[80px] text-blue-600 dark:text-blue-400">
                        {appointment.time}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{appointment.type}</span>
                          <Badge
                            className={
                              appointment.status === "attended" ? "tech-badge-success" : "tech-badge-secondary"
                            }
                          >
                            {appointment.status}
                          </Badge>
                          {appointment.isActiveWithDoctor && (
                            <Badge className="bg-green-600 hover:bg-green-700 text-white">Active with Doctor</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {doctor?.name} • {patient?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={appointment.status === "attended" ? "outline" : "default"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleAttendance(appointment.id)
                            }}
                            className={
                              appointment.status === "attended"
                                ? "border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            }
                          >
                            {appointment.status === "attended" ? (
                              <>
                                <X className="h-4 w-4 mr-2" />
                                Mark Not Attended
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Attended
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{appointment.status === "attended" ? "Mark as not attended" : "Mark as attended"}</p>
                        </TooltipContent>
                      </Tooltip>

                      {!appointment.isActiveWithDoctor && appointment.status === "pending" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                activateToDoctor(appointment.id)
                              }}
                              className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Active to Doctor
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Assign this patient to a doctor for active consultation</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                )
              })}

              {todayAppointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-blue-300 dark:text-blue-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    No appointments scheduled for today
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500">
                    Check back later or view the schedule page for upcoming appointments.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <AdminAppointmentModal
          appointment={selectedAppointment}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </TooltipProvider>
  )
}
