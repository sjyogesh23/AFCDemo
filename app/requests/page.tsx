"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, X, MessageSquare } from "lucide-react"
import Link from "next/link"
import { EnquiryResponseModal } from "@/components/enquiry-response-modal"

// Mock data for requests
const rescheduleRequests = [
  {
    id: "1",
    from: "John Patient",
    appointment: "Annual Physical - Jan 15",
    originalDate: "2024-01-15",
    originalTime: "10:00 AM",
    newDate: "2024-01-20",
    newTime: "2:00 PM",
    reason: "Schedule conflict",
    date: "2024-01-10",
    status: "pending",
  },
  {
    id: "2",
    from: "Dr. Sarah Wilson",
    appointment: "Follow-up - Jan 22",
    originalDate: "2024-01-22",
    originalTime: "2:30 PM",
    newDate: "2024-01-25",
    newTime: "11:00 AM",
    reason: "Emergency surgery",
    date: "2024-01-11",
    status: "pending",
  },
]

const deletedAppointments = [
  {
    id: "1",
    appointment: "General Consultation",
    patient: "Mary Johnson",
    doctor: "Dr. Michael Chen",
    date: "2024-01-18",
    time: "3:00 PM",
    deletedBy: "Patient",
    reason: "Personal emergency",
    deletedDate: "2024-01-12",
  },
]

const enquiries = {
  doctor: [
    {
      id: "1",
      from: "Dr. Emily Rodriguez",
      subject: "System Access Issue",
      message: "Unable to access patient records since yesterday",
      date: "2024-01-12",
      status: "pending",
    },
  ],
  patient: [
    {
      id: "1",
      from: "Robert Smith",
      subject: "Billing Question",
      message: "I was charged twice for my last appointment",
      date: "2024-01-11",
      status: "pending",
    },
  ],
  others: [
    {
      id: "1",
      from: "Anonymous User",
      email: "user@example.com",
      subject: "Service Inquiry",
      message: "I would like to know about your services for elderly care",
      date: "2024-01-10",
      status: "pending",
    },
  ],
}

export default function RequestsPage() {
  const [requests, setRequests] = useState(rescheduleRequests)
  const [deleted, setDeleted] = useState(deletedAppointments)
  const [doctorEnquiries, setDoctorEnquiries] = useState(enquiries.doctor)
  const [patientEnquiries, setPatientEnquiries] = useState(enquiries.patient)
  const [otherEnquiries, setOtherEnquiries] = useState(enquiries.others)

  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null)
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false)

  const handleRescheduleAction = (id: string, action: "approve" | "reject") => {
    setRequests((prev) => prev.filter((req) => req.id !== id))
    // In a real app, this would update the appointment status
  }

  const handleEnquiryResponse = (type: "doctor" | "patient" | "others", id: string) => {
    let enquiry = null
    if (type === "doctor") {
      enquiry = doctorEnquiries.find((e) => e.id === id)
    } else if (type === "patient") {
      enquiry = patientEnquiries.find((e) => e.id === id)
    } else {
      enquiry = otherEnquiries.find((e) => e.id === id)
    }

    if (enquiry) {
      setSelectedEnquiry(enquiry)
      setIsResponseModalOpen(true)
    }
  }

  const handleSendResponse = (response: string) => {
    // In a real app, this would send the response via API
    alert(`Response sent: ${response}`)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Requests Management</h1>
            <p className="text-muted-foreground">Handle reschedule requests, deletions, and enquiries</p>
          </div>
        </div>

        <Tabs defaultValue="reschedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reschedule">Reschedule Requests</TabsTrigger>
            <TabsTrigger value="deleted">Deleted Appointments</TabsTrigger>
            <TabsTrigger value="enquiry">Enquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="reschedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reschedule Requests</CardTitle>
                <CardDescription>Review and approve/reject reschedule requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{request.appointment}</h3>
                              <Badge variant="secondary">{request.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Requested by: {request.from}</p>
                            <p className="text-sm text-muted-foreground">Reason: {request.reason}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.date}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Original Schedule</h4>
                            <p className="text-sm">Date: {request.originalDate}</p>
                            <p className="text-sm">Time: {request.originalTime}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2">Requested Schedule</h4>
                            <p className="text-sm">Date: {request.newDate}</p>
                            <p className="text-sm">Time: {request.newTime}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleRescheduleAction(request.id, "approve")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRescheduleAction(request.id, "reject")}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deleted" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deleted Appointments</CardTitle>
                <CardDescription>History of cancelled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deleted.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{appointment.appointment}</h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Patient: {appointment.patient}</p>
                            <p>Doctor: {appointment.doctor}</p>
                            <p>
                              Original Date: {appointment.date} at {appointment.time}
                            </p>
                            <p>Deleted by: {appointment.deletedBy}</p>
                            <p>Reason: {appointment.reason}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Deleted: {appointment.deletedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enquiry" className="space-y-4">
            <Tabs defaultValue="doctor" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="doctor">Doctor Enquiries</TabsTrigger>
                <TabsTrigger value="patient">Patient Enquiries</TabsTrigger>
                <TabsTrigger value="others">Other Enquiries</TabsTrigger>
              </TabsList>

              <TabsContent value="doctor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Doctor Enquiries</CardTitle>
                    <CardDescription>Messages and complaints from doctors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {doctorEnquiries.map((enquiry) => (
                        <div key={enquiry.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{enquiry.subject}</h3>
                                <Badge variant="secondary">{enquiry.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">From: {enquiry.from}</p>
                              <p className="text-sm">{enquiry.message}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{enquiry.date}</p>
                          </div>
                          <div className="mt-4">
                            <Button size="sm" onClick={() => handleEnquiryResponse("doctor", enquiry.id)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Respond
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patient" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Enquiries</CardTitle>
                    <CardDescription>Messages and complaints from patients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patientEnquiries.map((enquiry) => (
                        <div key={enquiry.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{enquiry.subject}</h3>
                                <Badge variant="secondary">{enquiry.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">From: {enquiry.from}</p>
                              <p className="text-sm">{enquiry.message}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{enquiry.date}</p>
                          </div>
                          <div className="mt-4">
                            <Button size="sm" onClick={() => handleEnquiryResponse("patient", enquiry.id)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Respond
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="others" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Other Enquiries</CardTitle>
                    <CardDescription>Messages from non-signed-in users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {otherEnquiries.map((enquiry) => (
                        <div key={enquiry.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{enquiry.subject}</h3>
                                <Badge variant="secondary">{enquiry.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">From: {enquiry.from}</p>
                              <p className="text-sm text-muted-foreground">Email: {enquiry.email}</p>
                              <p className="text-sm">{enquiry.message}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{enquiry.date}</p>
                          </div>
                          <div className="mt-4">
                            <Button size="sm" onClick={() => handleEnquiryResponse("others", enquiry.id)}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Respond
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
      <EnquiryResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        enquiry={selectedEnquiry}
        onSendResponse={handleSendResponse}
      />
    </div>
  )
}
