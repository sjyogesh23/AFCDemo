"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type {
  User,
  Patient,
  Doctor,
  Admin,
  Appointment,
  AppointmentDetails,
  Document,
  Notification,
  RescheduleRequest,
  Enquiry,
  UserRole,
} from "./schema"
import {
  patients as initialPatients,
  doctors as initialDoctors,
  admins as initialAdmins,
  appointments as initialAppointments,
  appointmentDetails as initialAppointmentDetails,
  documents as initialDocuments,
  notifications as initialNotifications,
  rescheduleRequests as initialRescheduleRequests,
  enquiries as initialEnquiries,
} from "./mock-data"

// Define the database context type
interface DatabaseContextType {
  // Data
  patients: Patient[]
  doctors: Doctor[]
  admins: Admin[]
  appointments: Appointment[]
  appointmentDetails: AppointmentDetails[]
  documents: Document[]
  notifications: Notification[]
  rescheduleRequests: RescheduleRequest[]
  enquiries: Enquiry[]

  // User operations
  getUserById: (id: string) => User | undefined
  getUserByEmail: (email: string) => User | undefined
  getUsersByRole: (role: UserRole) => User[]
  updateUser: (id: string, userData: Partial<User>) => void

  // Patient operations
  getPatientById: (id: string) => Patient | undefined
  updatePatient: (id: string, patientData: Partial<Patient>) => void
  addPatient: (patient: Omit<Patient, "id" | "createdAt" | "updatedAt">) => Patient

  // Doctor operations
  getDoctorById: (id: string) => Doctor | undefined
  updateDoctor: (id: string, doctorData: Partial<Doctor>) => void
  addDoctor: (doctor: Omit<Doctor, "id" | "createdAt" | "updatedAt">) => Doctor

  // Appointment operations
  getAppointmentById: (id: string) => Appointment | undefined
  getAppointmentsByPatientId: (patientId: string) => Appointment[]
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[]
  getTodaysAppointments: () => Appointment[]
  updateAppointment: (id: string, appointmentData: Partial<Appointment>) => void
  addAppointment: (appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => Appointment
  deleteAppointment: (id: string) => void

  // Active appointment operations
  getActiveAppointment: (doctorId: string) => Appointment | undefined
  setAppointmentActive: (id: string, isActive: boolean) => void

  // Appointment details operations
  getAppointmentDetailsById: (appointmentId: string) => AppointmentDetails | undefined
  updateAppointmentDetails: (appointmentId: string, details: Partial<AppointmentDetails>) => void

  // Reschedule request operations
  getRescheduleRequestsByAppointmentId: (appointmentId: string) => RescheduleRequest[]
  addRescheduleRequest: (request: Omit<RescheduleRequest, "id" | "createdAt">) => RescheduleRequest
  updateRescheduleRequest: (id: string, requestData: Partial<RescheduleRequest>) => void

  // Enquiry operations
  getEnquiriesByType: (type: "doctor" | "patient" | "others") => Enquiry[]
  addEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt">) => Enquiry
  updateEnquiry: (id: string, enquiryData: Partial<Enquiry>) => void
}

// Create the context
const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined)

