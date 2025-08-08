import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'mentor') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  const roles = [
    {
      type: 'student' as const,
      title: 'I\'m a Student',
      description: 'Looking for help with studies, assignments, or learning new concepts',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
      benefits: ['Get instant help', 'Learn from experts', 'Flexible scheduling', 'Progress tracking']
    },
    {
      type: 'mentor' as const,
      title: 'I\'m a Mentor',
      description: 'Ready to share knowledge and help students achieve their goals',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      benefits: ['Earn while helping', 'Flexible hours', 'Share expertise', 'Build reputation']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tell us how you'd like to use MentorLink
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map(({ type, title, description, icon: Icon, gradient, benefits }, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onRoleSelect(type)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {description}
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 dark:text-gray-200">
                    <div className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full mr-3`} />
                    {benefit}
                  </li>
                ))}
              </ul>

              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center text-transparent bg-gradient-to-r ${gradient} bg-clip-text font-semibold group-hover:gap-3 gap-2 transition-all duration-300`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" style={{ color: 'inherit' }} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 dark:text-gray-400">
            Don't worry, you can always switch roles later in your profile settings
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;