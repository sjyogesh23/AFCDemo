// Database Schema Types

// User Types
export type UserRole = "patient" | "doctor" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface Patient extends User {
  role: "patient"
  ssn: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  medicalHistory: string[]
  lastVisit?: string
  totalAppointments: number
}

export interface Doctor extends User {
  role: "doctor"
  specialization: string
  bio: string
  experience: string
  education: string
  patients: number
  totalAppointments: number
  availability?: Availability[]
}

export interface Admin extends User {
  role: "admin"
  department: string
}

// Appointment Types
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "rescheduled"
  | "reschedule_pending"
  | "active"
  | "attended"

export type AppointmentCategory = "past" | "current" | "upcoming"

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  title: string
  type: string
  date: string
  time: string
  status: AppointmentStatus
  category: AppointmentCategory
  description: string
  location: string
  price: string
  isActiveWithDoctor: boolean
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentDetails {
  appointmentId: string
  medicalNotes?: string
  diagnosis?: string
  prescription?: string
  followUpRequired: boolean
  followUpDate?: string
  documents?: Document[]
}

// Schedule Types
export interface Availability {
  id: string
  doctorId: string
  dayOfWeek: number // 0-6 for Sunday-Saturday
  startTime: string
  endTime: string
  isAvailable: boolean
}

// Document Types
export interface Document {
  id: string
  name: string
  type: string
  url: string
  appointmentId: string
  uploadedAt: Date
}

// Notification Types
export type NotificationType = "appointment" | "message" | "system"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: Date
}

// Request Types
export interface RescheduleRequest {
  id: string
  appointmentId: string
  requestedBy: string
  originalDate: string
  originalTime: string
  newDate: string
  newTime: string
  reason: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}

export interface Enquiry {
  id: string
  from: string
  email: string
  subject: string
  message: string
  type: "doctor" | "patient" | "others"
  status: "pending" | "resolved"
  createdAt: Date
}
