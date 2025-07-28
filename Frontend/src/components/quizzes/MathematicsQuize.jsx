import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaCheck, FaTimes, FaArrowRight, FaTrophy, FaStar, FaHeart, FaRocket, FaCrown, FaRegSmile, FaRegLaughSquint, FaRegGrinStars, FaPlus, FaRobot, FaUser, FaRegPaperPlane } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import { generateAIResponse } from '../../utils/api';

const MathematicsQuize = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  // Chat widget state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm E-Nena Pahana AI. How can I help you with your studies today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = React.useRef(null);
  React.useEffect(() => { if (showChat) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, showChat]);
  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { id: chatMessages.length + 1, text: chatInput, sender: 'user', timestamp: new Date() };
    setChatMessages(msgs => [...msgs, userMsg]);
    setChatInput("");
    setIsChatLoading(true);
    try {
      // Prepare conversation for API
      const conversationForAPI = [...chatMessages, userMsg].map(msg => ({ sender: msg.sender, text: msg.text }));
      const aiText = await generateAIResponse(conversationForAPI);
      setChatMessages(msgs => [...msgs, { id: msgs.length + 1, text: aiText, sender: 'bot', timestamp: new Date() }]);
    } catch (error) {
      setChatMessages(msgs => [...msgs, { id: msgs.length + 1, text: `AI error: ${error.message || 'Please try again.'}`, sender: 'bot', timestamp: new Date() }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const getEncouragingMessage = () => {
    const messages = [
      "Wow! You're amazing! 🌟",
      "Super job! Keep going! 🚀",
      "You're a math wizard! 🧙‍♂️",
      "Fantastic work! 🌈",
      "You're doing great! ⭐",
      "Math superstar! 🌠",
      "Incredible! Keep it up! 🎯",
      "You're on fire! 🔥",
      "Brilliant! 🌞",
      "Outstanding! 🎨"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const questions = [
    {
      question: "What is 8 + 5?",
      options: ["12", "13", "14", "15"],
      correctAnswer: "13",
      explanation: "8 + 5 = 13",
      emoji: "➕"
    },
    {
      question: "What is 12 × 4?",
      options: ["44", "48", "52", "56"],
      correctAnswer: "48",
      explanation: "12 × 4 = 48",
      emoji: "✖️"
    },
    {
      question: "What is 20 ÷ 5?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
      explanation: "20 ÷ 5 = 4",
      emoji: "➗"
    },
    {
      question: "What is 15 - 7?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      explanation: "15 - 7 = 8",
      emoji: "➖"
    },
    {
      question: "What is 6 × 7?",
      options: ["40", "42", "44", "46"],
      correctAnswer: "42",
      explanation: "6 × 7 = 42",
      emoji: "✖️"
    },
    {
      question: "What is 36 ÷ 6?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "6",
      explanation: "36 ÷ 6 = 6",
      emoji: "➗"
    },
    {
      question: "What is 9 + 8?",
      options: ["15", "16", "17", "18"],
      correctAnswer: "17",
      explanation: "9 + 8 = 17",
      emoji: "➕"
    },
    {
      question: "What is 14 - 6?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      explanation: "14 - 6 = 8",
      emoji: "➖"
    },
    {
      question: "What is 5 × 9?",
      options: ["40", "45", "50", "55"],
      correctAnswer: "45",
      explanation: "5 × 9 = 45",
      emoji: "✖️"
    },
    {
      question: "What is 24 ÷ 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "8",
      explanation: "24 ÷ 3 = 8",
      emoji: "➗"
    }
  ];

  const handleAnswerClick = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const correct = selectedOption === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setStreak(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">
      <NavBar />
      
      {/* Footer */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 py-4 px-6 border-t-2 border-purple-200"
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
            <span className="text-purple-800 font-medium">Keep going! 🚀</span>
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

      {/* Floating Shapes Background - Enhanced */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-purple-300 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {['⭐', '🌟', '✨', '💫', '🎯', '🎨', '🎮', '🎲', '🎪', '🎭'][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
      </div>

      <div className="pt-24 px-4 relative">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="inline-block"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg transform hover:rotate-12 transition-transform">
                <FaCalculator className="w-12 h-12" />
              </div>
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold text-purple-800 mb-2"
              animate={{
                textShadow: [
                  "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe",
                  "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe",
                  "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Fun Math Quiz! 🎮
            </motion.h1>
            <motion.p 
              className="text-purple-600 text-base"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Let's make math fun! 🌈
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            className="bg-white/50 rounded-full h-3 mb-6 shadow-inner overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"
            />
          </motion.div>

          {/* Streak Display */}
          <AnimatePresence>
            {streak > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-4"
              >
                <motion.span 
                  className="text-lg font-bold text-yellow-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {streak} in a row! 🔥
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {!showScore ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
            >
              {/* Question */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-20 animate-pulse" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-pink-400 rounded-full opacity-20 animate-pulse" />
                <div className="absolute top-1/2 -right-4 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-pulse" />
                <div className="absolute top-1/2 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-pulse" />

                {/* Main Question Card */}
                <motion.div 
                  className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-3xl shadow-lg border-2 border-purple-100"
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center space-x-6">
                    {/* Emoji Container */}
                    <motion.div
                      className="relative"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-6">
                        <span className="text-4xl">{questions[currentQuestion].emoji}</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-md">
                        <span className="text-sm font-bold">Q{currentQuestion + 1}</span>
                      </div>
                    </motion.div>

                    {/* Question Content */}
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold text-purple-800 mb-3">
                        {questions[currentQuestion].question}
                      </h2>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                          Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                          {questions.length - currentQuestion - 1} to go!
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0] }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                    className={`relative overflow-hidden ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'bg-green-50 border-2 border-green-500'
                          : 'bg-red-50 border-2 border-red-500'
                        : 'bg-white hover:bg-purple-50 border-2 border-purple-100'
                    } rounded-xl p-4 transition-all`}
                  >
                    {/* Option Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, purple 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }} />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            selectedAnswer === option
                              ? isCorrect
                                ? 'bg-green-500'
                                : 'bg-red-500'
                              : 'bg-gradient-to-br from-purple-500 to-pink-500'
                          }`}
                          animate={{
                            scale: selectedAnswer === option ? [1, 1.2, 1] : 1,
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </motion.div>
                        <span className="text-lg text-purple-800">{option}</span>
                      </div>
                      {selectedAnswer === option && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCorrect ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {isCorrect ? (
                            <FaCheck className="w-5 h-5 text-white" />
                          ) : (
                            <FaTimes className="w-5 h-5 text-white" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`mt-4 p-4 rounded-xl ${
                      isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {isCorrect ? (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3"
                        >
                          <FaStar className="w-6 h-6 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3"
                        >
                          <FaHeart className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                      <p className="text-base font-medium">
                        {isCorrect ? getEncouragingMessage() : "Let's try another one! 💪"}
                      </p>
                    </div>
                    <p className="text-sm mt-2 pl-13">{questions[currentQuestion].explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl text-center"
            >
              <motion.div 
                className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white mx-auto mb-6"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaTrophy className="w-16 h-16" />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-purple-800 mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Quiz Completed! 🎉
              </motion.h2>
              <motion.p 
                className="text-xl text-purple-600 mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Your score: {score} out of {questions.length}
              </motion.p>
              <div className="flex justify-center space-x-2 mb-8">
                {[...Array(score)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaStar className="w-10 h-10 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={restartQuiz}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 mx-auto text-xl"
              >
                <span className="text-lg">Play Again!</span>
                <FaRocket className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Success Animation - Enhanced */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                  x: Math.random() * window.innerWidth,
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut",
                }}
              >
                {['⭐', '🌟', '✨', '💫', '🎯', '🎨', '🎮', '🎲', '🎪', '🎭', '🎨', '🎯', '🎲', '🎮'][Math.floor(Math.random() * 14)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        {!showChat && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(true)}
            className="w-14 h-14 bg-gradient-to-r from-[#2800aa] to-[#8600b2] rounded-full shadow-lg flex items-center justify-center text-white relative z-10"
          >
            <motion.div animate={{ rotate: showChat ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <FaPlus className="w-6 h-6" />
            </motion.div>
          </motion.button>
        )}
      </motion.div>

      {/* Chat Widget (Bottom-Right) */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-8 right-8 z-50 w-[350px] max-w-[95vw] h-[480px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[#2800aa] to-[#8600b2] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 bg-white/20 rounded-xl flex items-center justify-center">
                <FaRobot className="w-4 h-4 text-white" />
              </span>
              <span className="text-white font-bold text-base">E-Nena Pahana AI</span>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              title="Close"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-white/0">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2]' : 'bg-gradient-to-r from-[#8600b2] to-[#2800aa]'}`}>
                    {msg.sender === 'user' ? <FaUser className="w-4 h-4 text-white" /> : <FaRobot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`rounded-xl px-4 py-2 shadow text-sm relative ${msg.sender === 'user' ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white rounded-br-none' : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100'}`}>
                    <p className="relative z-10">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'} relative z-10`}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-[#8600b2] to-[#2800aa]">
                    <FaRobot className="w-4 h-4 text-white" />
                  </div>
                  <div className="rounded-xl px-4 py-2 shadow text-sm bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100 flex items-center">
                    <span className="animate-pulse">●</span>
                    <span className="animate-pulse ml-1">●</span>
                    <span className="animate-pulse ml-1">●</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <div className="border-t border-gray-100 px-2 py-2 bg-white/80">
            <form onSubmit={handleChatSend} className="flex items-center space-x-2">
              <button type="button" className="text-gray-500 hover:text-[#2800aa] transition-colors p-2 hover:bg-gray-100 rounded-xl">
                <FaRegSmile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#2800aa] transition-colors bg-gray-50 text-gray-800 placeholder-gray-400 text-sm"
              />
              <button type="submit" className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white rounded-xl p-2 hover:opacity-90 transition-opacity relative group">
                <FaRegPaperPlane className="w-5 h-5 relative z-10" />
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* Add padding to main content to account for footer */}
      <div className="pb-24">
        {/* ... existing content ... */}
      </div>
    </div>
  );
};

export default MathematicsQuize;