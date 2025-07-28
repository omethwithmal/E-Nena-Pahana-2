import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendarAlt, FaVenusMars, FaGraduationCap, FaCamera, FaEdit, FaCheck, FaTimes, FaBook, FaChartLine, FaTrophy, FaCog, FaSignOutAlt, FaStar, FaMedal } from 'react-icons/fa';
import NavBar from '../../components/NavBar/NavBar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '2000-01-01',
    gender: 'male',
    grade: 'grade11',
    email: 'john.doe@example.com'
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add your update logic here
    console.log('Updated profile:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2800aa] to-[#8600b2] relative overflow-hidden">
      <NavBar />
      
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
      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Profile Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Profile Image Section */}
                <div className="relative group mb-8">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg mx-auto">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center">
                        <FaUser className="w-24 h-24 text-white/60" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-1/2 transform translate-x-1/2 bg-white/20 p-3 rounded-full cursor-pointer hover:bg-white/30 transition-all duration-300">
                    <FaCamera className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Profile Info */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <p className="text-white/80 text-lg mb-4">{formData.email}</p>
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">5</div>
                    <div className="text-white/60 text-sm">Courses</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <div className="text-white/60 text-sm">Achievements</div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold mb-4">Recent Achievements</h3>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <FaMedal className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Top Performer</p>
                      <p className="text-white/60 text-sm">Completed 5 courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center">
                      <FaTrophy className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Quick Learner</p>
                      <p className="text-white/60 text-sm">Finished course in record time</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Profile Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300"
                  >
                    {isEditing ? (
                      <>
                        <FaTimes className="text-lg" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <FaEdit className="text-lg" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-white mb-2 font-medium">First Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-white mb-2 font-medium">Last Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Birth Date */}
                    <div>
                      <label className="block text-white mb-2 font-medium">Birth Date</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-white group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                        <input
                          type="date"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-white mb-2 font-medium">Gender</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaVenusMars className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer disabled:opacity-50 [&>option]:bg-[#2800aa] [&>option:checked]:bg-[#8600b2]"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Grade */}
                    <div>
                      <label className="block text-white mb-2 font-medium">Grade</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaGraduationCap className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer disabled:opacity-50 [&>option]:bg-[#2800aa] [&>option:checked]:bg-[#8600b2]"
                        >
                          <option value="grade6">Grade 6</option>
                          <option value="grade7">Grade 7</option>
                          <option value="grade8">Grade 8</option>
                          <option value="grade9">Grade 9</option>
                          <option value="grade10">Grade 10</option>
                          <option value="grade11">Grade 11</option>
                          <option value="grade12">Grade 12</option>
                          <option value="grade13">Grade 13</option>
                          <option value="undergraduate">Undergraduate</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white mb-2 font-medium">Email</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 backdrop-blur-sm disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  {isEditing && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="mt-8 w-full bg-white text-[#2800aa] px-4 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      <FaCheck className="text-lg" />
                      Save Changes
                    </motion.button>
                  )}
                </motion.form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
