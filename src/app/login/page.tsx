"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response data:", data);
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("email_id", data.user.email_id);
        localStorage.setItem("user_name", data.user.user_name);

        setMessage("✅ Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (data.user.role === "admin") {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/user/home";
          }
        }, 1500);
      } else {
        setMessage(data.message || "❌ Invalid credentials");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("🚨 Server error. Please try again later.");
      setMessageType("error");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute top-10 text-center text-gray-300 text-3xl font-semibold tracking-wide">
        🎬 Video Streaming Software
      </div>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className="bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          Login
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {message && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.4 }}
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium ${
              messageType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
