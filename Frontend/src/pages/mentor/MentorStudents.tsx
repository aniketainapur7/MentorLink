"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, MessageCircle, Calendar, User, Filter } from "lucide-react"
import axiosInstance from "../../utils/axios"

const MentorStudents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const res = await axiosInstance.get("/mentor/mystudents")
        setStudents(res.data.students || [])
      } catch (err: any) {
        console.error("Failed to fetch students:", err)
        setError("Unable to load students. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || student.status === filterStatus

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading students...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Students</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your student relationships</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students by name, email, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={student.image || "/placeholder.svg"}
                alt={student.name}
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{student.email}</p>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm">{student.subject}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                      student.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Total Sessions</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{student.totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Upcoming</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{student.upcomingSessions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Last Session</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-xs lg:text-sm">
                      {student.lastSession}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Rating</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < student.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex items-center justify-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default MentorStudents
