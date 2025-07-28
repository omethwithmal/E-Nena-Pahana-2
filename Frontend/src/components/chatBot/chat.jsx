import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaMicrophone, FaImage, FaTimes, FaEllipsisV, FaBrain, FaNetworkWired, FaCogs, FaLightbulb, FaBook, FaGraduationCap, FaRegSmile, FaRegPaperPlane } from 'react-icons/fa';
import { generateAIResponse } from '../../utils/api'; // Make sure this path is correct

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm E-Nena Pahana AI. How can I help you with your studies today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const userMessageContent = inputMessage;

        // Add user message
        const newMessage = {
            id: messages.length + 1,
            text: userMessageContent,
            sender: 'user',
            timestamp: new Date()
        };
        // Use a functional update to ensure we're working with the latest state
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputMessage('');
        setIsTyping(true);
        setIsProcessing(true);

        try {
            // Pass the current messages array (including the new user message) for context
            // Filter out internal properties like 'id' and 'timestamp' for the API call
            const conversationForAPI = [...messages, newMessage].map(msg => ({
                sender: msg.sender,
                text: msg.text
            }));
            
            const aiResponse = await generateAIResponse(conversationForAPI);

            // Add bot response
            const botResponse = {
                id: messages.length + 2, // Use prevMessages.length + 2 for correct ID
                text: aiResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error in chat:', error);
            // Add a more informative error message to the chat
            const errorResponse = {
                id: messages.length + 2, // Use prevMessages.length + 2 for correct ID
                text: `I'm sorry, I encountered an error: ${error.message || 'Please try again.'}`,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, errorResponse]);
        } finally {
            setIsTyping(false);
            setIsProcessing(false);
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2800aa] to-[#8600b2] relative overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
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
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`purple-${i}`}
                        className="absolute w-3 h-3 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.2, 0.7, 0.2],
                            y: [0, -40, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    />
                ))}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`pink-${i}`}
                        className="absolute w-4 h-4 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.1, 0.6, 0.1],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                        }}
                    />
                ))}
            </div>

            {/* AI Processing Animation */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2800aa] to-[#8600b2]"
                        style={{
                            backgroundSize: '200% 100%',
                            animation: 'gradientMove 2s linear infinite'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Chat Container */}
            <div className="max-w-5xl mx-auto px-4 py-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <motion.div
                                className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center relative"
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#2800aa] to-[#8600b2] rounded-2xl opacity-50 animate-pulse" />
                                <FaBrain className="w-10 h-10 text-white relative z-10" />
                            </motion.div>
                            <div>
                                <motion.h2
                                    className="text-white font-bold text-3xl mb-1"
                                    animate={{
                                        textShadow: [
                                            "0 0 5px rgba(255,255,255,0.5)",
                                            "0 0 10px rgba(255,255,255,0.8)",
                                            "0 0 5px rgba(255,255,255,0.5)"
                                        ]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    E-Nena Pahana AI
                                </motion.h2>
                                <p className="text-white/90 text-sm flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                    Your Intelligent Learning Assistant
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <motion.button
                                className="text-white/90 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaBook className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                className="text-white/90 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaLightbulb className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                onClick={() => setShowMenu(!showMenu)}
                                className="text-white/90 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaEllipsisV className="w-6 h-6" />
                            </motion.button>
                            <AnimatePresence>
                                {showMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-xl rounded-xl shadow-lg py-2 z-10 border border-white/20"
                                    >
                                        <button className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-colors flex items-center space-x-3">
                                            <FaBook className="w-5 h-5" />
                                            <span>Study Materials</span>
                                        </button>
                                        <button className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-colors flex items-center space-x-3">
                                            <FaGraduationCap className="w-5 h-5" />
                                            <span>Learning Path</span>
                                        </button>
                                        <button className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/10 transition-colors flex items-center space-x-3">
                                            <FaCogs className="w-5 h-5" />
                                            <span>Settings</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="h-[calc(100vh-180px)] overflow-y-auto p-6 space-y-6 bg-white">
                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        <motion.div
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative ${
                                                message.sender === 'user' ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2]' : 'bg-gradient-to-r from-[#8600b2] to-[#2800aa]'
                                            }`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                                            {message.sender === 'user' ? (
                                                <FaUser className="w-6 h-6 text-white relative z-10" />
                                            ) : (
                                                <FaRobot className="w-6 h-6 text-white relative z-10" />
                                            )}
                                        </motion.div>
                                        <motion.div
                                            className={`rounded-2xl px-8 py-5 shadow-lg relative ${
                                                message.sender === 'user'
                                                    ? 'bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white rounded-br-none'
                                                    : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100'
                                            }`}
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className={`absolute inset-0 rounded-2xl animate-pulse ${
                                                message.sender === 'user' ? 'bg-white/5' : 'bg-gray-100/50'
                                            }`} />
                                            <p className="text-base leading-relaxed relative z-10">{message.text}</p>
                                            <span className={`text-sm mt-3 block ${
                                                message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                                            } relative z-10`}>
                                                {formatTime(message.timestamp)}
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center space-x-2 text-[#2800aa]"
                            >
                                <motion.div
                                    className="w-2 h-2 bg-[#2800aa] rounded-full"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                />
                                <motion.div
                                    className="w-2 h-2 bg-[#2800aa] rounded-full"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                    className="w-2 h-2 bg-[#2800aa] rounded-full"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                />
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-100 p-6 bg-white">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                            <motion.button
                                type="button"
                                className="text-gray-500 hover:text-[#2800aa] transition-colors p-3 hover:bg-gray-50 rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaRegSmile className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                type="button"
                                className="text-gray-500 hover:text-[#2800aa] transition-colors p-3 hover:bg-gray-50 rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaImage className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                type="button"
                                className="text-gray-500 hover:text-[#2800aa] transition-colors p-3 hover:bg-gray-50 rounded-xl"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaMicrophone className="w-6 h-6" />
                            </motion.button>
                            <motion.input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 border-2 border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:border-[#2800aa] transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
                                whileFocus={{ scale: 1.02 }}
                            />
                            <motion.button
                                type="submit"
                                className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white rounded-xl p-3 hover:opacity-90 transition-opacity relative group"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                                <FaRegPaperPlane className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default Chat;