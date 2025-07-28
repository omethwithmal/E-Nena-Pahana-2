import React, { useState, useRef } from 'react';
import AdminDashNaveBar from '../AdminDashNaveBar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaEdit, FaTrash, FaUpload, FaTags, FaBook, FaFlask, FaHistory, FaLanguage, FaCode, FaPalette, FaCheck, FaTimes, FaUsers } from 'react-icons/fa';

const categories = [
  { value: 'All', label: 'All', icon: <FaUsers /> },
  { value: 'Mathematics', label: 'Mathematics', icon: <FaBook /> },
  { value: 'Science', label: 'Science', icon: <FaFlask /> },
  { value: 'History', label: 'History', icon: <FaHistory /> },
  { value: 'Languages', label: 'Languages', icon: <FaLanguage /> },
  { value: 'Computer Science', label: 'Computer Science', icon: <FaCode /> },
  { value: 'Art & Creativity', label: 'Art & Creativity', icon: <FaPalette /> },
  { value: 'Coding', label: 'Coding', icon: <FaCode /> },
];

const AddVideos = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: '',
    video: null,
    description: '',
    tags: '',
  });
  const [formError, setFormError] = useState('');
  const [videos, setVideos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video') {
      setForm((prev) => ({ ...prev, video: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.description.trim() || !form.tags.trim() || (!form.video && !editId)) {
      setFormError('All fields are required.');
      return;
    }
    if (!editId && form.video && !form.video.type.startsWith('video/')) {
      setFormError('Please upload a valid video file.');
      return;
    }
    const tagsArr = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    if (editId) {
      setVideos((prev) =>
        prev.map((v) =>
          v.id === editId
            ? {
                ...v,
                title: form.title,
                category: form.category,
                description: form.description,
                tags: tagsArr,
                videoUrl: form.video instanceof File ? URL.createObjectURL(form.video) : v.videoUrl,
              }
            : v
        )
      );
      setEditId(null);
    } else {
      setVideos((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: form.title,
          category: form.category,
          description: form.description,
          tags: tagsArr,
          videoUrl: form.video ? URL.createObjectURL(form.video) : '',
        },
      ]);
    }
    setForm({ title: '', category: '', video: null, description: '', tags: '' });
    setFormError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (video) => {
    setForm({
      title: video.title,
      category: video.category,
      video: video.videoUrl,
      description: video.description,
      tags: video.tags.join(', '),
    });
    setEditId(video.id);
    setFormError('');
  };

  const handleDelete = (video) => {
    setVideoToDelete(video);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (videoToDelete) {
      setVideos((prev) => prev.filter((v) => v.id !== videoToDelete.id));
    }
    setDeleteModalOpen(false);
    setVideoToDelete(null);
    if (editId === videoToDelete?.id) {
      setEditId(null);
      setForm({ title: '', category: '', video: null, description: '', tags: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  const filteredVideos = videos.filter(
    (v) => (categoryFilter === 'All' || v.category === categoryFilter)
      && (
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase()) ||
        v.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminDashNaveBar onCollapse={setIsCollapsed} />
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isCollapsed ? 'ml-[80px]' : 'ml-[280px]'
        } p-8`}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Videos</h2>
        {/* Add Video Form */}
        <form
          onSubmit={handleAddVideo}
          className="bg-gradient-to-br from-white via-purple-50 to-white rounded-3xl shadow-lg p-10 mb-10 flex flex-col gap-8 border border-purple-100 max-w-6xl mx-auto relative overflow-hidden"
        >
          {/* Decorative Bubbles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-100/40 backdrop-blur-sm"
                style={{
                  width: 60 + i * 20,
                  height: 60 + i * 20,
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.12, 0.22, 0.12],
                  y: [0, -20, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7
                }}
              />
            ))}
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2 ml-1">Title</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <FaVideo />
                </span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder-gray-400 shadow-sm text-base"
                  placeholder="Enter video title"
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2 ml-1">Category</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <FaBook />
                </span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition shadow-sm text-base"
                >
                  <option value="">Select Category</option>
                  {categories.filter(c => c.value !== 'All').map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2 ml-1">Video File</label>
              <div className="relative flex items-center gap-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <FaUpload />
                </span>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  ref={fileInputRef}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition shadow-sm text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2 ml-1">Tags</label>
              <div className="relative flex items-center gap-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <FaTags />
                </span>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleFormChange}
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder-gray-400 shadow-sm text-base"
                  placeholder="Comma separated tags"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-base font-semibold text-gray-700 mb-2 ml-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={3}
                className="w-full px-4 py-3 border border-purple-200 bg-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder-gray-400 shadow-sm text-base"
                placeholder="Enter video description"
              />
            </div>
          </div>
          <div className="relative z-10 flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
            >
              {editId ? 'Update Video' : 'Add Video'}
            </button>
          </div>
          {formError && <div className="relative z-10 text-red-600 text-center font-semibold">{formError}</div>}
        </form>

        {/* Category Filter Button Group and Search Bar above table */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategoryFilter(cat.value)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 text-base
                  ${categoryFilter === cat.value
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-blue-50'}
                `}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.label}</span>
              </motion.button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-base min-w-[200px]"
          />
        </div>

        {/* Videos Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVideos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No videos found.</td>
                </tr>
              ) : (
                filteredVideos.map((video) => (
                  <tr key={video.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{video.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{video.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">{video.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {video.tags.map((tag, i) => (
                          <span key={i} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {video.videoUrl ? (
                        <video src={video.videoUrl} controls className="w-32 h-20 rounded-lg shadow" />
                      ) : (
                        <span className="text-gray-400">No preview</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEdit(video)}
                        >
                          <FaEdit className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(video)}
                        >
                          <FaTrash className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-100"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                  className="flex items-center justify-center mb-6"
                >
                  <div className="p-4 rounded-full bg-gradient-to-br from-red-100 to-red-50 shadow-lg">
                    <FaTimes className="text-red-500 text-3xl" />
                  </div>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 text-center mb-3"
                >
                  Delete Video
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-center mb-8 text-lg"
                >
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{videoToDelete?.title}</span>?
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
                    whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelDelete}
                    className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-all duration-200 rounded-xl hover:bg-gray-100 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#dc2626', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)' }}
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
    </div>
  );
};

export default AddVideos;
