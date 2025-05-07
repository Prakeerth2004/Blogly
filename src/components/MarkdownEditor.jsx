/*
import React, { useState } from 'react';
import axios from 'axios';

const MarkdownEditor = () => {
  const [post, setPost] = useState({ title: '', content: '' });

  const handleChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/posts', post, {
       withCredentials:true,
      });
      alert('Post created successfully');
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <div className="editor-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={post.title} onChange={handleChange} required />
        <textarea name="content" placeholder="Write your post..." value={post.content} onChange={handleChange} required />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default MarkdownEditor; */
