import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Users, Clock, Star } from 'lucide-react';
import { useAppStore } from '../stores/AuthStore';

const QuickConnect: React.FC = () => {
  const state = useAppStore.getState();
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  if (!state.isAuthenticated || state.user?.role !== 'student' || !state.quickConnectAvailable) {
    return null;
  }

  const handleQuickConnect = () => {
    setIsConnecting(true);
    // Simulate matching process
    setTimeout(() => {
      setIsConnecting(false);
      setIsOpen(false);
      // In real app, this would navigate to chat or show matched mentor
      alert('Connected with Sarah Johnson! Starting chat...');
    }, 3000);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
      >
        <Zap className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Quick Connect</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isConnecting ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get instant help from an available mentor right now!
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>12 mentors available now</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Average response time: 30 seconds</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>4.9/5 average rating</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleQuickConnect}
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-pink-600 transition-all duration-200"
                  >
                    Connect Now
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-6" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Finding the perfect mentor...
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We're matching you with an expert in your subject area
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    This usually takes less than a minute
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickConnect;