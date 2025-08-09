// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Filter, Star, Clock, DollarSign, BookOpen, Heart, MessageCircle, Calendar } from 'lucide-react';
// import { useMentorStore } from '../stores/mentorStore';
// import { useSessionStore } from '../stores/sessionStore';
// import { useStudentSessionStore } from '../stores/studentSessionStore';

// const StudentDashboard: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('');
//   // const [priceRange, setPriceRange] = useState([0, 100]);
//   const {mentors,savedMentors,fetchMentors } = useMentorStore();
//   const {bookSession,sessions} = useSessionStore();
//   const {studentSessions, acceptedSessions, completedSessions, requestedSessions ,fetchStudentRequests, fetchStudentSessions} = useStudentSessionStore();
//   const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'English', 'History'];
//   // console.log(mentors);
//   // console.log(studentSessions);
//   // console.log(acceptedSessions);
//   // console.log(completedSessions);
//   // console.log(requestedSessions);
//   console.log(sessions,'session');
//   useEffect(() => {
//     fetchMentors();
//     fetchStudentSessions()
//     // fetchStudentRequests();
//   }, [fetchMentors, fetchStudentSessions, fetchStudentRequests]);

  

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Find Your Perfect Mentor
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Get personalized help from expert mentors in any subject
//           </p>
//         </motion.div>

//         {/* Search and Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search mentors by name, subject, or expertise..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//             </div>
            
