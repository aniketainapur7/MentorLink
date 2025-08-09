import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Calendar, DollarSign, Star, Clock, MessageCircle, TrendingUp, Users, Award, Settings, VideoIcon } from 'lucide-react';
import { useMentorSessionStore } from '../stores/mentorSessionStore';

const MentorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const { helpRequests, fetchMentorRequests, fetchMentorSessions, mentorSessions, updateSessionStatus, isFetching, acceptRequest,declineRequest, acceptedSessions} = useMentorSessionStore();

  useEffect(() => {
    fetchMentorSessions();
    fetchMentorRequests();
  }, [fetchMentorSessions, fetchMentorRequests]);

 console.log("Accepted Sessions:", acceptedSessions);

  // const helpRequests = [
  //   {
  //     id: 1,
  //     student: 'Alex Thompson',
  //     avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
  //     subject: 'Calculus',
  //     topic: 'Integration by parts',
  //     preferredTime: 'Today, 3:00 PM',
  //     urgency: 'High',
  //     rate: 45,
  //     duration: '1 hour',
  //     message: 'Hi! I need help understanding integration by parts for my upcoming exam. Can you help me work through some practice problems?'
  //   },
  //   {
  //     id: 2,
  //     student: 'Emma Davis',
  //     avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  //     subject: 'Physics',
  //     topic: 'Quantum mechanics basics',
  //     preferredTime: 'Tomorrow, 10:00 AM',
  //     urgency: 'Medium',
  //     rate: 45,
  //     duration: '45 minutes',
  //     message: 'I\'m struggling with the basic concepts of quantum mechanics. Could you help explain wave functions and the uncertainty principle?'
  //   },
  //   {
  //     id: 3,
  //     student: 'Ryan Johnson',
  //     avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  //     subject: 'Mathematics',
  //     topic: 'Linear algebra',
  //     preferredTime: 'This weekend',
  //     urgency: 'Low',
  //     rate: 45,
  //     duration: '2 hours',
  //     message: 'Looking for help with matrix operations and eigenvalues. I have a project due next week and want to make sure I understand the concepts well.'
  //   }
  // ];

  const upcomingSessions = [
    {
      id: 1,
      student: 'Sarah Wilson',
      subject: 'Mathematics',
      time: 'Today, 2:00 PM',
      duration: '1 hour',
      type: 'video',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      student: 'Mike Chen',
      subject: 'Physics',
      time: 'Tomorrow, 11:00 AM',
      duration: '45 minutes',
      type: 'chat',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const stats = [
    {
      label: 'Total Earnings',
      value: '$2,450',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Sessions This Month',
      value: '34',
      change: '+8%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'Average Rating',
      value: '4.9',
      change: '+0.1',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      label: 'Response Time',
      value: '15m',
      change: '-5m',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  const handleRequestAction = (requestId: string, action: 'accept' | 'decline') => {
    // Handle request acceptance/decline
    console.log(`${action} request ${requestId}`);
    if (action === 'accept') {
      updateSessionStatus(requestId, 'confirmed');
    } else {
      updateSessionStatus(requestId, 'declined');
    }
  };

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

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map(({ label, value, change, icon: Icon, color, bgColor }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {label}
              </div>
            </motion.div>
          ))}
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
                        src={request.studentId.profileImage || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100.placeholder.com/100'}
                        alt={request.studentId.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {request.studentId.name}
                          </h4>

                        </div>

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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
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
                      </div>

                      <div className="flex space-x-3">
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
              >
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">This Month's Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">Top Rated Mentor</div>
                    <div className="text-sm opacity-90">Maintained 4.9+ rating</div>
                  </div>
                </div>
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