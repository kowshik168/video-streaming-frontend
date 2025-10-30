"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, SendHorizonal, ThumbsUp, ThumbsDown, Reply } from "lucide-react";
import { motion } from "framer-motion";

interface ReplyType {
  id: number;
  user: string;
  text: string;
  time: string;
}

interface CommentType {
  id: number;
  user: string;
  text: string;
  time: string;
  likes: number;
  dislikes: number;
  replies: ReplyType[];
}

export default function VideoPlayerPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const video = {
    id: params.id,
    title: "Intro to React Hooks",
    topic: "React",
    description:
      "In this video, we explore how React Hooks revolutionize state management and side effects in functional components.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    comments: [
      {
        id: 1,
        user: "Kowshik",
        text: "Great explanation bro 🔥",
        time: "2h ago",
        likes: 4,
        dislikes: 0,
        replies: []
      },
      {
        id: 2,
        user: "Admin",
        text: "Very clear intro",
        time: "4h ago",
        likes: 2,
        dislikes: 0,
        replies: []
      }
    ] as CommentType[],
  };

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>(video.comments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!comment) return;

    setComments([
      ...comments,
      { id: Date.now(), user: "Admin", text: comment, time: "Just now", likes: 0, dislikes: 0, replies: [] },
    ]);
    setComment("");
  };

  const handleReply = (id: number) => {
    if (!replyText) return;

    setComments(
      comments.map((c) =>
        c.id === id
          ? { ...c, replies: [...c.replies, { id: Date.now(), user: "Admin", text: replyText, time: "Just now" }] }
          : c
      )
    );

    setReplyingTo(null);
    setReplyText("");
  };

  const toggleLike = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const toggleDislike = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-300 mb-4 hover:text-white transition"
      >
        <ArrowLeft /> Back
      </button>

      {/* VIDEO PLAYER */}
      <div className="bg-gray-800 rounded-xl p-5 shadow-xl mb-6">
        <video
          src={video.url}
          controls
          className="w-full h-[450px] rounded-lg border border-gray-700"
        ></video>

        <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
        <span className="text-sm bg-indigo-600 px-3 py-1 rounded-full inline-block mt-2">
          {video.topic}
        </span>

        <p className="mt-4 text-gray-300">{video.description}</p>
      </div>

      {/* COMMENTS */}
      <div className="bg-gray-800 rounded-xl p-5 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        <div className="space-y-4 mb-4 max-h-80 overflow-y-auto pr-2">
          {comments.map((c) => (
            <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-start gap-3">
                
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {c.user.charAt(0).toUpperCase()}
                </div>

                {/* Comment box */}
                <div className="bg-gray-700 rounded-lg p-3 w-full">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-indigo-300">{c.user}</span>
                    <span className="text-xs text-gray-400">{c.time}</span>
                  </div>

                  <p className="mt-1 text-gray-100">{c.text}</p>

                  {/* actions */}
                  <div className="flex gap-4 mt-2 text-sm text-gray-300 items-center">
                    <button onClick={() => toggleLike(c.id)} className="flex items-center gap-1">
                      <ThumbsUp size={16} /> {c.likes}
                    </button>

                    <button onClick={() => toggleDislike(c.id)} className="flex items-center gap-1">
                      <ThumbsDown size={16} /> {c.dislikes}
                    </button>

                    <button className="flex items-center gap-1" onClick={() => setReplyingTo(c.id)}>
                      <Reply size={16} /> Reply
                    </button>
                  </div>

                  {/* reply input */}
                  {replyingTo === c.id && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 bg-gray-600 text-white p-2 rounded-lg outline-none"
                      />
                      <button
                        onClick={() => handleReply(c.id)}
                        className="bg-indigo-600 px-3 rounded-lg flex items-center justify-center"
                      >
                        <SendHorizonal size={18} />
                      </button>
                    </div>
                  )}

                  {/* replies */}
                  {c.replies.length > 0 && (
                    <div className="ml-10 mt-2 space-y-2">
                      {c.replies.map((r) => (
                        <div key={r.id} className="bg-gray-600 p-2 rounded-lg text-sm">
                          <span className="font-semibold text-purple-300">{r.user}:</span> {r.text}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ADD COMMENT */}
        <div className="flex gap-3 mt-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            A
          </div>

          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Add a public comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-gray-700 text-white p-2 rounded-lg outline-none"
            />
            <button
              onClick={handleAddComment}
              className="bg-indigo-600 px-4 rounded-lg flex items-center justify-center"
            >
              <SendHorizonal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
