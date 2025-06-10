"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User, Patient } from "@/lib/database/schema"
import { useDatabase } from "@/lib/database/database-provider"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: RegisterData) => Promise<boolean>
  updateUser: (userData: Partial<User>) => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  phone: string
  ssn: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const database = useDatabase()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("afc_user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      // Verify user exists in database
      const dbUser = database.getUserById(parsedUser.id)
      if (dbUser) {
        setUser(dbUser)
      } else {
        localStorage.removeItem("afc_user")
      }
    }
    setIsLoading(false)
  }, [database])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in production, this would be a secure API call
    if (password === "password123") {
      const foundUser = database.getUserByEmail(email)
      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("afc_user", JSON.stringify(foundUser))
        return true
      }
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("afc_user")
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("afc_user", JSON.stringify(updatedUser))

      // Update in database
      database.updateUser(user.id, userData)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    // Demo registration - in production, this would validate SSN for Massachusetts residents
    const newPatient: Omit<Patient, "id" | "createdAt" | "updatedAt"> = {
      email: userData.email,
      name: userData.name,
      role: "patient",
      phone: userData.phone,
      ssn: userData.ssn.replace(/\d(?=\d{4})/g, "*"),
      dateOfBirth: "",
      address: "",
      emergencyContact: "",
      medicalHistory: [],
      totalAppointments: 0,
    }

    // Add to database
    database.addPatient(newPatient)

    // In production, save to database
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
