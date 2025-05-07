
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PostDetail from './PostDetail';
import PostList from './components/PostList';
import { LoggedInContext } from './components/CheckLoggedIn';
import './App.css';
import BlogList from './components/Explore';
import LandingPage from './components/LandingPage';
import { MyProfile } from './components/MyProfile';
import CreatePost from './components/CreatePost';

const App = () => {
  const {isLoggedIn}=useContext(LoggedInContext);
  return (
    <Router>
      <div className="App">
        {isLoggedIn?(
 <nav className="bg-gray-900 text-white p-4 w-full flex justify-between items-center shadow-md">
 <div className="text-3xl font-bold tracking-wide text-green-400 hover:text-green-300 transition-all duration-300 cursor-pointer">
   <a href="/">Blogly</a>
 </div>
 <div className="flex space-x-6">
   <a href="/new-post" className="px-4 py-2 rounded-md border border-green-500 hover:bg-green-500 transition-all duration-300">
     Create Post
   </a>
   <a href="/myposts" className="px-4 py-2 rounded-md border border-green-500 hover:bg-green-500 transition-all duration-300">
     My Posts
   </a>
   <a href="/explore" className="px-4 py-2 rounded-md border border-green-500 hover:bg-green-500 transition-all duration-300">
     Explore
   </a>
   <a href="/profile" className="px-4 py-2 rounded-md border border-green-500 hover:bg-green-500 transition-all duration-300">
     My Profile
   </a>
   <a href="/logout" className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-all duration-300">
     Logout
   </a>
 </div>
</nav>):(
              <nav className="bg-gray-900 text-white p-4 w-full flex justify-between items-center shadow-md flex">
              <div className="text-3xl font-bold tracking-wide text-green-400 hover:text-green-300 transition-all duration-300 cursor-pointer">
                <a href="/">Blogly</a>
              </div>
              <div className="flex space-x-4">
                <a
                  href="/login"
                  className="px-4 py-2 rounded-md border border-green-500 hover:bg-green-500 transition-all duration-300"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 transition-all duration-300"
                >
                  Register
                </a>
              </div>
            </nav>

        )}
        <Routes>
        <Route path="/profile" element={isLoggedIn === false ? <Navigate to="/login" /> : <MyProfile />} />
        <Route path="/posts/:id" element={<PostDetail/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/explore" element={<BlogList/>} />
          <Route path="/myposts" element={<PostList />} />
          <Route path="/new-post" element={isLoggedIn===true?<CreatePost/>:<Navigate to="/register"/>} />
          <Route path="/login" element={<Login/>}/>
       
        </Routes>
      </div>
    </Router>
  );
};

export default App;