//             <div className="flex gap-4">
//               <select
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 {subjects.map(subject => (
//                   <option key={subject} value={subject}>{subject}</option>
//                 ))}
//               </select>
              
//               <button className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors">
//                 <Filter className="w-4 h-4" />
//                 <span>Filters</span>
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content - Mentor Cards */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="grid gap-6"
//             >
//               {Array.isArray(mentors) && mentors.map((mentor, index) => (
//                 <motion.div
//                   key={mentor._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 + index * 0.1 }}
//                   whileHover={{ y: -2 }}
//                   className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
//                 >
//                   <div className="flex flex-col md:flex-row gap-6">
//                     {/* Avatar and Online Status */}
//                     <div className="relative">
//                       <img
//                         src={mentor.avatar}
//                         alt={mentor.name}
//                         className="w-20 h-20 rounded-full object-cover"
//                       />
//                       <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
//                         mentor.isOnline ? 'bg-green-500' : 'bg-gray-400'
//                       }`} />
//                     </div>

//                     {/* Mentor Info */}
//                     <div className="flex-1">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
//                             {mentor.name}
//                           </h3>
//                           <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
//                             <div className="flex items-center space-x-1">
//                               <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                               <span>{mentor.rating}</span>
//                               <span>({mentor.reviews} reviews)</span>
//                             </div>
//                             <div className="flex items-center space-x-1">
//                               <DollarSign className="w-4 h-4" />
//                               <span>${mentor.hourlyRate}/hr</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
//                         {mentor.bio}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {mentor.subjects.map(subject => (
//                           <span
//                             key={subject}
//                             className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
//                           >
//                             {subject}
//                           </span>
//                         ))}
//                       </div>

//                       {/* <div className="flex flex-wrap gap-2 mb-4">
//                         {mentor.badges.map(badge => (
//                           <span
//                             key={badge}
//                             className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium"
//                           >
//                             {badge}
//                           </span>
//                         ))}
//                       </div> */}

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2 text-sm">
//                           <Clock className="w-4 h-4 text-gray-400" />
//                           <span className={`${
//                             mentor.isOnline ? 'text-green-600' : 'text-gray-500'
//                           }`}>
//                             {/* {mentor.availability} */}
//                             FUCK U
//                           </span>
//                         </div>

//                         <div className="flex items-center space-x-3">
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                           >
//                             <Heart className="w-5 h-5" />
//                           </motion.button>
                          
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                           >
//                             <MessageCircle className="w-4 h-4" />
//                             <span>Message</span>
//                           </motion.button>
                          
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="flex items-center space-x-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
//                           >
//                             <Calendar className="w-4 h-4" />
//                             <button onClick={()=>{bookSession(mentor._id,mentor.subjects[0],new Date().toISOString()); console.log(mentor._id)}}>Book Session</button>
//                           </motion.button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Saved Mentors */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
//                 <Heart className="w-5 h-5 text-red-500" />
//                 <span>Saved Mentors</span>
//               </h3>
//               <div className="space-y-3">
//                 {savedMentors.map(mentor => (
//                   <div key={mentor._id} className="flex items-center space-x-3">
//                     <img
//                       src={mentor.avatar}
//                       alt={mentor.name}
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <div className="font-medium text-gray-900 dark:text-white text-sm">
//                         {mentor.name}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         ${mentor.hourlyRate}/hr
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Upcoming Sessions */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
//                 <BookOpen className="w-5 h-5 text-blue-500" />
//                 <span>Upcoming Sessions</span>
//               </h3>
//               <div className="space-y-4">
//                 {sessions.map(session => (
//                   <div key={session._id} className="border-l-2 border-blue-200 pl-4">
//                     <div className="font-medium text-gray-900 dark:text-white text-sm">
//                       {session.subject}
//                     </div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       with {session.mentorId.name}
//                     </div>
//                     <div className="flex items-center justify-between text-xs text-gray-400">
//                       <span>{session.date}</span>
//                       <div className="flex items-center space-x-1">
//                         {[...Array(session.rating)].map((_, i) => (
//                           <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Recent Sessions */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
//                 <BookOpen className="w-5 h-5 text-blue-500" />
//                 <span>Recent Sessions</span>
//               </h3>
//               <div className="space-y-4">
//                 {sessions.map(session => (
//                   <div key={session._id} className="border-l-2 border-blue-200 pl-4">
//                     <div className="font-medium text-gray-900 dark:text-white text-sm">
//                       {session.subject}
//                     </div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       with {session.mentorId.name}
//                     </div>
//                     <div className="flex items-center justify-between text-xs text-gray-400">
//                       <span>{session.date}</span>
//                       <div className="flex items-center space-x-1">
//                         {[...Array(session.rating)].map((_, i) => (
//                           <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Learning Progress */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 }}
//               className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
//             >
//               <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
//               <div className="space-y-3">
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Mathematics</span>
//                     <span>75%</span>
//                   </div>
//                   <div className="w-full bg-white/20 rounded-full h-2">
//                     <div className="bg-white h-2 rounded-full" style={{ width: '75%' }} />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-sm mb-1">
//                     <span>Physics</span>
//                     <span>60%</span>
//                   </div>
//                   <div className="w-full bg-white/20 rounded-full h-2">
//                     <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Star, BookOpen, TrendingUp } from "lucide-react"
import { useStudentSessionStore } from "../stores/studentSessionStore"
import { useSessionStore } from "../stores/sessionStore"

const StudentDashboard: React.FC = () => {

  const {studentSessions, acceptedSessions, completedSessions, requestedSessions ,fetchStudentRequests, fetchStudentSessions} = useStudentSessionStore();
  const {sessions} = useSessionStore();
  // const upcomingSessions = [
  //   { id: 1, mentor: "Dr. Sarah Johnson", subject: "Mathematics", time: "2:00 PM", date: "Today" },
  //   { id: 2, mentor: "Prof. Mike Chen", subject: "Physics", time: "4:30 PM", date: "Tomorrow" },
  //   { id: 3, mentor: "Dr. Emily Davis", subject: "Chemistry", time: "10:00 AM", date: "Friday" },
  // ]

  // const recentSessions = [
  //   { id: 1, mentor: "Dr. John Smith", subject: "Biology", rating: 5, date: "2 days ago" },
  //   { id: 2, mentor: "Prof. Lisa Wang", subject: "English", rating: 4, date: "1 week ago" },
  // ]

  const stats = [
    { label: "Total Sessions", value: "24", icon: Calendar, color: "blue" },
    { label: "Hours Learned", value: "48", icon: Clock, color: "green" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "yellow" },
    { label: "Subjects", value: "6", icon: BookOpen, color: "purple" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{session.mentor}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{session.time}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Sessions</h3>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{session.mentor}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{session.subject}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < session.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Progress</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Progress chart will be displayed here</p>
        </div>
      </motion.div>
    </div>
  )
}

export default StudentDashboard
