import React, { useState } from 'react';
import AdminDashNaveBar from '../AdminDashNaveBar';
import { FaUser, FaEnvelope, FaUserTag, FaEdit, FaTrash, FaExclamationTriangle, FaUsers, FaChalkboardTeacher, FaUserShield, FaDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';

const UserMnagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [users, setUsers] = useState([
    { id: 1, name: 'Nimal Perera', email: 'nimal@email.com', role: 'Student' },
    { id: 2, name: 'Sunil Silva', email: 'sunil@email.com', role: 'Teacher' },
    { id: 3, name: 'Kamal Fernando', email: 'kamal@email.com', role: 'Student' },
  ]);
  const [form, setForm] = useState({ name: '', email: '', role: 'Student' });
  const [formError, setFormError] = useState('');
  const [editId, setEditId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const roleFilters = [
    { value: 'All', label: 'All', icon: <FaUsers /> },
    { value: 'Student', label: 'Student', icon: <FaUser /> },
    { value: 'Teacher', label: 'Teacher', icon: <FaChalkboardTeacher /> },
    { value: 'Admin', label: 'Admin', icon: <FaUserShield /> },
  ];

  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === 'All' || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditId(user.id);
    setFormError('');
  };

  const handleDelete = (id) => {
    const user = users.find((u) => u.id === id);
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
      if (editId === userToDelete.id) {
        setEditId(null);
        setForm({ name: '', email: '', role: 'Student' });
      }
    }
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name.trim() || !form.email.trim() || !form.role.trim()) {
      setFormError('All fields are required.');
      return;
    }
    // Email format validation (simple)
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (editId) {
      // Update user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editId ? { ...user, name: form.name, email: form.email, role: form.role } : user
        )
      );
      setEditId(null);
    } else {
      // Add user
      setUsers((prev) => [
        ...prev,
        {
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
          name: form.name,
          email: form.email,
          role: form.role,
        },
      ]);
    }
    setForm({ name: '', email: '', role: 'Student' });
    setFormError('');
  };

  const handleDownloadReport = () => {
    const reportData = filteredUsers.map(user => ({
      'Name': user.name,
      'Email': user.email,
      'Role': user.role
    }));
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users Report');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users-report-${new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Sidebar */}
      <AdminDashNaveBar onCollapse={setIsCollapsed} />

      {/* Main Content */}
      <div
        className={`min-h-screen bg-gray-50 transition-all duration-300 ${
          isCollapsed ? 'ml-[80px]' : 'ml-[280px]'
        } p-8`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h2>
        </div>

        {/* Add User Form */}
        <form onSubmit={handleAddUser} className="bg-gradient-to-r from-white via-purple-50 to-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row md:items-end gap-6 border border-purple-100">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full pl-10 pr-4 py-2 border border-purple-200 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder-gray-400 shadow-sm"
                placeholder="Enter name"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full pl-10 pr-4 py-2 border border-purple-200 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition placeholder-gray-400 shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Role</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                <FaUserTag />
              </span>
              <select
                name="role"
                value={form.role}
                onChange={handleFormChange}
                className="w-full pl-10 pr-4 py-2 border border-purple-200 bg-white/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition shadow-sm"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg mt-4 md:mt-0"
          >
            {editId ? 'Update User' : 'Add User'}
          </button>
        </form>
        {formError && <div className="text-red-600 mb-4">{formError}</div>}

        {/* Table Controls: Search, Filter, Download */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-base flex-1 min-w-[200px]"
            />
            {roleFilters.map((filter) => (
              <motion.button
                key={filter.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRoleFilter(filter.value)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-200 text-base
                  ${roleFilter === filter.value
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white border border-gray-100 text-gray-600 hover:border-blue-200 hover:bg-blue-50'}
                `}
              >
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadReport}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold shadow-lg hover:from-green-600 hover:to-emerald-600 active:from-green-700 active:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center space-x-2 text-base"
          >
            <FaDownload className="text-lg" />
            <span>Download Report</span>
          </motion.button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-[#2800aa] to-[#8600b2] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEdit(user)}
                        >
                          <FaEdit className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(user.id)}
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
                  <FaExclamationTriangle className="text-red-500 text-3xl" />
                </div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 text-center mb-3"
              >
                Delete User
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-center mb-8 text-lg"
              >
                Are you sure you want to delete <span className="font-semibold text-gray-900">{userToDelete?.name}</span>?
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
    </>
  );
};

export default UserMnagement;
