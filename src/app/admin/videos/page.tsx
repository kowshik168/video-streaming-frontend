"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Tag,
  User,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

export default function VideosPage() {
  const [showTopics, setShowTopics] = useState(false);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isNewTopic, setIsNewTopic] = useState(false);

  const topics = [
    {
      name: "React Basics",
      videos: [
        {
          title: "Intro to React Components",
          uploader: "John Doe",
          time: "2 days ago",
          thumbnail: "https://img.youtube.com/vi/dGcsHMXbSOA/mqdefault.jpg",
        },
        {
          title: "Understanding State and Props",
          uploader: "Ayesha Khan",
          time: "1 week ago",
          thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/mqdefault.jpg",
        },
      ],
    },
    {
      name: "Node.js Essentials",
      videos: [
        {
          title: "Building REST APIs",
          uploader: "Admin",
          time: "3 days ago",
          thumbnail: "https://img.youtube.com/vi/pKd0Rpw7O48/mqdefault.jpg",
        },
      ],
    },
  ];

  const handleDelete = (title: string) => {
    alert(`Deleted video: ${title}`);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUploadModal(false);
    alert("New video added (mock). Backend integration coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8"
      >
        🎬 Video Library
      </motion.h1>

      {/* Upload New Video */}
      <div className="mb-6 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PlusCircle className="w-5 h-5" /> Upload New Video
        </motion.button>
      </div>

      {/* Main heading */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowTopics(!showTopics)}
        className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-5 cursor-pointer flex items-center justify-between hover:bg-[#1a1a2e] transition-all duration-200 shadow-lg"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Tag className="w-5 h-5 text-pink-400" /> All Topics
        </h2>
        {showTopics ? (
          <ChevronUp className="w-6 h-6 text-gray-400" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400" />
        )}
      </motion.div>

      {/* Topics List */}
      <AnimatePresence>
        {showTopics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 space-y-4"
          >
            {topics.map((topic) => (
              <motion.div
                key={topic.name}
                className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-5 hover:bg-[#1a1a2e] transition-all duration-200 shadow-md"
              >
                {/* Topic Header */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setOpenTopic(openTopic === topic.name ? null : topic.name)
                  }
                >
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" /> {topic.name}
                  </h3>
                  {openTopic === topic.name ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {/* Videos List */}
                <AnimatePresence>
                  {openTopic === topic.name && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 pl-4 border-l border-gray-700 space-y-3"
                    >
                      {topic.videos.map((video) => (
                        <motion.li key={video.title}>
                          <div
                            className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer py-1"
                            onClick={() =>
                              setOpenVideo(
                                openVideo === video.title ? null : video.title
                              )
                            }
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-blue-400" />
                              {video.title}
                            </div>
                            <div className="flex items-center gap-3">
                              <Trash2
                                className="w-4 h-4 text-red-500 hover:text-red-400"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(video.title);
                                }}
                              />
                              {openVideo === video.title ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </div>

                          {/* Expanded video preview */}
                          <AnimatePresence>
                            {openVideo === video.title && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4 }}
                                className="bg-[#1a1a2e] rounded-xl p-4 mt-2 border border-gray-800 flex gap-4"
                              >
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-40 h-24 rounded-lg object-cover border border-gray-700"
                                />
                                <div className="flex flex-col justify-between">
                                  <h4 className="text-gray-200 font-medium">
                                    {video.title}
                                  </h4>
                                  <p className="text-sm text-gray-400 flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                    {video.uploader} • {video.time}
                                  </p>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1.5 rounded-lg shadow-md text-sm font-semibold"
                                  >
                                    ▶ Play Video
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                📤 Upload New Video
              </h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <input
                  type="text"
                  placeholder="Video Title"
                  required
                  className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Video URL"
                  required
                  className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select
                  onChange={(e) => setIsNewTopic(e.target.value === "new")}
                  className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Topic</option>
                  {topics.map((t) => (
                    <option key={t.name}>{t.name}</option>
                  ))}
                  <option value="new">➕ Create New Topic</option>
                </select>
                {isNewTopic && (
                  <input
                    type="text"
                    placeholder="Enter New Topic Name"
                    required
                    className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
                <div className="flex justify-end gap-3 mt-5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold"
                  >
                    Upload
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
