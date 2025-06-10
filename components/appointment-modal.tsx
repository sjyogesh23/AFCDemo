"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, User, MapPin, FileText, DollarSign, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AppointmentModalProps {
  appointment: any
  isOpen: boolean
  onClose: () => void
  userRole: "patient" | "doctor" | "admin"
  onRescheduleUpdate?: (appointmentId: string, newDate: string, newTime: string) => void
  onCancelAppointment?: (appointmentId: string) => void
}

export function AppointmentModal({
  appointment,
  isOpen,
  onClose,
  userRole,
  onRescheduleUpdate,
  onCancelAppointment,
}: AppointmentModalProps) {
  const [isRescheduling, setIsRescheduling] = useState(false)
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  if (!appointment) return null

  const handleReschedule = () => {
    if (newDate && newTime && onRescheduleUpdate) {
      onRescheduleUpdate(appointment.id, newDate, newTime)
      setIsRescheduling(false)
      onClose()
    }
  }

  const handleCancel = () => {
    if (onCancelAppointment) {
      onCancelAppointment(appointment.id)
      setShowCancelDialog(false)
      onClose()
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{appointment.title}</span>
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
            </DialogTitle>
            <DialogDescription>Appointment details and management options</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-lg">{appointment.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-lg">{appointment.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{userRole === "patient" ? "Doctor" : "Patient"}</p>
                    <p className="text-lg">{userRole === "patient" ? appointment.doctor : appointment.patient}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Cost</p>
                    <p className="text-lg font-semibold">{appointment.price}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{appointment.location}</p>
                  </div>
                </div>

                {appointment.documents && appointment.documents.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium">Documents</p>
                      <div className="space-y-1">
                        {appointment.documents.map((doc: string, index: number) => (
                          <Badge key={index} variant="outline" className="mr-2">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">{appointment.description}</p>
            </div>

            {/* Reschedule Form */}
            {isRescheduling && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Reschedule Appointment</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newDate">New Date</Label>
                      <Input
                        id="newDate"
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newTime">New Time</Label>
                      <Input
                        id="newTime"
                        type="time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleReschedule} disabled={!newDate || !newTime}>
                      Confirm Reschedule
                    </Button>
                    <Button variant="outline" onClick={() => setIsRescheduling(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div className="flex space-x-2">
                {!isRescheduling && appointment.status !== "completed" && (
                  <Button variant="outline" onClick={() => setIsRescheduling(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                )}

                {appointment.status !== "completed" && (
                  <Button variant="destructive" onClick={() => setShowCancelDialog(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>

              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Appointment</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-destructive text-destructive-foreground">
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
