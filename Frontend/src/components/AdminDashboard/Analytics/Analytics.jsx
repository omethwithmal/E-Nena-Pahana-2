import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import AdminDashNaveBar from '../AdminDashNaveBar';

const Analytics = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  // Sample data for charts
  const viewerData = [
    { name: 'Jan', viewers: 400 },
    { name: 'Feb', viewers: 300 },
    { name: 'Mar', viewers: 200 },
    { name: 'Apr', viewers: 278 },
    { name: 'May', viewers: 189 },
    { name: 'Jun', viewers: 239 },
  ];

  const subscriberData = [
    { name: 'Jan', subscribers: 240 },
    { name: 'Feb', subscribers: 139 },
    { name: 'Mar', subscribers: 980 },
    { name: 'Apr', subscribers: 390 },
    { name: 'May', subscribers: 480 },
    { name: 'Jun', subscribers: 380 },
  ];

  const contentData = [
    { name: 'Videos', value: 45 },
    { name: 'E-Books', value: 30 },
    { name: 'Papers', value: 25 },
    { name: 'Quizzes', value: 50 },
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8B94'];

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
          <p className="text-gray-800 font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex">
      <AdminDashNaveBar onCollapse={setIsCollapsed} />
      <motion.div 
        className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-white"
        initial={{ marginLeft: 280 }}
        animate={{ marginLeft: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Analytics Overview
              </h1>
              <p className="text-gray-600 mt-2">Track your platform's performance and growth</p>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Viewers Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-[1.02] transition-all duration-300"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Viewers Trend
                </h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={viewerData}>
                      <defs>
                        <linearGradient id="colorViewers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="viewers" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorViewers)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Subscribers Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-[1.02] transition-all duration-300"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Subscribers Trend
                </h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={subscriberData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="subscribers" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Content Distribution Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-[1.02] transition-all duration-300"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                  Content Distribution
                </h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        animationBegin={0}
                        animationDuration={1500}
                      >
                        {contentData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Engagement Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 transform hover:scale-[1.02] transition-all duration-300"
                style={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Engagement Overview
                </h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={viewerData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        dataKey="viewers" 
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl"
              >
                <h3 className="text-lg font-semibold mb-2">Total Viewers</h3>
                <p className="text-3xl font-bold">1,250</p>
                <p className="text-blue-100 mt-2">↑ 12% from last month</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl"
              >
                <h3 className="text-lg font-semibold mb-2">Total Subscribers</h3>
                <p className="text-3xl font-bold">850</p>
                <p className="text-purple-100 mt-2">↑ 8% from last month</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white shadow-xl"
              >
                <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
                <p className="text-3xl font-bold">68%</p>
                <p className="text-emerald-100 mt-2">↑ 5% from last month</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
