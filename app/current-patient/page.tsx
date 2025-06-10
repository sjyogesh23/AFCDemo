"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useDatabase } from "@/lib/database/database-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Calendar, Clock, MapPin, DollarSign, Save, X, Plus } from "lucide-react"
import Link from "next/link"
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

export default function CurrentPatientPage() {
  const { user } = useAuth()
  const database = useDatabase()
  const [isEditing, setIsEditing] = useState(false)
  const [showCloseDialog, setShowCloseDialog] = useState(false)
  const [showScheduleNext, setShowScheduleNext] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [editedData, setEditedData] = useState({
    description: "",
    notes: "",
    location: "",
    price: "",
  })
  const [nextAppointment, setNextAppointment] = useState({
    date: "",
    time: "",
    type: "",
    description: "",
  })

  // Get the active appointment for the current doctor
  const activeAppointment = user?.role === "doctor" && user?.id ? database.getActiveAppointment(user.id) : undefined

  // Get patient details if there's an active appointment
  const patient = activeAppointment ? database.getPatientById(activeAppointment.patientId) : undefined

  // Initialize edited data when active appointment changes
  useEffect(() => {
    if (activeAppointment) {
      setEditedData({
        description: activeAppointment.description,
        notes: activeAppointment.notes || "",
        location: activeAppointment.location,
        price: activeAppointment.price,
      })
    }
  }, [activeAppointment])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSaveChanges = () => {
    if (activeAppointment) {
      database.updateAppointment(activeAppointment.id, {
        description: editedData.description,
        notes: editedData.notes,
        location: editedData.location,
        price: editedData.price,
      })
    }
    setIsEditing(false)
  }

  const handleScheduleNext = () => {
    if (activeAppointment && patient) {
      // Create a new appointment for the next session
      database.addAppointment({
        patientId: patient.id,
        doctorId: user?.id || "",
        title: nextAppointment.type,
        type: nextAppointment.type,
        date: nextAppointment.date,
        time: nextAppointment.time,
        status: "confirmed",
        category: "upcoming",
        description: nextAppointment.description,
        location: activeAppointment.location,
        price: activeAppointment.price,
        isActiveWithDoctor: false,
      })

      setShowScheduleNext(false)
      setNextAppointment({ date: "", time: "", type: "", description: "" })
      alert("Next appointment scheduled successfully!")
    }
  }

  const handleCloseCase = () => {
    if (activeAppointment) {
      // Update the appointment status and deactivate it
      database.updateAppointment(activeAppointment.id, {
        status: "completed",
        category: "past",
        isActiveWithDoctor: false,
      })

      alert("Case closed successfully! Admin can now assign new patients.")
      setShowCloseDialog(false)
    }
  }

  const formatDateTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    }
  }

  const { time, date } = formatDateTime(currentTime)

  // If no current patient is active
  if (!activeAppointment || !patient) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="flex items-center space-x-4 mb-6">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Current Patient</h1>
            <p className="text-muted-foreground">No active patient assigned</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Active Patient</h3>
            <p className="text-muted-foreground">Wait for the admin to assign a patient to you, or check back later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Current Patient</h1>
            <p className="text-muted-foreground">Active patient consultation</p>
          </div>
        </div>

        {/* Time and Date Display */}
        <div className="text-right">
          <div className="text-lg font-mono font-bold text-primary">{time}</div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{patient.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <p>{patient.dateOfBirth || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Medical History</p>
              <p className="text-sm">{patient.medicalHistory.join(", ") || "No medical history recorded"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Appointment Details</CardTitle>
                  <CardDescription>Current consultation information</CardDescription>
                </div>
                <div className="flex space-x-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      Edit Details
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-lg">{activeAppointment.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-lg">{activeAppointment.type}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Cost</p>
                    {isEditing ? (
                      <Input
                        value={editedData.price}
                        onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
                        className="w-24"
                      />
                    ) : (
                      <p className="text-lg font-semibold">{activeAppointment.price}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant="default" className="bg-green-600">
                    Active
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={editedData.description}
                      onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 p-3 bg-muted rounded-md">{activeAppointment.description}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editedData.location}
                      onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p>{activeAppointment.location}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Doctor's Notes</Label>
                  {isEditing ? (
                    <Textarea
                      id="notes"
                      value={editedData.notes}
                      onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                      rows={4}
                    />
                  ) : (
                    <p className="mt-1 p-3 bg-muted rounded-md">{activeAppointment.notes || "No notes yet"}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage the current consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button onClick={() => setShowScheduleNext(true)} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Next Session
                </Button>
                <Button onClick={() => setShowCloseDialog(true)} variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Close Case
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Next Session */}
          {showScheduleNext && (
            <Card>
              <CardHeader>
                <CardTitle>Schedule Next Session</CardTitle>
                <CardDescription>Book the next appointment for this patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nextDate">Date</Label>
                    <Input
                      id="nextDate"
                      type="date"
                      value={nextAppointment.date}
                      onChange={(e) => setNextAppointment({ ...nextAppointment, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nextTime">Time</Label>
                    <Input
                      id="nextTime"
                      type="time"
                      value={nextAppointment.time}
                      onChange={(e) => setNextAppointment({ ...nextAppointment, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nextType">Appointment Type</Label>
                  <Input
                    id="nextType"
                    value={nextAppointment.type}
                    onChange={(e) => setNextAppointment({ ...nextAppointment, type: e.target.value })}
                    placeholder="e.g., Follow-up, Check-up"
                  />
                </div>
                <div>
                  <Label htmlFor="nextDescription">Description</Label>
                  <Textarea
                    id="nextDescription"
                    value={nextAppointment.description}
                    onChange={(e) => setNextAppointment({ ...nextAppointment, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleScheduleNext}>Schedule Appointment</Button>
                  <Button onClick={() => setShowScheduleNext(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Close Case Dialog */}
      <AlertDialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Close Case</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to close this case? This will mark the appointment as completed and allow the admin
              to assign new patients.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCloseCase}>Close Case</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
