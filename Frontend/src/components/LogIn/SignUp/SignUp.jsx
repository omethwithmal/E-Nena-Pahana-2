import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaBook, FaGraduationCap, FaLightbulb, FaUsers, FaCheckCircle } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup data:', formData);
    setShowSuccess(true);
  };

  const handleGoogleSignUp = () => {
    // Add your Google signup logic here
    console.log('Google signup clicked');
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate('/Registration');
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
                Account Created Successfully!
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/80 text-center mb-8"
              >
                Let's complete your profile to get started!
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
                Go to Registration
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
            
            <h1 className="text-4xl font-bold mb-6 text-center">Join E-Nena Pahana</h1>
            <p className="text-lg text-white/90 mb-12 text-center">
              Start your journey to academic excellence. Create an account to access quality educational resources and enhance your learning experience.
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
                  <h3 className="font-semibold">Quality Study Materials</h3>
                  <p className="text-white/80 text-sm">Access comprehensive study resources</p>
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
                  <h3 className="font-semibold">Interactive Learning</h3>
                  <p className="text-white/80 text-sm">Engage with dynamic content</p>
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
                  <h3 className="font-semibold">Expert Support</h3>
                  <p className="text-white/80 text-sm">Get guidance from experienced educators</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Sign Up Form */}
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
                Create Account
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white/80 text-lg"
              >
                Join our learning community today
              </motion.p>
            </div>

            {/* Google Sign Up Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 px-4 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <FaGoogle className="text-red-500 text-xl" />
              Continue with Google
            </motion.button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/60">Or sign up with email</span>
              </div>
            </div>

            {/* Sign Up Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="fullName" className="block text-white mb-2 font-medium">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
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

              <div>
                <label htmlFor="password" className="block text-white mb-2 font-medium">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-white/60 hover:text-white/80 transition-colors duration-300" />
                    ) : (
                      <FaEye className="text-white/60 hover:text-white/80 transition-colors duration-300" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-white mb-2 font-medium">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-[#2800aa] px-4 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Create Account
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

export default SignUp;
