"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, MapPin, DollarSign, Phone, Mail } from "lucide-react"

interface AdminAppointmentModalProps {
  appointment: any
  isOpen: boolean
  onClose: () => void
}

export function AdminAppointmentModal({ appointment, isOpen, onClose }: AdminAppointmentModalProps) {
  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{appointment.appointmentDetails?.title || appointment.type}</span>
            <Badge variant={appointment.status === "attended" ? "default" : "secondary"}>{appointment.status}</Badge>
          </DialogTitle>
          <DialogDescription>Complete appointment and participant details</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="appointment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointment">Appointment</TabsTrigger>
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
            <TabsTrigger value="patient">Patient</TabsTrigger>
          </TabsList>

          <TabsContent value="appointment" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date & Time</p>
                    <p className="text-lg">
                      {new Date().toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-lg">{appointment.type}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.appointmentDetails?.location || "GIA AFC Main Clinic, Boston, MA"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Cost</p>
                    <p className="text-lg font-semibold">{appointment.appointmentDetails?.price || "$100.00"}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant={appointment.status === "attended" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">
                {appointment.appointmentDetails?.description || "Standard appointment"}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="doctor" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg">{appointment.doctorDetails?.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                  <p className="text-lg">{appointment.doctorDetails?.specialization}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-lg">{appointment.doctorDetails?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-lg">{appointment.doctorDetails?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patient" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg">{appointment.patientDetails?.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">SSN</p>
                  <p className="text-lg">{appointment.patientDetails?.ssn}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-lg">{appointment.patientDetails?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-lg">{appointment.patientDetails?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
