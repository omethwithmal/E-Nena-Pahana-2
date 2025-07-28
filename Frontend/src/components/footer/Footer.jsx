import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">E-Nena Pahana</h3>
            <p className="text-gray-200">
              Empowering students with quality educational resources and interactive learning experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                <FaFacebook className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                <FaTwitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                <FaInstagram className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-gray-200 transition-colors duration-300"
              >
                <FaYoutube className="h-6 w-6" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/passpapers" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Pass Papers
                </Link>
              </li>
              <li>
                <Link to="/ebooks" className="text-gray-200 hover:text-white transition-colors duration-300">
                  E-Books
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-200 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-200 hover:text-white transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhone className="h-5 w-5 text-gray-200" />
                <span className="text-gray-200">+94 11 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-gray-200" />
                <span className="text-gray-200">info@enenapahana.lk</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-200 mt-1" />
                <span className="text-gray-200">
                  123 Education Street,<br />
                  Colombo 03,<br />
                  Sri Lanka
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-200">
            © {new Date().getFullYear()} E-Nena Pahana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
