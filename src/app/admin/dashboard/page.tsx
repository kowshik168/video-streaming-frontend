"use client";

import { motion } from "framer-motion";
import { Users, Video, Tag, UserPlus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const stats = [
  {
    id: 1,
    title: "Total Users",
    value: 124,
    icon: <Users className="w-6 h-6 text-blue-400" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    title: "New Users (7 Days)",
    value: 8,
    icon: <UserPlus className="w-6 h-6 text-green-400" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Total Videos",
    value: 57,
    icon: <Video className="w-6 h-6 text-purple-400" />,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    id: 4,
    title: "Total Topics",
    value: 12,
    icon: <Tag className="w-6 h-6 text-pink-400" />,
    color: "from-pink-500 to-rose-500",
  },
];

const userData = [
  { week: "Week 1", users: 12 },
  { week: "Week 2", users: 22 },
  { week: "Week 3", users: 18 },
  { week: "Week 4", users: 27 },
  { week: "Week 5", users: 33 },
];

const topicData = [
  { topic: "Science", videos: 12 },
  { topic: "Tech", videos: 19 },
  { topic: "Art", videos: 9 },
  { topic: "Math", videos: 15 },
  { topic: "History", videos: 7 },
];

const activities = [
  { id: 1, action: "New User Registered", user: "Ravi Kumar", time: "5 mins ago" },
  { id: 2, action: "Video Uploaded", user: "Anjali Sharma", time: "30 mins ago" },
  { id: 3, action: "Topic Created", user: "Admin", time: "1 hr ago" },
  { id: 4, action: "User Updated Profile", user: "Kiran Rao", time: "3 hrs ago" },
  { id: 5, action: "Video Deleted", user: "Admin", time: "5 hrs ago" },
  { id: 6, action: "User Logged In", user: "Sneha Verma", time: "7 hrs ago" },
  { id: 7, action: "New Comment Posted", user: "Arjun Patel", time: "9 hrs ago" },
  { id: 8, action: "Password Changed", user: "Manish Gupta", time: "10 hrs ago" },
  { id: 9, action: "Video Thumbnail Updated", user: "Admin", time: "Yesterday" },
  { id: 10, action: "Topic Description Edited", user: "Neha Reddy", time: "Yesterday" },
  { id: 11, action: "New Moderator Assigned", user: "Admin", time: "2 days ago" },
  { id: 12, action: "User Account Suspended", user: "Admin", time: "3 days ago" },
  { id: 13, action: "Video Restored", user: "System", time: "4 days ago" },
  { id: 14, action: "Topic Merged", user: "Admin", time: "5 days ago" },
  { id: 15, action: "New Tag Added", user: "Admin", time: "6 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-[#16213e] p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-white mb-8"
      >
        📊 Dashboard Overview
      </motion.h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: item.id * 0.1 }}
            className={`bg-gradient-to-br ${item.color} p-[1px] rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="bg-[#0f0f1a] rounded-2xl p-5 flex flex-col justify-between h-36">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                  {item.title}
                </h2>
                {item.icon}
              </div>
              <p className="text-4xl font-bold text-white">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0f0f1a] rounded-2xl p-6 shadow-lg border border-gray-800"
        >
          <h3 className="text-lg text-gray-300 font-semibold mb-4">
            New Users Over Time
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="95%" height="100%">
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="week" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "none" }} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#00d4ff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0f0f1a] rounded-2xl p-6 shadow-lg border border-gray-800"
        >
          <h3 className="text-lg text-gray-300 font-semibold mb-4">
            Videos per Topic
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="95%" height="100%">
              <BarChart data={topicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="topic" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "none" }} />
                <Bar dataKey="videos" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0f0f1a] rounded-2xl p-6 shadow-lg border border-gray-800"
      >
        <h3 className="text-lg text-gray-300 font-semibold mb-6">
          Recent Activity
        </h3>

        <div
          className="overflow-y-auto max-h-72 rounded-lg scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          <table className="w-full text-sm text-gray-300">
            <thead className="sticky top-0 bg-[#1a1a2e] text-gray-400 uppercase text-xs z-10">
              <tr>
                <th className="px-4 py-3 text-left">Action</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-gray-800 hover:bg-[#1e1e2f] hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-all duration-150"
                >
                  <td className="px-4 py-3">{a.action}</td>
                  <td className="px-4 py-3">{a.user}</td>
                  <td className="px-4 py-3 text-gray-400">{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}
