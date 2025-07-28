import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaBook, FaGraduationCap, FaLightbulb, FaUsers, FaCheckCircle, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';

const Registration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    grade: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration data:', formData);
    setShowSuccess(true);
  };

  const handleGoogleSignUp = () => {
    // Add your Google signup logic here
    console.log('Google signup clicked');
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate('/Home');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#2800aa] to-[#8600b2] relative overflow-hidden">
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-[#2800aa] to-[#8600b2] rounded-2xl p-8 max-w-sm w-full mx-4 relative overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaCheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              {/* Success Message */}
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-center text-white mb-2"
              >
                Registration Successful!
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-center mb-8"
              >
                Welcome to E-Nena Pahana. Your learning journey begins now!
              </motion.p>

              {/* OK Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSuccessOk}
                className="w-full bg-white text-[#2800aa] py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Continue to Home
              </motion.button>

              {/* Decorative Elements */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-50"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full opacity-50"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
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
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center p-8 relative z-10">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-white p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 mx-auto"
            >
              <FaGraduationCap className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-bold mb-6 text-center">Complete Your Profile</h1>
            <p className="text-lg text-white/90 mb-12 text-center">
              Help us personalize your learning experience by providing some additional information about yourself.
            </p>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaBook className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Personalized Learning</h3>
                  <p className="text-white/80 text-sm">Get content tailored to your grade level</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaLightbulb className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Track Progress</h3>
                  <p className="text-white/80 text-sm">Monitor your academic growth</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center space-x-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <FaUsers className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Connect with Peers</h3>
                  <p className="text-white/80 text-sm">Join students at your grade level</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl w-full space-y-8 bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl"
          >
            {/* Logo and Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4"
              >
                <FaBook className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl font-bold text-white mb-2"
              >
                Complete Registration
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white/80 text-lg"
              >
                Tell us more about yourself
              </motion.p>
            </div>

            {/* Registration Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-white mb-2 font-medium">First Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-white mb-2 font-medium">Last Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="birthDate" className="block text-white mb-2 font-medium">Birth Date</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-white group-hover:text-white/80 transition-colors duration-300" />
                    </div>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      required
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-white mb-2 font-medium">Gender</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaVenusMars className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                    </div>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer [&>option]:bg-[#2800aa] [&>option:checked]:bg-[#8600b2]"
                    >
                      <option value="" disabled className="bg-[#2800aa] text-white">Select gender</option>
                      <option value="male" className="bg-[#2800aa] text-white">Male</option>
                      <option value="female" className="bg-[#2800aa] text-white">Female</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="grade" className="block text-white mb-2 font-medium">Grade</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGraduationCap className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <select
                    id="grade"
                    name="grade"
                    required
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer [&>option]:bg-[#2800aa] [&>option:checked]:bg-[#8600b2]"
                  >
                    <option value="" disabled className="bg-[#2800aa] text-white">Select grade</option>
                    <option value="grade6" className="bg-[#2800aa] text-white">Grade 6</option>
                    <option value="grade7" className="bg-[#2800aa] text-white">Grade 7</option>
                    <option value="grade8" className="bg-[#2800aa] text-white">Grade 8</option>
                    <option value="grade9" className="bg-[#2800aa] text-white">Grade 9</option>
                    <option value="grade10" className="bg-[#2800aa] text-white">Grade 10</option>
                    <option value="grade11" className="bg-[#2800aa] text-white">Grade 11</option>
                    <option value="grade12" className="bg-[#2800aa] text-white">Grade 12</option>
                    <option value="grade13" className="bg-[#2800aa] text-white">Grade 13</option>
                    <option value="undergraduate" className="bg-[#2800aa] text-white">Undergraduate</option>
                    <option value="other" className="bg-[#2800aa] text-white">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2 font-medium">Email address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-[#2800aa] px-4 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Complete Registration
              </motion.button>
            </motion.form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center text-white/80"
            >
              Already have an account?{' '}
              <Link to="/login" className="text-white font-semibold hover:text-white/80 transition-colors duration-300">
                Sign in
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
