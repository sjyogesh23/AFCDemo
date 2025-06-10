"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Appointment {
  id: string
  title: string
  date: string
  time: string
  status: string
}

interface AppointmentCalendarProps {
  appointments: Appointment[]
  onAppointmentClick: (appointment: Appointment) => void
}

export function AppointmentCalendar({ appointments, onAppointmentClick }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getAppointmentsForDate = (dateStr: string) => {
    return appointments.filter((apt) => apt.date === dateStr)
  }

  const getAppointmentColor = (status: string, date: string) => {
    const today = new Date().toISOString().split("T")[0]
    const appointmentDate = new Date(date)
    const currentDate = new Date(today)

    if (appointmentDate < currentDate) {
      return "bg-gray-200 text-gray-700" // Past appointments
    } else if (status === "pending" || status === "reschedule_pending") {
      return "bg-yellow-200 text-yellow-800" // Requested/pending appointments
    } else if (status === "confirmed") {
      return "bg-green-200 text-green-800" // Confirmed appointments
    }
    return "bg-blue-200 text-blue-800" // Default
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const days = []

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-20"></div>)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayAppointments = getAppointmentsForDate(dateStr)

    days.push(
      <div key={day} className="h-20 border border-border p-1">
        <div className="text-sm font-medium mb-1">{day}</div>
        <div className="space-y-1">
          {dayAppointments.slice(0, 2).map((apt) => (
            <div
              key={apt.id}
              className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getAppointmentColor(apt.status, apt.date)}`}
              onClick={() => onAppointmentClick(apt)}
            >
              <div className="truncate">{apt.time}</div>
              <div className="truncate font-medium">{apt.title}</div>
            </div>
          ))}
          {dayAppointments.length > 2 && (
            <div className="text-xs text-muted-foreground">+{dayAppointments.length - 2} more</div>
          )}
        </div>
      </div>,
    )
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-sm">Past</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-200 rounded"></div>
          <span className="text-sm">Pending/Requested</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span className="text-sm">Confirmed</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  )
}
