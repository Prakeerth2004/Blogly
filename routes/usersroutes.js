import express from 'express'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import auth from '../middleware/auth.js';
const router=express.Router();

router.post("/register", 
    
    async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!(firstname && lastname && email && password)) {
      return res.status(400).send('All fields are compulsory');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const myEncPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: myEncPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    user.token = token;
    user.password = undefined;

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
try{
  res.clearCookie('token', {
    httpOnly: true
  });

  res.status(200).json({ message: 'Logged out successfully.' });
}catch(err){
  res.status(500).send('Server error');
}});


router.post("/login", async (req, res) => {
  try { 
   
    const { email, password } = req.body; 
    const user = await User.findOne({ email });
    if (!(email && password)) {
      return res.status(400).send('Send all data');
    }

      if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2y" }
      );

      user.token = token;
      user.password = undefined;
const options={
    expires:new Date(Date.now()+3*24*60*60*1000), 
    httpOnly:true
}; res.status(200).cookie("token",token,options)
.json({
        success: true,
        token,
        user,
      });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}); 
router.get('/dashboard',auth,async(req,res)=>{
try{
    console.log(req.user);
const userId=req.user.id 
const userDetails=await User.findById(userId).select('-password');   

res.json({
success:true,
userDetails,
}
);
}
catch(err){
    console.log(err)
}
});
router.get('/checkfortoken',(req,res)=>{
if(req.cookies.token){
  res.status(200).json({message:"Token Found"});

}
else{
  res.status(401).json({message:"Token not found"});
}

});

export default router;