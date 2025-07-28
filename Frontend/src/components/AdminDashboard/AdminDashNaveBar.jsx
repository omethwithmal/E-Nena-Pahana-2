import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaFileAlt, 
  FaQuestionCircle, 
  FaVideo, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaUserShield,
  FaChartLine,
  FaComments
} from 'react-icons/fa';

const AdminDashNaveBar = ({ onCollapse }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse(newState);
  };

  const menuItems = [
    { title: 'Dashboard', icon: <FaHome />, path: '/AdminDashboard' },
    { title: 'Add E-Book', icon: <FaBook />, path: '/AddEbook' },
    { title: 'Add Pass Papers', icon: <FaFileAlt />, path: '/admin/add-papers' },
    { title: 'Add Quizzes', icon: <FaQuestionCircle />, path: '/AddQuizzes' },
    { title: 'Add Videos', icon: <FaVideo />, path: '/AddVideos' },
    { title: 'Analytics', icon: <FaChartLine />, path: '/Analytics' },
    { title: 'User Management', icon: <FaUserShield />, path: '/UserManagement' },
    { title: 'View Feedback', icon: <FaComments />, path: '/ViewFeedback' },
  ];

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white shadow-2xl fixed left-0 top-0 z-50 overflow-hidden"
    >
      {/* Large Animated Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              width: 60 + i * 15,
              height: 60 + i * 15,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.3, 0.15],
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Top Bar with Toggle and Sign Out */}
        <div className="p-4 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSignOut}
            className="text-white hover:text-gray-200 focus:outline-none bg-white/10 p-2 rounded-lg backdrop-blur-sm"
          >
            <FaSignOutAlt size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            className="text-white hover:text-gray-200 focus:outline-none bg-white/10 p-2 rounded-lg backdrop-blur-sm"
          >
            {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
          </motion.button>
        </div>

        {/* Logo or Title */}
        <div className="px-4 py-6 text-center">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-2xl font-bold text-white">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-200">Welcome back!</p>
            </motion.div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="flex items-center px-6 py-4 hover:bg-white/10 transition-all duration-300 group"
              >
                <motion.span 
                  className="text-xl text-white group-hover:text-gray-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.span>
                {!isCollapsed && (
                  <motion.span 
                    className="ml-4 text-white/90 group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {item.title}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2800aa] via-[#8600b2] to-[#2800aa]" />
    </motion.div>
  );
};

export default AdminDashNaveBar;
