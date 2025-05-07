import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CheckLoggedIn,{  LoggedInContext } from './CheckLoggedIn';


export const MyProfile = () => {
  const {setisLoggedIn}=useContext(LoggedInContext);
  const navigate = useNavigate();
    const [Vvalue,setValue]=useState({
"firstname":"", 
"lastname":"", 
"email":""

    })

  

const logout = async () => {
  try {
   
    await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });
    setisLoggedIn(false);
    navigate('/register');
 
  } catch (error) {
    console.error('Logout failed', error);
  }
};

    const [isEditing,setIsEditing]=useState(false)
const EditDetails=()=>{
  setIsEditing(true)

  
}
const changeDetails=(e)=>{
setValue({...Vvalue,[e.target.name]:e.target.value})


}
const SubmitDetails=()=>{
  setIsEditing(false);
}

const fetchUsers=async()=>{

    try{
      
        const response=await axios.get('http://localhost:5000/users/dashboard', 
{
  withCredentials:true,
}
);
console.log(response.data);
setValue({
"firstname":response.data.userDetails.firstname,
"lastname":response.data.userDetails.lastname, 
"email":response.data.userDetails.email

})

}
catch(err){
    console.log(err)
}
}
useEffect(()=>{
  fetchUsers();
},[]);

    return (
   <>

  <h1 className='w-full max-w-full text-center text-6xl font-bold whitespace-nowrap static '>Welcome Back , {Vvalue.firstname}</h1>

<ul className='m-3 text-3xl mt-6 bg-light-blue p-10 lg:w-2/3 rounded-lg lg:m-52' >
<h1 className='w-full max-w-full text-center text-3xl font-bold whitespace-nowrap rounded-lg'>Find Your Details</h1>
{isEditing?(
  <div className="w-full flex flex-col items-center space-y-4">
    <ul className="w-full max-w-lg space-y-4">
   <li className="flex items-center w-full space-x-3 bg-slate-100 p-4 rounded-lg shadow-sm"><label className="flex-shrink-0 text-gray-700 font-semibold">First Name:</label><input 
                className="flex-1 bg-white p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 w-full" 
value={Vvalue.firstname} name="firstname" onChange={changeDetails} /></li>
  <li className="flex items-center w-full space-x-3 bg-slate-100 p-4 rounded-lg shadow-sm"><label className="flex-shrink-0 text-gray-700 font-semibold">Last Name:</label><input 
                className="flex-1 bg-white p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 w-full" 
                value={Vvalue.lastname} 
                name="lastname" 
                onChange={changeDetails}  /></li>
        <li className="flex items-center w-full space-x-3 bg-slate-100 p-4 rounded-lg shadow-sm"><label className="flex-shrink-0 text-gray-700 font-semibold">Email:</label>
            <input 
                className="flex-1 bg-white p-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 w-full" 
                value={Vvalue.email} 
                name="email" 
                onChange={changeDetails} 
            /> </li>
    </ul>

    <button 
        className="bg-blue-300 hover:bg-blue-700 text-black font-semibold py-2 px-6 rounded-md shadow-lg focus:outline-none"
        onClick={SubmitDetails}
    >
        Submit Details
    </button>
</div>

):
(
  <div className="w-full flex flex-col items-center space-y-4">
    <ul className="w-full max-w-lg space-y-4">
        <li className="flex items-center w-full space-x-3 p-4 rounded-lg border border-slate-200 shadow-sm">
            <label className="flex-shrink-0 text-gray-700 font-semibold">First Name:</label>
            <div className="flex-1 text-gray-800">{Vvalue.firstname}</div>
        </li>
        
        <li className="flex items-center w-full space-x-3 p-4 rounded-lg border border-slate-200 shadow-sm">
            <label className="flex-shrink-0 text-gray-700 font-semibold">Last Name:</label>
            <div className="flex-1 text-gray-800">{Vvalue.lastname}</div>
        </li>
        
        <li className="flex items-center w-full space-x-3 p-4 rounded-lg border border-slate-200 shadow-sm">
            <label className="flex-shrink-0 text-gray-700 font-semibold">Email:</label>
            <div className="flex-1 text-gray-800">{Vvalue.email}</div>
        </li>
    </ul>
    <button 
        className="bg-blue-400 hover:bg-blue-700 text-black font-semibold py-2 px-6 rounded-md shadow-lg focus:outline-none"
        onClick={EditDetails}
    >
        Edit Details
    </button>
</div>
)}

</ul>


<button className='mt-23 text-4xl font-semibold bg-zinc-400 p-3 rounded-md' onClick={logout}>Log Out</button>
   </>
  )
}
