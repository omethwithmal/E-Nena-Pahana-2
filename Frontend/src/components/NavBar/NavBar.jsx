import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle language change
  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, state, etc.)
    setIsProfileOpen(false);
    navigate('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageOpen && !event.target.closest('.language-dropdown')) {
        setIsLanguageOpen(false);
      }
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageOpen, isProfileOpen]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'si', name: 'සිංහල' },
    { code: 'ta', name: 'Tamil' }
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <motion.div
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="text-2xl font-bold text-white inline-block"
                  animate={{
                    y: [0, -2, 0],
                    rotate: [0, 1, 0, -1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  E-Nena
                </motion.span>
                <motion.span 
                  className="text-2xl font-bold text-white inline-block ml-2"
                  animate={{
                    y: [0, 2, 0],
                    rotate: [0, -1, 0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  Pahana
                </motion.span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home', 'Passpapers', 'E-Books', 'Quizzes', 'Videos', 'About'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={
                      item === 'Home' ? '/Home' :
                      item === 'E-Books' ? '/EBook' :
                      item === 'About' ? '/Home#about' :
                      `/${item.toLowerCase().replace(' ', '')}`
                    }
                    className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-110"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="language-dropdown relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                <span>{languages.find(lang => lang.code === language)?.name}</span>
                <FaChevronDown className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === lang.code
                              ? 'bg-[#2800aa] text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-white hover:text-gray-200 transition-colors duration-300"
            >
              {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </motion.button>

            {/* Profile Dropdown */}
            <div className="profile-dropdown relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                <FaUser className="h-5 w-5" />
                <span>Profile</span>
                <FaChevronDown className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaUser className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login/Sign Up Buttons */}
            <div className="flex space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="bg-white text-[#2800aa] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="bg-[#8600b2] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#6b008c] transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200"
            >
              {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#2800aa]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'Passpapers', 'E-Books', 'Quizzes', 'Videos', 'About'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={
                      item === 'Home' ? '/Home' :
                      item === 'E-Books' ? '/EBook' :
                      item === 'About' ? '/Home#about' :
                      `/${item.toLowerCase().replace(' ', '')}`
                    }
                    className="text-white hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 pb-3 border-t border-[#8600b2]">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-white hover:text-gray-200 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    <FaUser className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    <FaSignOutAlt className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                  <Link
                    to="/login"
                    className="bg-white text-[#2800aa] block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#8600b2] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#6b008c] transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar; 