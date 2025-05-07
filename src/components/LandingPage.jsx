import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate=useNavigate();
  return (
    <>
    <h1 className='lg:text-6xl font-extrabold m-20 mt-28 leading-[10rem]'>Where Ideas Take Flight – Welcome to Your Blog Hub!</h1>
   <div>
   <button className='text-4xl font-medium  bg-yellow-200 p-4 rounded-md border-4 border-gray-950 font-mono mt-52' onClick={()=>navigate('/new-post')}> START CREATING</button></div>
   
   <div className='mt-6 hover:underline'>
   <a href="/register">Dont have an account? Register Here</a></div>
    </>
  )
}

export default LandingPage