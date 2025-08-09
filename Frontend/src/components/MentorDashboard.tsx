import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Check, X, Calendar, MessageCircle, TrendingUp, Users, Award, Settings, VideoIcon } from 'lucide-react';
import { useMentorSessionStore } from '../stores/mentorSessionStore';

const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const { helpRequests, fetchMentorRequests, fetchMentorSessions, mentorSessions, updateSessionStatus, acceptRequest, declineRequest, acceptedSessions } = useMentorSessionStore();

  useEffect(() => {
    fetchMentorSessions();
    fetchMentorRequests();
  }, [fetchMentorSessions, fetchMentorRequests]);

  // Example heatmap values (replace with real data if needed)
  const today = new Date()
  const heatmapValues  = Array.from({ length: 120 }).map((_, i) => {
    const date = new Date()
    date.setDate(today.getDate() - i)
    return {
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5),
    }
  })

  const handleRequestAccept = (requestId: string) => {
    acceptRequest(requestId);
    updateSessionStatus(requestId, 'confirmed');
  };

  const handleRequestDecline = (requestId: string) => {
    declineRequest(requestId);
    updateSessionStatus(requestId, 'declined');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mentor Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your mentoring sessions and track your progress
          </p>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Activity Heatmap
          </h3>
          <CalendarHeatmap
            startDate={new Date(today.getFullYear(), today.getMonth() - 12, today.getDate())}
            endDate={today}
            values={heatmapValues}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${Math.min(value.count, 4)}`;
            }}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'requests', label: 'Help Requests', count: helpRequests.length },
                { id: 'sessions', label: 'Accepted Sessions', count: acceptedSessions.length },
                { id: 'availability', label: 'Availability' },
                { id: 'analytics', label: 'Analytics' }
              ].map(({ id, label, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${activeTab === id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <span>{label}</span>
                  {count !== undefined && (
                    <span className={`px-2 py-1 rounded-full text-xs ${activeTab === id
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'requests' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Incoming Help Requests
                </h3>
                {helpRequests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={request.studentId.profileImage || 'https://via.placeholder.com/100'}
                        alt={request.studentId.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {request.studentId.name}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                          <div>
                            <span className="font-medium">Subject:</span>
                            <div>{request.subject}</div>
                          </div>
                          <div>
                            <span className="font-medium">Topic:</span>
                            <div>{request.topic}</div>
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>
                            <div>{request.startTime}</div>
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span>
                            <div>{request.duration || "1 hr"}</div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                          "{request.message || "I need help with this topic."}"
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-green-600">
                            ${request.rate} ({request.duration})
                          </div>
                          <div className="flex space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRequestDecline(request._id)}
                              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-2"
                            >
                              <X className="w-4 h-4" />
                              <span>Decline</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRequestAccept(request._id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                            >
                              <Check className="w-4 h-4" />
                              <span>Accept</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'sessions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Accepted Session Requests
                </h3>
                {acceptedSessions.map((session, index) => (
                  <motion.div
                    key={session._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={session.avatar}
                        alt={session.studentId.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {session.studentId.name}
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {session.subject} • {session.time} • {session.duration}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <VideoIcon className="w-4 h-4" />
                          <span>Call</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'availability' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Manage Availability
                </h3>
                <div className="grid grid-cols-7 gap-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center">
                      <div className="font-medium text-gray-900 dark:text-white mb-2">{day}</div>
                      <div className="space-y-2">
                        {['9-12', '12-15', '15-18', '18-21'].map(time => (
                          <button
                            key={`${day}-${time}`}
                            className="w-full py-2 text-xs border border-gray-200 dark:border-gray-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Performance Analytics
                </h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Analytics dashboard coming soon...</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Set Availability</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">Profile Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">View Badges</span>
                </button>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">This Month's Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">30+ Sessions</div>
                    <div className="text-sm opacity-90">Helped 30 students</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
