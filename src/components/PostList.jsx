
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { useContext } from 'react';
const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts/myposts', {
        withCredentials:true,

        
        });
        setPosts(response.data);
        console.log(posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (<>
  <div className=' bg-gray-900 w-screen h-screen p-3'>
     <h2 className=' font-bold text-xl text-white' >Blog Posts</h2>
    <div className="w-screen flex flex-row">
     
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
    </div>
    </> );
};

export default PostList;
