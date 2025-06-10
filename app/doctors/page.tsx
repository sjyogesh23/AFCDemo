"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, User, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AddDoctorModal } from "@/components/add-doctor-modal"

// Mock data for doctors
const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    specialization: "Internal Medicine",
    phone: "(555) 234-5678",
    email: "sarah.wilson@afc.com",
    status: "active",
    patients: 25,
    appointments: 120,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "Cardiology",
    phone: "(555) 345-6789",
    email: "michael.chen@afc.com",
    status: "active",
    patients: 18,
    appointments: 95,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Family Medicine",
    phone: "(555) 456-7890",
    email: "emily.rodriguez@afc.com",
    status: "inactive",
    patients: 12,
    appointments: 60,
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(mockDoctors)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDoctorClick = (doctorId: string) => {
    router.push(`/doctors/${doctorId}`)
  }

  const handleAddDoctor = (doctorData: any) => {
    setDoctors((prev) => [...prev, doctorData])
  }

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
              <h1 className="text-3xl font-bold">Doctors Management</h1>
              <p className="text-muted-foreground">Manage healthcare providers</p>
            </div>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Doctors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialization}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={doctor.status === "active" ? "default" : "secondary"}>{doctor.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold">{doctor.patients}</div>
                      <div className="text-xs text-muted-foreground">Patients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{doctor.appointments}</div>
                      <div className="text-xs text-muted-foreground">Appointments</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <AddDoctorModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddDoctor={handleAddDoctor} />
    </div>
  )
}
