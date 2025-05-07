// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-6">By {post.author.firstname} {post.author.lastname}</div>
      <p className="text-lg text-gray-700 leading-relaxed">{post.content}</p>
    </div>
  );
};

export default PostDetail;
