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
import { useAppStore } from "./context/AuthStore";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Hero from "./components/Hero";
import RoleSelection from "./components/RoleSelection";
import AuthForm from "./components/AuthForm";
import StudentDashboard from "./components/StudentDashboard";
import MentorDashboard from "./components/MentorDashboard";
import QuickConnect from "./components/QuickConnect";

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

function AppRoutes() {
  const { isAuthenticated, loading, user } = useAppStore();

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
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
              <Route path="/dashboard" element={<StudentDashboard />} />
            ) : (
              <Route path="/dashboard" element={<MentorDashboard />} />
            )}
            <Route path="/quick-connect" element={<QuickConnect />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
