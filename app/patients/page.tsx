"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Plus, User, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AddPatientModal } from "@/components/add-patient-modal"

// Mock data for patients
const mockPatients = [
  {
    id: "1",
    name: "John Patient",
    phone: "(555) 123-4567",
    email: "john.patient@email.com",
    ssn: "***-**-1234",
    status: "active",
    lastVisit: "2024-01-10",
    appointments: 8,
  },
  {
    id: "2",
    name: "Mary Johnson",
    phone: "(555) 987-6543",
    email: "mary.johnson@email.com",
    ssn: "***-**-5678",
    status: "active",
    lastVisit: "2024-01-08",
    appointments: 12,
  },
  {
    id: "3",
    name: "Robert Smith",
    phone: "(555) 456-7890",
    email: "robert.smith@email.com",
    ssn: "***-**-9012",
    status: "inactive",
    lastVisit: "2023-12-15",
    appointments: 5,
  },
]

export default function PatientsPage() {
  const [patients, setPatients] = useState(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`)
  }

  const handleAddPatient = (patientData: any) => {
    setPatients((prev) => [...prev, patientData])
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
              <h1 className="text-3xl font-bold">Patients Management</h1>
              <p className="text-muted-foreground">Manage patient records</p>
            </div>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePatientClick(patient.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>SSN: {patient.ssn}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={patient.status === "active" ? "default" : "secondary"}>{patient.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold">{patient.appointments}</div>
                      <div className="text-xs text-muted-foreground">Appointments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{patient.lastVisit}</div>
                      <div className="text-xs text-muted-foreground">Last Visit</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddPatient={handleAddPatient}
        />
      </div>
    </div>
  )
}
