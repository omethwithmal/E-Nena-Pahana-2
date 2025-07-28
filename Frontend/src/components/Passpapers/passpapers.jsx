import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaUniversity } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import { motion } from 'framer-motion';

const Passpapers = () => {
  const navigate = useNavigate();

  const examTypes = [
    {
      id: 'scholarship',
      title: 'Grade 5 Scholarship Exam Past Paper',
      icon: <FaGraduationCap className="w-8 h-8" />,
      coverImage: 'https://img.freepik.com/free-vector/children-learning-concept-illustration_114360-1086.jpg',
      bgColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'ol',
      title: 'G.C.E. Ordinary Level (O/L) Past Papers',
      icon: <FaBook className="w-8 h-8" />,
      coverImage: 'https://img.freepik.com/free-vector/student-concept-illustration_114360-2097.jpg',
      bgColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 'al',
      title: 'G.C.E. Advanced Level (A/L) Past Papers',
      icon: <FaUniversity className="w-8 h-8" />,
      coverImage: 'https://img.freepik.com/free-vector/student-with-laptop-studying-online-course_74855-5293.jpg',
      bgColor: 'from-indigo-500 to-violet-500'
    }
  ];

  const handleViewAll = (examType) => {
    navigate(`/PastPapers${examType}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2800aa] text-center mb-8">Past Papers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examTypes.map((exam) => (
              <div key={exam.id} className={`bg-gradient-to-br ${exam.bgColor} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative`}>
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

                <div className="relative h-48 w-full">
                  <img 
                    src={exam.coverImage} 
                    alt={exam.title}
                    className="w-full h-full object-cover opacity-75"
                  />
                </div>
                <div className="p-6 relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-white mb-4">
                      {exam.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-4">{exam.title}</h2>
                    <button
                      onClick={() => handleViewAll(exam.id)}
                      className="w-full bg-white text-[#2800aa] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      View All Past Papers
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Passpapers;
