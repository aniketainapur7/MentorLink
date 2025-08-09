import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, MessageCircle, Calendar, User, Filter } from "lucide-react"

const MentorStudents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      subject: "Mathematics",
      totalSessions: 12,
      upcomingSessions: 2,
      lastSession: "2024-01-10",
      rating: 5,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      subject: "Physics",
      totalSessions: 8,
      upcomingSessions: 1,
      lastSession: "2024-01-08",
      rating: 4,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      subject: "Chemistry",
      totalSessions: 15,
      upcomingSessions: 0,
      lastSession: "2024-01-05",
      rating: 5,
      status: "inactive",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david@example.com",
      subject: "Biology",
      totalSessions: 6,
      upcomingSessions: 3,
      lastSession: "2024-01-12",
      rating: 4,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Students</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your student relationships</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
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
              className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Students</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={student.image || "/placeholder.svg"}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm">{student.subject}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {student.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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
                    <p className="font-semibold text-gray-900 dark:text-white">{student.lastSession}</p>
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

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
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
