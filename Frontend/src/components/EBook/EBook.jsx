import React, { useState } from 'react';
import { FaShoppingCart, FaTimes, FaSearch, FaBook, FaStar, FaUser, FaCreditCard, FaLock, FaCheck, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import NavBar from '../NavBar/NavBar';

const EBook = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

  // Sample e-books data (you can replace with your actual data)
  const ebooks = [
    {
      id: 1,
      title: "Mathematics for Grade 10",
      author: "Dr. John Smith",
      price: 1500,
      coverImage: "https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-3872.jpg",
      rating: 4.5,
      description: "Comprehensive mathematics textbook covering all topics for Grade 10 students.",
      category: "Mathematics",
      content: "This is the full content of the Mathematics book. It includes chapters on algebra, geometry, trigonometry, and calculus. Each chapter contains detailed explanations, examples, and practice problems to help students master the concepts.",
      bgColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: "Science Fundamentals",
      author: "Prof. Sarah Johnson",
      price: 1800,
      coverImage: "https://img.freepik.com/free-vector/science-concept-illustration_114360-747.jpg",
      rating: 4.8,
      description: "Essential science concepts explained with practical examples and experiments.",
      category: "Science",
      content: "This is the full content of the Science book. It covers physics, chemistry, and biology fundamentals. The book includes interactive experiments, real-world applications, and engaging illustrations to make learning science fun and effective.",
      bgColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: "English Literature Classics",
      author: "Dr. Emily Brown",
      price: 2000,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.7,
      description: "A collection of classic English literature works with detailed analysis and commentary.",
      category: "English",
      content: "This book features timeless works of English literature, including poetry, prose, and drama. Each piece is accompanied by expert analysis, historical context, and discussion questions to enhance understanding.",
      bgColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: "History of Sri Lanka",
      author: "Prof. Rajith Perera",
      price: 2500,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.9,
      description: "Comprehensive history of Sri Lanka from ancient times to modern era.",
      category: "History",
      content: "This book covers the rich history of Sri Lanka, from ancient kingdoms to modern times. It includes detailed accounts of cultural, political, and social developments throughout the centuries.",
      bgColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 5,
      title: "Advanced Physics",
      author: "Dr. Michael Chen",
      price: 2200,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.6,
      description: "Advanced physics concepts with practical applications and problem-solving techniques.",
      category: "Physics",
      content: "This advanced physics textbook covers complex topics in mechanics, thermodynamics, electromagnetism, and quantum physics. It includes detailed explanations, mathematical derivations, and practical applications.",
      bgColor: 'from-red-500 to-pink-500'
    },
    {
      id: 6,
      title: "Chemistry in Daily Life",
      author: "Dr. Lisa Wong",
      price: 1900,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.4,
      description: "Understanding chemistry through everyday applications and experiments.",
      category: "Chemistry",
      content: "This book makes chemistry accessible by connecting concepts to daily life. It includes simple experiments, real-world examples, and clear explanations of chemical processes we encounter every day.",
      bgColor: 'from-indigo-500 to-violet-500'
    },
    {
      id: 7,
      title: "Biology for Beginners",
      author: "Dr. James Wilson",
      price: 1700,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.5,
      description: "Introduction to biology with engaging illustrations and interactive content.",
      category: "Biology",
      content: "This beginner-friendly biology book covers fundamental concepts in cell biology, genetics, ecology, and human anatomy. It features colorful illustrations and interactive elements to make learning engaging.",
      bgColor: 'from-teal-500 to-cyan-500'
    },
    {
      id: 8,
      title: "Business Studies",
      author: "Prof. David Lee",
      price: 2300,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.7,
      description: "Comprehensive guide to business concepts, management, and entrepreneurship.",
      category: "Business",
      content: "This business studies book covers essential topics in management, marketing, finance, and entrepreneurship. It includes case studies, real-world examples, and practical exercises.",
      bgColor: 'from-blue-600 to-indigo-600'
    },
    {
      id: 9,
      title: "Computer Science Basics",
      author: "Dr. Alan Turing",
      price: 2100,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.8,
      description: "Introduction to computer science, programming, and digital technology.",
      category: "Computer Science",
      content: "This book introduces fundamental concepts in computer science, including programming basics, algorithms, data structures, and digital systems. It includes practical coding exercises and projects.",
      bgColor: 'from-purple-600 to-pink-600'
    },
    {
      id: 10,
      title: "Environmental Science",
      author: "Dr. Maria Garcia",
      price: 1950,
      coverImage: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
      rating: 4.6,
      description: "Understanding environmental issues and sustainable practices.",
      category: "Environmental Science",
      content: "This book explores environmental science topics including ecosystems, climate change, conservation, and sustainable development. It includes case studies and practical solutions for environmental challenges.",
      bgColor: 'from-green-600 to-emerald-600'
    }
  ];

  const updateCartQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(book => 
      book.id === bookId ? { ...book, quantity: newQuantity } : book
    ));
  };

  const addToCart = (book) => {
    const existingBook = cart.find(item => item.id === book.id);
    if (existingBook) {
      updateCartQuantity(book.id, (existingBook.quantity || 1) + 1);
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
    setShowCart(true);
    setSelectedBook(null);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(book => book.id !== bookId));
  };

  const filteredBooks = ebooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmPayment = () => {
    setShowOTP(true);
  };

  const handleConfirmOTP = () => {
    setShowOTP(false);
    setShowCheckout(false);
    setShowCart(false);
    setShowSuccess(true);
  };

  const handleOK = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search e-books..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div 
              key={book.id} 
              className={`bg-gradient-to-br ${book.bgColor} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative cursor-pointer transform hover:-translate-y-1 duration-300`}
              onClick={() => setSelectedBook(book)}
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

              <div className="relative h-48 w-full">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
              <div className="p-6 relative">
                <div className="flex flex-col items-center text-center">
                  <div className="text-white mb-4">
                    <FaBook className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">{book.title}</h2>
                  <p className="text-white/90 text-sm mb-4">By {book.author}</p>
                  <div className="flex items-center text-white mb-4">
                    <FaStar className="text-yellow-300 mr-1" />
                    <span>{book.rating}</span>
                  </div>
                  <div className="text-white font-medium">
                    Rs. {book.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: showCart ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50"
      >
        <div className={`bg-gradient-to-r ${selectedBook?.bgColor || 'from-[#2800aa] to-[#8600b2]'} p-6 relative`}>
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
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            </div>
            <button 
              onClick={() => setShowCart(false)}
              className="text-white hover:text-white/80 p-2 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-8rem)]">
          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-gray-500"
            >
              <FaShoppingCart className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm mt-2">Add some books to get started</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {cart.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-3 flex items-center space-x-3 hover:shadow-md transition-shadow"
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-gray-600">By {book.author}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCartQuantity(book.id, (book.quantity || 1) - 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium text-gray-800 text-sm">
                          {book.quantity || 1}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCartQuantity(book.id, (book.quantity || 1) + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[#2800aa] font-semibold text-sm">
                          Rs. {(book.price * (book.quantity || 1)).toLocaleString()}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(book.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-[#2800aa]">
                Rs. {cart.reduce((sum, book) => sum + (book.price * (book.quantity || 1)), 0).toLocaleString()}
              </span>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#2800aa] text-white py-3 rounded-xl font-medium hover:bg-[#2800aa]/90 transition-colors flex items-center justify-center space-x-2"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-2xl h-[600px] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] p-4 relative">
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
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaCreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Checkout</h2>
                    <p className="text-white/80 text-xs mt-0.5">Complete your purchase</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-white hover:text-white/80 p-1 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto h-[calc(600px-4rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="space-y-4">
                {/* Order Summary */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                    <FaShoppingCart className="w-4 h-4 text-[#2800aa] mr-2" />
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    {cart.map((book) => (
                      <div key={book.id} className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-10 h-10 object-cover rounded-lg shadow-sm"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">{book.title}</h4>
                            <p className="text-xs text-gray-600">By {book.author}</p>
                            <div className="flex items-center space-x-1 mt-0.5">
                              <span className="text-xs text-gray-500">Qty: {book.quantity || 1}</span>
                              <span className="text-xs text-gray-500">×</span>
                              <span className="text-xs text-gray-500">Rs. {book.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[#2800aa] font-semibold text-sm">
                          Rs. {(book.price * (book.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium text-gray-800">Total Amount:</span>
                      <span className="text-xl font-bold text-[#2800aa]">
                        Rs. {cart.reduce((sum, book) => sum + (book.price * (book.quantity || 1)), 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                    <FaCreditCard className="w-4 h-4 text-[#2800aa] mr-2" />
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent bg-white/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent bg-white/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent bg-white/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent bg-white/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* E-book Download Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm">
                  <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                    <FaBook className="w-4 h-4 text-[#2800aa] mr-2" />
                    E-book Download
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email to receive the e-book"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent bg-white/50 text-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      We'll send the e-book download link to your email address after payment confirmation.
                    </p>
                  </div>
                </div>

                {/* Confirm Button */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                  onClick={handleConfirmPayment}
                  className="w-3/4 mx-auto bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white py-4 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg text-sm relative overflow-hidden group"
                >
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#8600b2] to-[#2800aa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaLock className="w-4 h-4" />
                    </motion.div>
                    <span>Confirm Payment</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* OTP Modal */}
      {showOTP && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] p-4 relative">
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaCreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Verify OTP</h2>
                    <p className="text-white/80 text-xs mt-0.5">Enter the OTP sent to your email</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOTP(false)}
                  className="text-white hover:text-white/80 p-1 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP Number</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2800aa] focus:border-transparent bg-white/50 text-sm"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmOTP}
                  className="w-full bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg text-sm"
                >
                  <FaLock className="w-4 h-4" />
                  <span>Confirm OTP</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 relative">
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Success!</h2>
                    <p className="text-white/80 text-xs mt-0.5">Payment completed successfully</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <FaCheck className="w-8 h-8 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">Payment Successful!</h3>
                  <p className="text-sm text-gray-600">
                    Your payment has been processed successfully. The e-book download link has been sent to your email address.
                  </p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOK}
                  className="w-full bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg text-sm"
                >
                  <FaEnvelope className="w-4 h-4" />
                  <span>Check Email</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Book Content Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full md:w-[90%] lg:w-[80%] xl:w-[70%] max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${selectedBook.bgColor} p-6 relative`}>
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
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaBook className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedBook.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="text-white hover:text-white/80 p-2 transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Column */}
                  <div className="md:w-1/3">
                    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={selectedBook.coverImage}
                        alt={selectedBook.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <FaUser className="text-gray-500" />
                            <span className="text-gray-600">{selectedBook.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaStar className="text-yellow-400" />
                            <span className="text-gray-600">{selectedBook.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{selectedBook.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-[#2800aa]">
                            Rs. {selectedBook.price}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(selectedBook);
                            }}
                            className="bg-[#2800aa] text-white px-6 py-2 rounded-lg hover:bg-[#2800aa]/90 transition-colors flex items-center"
                          >
                            <FaShoppingCart className="mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:w-2/3">
                    <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <FaBook className="mr-2 text-[#2800aa]" />
                        Book Content
                      </h3>
                      <div className="prose max-w-none text-gray-700">
                        {selectedBook.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EBook;
