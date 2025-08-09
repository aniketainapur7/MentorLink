"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, Filter, Clock, DollarSign } from "lucide-react"
import { useMentorStore } from "../../stores/mentorStore"

const FindMentors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const { fetchMentors, mentors } = useMentorStore()

  useEffect(() => {
    fetchMentors()
  }, [fetchMentors])

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English"]

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.subjects.some((subj) => subj.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSubject =
      selectedSubject === "all" ||
      mentor.subjects.some((subj) => subj.toLowerCase() === selectedSubject.toLowerCase())

    return matchesSearch && matchesSubject
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Find Your Perfect Mentor</h2>
        <p className="text-gray-600 dark:text-gray-400">Connect with expert mentors in your subject area</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search mentors, subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === "all" ? "All Subjects" : subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {filteredMentors.map((mentor, index) => (
          <motion.div
            key={mentor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={mentor.avatar || "/placeholder.svg"}
                alt={mentor.name}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                {/* Name & Rating */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {mentor.subjects.join(", ")}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{mentor.rating?.toFixed(1) || "N/A"}</span>
                      {mentor.reviews !== undefined && (
                        <span className="text-xs text-gray-500">({mentor.reviews})</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Availability & Rate */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{mentor.availability?.join(", ") || "No availability listed"}</span>
                  </div>
                  {mentor.hourlyRate !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>${mentor.hourlyRate}/hour</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {mentor.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{mentor.bio}</p>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Book Session
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No mentors found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default FindMentors
