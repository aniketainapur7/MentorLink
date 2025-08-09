"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, ChevronLeft } from "lucide-react"

const StudentMessages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      subject: "Mathematics",
      lastMessage: "Great progress on calculus! Let's schedule another session.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      mentor: "Prof. Mike Chen",
      subject: "Physics",
      lastMessage: "The quantum mechanics assignment looks good.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      mentor: "Dr. Emily Davis",
      subject: "Chemistry",
      lastMessage: "Don't forget about tomorrow's lab session.",
      timestamp: "3 hours ago",
      unread: 1,
      online: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "mentor",
      content: "Hi! How are you finding the calculus problems we discussed?",
      timestamp: "10:30 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      sender: "student",
      content: "They're challenging but I'm making progress. The derivative rules are starting to make sense.",
      timestamp: "10:35 AM",
    },
    {
      id: 3,
      sender: "mentor",
      content: "That's excellent! Practice is key. Would you like to schedule another session this week?",
      timestamp: "10:37 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      sender: "student",
      content: "Yes, that would be great. How about Thursday afternoon?",
      timestamp: "10:40 AM",
    },
    {
      id: 5,
      sender: "mentor",
      content: "Perfect! I'll send you a calendar invite for Thursday at 2 PM.",
      timestamp: "10:42 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const selectedConversation = conversations.find((conv) => conv.id === selectedChat)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Mobile Header - Only show on mobile when no chat selected */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div
        className={`${selectedChat && "hidden lg:flex"} lg:w-1/3 w-full border-r border-gray-200 dark:border-gray-700 flex flex-col`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:block p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 ${
                selectedChat === conversation.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conversation.avatar || "/placeholder.svg"}
                    alt={conversation.mentor}
                    className="w-12 h-12 lg:w-10 lg:h-10 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {conversation.mentor}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.timestamp}</span>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">{conversation.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!selectedChat && "hidden lg:flex"} flex-1 flex flex-col`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Mobile back button */}
                  <button
                    onClick={() => setSelectedChat(0)}
                    className="lg:hidden p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={selectedConversation.avatar || "/placeholder.svg"}
                    alt={selectedConversation.mentor}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{selectedConversation.mentor}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{selectedConversation.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 lg:gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Video className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] lg:max-w-xs xl:max-w-md ${message.sender === "student" ? "flex-row-reverse" : ""}`}
                  >
                    {message.sender === "mentor" && (
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt="Mentor"
                        className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
                      />
                    )}
                    <div
                      className={`px-3 lg:px-4 py-2 rounded-lg ${
                        message.sender === "student"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${message.sender === "student" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-3 lg:px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentMessages
