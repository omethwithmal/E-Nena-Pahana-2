import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaUser, FaEnvelope, FaComment, FaCalendarAlt, FaThumbsUp, FaFilter, FaFileExcel } from 'react-icons/fa';
import AdminDashNaveBar from '../AdminDashNaveBar';
import * as XLSX from 'xlsx';

const ViewFeedback = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isGeneratingExcel, setIsGeneratingExcel] = useState(false);
  
  // Sample feedback data - replace with actual data from your backend
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      feedback: "Great platform! The videos are very helpful for my studies. The quality of content is exceptional and the interface is very user-friendly.",
      date: "2024-03-15",
      rating: 5
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      feedback: "The e-books are well organized and easy to understand. I particularly appreciate the detailed explanations and examples provided.",
      date: "2024-03-14",
      rating: 4
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      feedback: "The quizzes help me test my knowledge effectively. The immediate feedback after each question is very helpful for learning.",
      date: "2024-03-13",
      rating: 5
    }
  ]);

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
  };

  const generateExcel = () => {
    try {
      setIsGeneratingExcel(true);

      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Create summary sheet
      const summaryData = [
        ['E-Nena Pahana - Feedback Report'],
        ['Generated on:', new Date().toLocaleString()],
        [],
        ['Summary Statistics'],
        ['Total Feedback', feedbacks.length],
        ['This Month', feedbacks.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).length],
        ['Positive Feedback (4-5 stars)', feedbacks.filter(f => f.rating >= 4).length],
        ['Neutral Feedback (3 stars)', feedbacks.filter(f => f.rating === 3).length],
        ['Negative Feedback (1-2 stars)', feedbacks.filter(f => f.rating <= 2).length],
        [],
        ['Average Rating', (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1)]
      ];

      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      
      // Style summary sheet
      summarySheet['!cols'] = [{ wch: 30 }, { wch: 20 }];
      
      // Add summary sheet to workbook
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

      // Create detailed feedback sheet
      const feedbackData = feedbacks.map(feedback => ({
        'Name': feedback.name,
        'Email': feedback.email,
        'Feedback': feedback.feedback,
        'Rating': `${feedback.rating}/5`,
        'Date': new Date(feedback.date).toLocaleDateString()
      }));

      const feedbackSheet = XLSX.utils.json_to_sheet(feedbackData);
      
      // Style feedback sheet
      feedbackSheet['!cols'] = [
        { wch: 20 }, // Name
        { wch: 30 }, // Email
        { wch: 50 }, // Feedback
        { wch: 10 }, // Rating
        { wch: 15 }  // Date
      ];

      // Add feedback sheet to workbook
      XLSX.utils.book_append_sheet(wb, feedbackSheet, 'Detailed Feedback');

      // Generate timestamp for filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Save the Excel file
      XLSX.writeFile(wb, `feedback-report-${timestamp}.xlsx`);
      
      // Show success message
      alert('Excel report has been downloaded successfully!');
    } catch (error) {
      console.error('Error generating Excel:', error);
      alert('There was an error generating the Excel file. Please try again.');
    } finally {
      setIsGeneratingExcel(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'positive') return feedback.rating >= 4;
    if (selectedFilter === 'recent') {
      const feedbackDate = new Date(feedback.date);
      const today = new Date();
      return feedbackDate.getMonth() === today.getMonth();
    }
    return true;
  });

  const StatCard = ({ title, value, gradient, delay }) => (
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

  const FeedbackCard = ({ feedback, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
              <FaUser className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{feedback.name}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center text-gray-500">
                  <FaEnvelope className="mr-2" />
                  <span className="text-sm">{feedback.email}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  <span className="text-sm">{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
              <FaThumbsUp className="text-green-500 mr-2" />
              <span className="text-green-600 font-medium">{feedback.rating}/5</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDelete(feedback.id)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaTrash />
            </motion.button>
          </div>
        </div>

        {/* Feedback Content */}
        <div className="bg-gray-50 rounded-xl p-5 mb-4">
          <div className="flex items-start">
            <FaComment className="text-blue-500 mt-1 mr-3 text-xl" />
            <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
          </div>
        </div>

        {/* Rating Visualization */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < feedback.rating ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            {feedback.rating >= 4 ? 'Excellent' : feedback.rating >= 3 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex">
      <AdminDashNaveBar onCollapse={setIsCollapsed} />
      <motion.div 
        className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
        initial={{ marginLeft: 280 }}
        animate={{ marginLeft: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex justify-between items-center"
            >
              <div>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  User Feedback
                </h1>
                <p className="text-gray-600 mt-2 text-lg">View and manage user feedback</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateExcel}
                disabled={isGeneratingExcel}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFileExcel className="text-xl" />
                <span>{isGeneratingExcel ? 'Generating Excel...' : 'Download Excel'}</span>
              </motion.button>
            </motion.div>

            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-8">
              {['all', 'positive', 'recent'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FaFilter />
                  <span className="capitalize">{filter}</span>
                </motion.button>
              ))}
            </div>

            {/* Feedback Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard 
                title="Total Feedback" 
                value={feedbacks.length}
                gradient="from-blue-500 to-cyan-500"
                delay={0.1}
              />
              <StatCard 
                title="This Month" 
                value={feedbacks.filter(f => new Date(f.date).getMonth() === new Date().getMonth()).length}
                gradient="from-purple-500 to-pink-500"
                delay={0.2}
              />
              <StatCard 
                title="Positive Feedback" 
                value={feedbacks.filter(f => f.rating >= 4).length}
                gradient="from-emerald-500 to-teal-500"
                delay={0.3}
              />
            </div>

            {/* Feedback List */}
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeedbacks.map((feedback, index) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} index={index} />
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewFeedback;
