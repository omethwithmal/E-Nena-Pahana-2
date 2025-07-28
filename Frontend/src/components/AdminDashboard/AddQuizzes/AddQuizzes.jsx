import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaEdit, FaTrash, FaSearch, FaDownload, FaExclamationTriangle, FaCalculator, FaFlask, FaHistory, FaLanguage, FaCode, FaPalette } from 'react-icons/fa';
import AdminDashNaveBar from '../AdminDashNaveBar';
import * as XLSX from 'xlsx';

const AddQuizzes = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'all', name: 'All', icon: <FaQuestionCircle /> },
    { id: 'math', name: 'Mathematics', icon: <FaCalculator /> },
    { id: 'science', name: 'Science', icon: <FaFlask /> },
    { id: 'history', name: 'History', icon: <FaHistory /> },
    { id: 'language', name: 'Languages', icon: <FaLanguage /> },
    { id: 'coding', name: 'Computer Science', icon: <FaCode /> },
    { id: 'art', name: 'Art & Creativity', icon: <FaPalette /> }
  ];

  const subjects = [
    'Mathematics',
    'Science',
    'History',
    'Languages',
    'Computer Science',
    'Art & Creativity'
  ];

  const [formData, setFormData] = useState({
    subject: '',
    question: '',
    correctAnswer: '',
    incorrectAnswers: ['', '', '']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIncorrectAnswerChange = (index, value) => {
    const newIncorrectAnswers = [...formData.incorrectAnswers];
    newIncorrectAnswers[index] = value;
    setFormData(prev => ({
      ...prev,
      incorrectAnswers: newIncorrectAnswers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get the last question number for the selected subject
    const lastQuestionNumber = quizzes
      .filter(quiz => quiz.subject === formData.subject)
      .reduce((max, quiz) => Math.max(max, quiz.questionNumber), 0);
    
    const newQuiz = {
      ...formData,
      id: Date.now(),
      questionNumber: lastQuestionNumber + 1, // Increment from the last question number of the subject
      addedOn: new Date().toISOString()
    };

    if (editingId) {
      setQuizzes(quizzes.map(quiz => 
        quiz.id === editingId ? { ...newQuiz, id: editingId } : quiz
      ));
      setEditingId(null);
    } else {
      setQuizzes([...quizzes, newQuiz]);
    }

    setFormData({
      subject: '',
      question: '',
      correctAnswer: '',
      incorrectAnswers: ['', '', '']
    });
  };

  const handleEdit = (quiz) => {
    setFormData({
      subject: quiz.subject,
      question: quiz.question,
      correctAnswer: quiz.correctAnswer,
      incorrectAnswers: quiz.incorrectAnswers
    });
    setEditingId(quiz.id);
  };

  const handleDeleteClick = (quiz) => {
    setQuizToDelete(quiz);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (quizToDelete) {
      setQuizzes(prev => prev.filter(quiz => quiz.id !== quizToDelete.id));
      setDeleteModalOpen(false);
      setQuizToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setQuizToDelete(null);
  };

  const handleDownloadReport = () => {
    const reportData = quizzes.map(quiz => ({
      'Question Number': quiz.questionNumber,
      'Subject': quiz.subject,
      'Question': quiz.question,
      'Correct Answer': quiz.correctAnswer,
      'Incorrect Answers': quiz.incorrectAnswers.join(', '),
      'Added Date': new Date(quiz.addedOn).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quizzes Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quizzes-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Filter quizzes based on search query and category
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = 
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.correctAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || quiz.subject === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            {/* Header Section */}
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8"
            >
              Quiz Management
            </motion.h1>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 relative overflow-hidden"
            >
              {/* Animated Dots Background */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
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

              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mr-4"
                  >
                    <FaQuestionCircle className="text-white text-2xl" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingId ? 'Edit Quiz' : 'Add New Quiz'}
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Subject Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Question */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question
                      </label>
                      <textarea
                        name="question"
                        value={formData.question}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                        placeholder="Enter your question"
                      ></textarea>
                    </div>

                    {/* Correct Answer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correct Answer
                      </label>
                      <input
                        type="text"
                        name="correctAnswer"
                        value={formData.correctAnswer}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                        placeholder="Enter correct answer"
                      />
                    </div>

                    {/* Incorrect Answers */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Incorrect Answers
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.incorrectAnswers.map((answer, index) => (
                          <input
                            key={index}
                            type="text"
                            value={answer}
                            onChange={(e) => handleIncorrectAnswerChange(index, e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                            placeholder={`Incorrect answer ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    {editingId && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => {
                          setFormData({
                            subject: '',
                            question: '',
                            correctAnswer: '',
                            incorrectAnswers: ['', '', '']
                          });
                          setEditingId(null);
                        }}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-xl hover:bg-gray-100"
                      >
                        Cancel
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      {editingId ? 'Update Quiz' : 'Add Quiz'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Quizzes List Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Added Quizzes</h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadReport}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center space-x-2"
                  >
                    <FaDownload className="text-lg" />
                    <span>Download Report</span>
                  </motion.button>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col gap-6">
                  {/* Search Bar */}
                  <div className="w-full">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by subject, question, or answer..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </motion.button>
                      )}
                    </motion.div>
                  </div>

                  {/* Category Filter */}
                  <div className="w-full">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter by Subject</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
                      {categories.map((category) => (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                            selectedCategory === category.name
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/20'
                              : 'bg-white border border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-blue-50'
                          }`}
                        >
                          <span className="text-sm">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Question #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Question
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Correct Answer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Incorrect Answers
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredQuizzes.map((quiz) => (
                        <motion.tr
                          key={quiz.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                                {quiz.subject} #{quiz.questionNumber}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                              {quiz.subject}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{quiz.question}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{quiz.correctAnswer}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {quiz.incorrectAnswers.join(', ')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(quiz.addedOn).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEdit(quiz)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FaEdit className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteClick(quiz)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {filteredQuizzes.length === 0 && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <td colSpan="6" className="px-6 py-8 text-gray-500">
                          No quizzes found matching your search.
                        </td>
                      </motion.tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  delay: 0.2
                }}
                className="flex items-center justify-center mb-6"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-red-100 to-red-50 shadow-lg">
                  <FaExclamationTriangle className="text-red-500 text-3xl" />
                </div>
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 text-center mb-3"
              >
                Delete Quiz
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center mb-8 text-lg"
              >
                Are you sure you want to delete this quiz?
                <br />
                <span className="text-sm text-red-500 mt-2 block">This action cannot be undone.</span>
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-end space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancelDelete}
                  className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-all duration-200 rounded-xl hover:bg-gray-100 font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "#dc2626",
                    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmDelete}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 font-medium transition-all duration-200"
                >
                  Delete
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddQuizzes;
