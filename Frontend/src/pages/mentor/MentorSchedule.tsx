"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Plus, Edit, Trash2, User, Video, ChevronLeft, ChevronRight } from "lucide-react"

const MentorSchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("week")
  const [showAddModal, setShowAddModal] = useState(false)

  const sessions = [
    {
      id: 1,
      student: "Alice Johnson",
      subject: "Mathematics",
      topic: "Calculus - Derivatives",
      date: "2024-01-15",
      startTime: "14:00",
      endTime: "15:00",
      type: "video",
      status: "confirmed",
    },
    {
      id: 2,
      student: "Bob Smith",
      subject: "Physics",
      topic: "Quantum Mechanics",
      date: "2024-01-15",
      startTime: "16:30",
      endTime: "17:30",
      type: "video",
      status: "pending",
    },
    {
      id: 3,
      student: "Carol Davis",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      date: "2024-01-16",
      startTime: "10:00",
      endTime: "11:00",
      type: "video",
      status: "confirmed",
    },
  ]

  const availability = [
    { day: "Monday", slots: ["09:00-12:00", "14:00-18:00"] },
    { day: "Tuesday", slots: ["10:00-16:00"] },
    { day: "Wednesday", slots: ["09:00-12:00", "14:00-17:00"] },
    { day: "Thursday", slots: ["10:00-18:00"] },
    { day: "Friday", slots: ["09:00-15:00"] },
    { day: "Saturday", slots: ["10:00-14:00"] },
    { day: "Sunday", slots: [] },
  ]

  const getWeekDays = (date: Date) => {
    const week = []
    const startDate = new Date(date)
    const day = startDate.getDay()
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1)
    startDate.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate)
      currentDay.setDate(startDate.getDate() + i)
      week.push(currentDay)
    }
    return week
  }

  const weekDays = getWeekDays(currentDate)

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return sessions.filter((session) => session.date === dateStr)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Schedule</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your sessions and availability</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Session
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWeek("prev")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <button
              onClick={() => navigateWeek("next")}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setViewMode("week")}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "week"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "month"
                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-1 sm:gap-4">
          {weekDays.map((day, index) => {
            const dayName = day.toLocaleDateString("en-US", { weekday: "short" })
            const dayNumber = day.getDate()
            const isToday = day.toDateString() === new Date().toDateString()
            const daySessions = getSessionsForDate(day)

            return (
              <div key={index} className="min-h-[120px] sm:min-h-[200px]">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{dayName}</div>
                  <div
                    className={`text-sm sm:text-lg font-semibold ${
                      isToday
                        ? "bg-purple-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto text-xs sm:text-base"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {dayNumber}
                  </div>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  {daySessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-1 sm:p-2 rounded-lg text-xs cursor-pointer hover:shadow-md transition-shadow ${
                        session.status === "confirmed"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                      }`}
                    >
                      <div className="font-medium text-xs">{session.startTime}</div>
                      <div className="truncate text-xs">{session.student}</div>
                      <div className="truncate text-gray-600 dark:text-gray-400 text-xs hidden sm:block">
                        {session.subject}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h3>
        <div className="space-y-4">
          {sessions
            .filter((session) => new Date(session.date + "T" + session.startTime) > new Date())
            .map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white">{session.student}</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">{session.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{session.topic}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex flex-col sm:text-right">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {session.startTime} - {session.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Availability Settings */}
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Availability</h3>
        <div className="space-y-4">
          {availability.map((day) => (
            <div key={day.day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="w-full sm:w-24">
                <span className="font-medium text-gray-900 dark:text-white">{day.day}</span>
              </div>
              <div className="flex-1 sm:mx-4">
                {day.slots.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Not available</span>
                )}
              </div>
              <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium self-start sm:self-center">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MentorSchedule
