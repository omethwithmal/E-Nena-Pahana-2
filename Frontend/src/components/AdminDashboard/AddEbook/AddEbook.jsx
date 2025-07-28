import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaEdit, FaTrash, FaUpload, FaImage, FaDownload, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import AdminDashNaveBar from '../AdminDashNaveBar';
import * as XLSX from 'xlsx';

const AddEbook = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [ebooks, setEbooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    category: '',
    coverImage: null,
    ebookFile: null
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ebookToDelete, setEbookToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Mathematics',
    'Science',
    'English',
    'History',
    'Physics',
    'Chemistry',
    'Biology',
    'Business',
    'Computer Science',
    'Environmental Science'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEbookUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file');
        return;
      }
      setFormData(prev => ({
        ...prev,
        ebookFile: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.ebookFile) {
      alert('Please upload an E-Book PDF file');
      return;
    }

    const newEbook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      price: formData.price,
      category: formData.category,
      description: formData.description,
      coverImage: formData.coverImage,
      ebookFile: formData.ebookFile,
      fileName: formData.ebookFile.name
    };

    if (editingId) {
      setEbooks(prev => prev.map(ebook => 
        ebook.id === editingId ? newEbook : ebook
      ));
    } else {
      setEbooks(prev => [...prev, newEbook]);
    }

    resetForm();
  };

  const handleEdit = (ebook) => {
    setFormData(ebook);
    setEditingId(ebook.id);
    setPreviewImage(ebook.coverImage ? URL.createObjectURL(ebook.coverImage) : null);
  };

  const handleDelete = (id) => {
    setEbooks(ebooks.filter(ebook => ebook.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      price: '',
      description: '',
      category: '',
      coverImage: null,
      ebookFile: null
    });
    setPreviewImage(null);
    setEditingId(null);
  };

  const handleDownloadReport = () => {
    // Prepare data for Excel
    const reportData = ebooks.map(ebook => ({
      'Title': ebook.title,
      'Author': ebook.author,
      'Price (LKR)': ebook.price,
      'Category': ebook.category,
      'Description': ebook.description,
      'Added Date': new Date(ebook.id).toLocaleDateString()
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(reportData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'E-Books Report');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create download link
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `e-books-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDeleteClick = (ebook) => {
    setEbookToDelete(ebook);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (ebookToDelete) {
      handleDelete(ebookToDelete.id);
      setDeleteModalOpen(false);
      setEbookToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setEbookToDelete(null);
  };

  // Filter ebooks based on search query
  const filteredEbooks = ebooks.filter(ebook => 
    ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebook.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              E-Book Management
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
                    <FaBook className="text-white text-2xl" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingId ? 'Edit E-Book' : 'Add New E-Book'}
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                        placeholder="Enter book title"
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                        placeholder="Enter author name"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (LKR)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">Rs.</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Cover Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex-1">
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center justify-center transition-all duration-200 group"
                          >
                            <FaImage className="text-gray-400 mr-2 group-hover:text-blue-500" />
                            <span className="text-gray-600 group-hover:text-blue-500">Choose Image</span>
                          </motion.div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                        {previewImage && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                          >
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-16 h-20 object-cover rounded-xl shadow-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all duration-200"></div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* E-Book PDF Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-Book PDF
                      </label>
                      <div className="flex items-center space-x-4">
                        <motion.label 
                          whileHover={{ scale: 1.02 }}
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 flex items-center justify-center transition-all duration-200 group"
                        >
                          <FaUpload className="text-gray-400 mr-2 group-hover:text-blue-500" />
                          <span className="text-gray-600 group-hover:text-blue-500">
                            {formData.ebookFile ? formData.ebookFile.name : 'Upload PDF'}
                          </span>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleEbookUpload}
                            className="hidden"
                          />
                        </motion.label>
                        {formData.ebookFile && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center space-x-2 text-sm text-gray-600"
                          >
                            <span className="text-green-500">✓</span>
                            <span>{formData.ebookFile.name}</span>
                          </motion.div>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Maximum file size: 10MB
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                      placeholder="Enter book description"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    {editingId && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={resetForm}
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
                      {editingId ? 'Update E-Book' : 'Add E-Book'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* E-Books List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Added E-Books</h2>
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

                {/* Search Bar */}
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
                    placeholder="Search by title, author, or category..."
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {filteredEbooks.map((ebook) => (
                        <motion.tr
                          key={ebook.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {ebook.coverImage && (
                                <motion.img
                                  whileHover={{ scale: 1.1 }}
                                  src={URL.createObjectURL(ebook.coverImage)}
                                  alt={ebook.title}
                                  className="h-16 w-12 object-cover rounded-lg shadow-md mr-3"
                                />
                              )}
                              <div className="text-sm font-medium text-gray-900">{ebook.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ebook.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {ebook.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {ebook.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {new Date(ebook.id).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="text-gray-500">
                                {new Date(ebook.id).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(ebook)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FaEdit className="text-lg" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteClick(ebook)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FaTrash className="text-lg" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {filteredEbooks.length === 0 && (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <td colSpan="6" className="px-6 py-8 text-gray-500">
                          No e-books found matching your search.
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
                Delete E-Book
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center mb-8 text-lg"
              >
                Are you sure you want to delete <span className="font-semibold text-gray-900">"{ebookToDelete?.title}"</span>? 
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

export default AddEbook;
