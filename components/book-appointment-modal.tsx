"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const doctors = [
  { id: "1", name: "Dr. Sarah Wilson", specialization: "Internal Medicine" },
  { id: "2", name: "Dr. Michael Chen", specialization: "Cardiology" },
  { id: "3", name: "Dr. Emily Rodriguez", specialization: "Family Medicine" },
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

interface BookAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onBookAppointment: (appointmentData: any) => void
}

export function BookAppointmentModal({ isOpen, onClose, onBookAppointment }: BookAppointmentModalProps) {
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    type: "",
    customType: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const selectedDoctor = doctors.find((d) => d.id === formData.doctor)
    const appointmentType = formData.type === "other" ? formData.customType : formData.type

    const appointmentData = {
      title: appointmentTypes.find((t) => t.value === formData.type)?.label || formData.customType,
      date: formData.date,
      time: formData.time,
      doctor: selectedDoctor?.name,
      type: appointmentType,
      description: formData.description,
      location: "GIA AFC Main Clinic, Boston, MA",
      price: "$100.00",
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onBookAppointment(appointmentData)
    setIsSubmitting(false)
    setFormData({
      doctor: "",
      date: "",
      time: "",
      type: "",
      customType: "",
      description: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>Fill in the details to book your appointment</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={formData.doctor} onValueChange={(value) => handleChange("doctor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
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
              <Label htmlFor="time">Preferred Time</Label>
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

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your symptoms or reason for visit..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
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
                !formData.doctor ||
                !formData.date ||
                !formData.time ||
                !formData.type ||
                (formData.type === "other" && !formData.customType)
              }
            >
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
