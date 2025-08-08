import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, DollarSign, BookOpen, Heart, MessageCircle, Video, Calendar } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'English', 'History'];

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      subjects: ['Mathematics', 'Physics'],
      bio: 'PhD in Applied Mathematics with 8+ years teaching experience. Specializes in calculus and linear algebra.',
      availability: 'Available now',
      badges: ['Top Rated', 'Quick Response'],
      isOnline: true
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 35,
      subjects: ['Computer Science', 'Programming'],
      bio: 'Senior Software Engineer and CS Professor. Expert in Python, Java, and data structures.',
      availability: 'Available in 2 hours',
      badges: ['Expert', 'Patient Teacher'],
      isOnline: false
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 40,
      subjects: ['Chemistry', 'Biology'],
      bio: 'PhD in Organic Chemistry. Passionate about making complex concepts easy to understand.',
      availability: 'Available now',
      badges: ['Top Rated', 'Beginner Friendly'],
      isOnline: true
    },
    {
      id: 4,
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.7,
      reviews: 73,
      hourlyRate: 25,
      subjects: ['English', 'Literature'],
      bio: 'Masters in English Literature. Specializes in essay writing and literary analysis.',
      availability: 'Available tomorrow',
      badges: ['Writing Expert', 'Affordable'],
      isOnline: false
    }
  ];

  const recentSessions = [
    {
      id: 1,
      mentor: 'Dr. Sarah Johnson',
      subject: 'Calculus',
      date: '2 days ago',
      duration: '45 min',
      rating: 5
    },
    {
      id: 2,
      mentor: 'Prof. Michael Chen',
      subject: 'Data Structures',
      date: '1 week ago',
      duration: '60 min',
      rating: 5
    }
  ];

  const savedMentors = mentors.filter(mentor => [1, 3].includes(mentor.id));

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
            Find Your Perfect Mentor
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get personalized help from expert mentors in any subject
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search mentors by name, subject, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              
              <button className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Mentor Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid gap-6"
            >
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar and Online Status */}
                    <div className="relative">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                        mentor.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>

                    {/* Mentor Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {mentor.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{mentor.rating}</span>
                              <span>({mentor.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${mentor.hourlyRate}/hr</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {mentor.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.subjects.map(subject => (
                          <span
                            key={subject}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.badges.map(badge => (
                          <span
                            key={badge}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={`${
                            mentor.isOnline ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            {mentor.availability}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Heart className="w-5 h-5" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Message</span>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>Book Session</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Mentors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Saved Mentors</span>
              </h3>
              <div className="space-y-3">
                {savedMentors.map(mentor => (
                  <div key={mentor.id} className="flex items-center space-x-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {mentor.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${mentor.hourlyRate}/hr
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span>Recent Sessions</span>
              </h3>
              <div className="space-y-4">
                {recentSessions.map(session => (
                  <div key={session.id} className="border-l-2 border-blue-200 pl-4">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {session.subject}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      with {session.mentor}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{session.date}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(session.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mathematics</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Physics</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
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

export default StudentDashboard;