"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Calendar, MessageSquare, ThumbsUp, Filter } from "lucide-react"

const StudentReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState("given")
  const [filterRating, setFilterRating] = useState("all")

  const givenReviews = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      rating: 5,
      date: "2024-01-10",
      session: "Calculus - Derivatives",
      review:
        "Excellent teaching! Dr. Johnson explained complex concepts in a very understandable way. The session was well-structured and I feel much more confident about derivatives now.",
      helpful: 12,
      mentorResponse:
        "Thank you for the kind words! I'm glad the session was helpful. Keep practicing those problems we discussed!",
    },
    {
      id: 2,
      mentor: "Prof. Mike Chen",
      subject: "Physics",
      rating: 4,
      date: "2024-01-08",
      session: "Quantum Mechanics Basics",
      review:
        "Good session overall. The explanations were clear, though I would have liked more practice problems. Prof. Chen is very knowledgeable.",
      helpful: 8,
      mentorResponse: null,
    },
    {
      id: 3,
      mentor: "Dr. Emily Davis",
      subject: "Chemistry",
      rating: 5,
      date: "2024-01-05",
      session: "Organic Chemistry Lab Prep",
      review:
        "Amazing preparation for the lab! Dr. Davis covered all the safety protocols and procedures thoroughly. Felt very prepared for the actual lab work.",
      helpful: 15,
      mentorResponse: "So happy to hear you felt prepared! Safety first in the lab. Good luck with your experiments!",
    },
  ]

  const receivedReviews = [
    {
      id: 1,
      reviewer: "Anonymous Student",
      subject: "Study Group Feedback",
      rating: 4,
      date: "2024-01-12",
      review: "Great study partner! Very collaborative and helped explain concepts I was struggling with.",
      helpful: 5,
    },
    {
      id: 2,
      reviewer: "Anonymous Student",
      subject: "Peer Review",
      rating: 5,
      date: "2024-01-09",
      review: "Excellent notes sharing and very supportive during group study sessions.",
      helpful: 3,
    },
  ]

  const filteredGivenReviews = givenReviews.filter((review) => {
    if (filterRating === "all") return true
    return review.rating === Number.parseInt(filterRating)
  })

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reviews & Feedback</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your reviews and feedback</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex w-full">
        <button
          onClick={() => setActiveTab("given")}
          className={`flex-1 px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
            activeTab === "given"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">Reviews Given ({givenReviews.length})</span>
          <span className="sm:hidden">Given ({givenReviews.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("received")}
          className={`flex-1 px-4 lg:px-6 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
            activeTab === "received"
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">Reviews Received ({receivedReviews.length})</span>
          <span className="sm:hidden">Received ({receivedReviews.length})</span>
        </button>
      </div>

      {/* Filter for Given Reviews */}
      {activeTab === "given" && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {activeTab === "given" &&
          filteredGivenReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.mentor}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{review.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.session}</p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end gap-2">
                  {renderStars(review.rating)}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm lg:text-base">{review.review}</p>
              </div>

              {review.mentorResponse && (
                <div className="bg-gray-50 dark:bg-gray-700 p-3 lg:p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Mentor Response</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{review.mentorResponse}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful} found this helpful</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    Edit Review
                  </button>
                  <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

        {activeTab === "received" &&
          receivedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.reviewer}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{review.subject}</p>
                </div>
                <div className="text-right">
                  {renderStars(review.rating)}
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.review}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <ThumbsUp className="w-4 h-4" />
                <span>{review.helpful} found this helpful</span>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Empty State */}
      {((activeTab === "given" && filteredGivenReviews.length === 0) ||
        (activeTab === "received" && receivedReviews.length === 0)) && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {activeTab === "given" ? "No reviews given yet." : "No reviews received yet."}
          </p>
        </div>
      )}
    </div>
  )
}

export default StudentReviews
