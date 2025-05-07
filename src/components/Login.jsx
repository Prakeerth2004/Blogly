import React, { useEffect } from 'react'
import { useState,useContext } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LoggedInContext } from "./CheckLoggedIn";


const Login = () => {

  const {setisLoggedIn}=useContext(LoggedInContext);
  const navigate=useNavigate();
const [LoginForm,setLoginForm]=useState(
 {"email":'',
    "password":''
}
)
const HandleInput=(e)=>{
setLoginForm({...LoginForm,[e.target.name]:e.target.value})

}

const handleSubmit=async()=>{
  try{
const response=await axios.post("http://localhost:5000/users/login",  LoginForm,{
headers:{
'Content-type':'application/json',
},
withCredentials: true
}
)
if(response.status==200){

console.log(response.data.token)
localStorage.setItem('token', response.data.token);
setisLoggedIn(true);

  localStorage.setItem("isLoggedIn", "true");
navigate('/')}
else{
  alert('Please Enter valid credentials')
}

}catch(err){
  console.log(err)
 
}}
  useEffect(()=>{
console.log(LoginForm)

  },[LoginForm]
)
  
  return (
   <>
   <div className='  flex justify-center items-center h-screen '>
   <div className='border-orange bg-opacity-35  bg-white border-2 rounded-md p-5 h-96 flex flex-col justify-evenly w-3/6 lg:w-1/4 '>
    
   <h1 className='text-center font-bold text-3xl'>Sign In</h1>
   <div>Email Address </div>
   <input className='border-2 p-2 rounded-md border-gray-400' placeholder='Email Address ' name="email" value={LoginForm.email} onChange={HandleInput}></input>
   <div>Password</div>
    <input className='border-2 p-2 rounded-md border-gray-400' placeholder="Enter your password" name="password" value={LoginForm.password} onChange={HandleInput}></input>
<div className='flex w-full justify-center'>
    <button onClick={handleSubmit} className="hover:bg-dark-blue hover:text-zinc-50 bg-blue w-24 h-10 rounded-md"> Sign In</button>
    </div>
<div>
<a className='hover:text-blue hover:underline 'onClick={()=>navigate('/register')}>New to Blogy? Sign up here</a></div>
</div>

</div>
   </>
  )
}

export default Login