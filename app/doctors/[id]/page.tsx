"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Edit, Save, Trash2, Calendar, Phone, Mail } from "lucide-react"
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

// Mock doctor data
const mockDoctor = {
  id: "1",
  name: "Dr. Sarah Wilson",
  specialization: "Internal Medicine",
  phone: "(555) 234-5678",
  email: "sarah.wilson@afc.com",
  status: "active",
  bio: "Experienced internal medicine physician with over 10 years of practice.",
  experience: "10+ years in internal medicine, specialized in preventive care and chronic disease management.",
  education: "MD from Harvard Medical School, Residency at Massachusetts General Hospital",
  patients: 25,
  totalAppointments: 120,
}

const mockAppointments = [
  {
    id: "1",
    patient: "John Patient",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "Annual Physical",
    status: "confirmed",
  },
  {
    id: "2",
    patient: "Mary Johnson",
    date: "2024-01-22",
    time: "2:30 PM",
    type: "Follow-up",
    status: "pending",
  },
]

export default function DoctorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [doctor, setDoctor] = useState(mockDoctor)
  const [appointments, setAppointments] = useState(mockAppointments)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [formData, setFormData] = useState({
    name: doctor.name,
    specialization: doctor.specialization,
    phone: doctor.phone,
    email: doctor.email,
    bio: doctor.bio,
    experience: doctor.experience,
    education: doctor.education,
    status: doctor.status,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setDoctor((prev) => ({ ...prev, ...formData }))
    setIsEditing(false)
  }

  const handleDelete = () => {
    // In a real app, this would delete the doctor via API
    router.push("/doctors")
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/doctors">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Doctor Details</h1>
              <p className="text-muted-foreground">Manage doctor information and appointments</p>
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
                  Edit Doctor
                </Button>
                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Doctor
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Doctor Details</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-muted-foreground">{doctor.specialization}</p>
                    <Badge variant={doctor.status === "active" ? "default" : "secondary"} className="mt-2">
                      {doctor.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{doctor.patients}</div>
                      <div className="text-sm text-muted-foreground">Patients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{doctor.totalAppointments}</div>
                      <div className="text-sm text-muted-foreground">Appointments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Doctor Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>
                      {isEditing ? "Edit doctor details" : "Doctor professional information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        ) : (
                          <p className="text-lg">{doctor.name}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        {isEditing ? (
                          <Input
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                          />
                        ) : (
                          <p className="text-lg">{doctor.specialization}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        {isEditing ? (
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-lg">{doctor.phone}</span>
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
                            <span className="text-lg">{doctor.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      {isEditing ? (
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
                      ) : (
                        <p className="text-base">{doctor.bio}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      {isEditing ? (
                        <Textarea
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          rows={3}
                        />
                      ) : (
                        <p className="text-base">{doctor.experience}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      {isEditing ? (
                        <Textarea
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          rows={3}
                        />
                      ) : (
                        <p className="text-base">{doctor.education}</p>
                      )}
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
                  Doctor's Appointments
                </CardTitle>
                <CardDescription>All appointments for this doctor</CardDescription>
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
                          <div className="text-sm text-muted-foreground">Patient: {appointment.patient}</div>
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
              <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this doctor? This action cannot be undone and will remove all associated
                appointments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                Delete Doctor
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
