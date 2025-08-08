import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Hero from './components/Hero';
import RoleSelection from './components/RoleSelection';
import AuthForm from './components/AuthForm';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';
import QuickConnect from './components/QuickConnect';

function AppContent() {
  const { state } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'hero' | 'role-selection' | 'auth'>('hero');
  const [selectedRole, setSelectedRole] = useState<'student' | 'mentor' | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRoleSelect = (role: 'student' | 'mentor') => {
    setSelectedRole(role);
    setCurrentPage('auth');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${state.theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AnimatePresence mode="wait">
          {!state.isAuthenticated ? (
            <motion.div
              key="unauthenticated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Navbar />
              
              {currentPage === 'hero' && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero />
                  <div className="text-center pb-16">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage('role-selection')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started Now
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentPage === 'role-selection' && (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <RoleSelection onRoleSelect={handleRoleSelect} />
                </motion.div>
              )}

              {currentPage === 'auth' && selectedRole && (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthForm 
                    role={selectedRole} 
                    onBack={() => setCurrentPage('role-selection')} 
                  />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="authenticated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Navbar />
              {state.user?.role === 'student' ? (
                <StudentDashboard />
              ) : (
                <MentorDashboard />
              )}
              <QuickConnect />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;