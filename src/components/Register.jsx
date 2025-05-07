import {useState} from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate=useNavigate();
 const HandleSubmit=async()=>{
   
if( Object.values(formData).some(value=>value==='')){
    alert('Fil all details');
}
else{ 
    try{
        const response = await axios.post('http://localhost:5000/users/register', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        if(response.status===201){
  navigate('/login');


        }
        }
    catch(err){
        console.log(err);
    }
}

 }
 const[formData,setFormData]=useState({
firstname:'',
lastname:'',
email:'',
password:'',

 })
const HandleChange=(e)=>{

    setFormData({
...formData,
[e.target.name]:e.target.value}
)
console.log(formData)

 }
    return (
   <>
  <div className='h-screen flex justify-center items-center'>
<div className="  p-6 h-2/3 flex flex-col justify-evenly bg-opacity-35 bg-white rounded-md">
<div className='w-full flex justify-center text-lg'>
<h1>Blogly</h1></div>
<h1>Create your account now</h1>
<div className='flex flex-row items-center'>
<div className='flex flex-col'>
<div>First Name</div>
<input placeholder='Enter your first name here' value={formData.firstname} name="firstname" onChange={HandleChange} className='border-2 p-2 rounded-md border-gray-400'></input> 
</div>
<div className='flex flex-col ml-3'>
<div>Last Name</div>
<input placeholder="Enter your last name here" value={formData.lastname} name="lastname" onChange={HandleChange} className='border-2 p-2 rounded-md border-gray-400'></input>
</div>
</div>
<div>Email</div>
<input placeholder="Enter your email here" onChange={HandleChange} name="email" value={formData.email}className='border-2 p-2 rounded-md border-gray-400' ></input>
<div>New Password</div>
<input placeholder="Enter your password here" onChange={HandleChange}  name="password" value={formData.password} className='border-2 p-2 rounded-md border-gray-400'></input>
<div>Confirm Password</div>
<input placeholder='Confirm your password here' className='border-2 p-2 rounded-md border-gray-400'></input>

<div className='flex w-full justify-center flex flex-col'>
<button  onClick={HandleSubmit} className="hover:bg-dark-blue hover:text-zinc-50 bg-blue w-24 h-10 rounded-md">Create</button>
<div>
<a className='hover:text-blue hover:underline 'onClick={()=>navigate('/register')}>New to Blogy? Sign up here</a></div>
</div>
</div>




  </div>
   
   
   </>
  )
}

export default Register