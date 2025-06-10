"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Edit, Save, Trash2, Calendar, Phone, Mail, Shield } from "lucide-react"
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

// Mock patient data
const mockPatient = {
  id: "1",
  name: "John Patient",
  phone: "(555) 123-4567",
  email: "john.patient@email.com",
  ssn: "***-**-1234",
  status: "active",
  address: "123 Main St, Boston, MA 02101",
  dateOfBirth: "1985-06-15",
  emergencyContact: "Jane Patient - (555) 123-4568",
  totalAppointments: 8,
  lastVisit: "2024-01-10",
}

const mockAppointments = [
  {
    id: "1",
    doctor: "Dr. Sarah Wilson",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "Annual Physical",
    status: "confirmed",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    date: "2024-01-22",
    time: "2:30 PM",
    type: "Follow-up",
    status: "pending",
  },
]

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [patient, setPatient] = useState(mockPatient)
  const [appointments, setAppointments] = useState(mockAppointments)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: patient.name,
    phone: patient.phone,
    email: patient.email,
    address: patient.address,
    dateOfBirth: patient.dateOfBirth,
    emergencyContact: patient.emergencyContact,
    status: patient.status,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setPatient((prev) => ({ ...prev, ...formData }))
    setIsEditing(false)
  }

  const handleDelete = () => {
    // In a real app, this would delete the patient via API
    router.push("/patients")
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/patients">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Patient Details</h1>
              <p className="text-muted-foreground">Manage patient information and appointments</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Patient
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Patient
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Patient Details</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Patient Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{patient.name}</h3>
                    <p className="text-muted-foreground">SSN: {patient.ssn}</p>
                    <Badge variant={patient.status === "active" ? "default" : "secondary"} className="mt-2">
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{patient.totalAppointments}</div>
                      <div className="text-sm text-muted-foreground">Appointments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{patient.lastVisit}</div>
                      <div className="text-sm text-muted-foreground">Last Visit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      {isEditing ? "Edit patient details" : "Patient personal information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        ) : (
                          <p className="text-lg">{patient.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        {isEditing ? (
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                          />
                        ) : (
                          <p className="text-lg">{patient.dateOfBirth}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-lg">{patient.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-lg">{patient.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      {isEditing ? (
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                      ) : (
                        <p className="text-base">{patient.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      {isEditing ? (
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          required
                        />
                      ) : (
                        <p className="text-base">{patient.emergencyContact}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>SSN</Label>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-lg">{patient.ssn}</span>
                        <span className="text-sm text-muted-foreground">(Protected)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Patient's Appointments
                </CardTitle>
                <CardDescription>All appointments for this patient</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{appointment.type}</h3>
                            <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">Doctor: {appointment.doctor}</div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
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

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Patient</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this patient? This action cannot be undone and will remove all
                associated appointments and medical records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete Patient
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
