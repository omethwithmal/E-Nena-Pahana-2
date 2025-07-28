import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaBook, FaCalculator, FaFlask, FaHistory, FaLanguage, FaCode, FaSearch, FaFilter, FaClock, FaStar, FaHeart, FaRegSmile, FaRegLaughSquint, FaRegGrinStars } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import HvVideo from '../../assets/Hv.mp4';

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingVideo, setPlayingVideo] = useState(null);

  const categories = [
    { id: 'all', name: 'All', icon: <FaPlay /> },
    { id: 'math', name: 'Mathematics', icon: <FaCalculator /> },
    { id: 'science', name: 'Science', icon: <FaFlask /> },
    { id: 'history', name: 'History', icon: <FaHistory /> },
    { id: 'language', name: 'Languages', icon: <FaLanguage /> },
    { id: 'coding', name: 'Coding', icon: <FaCode /> }
  ];

  const videos = [
    {
      id: 1,
      title: "Fun with Numbers: Addition and Subtraction",
      category: "Mathematics",
      thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg",
      videoSrc: HvVideo,
      duration: "10:30",
      views: "1.2K",
      likes: 245,
      description: "Learn basic addition and subtraction in a fun way!",
      tags: ["Math", "Basic", "Fun"]
    },
    {
      id: 2,
      title: "Amazing Science Experiments for Kids",
      category: "Science",
      thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
      duration: "15:45",
      views: "2.5K",
      likes: 389,
      description: "Exciting science experiments you can try at home!",
      tags: ["Science", "Experiments", "Fun"]
    },
    {
      id: 3,
      title: "Journey Through Ancient Civilizations",
      category: "History",
      thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
      duration: "20:15",
      views: "3.1K",
      likes: 412,
      description: "Explore the wonders of ancient civilizations!",
      tags: ["History", "Ancient", "Education"]
    },
    {
      id: 4,
      title: "Learn English Through Stories",
      category: "Languages",
      thumbnail: "https://img.youtube.com/vi/example4/maxresdefault.jpg",
      duration: "12:20",
      views: "1.8K",
      likes: 267,
      description: "Improve your English with fun stories!",
      tags: ["English", "Stories", "Language"]
    },
    {
      id: 5,
      title: "Coding for Beginners: First Steps",
      category: "Coding",
      thumbnail: "https://img.youtube.com/vi/example5/maxresdefault.jpg",
      duration: "18:30",
      views: "4.2K",
      likes: 523,
      description: "Start your coding journey with these basics!",
      tags: ["Coding", "Beginner", "Programming"]
    },
    {
      id: 6,
      title: "Multiplication Made Easy",
      category: "Mathematics",
      thumbnail: "https://img.youtube.com/vi/example6/maxresdefault.jpg",
      duration: "14:45",
      views: "2.1K",
      likes: 312,
      description: "Master multiplication with fun tricks!",
      tags: ["Math", "Multiplication", "Tricks"]
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <NavBar />
      
      {/* Header Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 bg-white/10 rounded-full"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Learning Videos 🎥
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              Watch, learn, and grow with our fun educational videos! 🌟
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section - Moved to top */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search for videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1 flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Thumbnail with Gradient Overlay */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {playingVideo === video.id ? (
                  <video
                    src={video.videoSrc}
                    className="w-full h-56 object-cover"
                    controls
                    autoPlay
                    onEnded={() => setPlayingVideo(null)}
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                {/* Play Button Overlay */}
                {!playingVideo && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setPlayingVideo(video.id)}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FaPlay className="w-8 h-8 text-white transform translate-x-1" />
                      </div>
                    </motion.button>
                  </div>
                )}
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {video.duration}
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title and Stats */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span className="flex items-center">
                        <FaClock className="w-4 h-4 mr-1 text-blue-500" />
                        {video.views} views
                      </span>
                      <span className="flex items-center">
                        <FaHeart className="w-4 h-4 mr-1 text-red-500" />
                        {video.likes}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors duration-300"
                    >
                      <FaStar className="w-4 h-4 text-yellow-500" />
                    </motion.button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>

                {/* Progress Bar (Optional) */}
                <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-4 px-6 border-t-2 border-purple-200"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaRegSmile className="w-6 h-6 text-yellow-500" />
            </motion.div>
            <span className="text-purple-800 font-medium">Learning is fun! 🌈</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaRegLaughSquint className="w-6 h-6 text-pink-500" />
            </motion.div>
            <span className="text-purple-800 font-medium">Keep watching! 🎥</span>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <FaRegGrinStars className="w-6 h-6 text-blue-500" />
            </motion.div>
            <span className="text-purple-800 font-medium">You're amazing! ⭐</span>
          </div>
        </div>
      </motion.div>

      {/* Add padding to main content to account for footer */}
      <div className="pb-24">
        {/* ... existing content ... */}
      </div>
    </div>
  );
};

export default Videos;
