import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFlask, FaCheck, FaTimes, FaArrowRight, FaTrophy, FaStar, FaHeart, FaRocket, FaCrown, FaRegSmile, FaRegLaughSquint, FaRegGrinStars } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';

const ScienceQuize = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const getEncouragingMessage = () => {
    const messages = [
      "Wow! You're a science genius! 🌟",
      "Super job! Keep exploring! 🔬",
      "You're a science wizard! 🧪",
      "Fantastic discovery! 🌈",
      "You're doing great! ⚡",
      "Science superstar! 🌠",
      "Incredible! Keep it up! 🧫",
      "You're on fire! 🔥",
      "Brilliant! 🌞",
      "Outstanding! 🎨"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const questions = [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "H2"],
      correctAnswer: "H2O",
      explanation: "Water is made up of two hydrogen atoms and one oxygen atom, hence H2O",
      emoji: "💧"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      explanation: "Mars is called the Red Planet because of its reddish appearance",
      emoji: "🔴"
    },
    {
      question: "What is the process by which plants make their food?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
      correctAnswer: "Photosynthesis",
      explanation: "Plants use sunlight to convert water and carbon dioxide into food",
      emoji: "🌱"
    },
    {
      question: "Which animal is known as the king of the jungle?",
      options: ["Tiger", "Lion", "Elephant", "Giraffe"],
      correctAnswer: "Lion",
      explanation: "Lions are often called the king of the jungle due to their majestic appearance",
      emoji: "🦁"
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correctAnswer: "Diamond",
      explanation: "Diamond is the hardest known natural material",
      emoji: "💎"
    },
    {
      question: "Which part of the plant absorbs water from the soil?",
      options: ["Leaves", "Stem", "Roots", "Flowers"],
      correctAnswer: "Roots",
      explanation: "Roots absorb water and nutrients from the soil",
      emoji: "🌿"
    },
    {
      question: "What is the main gas that makes up the air we breathe?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correctAnswer: "Nitrogen",
      explanation: "Air is about 78% nitrogen and 21% oxygen",
      emoji: "🌬️"
    },
    {
      question: "Which animal can change its color to match its surroundings?",
      options: ["Chameleon", "Snake", "Frog", "Butterfly"],
      correctAnswer: "Chameleon",
      explanation: "Chameleons can change their skin color to blend with their environment",
      emoji: "🦎"
    },
    {
      question: "What is the process of water changing from liquid to gas called?",
      options: ["Freezing", "Melting", "Evaporation", "Condensation"],
      correctAnswer: "Evaporation",
      explanation: "Evaporation is when water turns from liquid to water vapor",
      emoji: "💨"
    },
    {
      question: "Which organ pumps blood through our body?",
      options: ["Lungs", "Heart", "Liver", "Brain"],
      correctAnswer: "Heart",
      explanation: "The heart pumps blood to all parts of our body",
      emoji: "❤️"
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
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-purple-100">
      <NavBar />
      
      {/* Floating Shapes Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-blue-300 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {['🔬', '🧪', '🌱', '🌍', '🔭', '⚡', '🧫', '🔋'][Math.floor(Math.random() * 8)]}
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
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg transform hover:rotate-12 transition-transform">
                <FaFlask className="w-12 h-12" />
              </div>
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold text-blue-800 mb-2"
              animate={{
                textShadow: [
                  "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0ea5e9",
                  "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0ea5e9, 0 0 82px #0ea5e9",
                  "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0ea5e9"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Fun Science Quiz! 🔬
            </motion.h1>
            <motion.p 
              className="text-blue-600 text-base"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Let's explore science together! 🌈
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
              className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full"
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
                className="flex items-center justify-center mb-6 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl shadow-md"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mr-4 shadow-lg"
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
                  <span className="text-3xl">{questions[currentQuestion].emoji}</span>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-1">
                    {questions[currentQuestion].question}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Question {currentQuestion + 1}
                    </span>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {questions.length} Total
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0] }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'bg-green-100 border-2 border-green-500'
                          : 'bg-red-100 border-2 border-red-500'
                        : 'bg-white hover:bg-blue-50 border-2 border-blue-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-lg text-blue-800">{option}</span>
                      </div>
                      {selectedAnswer === option && (
                        isCorrect ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <FaCheck className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <FaTimes className="w-5 h-5 text-white" />
                          </motion.div>
                        )
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
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2"
                        >
                          <FaStar className="w-5 h-5 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-2"
                        >
                          <FaHeart className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                      <p className="text-base font-medium">
                        {isCorrect ? getEncouragingMessage() : "Let's try another one! 💪"}
                      </p>
                    </div>
                    <p className="text-sm mt-2 pl-10">{questions[currentQuestion].explanation}</p>
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
                className="text-2xl font-bold text-blue-800 mb-4"
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
                className="text-xl text-blue-600 mb-6"
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
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 mx-auto text-xl"
              >
                <span className="text-lg">Play Again!</span>
                <FaRocket className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
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
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut",
                }}
              >
                {['🔬', '🧪', '🌱', '🌍', '🔭', '⚡', '🧫', '🔋'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 py-4 px-6 border-t-2 border-blue-200"
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
            <span className="text-blue-800 font-medium">Learning is fun! 🌈</span>
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
              <FaRegLaughSquint className="w-6 h-6 text-green-500" />
            </motion.div>
            <span className="text-blue-800 font-medium">Keep exploring! 🔬</span>
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
              <FaRegGrinStars className="w-6 h-6 text-purple-500" />
            </motion.div>
            <span className="text-blue-800 font-medium">You're amazing! ⭐</span>
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

export default ScienceQuize;