// Provider component
export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  // State for all database entities
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors)
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails[]>(initialAppointmentDetails)
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [rescheduleRequests, setRescheduleRequests] = useState<RescheduleRequest[]>(initialRescheduleRequests)
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)

  // User operations
  const getUserById = (id: string): User | undefined => {
    return [...patients, ...doctors, ...admins].find((user) => user.id === id)
  }

  const getUserByEmail = (email: string): User | undefined => {
    return [...patients, ...doctors, ...admins].find((user) => user.email === email)
  }

  const getUsersByRole = (role: UserRole): User[] => {
    return [...patients, ...doctors, ...admins].filter((user) => user.role === role)
  }

  const updateUser = (id: string, userData: Partial<User>): void => {
    // Update in the appropriate collection based on role
    const user = getUserById(id)
    if (!user) return

    const updatedData = { ...userData, updatedAt: new Date() }

    switch (user.role) {
      case "patient":
        setPatients((prev) => prev.map((p) => (p.id === id ? ({ ...p, ...updatedData } as Patient) : p)))
        break
      case "doctor":
        setDoctors((prev) => prev.map((d) => (d.id === id ? ({ ...d, ...updatedData } as Doctor) : d)))
        break
      case "admin":
        setAdmins((prev) => prev.map((a) => (a.id === id ? ({ ...a, ...updatedData } as Admin) : a)))
        break
    }
  }

  // Patient operations
  const getPatientById = (id: string): Patient | undefined => {
    return patients.find((patient) => patient.id === id)
  }

  const updatePatient = (id: string, patientData: Partial<Patient>): void => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...patientData, updatedAt: new Date() } : p)))
  }

  const addPatient = (patient: Omit<Patient, "id" | "createdAt" | "updatedAt">): Patient => {
    const newPatient: Patient = {
      ...patient,
      id: `pat${patients.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setPatients((prev) => [...prev, newPatient])
    return newPatient
  }

  // Doctor operations
  const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find((doctor) => doctor.id === id)
  }

  const updateDoctor = (id: string, doctorData: Partial<Doctor>): void => {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, ...doctorData, updatedAt: new Date() } : d)))
  }

  const addDoctor = (doctor: Omit<Doctor, "id" | "createdAt" | "updatedAt">): Doctor => {
    const newDoctor: Doctor = {
      ...doctor,
      id: `doc${doctors.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setDoctors((prev) => [...prev, newDoctor])
    return newDoctor
  }

  // Appointment operations
  const getAppointmentById = (id: string): Appointment | undefined => {
    return appointments.find((appointment) => appointment.id === id)
  }

  const getAppointmentsByPatientId = (patientId: string): Appointment[] => {
    return appointments.filter((appointment) => appointment.patientId === patientId)
  }

  const getAppointmentsByDoctorId = (doctorId: string): Appointment[] => {
    return appointments.filter((appointment) => appointment.doctorId === doctorId)
  }

  const getTodaysAppointments = (): Appointment[] => {
    const today = new Date().toISOString().split("T")[0]
    return appointments.filter((appointment) => appointment.date === today)
  }

  const updateAppointment = (id: string, appointmentData: Partial<Appointment>): void => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...appointmentData, updatedAt: new Date() } : a)))
  }

  const addAppointment = (appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">): Appointment => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt${appointments.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setAppointments((prev) => [...prev, newAppointment])
    return newAppointment
  }

  const deleteAppointment = (id: string): void => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  // Active appointment operations
  const getActiveAppointment = (doctorId: string): Appointment | undefined => {
    return appointments.find((a) => a.doctorId === doctorId && a.isActiveWithDoctor)
  }

  const setAppointmentActive = (id: string, isActive: boolean): void => {
    // If activating, first deactivate all other appointments
    if (isActive) {
      setAppointments((prev) => prev.map((a) => ({ ...a, isActiveWithDoctor: false })))
    }

    // Then set the specified appointment's active status
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActiveWithDoctor: isActive, updatedAt: new Date() } : a)),
    )
  }

  // Appointment details operations
  const getAppointmentDetailsById = (appointmentId: string): AppointmentDetails | undefined => {
    return appointmentDetails.find((details) => details.appointmentId === appointmentId)
  }

  const updateAppointmentDetails = (appointmentId: string, details: Partial<AppointmentDetails>): void => {
    const existingDetails = appointmentDetails.find((d) => d.appointmentId === appointmentId)

    if (existingDetails) {
      setAppointmentDetails((prev) => prev.map((d) => (d.appointmentId === appointmentId ? { ...d, ...details } : d)))
    } else {
      // Create new details if they don't exist
      setAppointmentDetails((prev) => [
        ...prev,
        {
          appointmentId,
          followUpRequired: false,
          ...details,
        },
      ])
    }
  }

  // Reschedule request operations
  const getRescheduleRequestsByAppointmentId = (appointmentId: string): RescheduleRequest[] => {
    return rescheduleRequests.filter((request) => request.appointmentId === appointmentId)
  }

  const addRescheduleRequest = (request: Omit<RescheduleRequest, "id" | "createdAt">): RescheduleRequest => {
    const newRequest: RescheduleRequest = {
      ...request,
      id: `req${rescheduleRequests.length + 1}`,
      createdAt: new Date(),
    }
    setRescheduleRequests((prev) => [...prev, newRequest])
    return newRequest
  }

  const updateRescheduleRequest = (id: string, requestData: Partial<RescheduleRequest>): void => {
    setRescheduleRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...requestData } : r)))
  }

  // Enquiry operations
  const getEnquiriesByType = (type: "doctor" | "patient" | "others"): Enquiry[] => {
    return enquiries.filter((enquiry) => enquiry.type === type)
  }

  const addEnquiry = (enquiry: Omit<Enquiry, "id" | "createdAt">): Enquiry => {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq${enquiries.length + 1}`,
      createdAt: new Date(),
    }
    setEnquiries((prev) => [...prev, newEnquiry])
    return newEnquiry
  }

  const updateEnquiry = (id: string, enquiryData: Partial<Enquiry>): void => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, ...enquiryData } : e)))
  }

  // Create the context value object
  const contextValue: DatabaseContextType = {
    // Data
    patients,
    doctors,
    admins,
    appointments,
    appointmentDetails,
    documents,
    notifications,
    rescheduleRequests,
    enquiries,

    // User operations
    getUserById,
    getUserByEmail,
    getUsersByRole,
    updateUser,

    // Patient operations
    getPatientById,
    updatePatient,
    addPatient,

    // Doctor operations
    getDoctorById,
    updateDoctor,
    addDoctor,

    // Appointment operations
    getAppointmentById,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    getTodaysAppointments,
    updateAppointment,
    addAppointment,
    deleteAppointment,

    // Active appointment operations
    getActiveAppointment,
    setAppointmentActive,

    // Appointment details operations
    getAppointmentDetailsById,
    updateAppointmentDetails,

    // Reschedule request operations
    getRescheduleRequestsByAppointmentId,
    addRescheduleRequest,
    updateRescheduleRequest,

    // Enquiry operations
    getEnquiriesByType,
    addEnquiry,
    updateEnquiry,
  }

  return <DatabaseContext.Provider value={contextValue}>{children}</DatabaseContext.Provider>
}

// Custom hook to use the database context
export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider")
  }
  return context
}
