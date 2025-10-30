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
  Edit,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VideosPage() {
  const [showTopics, setShowTopics] = useState(false);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  const [showEditTopicModal, setShowEditTopicModal] = useState(false);
  const [editTopicName, setEditTopicName] = useState("");

  const [showEditVideoModal, setShowEditVideoModal] = useState(false);
  const [editVideo, setEditVideo] = useState<any>(null);

  const router = useRouter();

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
          onClick={() => router.push("/admin/upload")}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PlusCircle className="w-5 h-5" /> Upload New Video
        </motion.button>
      </div>

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

                  <div className="flex items-center gap-3">
                    {/* Edit Topic */}
                    <Edit
                      className="w-4 h-4 text-yellow-400 hover:text-yellow-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditTopicName(topic.name);
                        setShowEditTopicModal(true);
                      }}
                    />

                    {/* Delete Topic */}
                    <Trash2
                      className="w-4 h-4 text-red-500 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete topic "${topic.name}"?`)) {
                          alert("Topic deleted (mock)");
                        }
                      }}
                    />

                    {openTopic === topic.name ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
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
                              {/* Edit Video */}
                              <Edit
                                className="w-4 h-4 text-yellow-400 hover:text-yellow-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditVideo(video);
                                  setShowEditVideoModal(true);
                                }}
                              />

                              {/* Delete Video */}
                              <Trash2
                                className="w-4 h-4 text-red-500 hover:text-red-400"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert(`Deleted video: ${video.title}`);
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

      {/* ✅ Edit Topic Modal */}
      {showEditTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Topic</h2>
            <input
              type="text"
              value={editTopicName}
              onChange={(e) => setEditTopicName(e.target.value)}
              className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditTopicModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Topic renamed to: ${editTopicName} (mock)`);
                  setShowEditTopicModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Video Modal */}
      {showEditVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Video</h2>

            <input
              defaultValue={editVideo?.title}
              className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 mb-3"
            />
            <input
              defaultValue={editVideo?.thumbnail}
              className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 mb-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditVideoModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  alert("Video updated (mock)");
                  setShowEditVideoModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
