"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const patients = [
  { id: "1", name: "John Patient", phone: "(555) 123-4567" },
  { id: "2", name: "Mary Johnson", phone: "(555) 987-6543" },
  { id: "3", name: "Robert Smith", phone: "(555) 456-7890" },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

const appointmentTypes = [
  { value: "consultation", label: "General Consultation" },
  { value: "physical", label: "Physical Exam" },
  { value: "followup", label: "Follow-up" },
  { value: "emergency", label: "Emergency" },
  { value: "other", label: "Other" },
]

interface CreateAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateAppointment: (appointmentData: any) => void
}

export function CreateAppointmentModal({ isOpen, onClose, onCreateAppointment }: CreateAppointmentModalProps) {
  const [formData, setFormData] = useState({
    patient: "",
    date: "",
    time: "",
    type: "",
    customType: "",
    description: "",
    location: "GIA AFC Main Clinic, Boston, MA",
    price: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedPatient = patients.find((p) => p.id === formData.patient)
    const appointmentType = formData.type === "other" ? formData.customType : formData.type

    const appointmentData = {
      patient: selectedPatient?.name,
      date: formData.date,
      time: formData.time,
      type: appointmentTypes.find((t) => t.value === formData.type)?.label || formData.customType,
      description: formData.description,
      location: formData.location,
      price: formData.price,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onCreateAppointment(appointmentData)
    setIsSubmitting(false)
    setFormData({
      patient: "",
      date: "",
      time: "",
      type: "",
      customType: "",
      description: "",
      location: "GIA AFC Main Clinic, Boston, MA",
      price: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
          <DialogDescription>Schedule an appointment for your patient</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="patient">Select Patient</Label>
            <Select value={formData.patient} onValueChange={(value) => handleChange("patient", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={formData.time} onValueChange={(value) => handleChange("time", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.type === "other" && (
            <div className="space-y-2">
              <Label htmlFor="customType">Custom Appointment Type</Label>
              <Input
                id="customType"
                placeholder="Enter custom appointment type"
                value={formData.customType}
                onChange={(e) => handleChange("customType", e.target.value)}
                required
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                placeholder="$100.00"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the appointment purpose..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.patient ||
                !formData.date ||
                !formData.time ||
                !formData.type ||
                (formData.type === "other" && !formData.customType) ||
                !formData.price
              }
            >
              {isSubmitting ? "Creating..." : "Create Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
