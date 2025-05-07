import React from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
 
 
 
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 w-80 min-h-64 mt-4 mr-4 border border-gray-200 hover:-translate-y-1 transform">
      <h3 className="text-2xl font-extrabold text-gray-800 mb-2 hover:text-green-600 transition-colors duration-300 leading-tight">
        {post.title}
      </h3>
      <p className="text-gray-700 text-md leading-relaxed mb-4 line-clamp-3">
        {post.description}
      </p>
      <div className="text-gray-500 text-sm mb-4">
        By <span className="font-semibold text-gray-800">{post.author.firstname} {post.author.lastname}</span>
      </div>
      <button   onClick={handleReadMore} className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg">
        Read More
      </button>
    </div>
  );
};

export default Post;


