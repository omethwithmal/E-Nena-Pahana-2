import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaVideo, 
  FaBook, 
  FaFileAlt, 
  FaQuestionCircle,
  FaChartLine,
  FaDollarSign,
  FaComments
} from 'react-icons/fa';
import AdminDashNaveBar from './AdminDashNaveBar';

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Sample data - replace with actual data from your backend
  const stats = {
    totalViewers: 1250,
    totalSubscribers: 850,
    totalVideos: 45,
    totalEbooks: 30,
    totalPapers: 25,
    totalQuizzes: 50,
    totalRevenue: 25000,
    totalFeedback: 120
  };

  const StatCard = ({ title, value, icon, gradient, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className={`bg-gradient-to-br ${gradient} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative`}
    >
      {/* Animated Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="p-6 relative">
        <div className="flex flex-col items-center text-center">
          <div className="text-white mb-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white"
          >
            {value}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex">
      <AdminDashNaveBar onCollapse={setIsCollapsed} />
      <motion.div 
        className="flex-1 min-h-screen bg-white"
        initial={{ marginLeft: 280 }}
        animate={{ marginLeft: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8"
            >
              Dashboard Overview
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                title="Total Viewers" 
                value={stats.totalViewers} 
                icon={<FaUsers className="w-8 h-8" />}
                gradient="from-blue-500 to-cyan-500"
                delay={0.1}
              />
              <StatCard 
                title="Total Subscribers" 
                value={stats.totalSubscribers} 
                icon={<FaUsers className="w-8 h-8" />}
                gradient="from-purple-500 to-pink-500"
                delay={0.2}
              />
              <StatCard 
                title="Total Revenue" 
                value={`$${stats.totalRevenue.toLocaleString()}`} 
                icon={<FaDollarSign className="w-8 h-8" />}
                gradient="from-indigo-500 to-violet-500"
                delay={0.3}
              />
              <StatCard 
                title="Total Feedback" 
                value={stats.totalFeedback} 
                icon={<FaComments className="w-8 h-8" />}
                gradient="from-emerald-500 to-teal-500"
                delay={0.4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Total Videos" 
                value={stats.totalVideos} 
                icon={<FaVideo className="w-8 h-8" />}
                gradient="from-rose-500 to-pink-500"
                delay={0.5}
              />
              <StatCard 
                title="Total E-Books" 
                value={stats.totalEbooks} 
                icon={<FaBook className="w-8 h-8" />}
                gradient="from-amber-500 to-orange-500"
                delay={0.6}
              />
              <StatCard 
                title="Total Papers" 
                value={stats.totalPapers} 
                icon={<FaFileAlt className="w-8 h-8" />}
                gradient="from-blue-500 to-indigo-500"
                delay={0.7}
              />
              <StatCard 
                title="Total Quizzes" 
                value={stats.totalQuizzes} 
                icon={<FaQuestionCircle className="w-8 h-8" />}
                gradient="from-purple-500 to-indigo-500"
                delay={0.8}
              />
            </div>

            {/* Recent Activity Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 rounded-xl bg-blue-100 mr-4"
                    >
                      <FaUsers className="text-blue-600 text-xl" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-gray-800">New Subscriber</p>
                      <p className="text-sm text-gray-600">John Doe subscribed to the platform</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 rounded-xl bg-rose-100 mr-4"
                    >
                      <FaVideo className="text-rose-600 text-xl" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-gray-800">New Video Upload</p>
                      <p className="text-sm text-gray-600">New educational video added</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 rounded-xl bg-amber-100 mr-4"
                    >
                      <FaComments className="text-amber-600 text-xl" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-gray-800">New Feedback</p>
                      <p className="text-sm text-gray-600">Received new user feedback</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
