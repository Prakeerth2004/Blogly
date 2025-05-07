import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/posts/create",
        { title, description, content },
        { withCredentials: true }
      );
      navigate("/myposts");
    } catch (error) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl text-white">
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
          Create a New Post
        </h2>
        <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-700 border border-green-500 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Give a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 border border-green-500 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
          />
          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-700 border border-green-500 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-40"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 w-40 ml-60 text-white py-3 rounded-md hover:bg-green-600 transition-all duration-300 disabled:bg-gray-600"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default CreatePost;

