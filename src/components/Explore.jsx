import { useEffect, useState } from 'react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts/allposts')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging step
        if (Array.isArray(data)) {
          setBlogs(data); // Ensure only arrays are stored
        } else {
          setBlogs([]); // Default to an empty array if response is not an array
          console.error('Unexpected API response:', data);
        }
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        setBlogs([]); // Prevents `map` from running on non-array values
      });
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No posts available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <small>By {blog.author?.firstname} {blog.author?.lastname} ({blog.author?.email})</small>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
