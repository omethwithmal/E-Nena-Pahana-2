import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaCalculator, FaFlask, FaHistory, FaLanguage, FaCode, FaStar, FaTrophy, FaMedal, FaRocket, FaPalette, FaMusic, FaTheaterMasks, FaPencilAlt } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const styles = `
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
    background-size: 200% 200%;
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

const Quizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Mathematics',
      icon: <FaCalculator className="w-8 h-8" />,
      description: 'Fun math quizzes to make numbers exciting!',
      color: 'from-yellow-400 to-orange-500',
      badge: '🌟 Math Wizard',
      quizzes: [
        { id: 1, title: 'Number Adventure', difficulty: 'Easy', questions: 10, time: '15 min', stars: 3 },
        { id: 2, title: 'Shape Explorer', difficulty: 'Medium', questions: 15, time: '20 min', stars: 4 },
        { id: 3, title: 'Math Challenge', difficulty: 'Hard', questions: 20, time: '30 min', stars: 5 }
      ]
    },
    {
      id: 2,
      name: 'Science',
      icon: <FaFlask className="w-8 h-8" />,
      description: 'Discover the wonders of science!',
      color: 'from-green-400 to-teal-500',
      badge: '🔬 Science Explorer',
      quizzes: [
        { id: 1, title: 'Animal Kingdom', difficulty: 'Easy', questions: 10, time: '15 min', stars: 3 },
        { id: 2, title: 'Plant World', difficulty: 'Medium', questions: 15, time: '20 min', stars: 4 },
        { id: 3, title: 'Space Adventure', difficulty: 'Hard', questions: 20, time: '30 min', stars: 5 }
      ]
    },
    {
      id: 3,
      name: 'History',
      icon: <FaHistory className="w-8 h-8" />,
      description: 'Travel through time with exciting stories!',
      color: 'from-purple-400 to-indigo-500',
      badge: '🏛️ Time Traveler',
      quizzes: [
        { id: 1, title: 'Ancient Tales', difficulty: 'Easy', questions: 10, time: '15 min', stars: 3 },
        { id: 2, title: 'Heroes of History', difficulty: 'Medium', questions: 15, time: '20 min', stars: 4 },
        { id: 3, title: 'World Adventures', difficulty: 'Hard', questions: 20, time: '30 min', stars: 5 }
      ]
    },
    {
      id: 4,
      name: 'Languages',
      icon: <FaLanguage className="w-8 h-8" />,
      description: 'Learn languages through fun games!',
      color: 'from-pink-400 to-rose-500',
      badge: '🗣️ Language Master',
      quizzes: [
        { id: 1, title: 'Word Play', difficulty: 'Easy', questions: 10, time: '15 min', stars: 3 },
        { id: 2, title: 'Story Time', difficulty: 'Medium', questions: 15, time: '20 min', stars: 4 },
        { id: 3, title: 'Language Quest', difficulty: 'Hard', questions: 20, time: '30 min', stars: 5 }
      ]
    },
    {
      id: 5,
      name: 'Computer Science',
      icon: <FaCode className="w-8 h-8" />,
      description: 'Start your coding journey!',
      color: 'from-blue-400 to-cyan-500',
      badge: '💻 Code Ninja',
      quizzes: [
        { id: 1, title: 'Coding Basics', difficulty: 'Easy', questions: 10, time: '15 min', stars: 3 },
        { id: 2, title: 'Game Design', difficulty: 'Medium', questions: 15, time: '20 min', stars: 4 },
        { id: 3, title: 'Robot World', difficulty: 'Hard', questions: 20, time: '30 min', stars: 5 }
      ]
    },
    {
      id: 6,
      name: 'Art & Creativity',
      icon: <FaPalette className="w-8 h-8" />,
      description: 'Express yourself through colors and imagination!',
      color: 'from-[#FF9A8B] to-[#FF6A88]',
      badge: '🎨 Creative Artist',
      quizzes: [
        { 
          id: 1, 
          title: 'Color Magic', 
          difficulty: 'Easy', 
          questions: 10, 
          time: '15 min', 
          stars: 3
        },
        { 
          id: 2, 
          title: 'Drawing Adventure', 
          difficulty: 'Medium', 
          questions: 15, 
          time: '20 min', 
          stars: 4
        },
        { 
          id: 3, 
          title: 'Art History Journey', 
          difficulty: 'Hard', 
          questions: 20, 
          time: '30 min', 
          stars: 5
        }
      ]
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    if (category.name === 'Mathematics') {
      navigate('/MathematicsQuize');
    } else if (category.name === 'Science') {
      navigate('/ScienceQuize');
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <NavBar />
      
      {/* Header Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-[#2800aa] to-[#8600b2] relative overflow-hidden">
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
              Fun Learning Quizzes! 🎮
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              Learn while having fun! Choose your favorite subject and start your adventure! 🌟
            </motion.p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Find your favorite subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-lg bg-white text-lg"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer h-[220px]"
              onClick={() => handleCategoryClick(category)}
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-3xl p-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden h-full`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                
                <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm rounded-2xl p-3 relative h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{category.name}</h3>
                      <span className="text-sm text-gray-600">{category.badge}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2 flex-grow text-sm">{category.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 text-sm font-medium shadow-sm">
                        {category.quizzes.length} Quizzes
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 text-sm font-medium shadow-sm">
                        {category.quizzes.reduce((sum, quiz) => sum + quiz.questions, 0)} Questions
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-lg"
                    >
                      <FaRocket className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl"
          >
            <div className={`bg-gradient-to-r ${selectedCategory.color} p-6 relative`}>
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                    {selectedCategory.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCategory.name}</h2>
                    <p className="text-white/80 text-sm mt-1">{selectedCategory.badge}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-white hover:text-white/80 p-2 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCategory.quizzes.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 hover:shadow-lg transition-shadow border-2 border-purple-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">{quiz.title}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(quiz.stars)].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-600">
                        {quiz.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                        {quiz.time}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedCategory.name === 'Mathematics') {
                          navigate('/MathematicsQuize');
                        } else if (selectedCategory.name === 'Science') {
                          navigate('/ScienceQuize');
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                    >
                      <FaRocket className="w-4 h-4" />
                      <span>Start Adventure!</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
