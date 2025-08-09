"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Video, MessageCircle, Star } from "lucide-react"
import { useStudentSessionStore } from "../../stores/studentSessionStore"

const StudentSessions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const {studentSessions , acceptedSessions, completedSessions} = useStudentSessionStore();

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      topic: "Calculus - Derivatives",
      date: "2024-01-15",
      time: "2:00 PM - 3:00 PM",
      status: "confirmed",
      meetingLink: "https://meet.example.com/abc123",
    },
    {
      id: 2,
      mentor: "Prof. Mike Chen",
      subject: "Physics",
      topic: "Quantum Mechanics",
      date: "2024-01-16",
      time: "4:30 PM - 5:30 PM",
      status: "pending",
      meetingLink: null,
    },
  ]

  const pastSessions = [
    {
      id: 3,
      mentor: "Dr. Emily Davis",
      subject: "Chemistry",
      topic: "Organic Chemistry Basics",
      date: "2024-01-10",
      time: "10:00 AM - 11:00 AM",
      status: "completed",
      rating: 5,
      notes: "Great session! Very helpful explanations.",
    },
    {
      id: 4,
      mentor: "Dr. John Smith",
      subject: "Biology",
      topic: "Cell Structure",
      date: "2024-01-08",
      time: "3:00 PM - 4:00 PM",
      status: "completed",
      rating: 4,
      notes: "Good session, would like more practice problems.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Sessions</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your learning sessions</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex w-full">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
            activeTab === "upcoming"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
            activeTab === "past"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          Past Sessions
        </button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {activeTab === "upcoming" &&
          acceptedSessions.map((session, index) => (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.subject}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{session.mentorId.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.subject}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium self-start ${
                    session.status === "confirmed"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                  }`}
                >
                  {session.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{session.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{session.startTime}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {session.meetingurl && (
                  <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Video className="w-4 h-4" />
                    Join Session
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  <MessageCircle className="w-4 h-4" />
                  Message Mentor
                </button>
                <button className="text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm">
                  Cancel
                </button>
              </div>
            </motion.div>
          ))}

        {activeTab === "past" &&
          completedSessions.map((session, index) => (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{session.subject}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{session.mentorId.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.subject}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < session.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{session.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{session.startTime}</span>
                </div>
              </div>

              {session.notes && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 lg:p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{session.notes}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Book Again
                </button>
                <button className="border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                  Leave Review
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}

export default StudentSessions
