// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AppProvider, useApp } from './context/AppContext';
// import Navbar from './components/Navbar';
// import Loading from './components/Loading';
// import Hero from './components/Hero';
// import RoleSelection from './components/RoleSelection';
// import AuthForm from './components/AuthForm';
// import StudentDashboard from './components/StudentDashboard';
// import MentorDashboard from './components/MentorDashboard';
// import QuickConnect from './components/QuickConnect';

// function AppContent() {
//   const { state } = useApp();
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState<'hero' | 'role-selection' | 'auth'>('hero');
//   const [selectedRole, setSelectedRole] = useState<'student' | 'mentor' | null>(null);

//   useEffect(() => {
//     // Simulate loading time
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleRoleSelect = (role: 'student' | 'mentor') => {
//     setSelectedRole(role);
//     setCurrentPage('auth');
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className={`min-h-screen ${state.theme === 'dark' ? 'dark' : ''}`}>
//       <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
//         <AnimatePresence mode="wait">
//           {!state.isAuthenticated ? (
//             <motion.div
//               key="unauthenticated"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Navbar />

//               {currentPage === 'hero' && (
//                 <motion.div
//                   key="hero"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Hero />
//                   <div className="text-center pb-16">

//                   </div>
//                 </motion.div>
//               )}

//               {currentPage === 'role-selection' && (
//                 <motion.div
//                   key="role-selection"
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <RoleSelection onRoleSelect={handleRoleSelect} />
//                 </motion.div>
//               )}

//               {currentPage === 'auth' && selectedRole && (
//                 <motion.div
//                   key="auth"
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <AuthForm 
//                     role={selectedRole} 
//                     onBack={() => setCurrentPage('role-selection')} 
//                   />
//                 </motion.div>
//               )}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="authenticated"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Navbar />
//               {state.user?.role === 'student' ? (
//                 <StudentDashboard />
//               ) : (
//                 <MentorDashboard />
//               )}
//               <QuickConnect />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AppProvider>
//       <AppContent />
//     </AppProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "./stores/AuthStore";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Hero from "./components/Hero";
import RoleSelection from "./components/RoleSelection";
import AuthForm from "./components/AuthForm";
import StudentDashboard from "./components/StudentDashboard";
import MentorDashboard from "./components/MentorDashboard";
import QuickConnect from "./components/QuickConnect";
import { Toaster } from "react-hot-toast";
import MentorLayout from "./layouts/MentorLayout";
import StudentLayout from "./layouts/StudentLayout";
import FindMentors from "./pages/student/FindMentors";
import StudentSessions from "./pages/student/StudentSessions";
import MentorStudents from "./pages/mentor/MentorStudents";
import { useEffect } from "react";
import MentorSessions from "./pages/mentor/MentorSessions";
import MentorMessages from "./pages/mentor/MentorMessages";
import StudentMessages from "./pages/student/StudentMessages";
import StudentMaterials from "./pages/student/StudentMaterials";
import StudentReviews from "./pages/student/StudentReviews";
import StudentProfile from "./pages/student/StudentProfile";
import StudentSettings from "./pages/student/StudentSettings";
import MentorSchedule from "./pages/mentor/MentorSchedule";


// Wrapper so RoleSelection gets the right props
function RoleSelectionWrapper() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string | undefined) => {
    navigate(`/auth/${role}`);
  };

  return <RoleSelection onRoleSelect={handleRoleSelect} />;
}

// Wrapper so AuthForm gets the right props
function AuthFormWrapper() {
  const navigate = useNavigate();
  const { role } = useParams(); // 'student' or 'mentor'

  const handleBack = () => {
    navigate("/role-selection");
  };

  return <AuthForm role={role} onBack={handleBack} />;
}

// Placeholder components for other pages


const MentorAnalytics = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">Analytics</h2>
    <p>Analytics dashboard coming soon...</p>
  </div>
)
const MentorEarnings = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">Earnings</h2>
    <p>Earnings tracking coming soon...</p>
  </div>
)
const MentorProfile = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">Mentor Profile</h2>
    <p>Profile settings coming soon...</p>
  </div>
)
const MentorSettings = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold">Settings</h2>
    <p>Settings functionality coming soon...</p>
  </div>
)

const App: React.FC = () => {
  const { isAuthenticated, loading, user } = useAppStore();
  const navigate = useNavigate();

  //   useEffect(() => {
  //   if (!loading && isAuthenticated && user) {
  //     if (user.role === "student") {
  //       navigate("/student/dashboard", { replace: true });
  //     } else if (user.role === "mentor") {
  //       navigate("/mentor/dashboard", { replace: true });
  //     }
  //   }
  // }, [loading, isAuthenticated, user, navigate]);

  if (loading) return <Loading />;


  return (

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Toaster/>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<Hero />} />
              <Route path="/role-selection" element={<RoleSelectionWrapper />} />
              <Route path="/auth/:role" element={<AuthFormWrapper />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              {user?.role === "student" ? (
                <Route path="/student" element={<StudentLayout />}>
                  <Route index element={<Navigate to="/student/dashboard" replace />} />
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="find-mentors" element={<FindMentors />} />
                  <Route path="sessions" element={<StudentSessions />} />
                  <Route path="messages" element={<StudentMessages />} />
                  <Route path="materials" element={<StudentMaterials />} />
                  <Route path="reviews" element={<StudentReviews />} />
                  <Route path="profile" element={<StudentProfile />} />
                  <Route path="settings" element={<StudentSettings />} />
                </Route>
              ) : (
                <Route path="/mentor" element={<MentorLayout />}>
                  <Route index element={<Navigate to="/mentor/dashboard" replace />} />
                  <Route path="dashboard" element={<MentorDashboard />} />
                  <Route path="students" element={<MentorStudents />} />
                  <Route path="schedule" element={<MentorSchedule />} />
                  <Route path="messages" element={<MentorMessages />} />
                  <Route path="history" element={<MentorSessions />} />
                  <Route path="analytics" element={<MentorAnalytics />} />
                  <Route path="earnings" element={<MentorEarnings />} />
                  <Route path="profile" element={<MentorProfile />} />
                  <Route path="settings" element={<MentorSettings />} />
                </Route>
              )}
              <Route path="/quick-connect" element={<QuickConnect />} />
              {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
            </>
          )}

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
  )
}

export default App

