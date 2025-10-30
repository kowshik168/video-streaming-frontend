"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileVideo, PlusCircle } from "lucide-react";

export default function UploadVideoPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isNewTopic, setIsNewTopic] = useState(false);

  const topics = ["React Basics", "Node.js Essentials", "Next.js Fundamentals"];

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Video upload triggered (mock). Backend integration next!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 flex flex-col items-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8"
      >
        📤 Upload New Video
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#111827]/80 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 w-full max-w-2xl shadow-2xl space-y-6"
      >
        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-200 ${
            isDragging
              ? "border-indigo-400 bg-indigo-900/20"
              : "border-gray-700 hover:border-indigo-400 hover:bg-[#1e293b]"
          }`}
        >
          {file ? (
            <div className="text-center space-y-2">
              <FileVideo className="w-10 h-10 text-indigo-400 mx-auto" />
              <p className="text-gray-300">{file.name}</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-indigo-400 mb-3" />
              <p className="text-gray-400">
                Drag & drop your video here, or{" "}
                <label className="text-indigo-400 cursor-pointer hover:underline">
                  browse
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </p>
            </>
          )}
        </div>

        {/* Video Title */}
        <input
          type="text"
          placeholder="Enter video title"
          required
          className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Topic Selector */}
        <select
          onChange={(e) => setIsNewTopic(e.target.value === "new")}
          className="w-full bg-[#1e293b] text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Topic</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
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

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-5 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <PlusCircle className="w-5 h-5" /> Upload Video
        </motion.button>
      </motion.form>
    </div>
  );
}
