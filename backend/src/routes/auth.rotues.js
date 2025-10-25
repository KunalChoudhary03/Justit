const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register',async(req,res)=>{
  try{
  const{name,email,password} = req.body
  const existingUser = await userModel.findOne({email})
  if(existingUser){
    return res.status(400).json({
      message:"user already exists"
    })
  }
 const hashPassword = await bcrypt.hash(password,10)

  const user  =  await userModel.create({
    name,
    email,
    password:hashPassword
  })
  
  res.status(201).json({
   message:"user created successfully",
   user:{ id: user._id,name:user.name, email: user.email},
   token: jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
   
  })
  res.cookie("token",token);
}
catch(error){
  return res.status(500).json({
    message:error
  })
  }

})

router.post("/login", async(req,res)=>{
  const existingToken = req.cookies.token;
  if (existingToken) {
  try {
    const decoded = jwt.verify(existingToken, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (user) {
      return res.status(200).json({ 
        message: "User already logged in",
        user: { id: user._id, email: user.email },
        token: existingToken,
        name:user.name
      });
    }
  } catch (error) {
    res.clearCookie("token");
  }
}

  const {email,password} = req.body;
  const user  = await userModel.findOne({email: email})
  if(!user){
    return res.status(401).json({
      message: "Invalid user"
    })
  }
  const isPassValid = await bcrypt.compare(password,user.password)
  
  if(!isPassValid){
    return res.status(401).json({
      message :"Invalid password"
    })
  }
  const token = jwt.sign({
    id:user._id,
    email:user.email
  },process.env.JWT_SECRET)
 res.cookie("token", token,{
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});

  res.status(200).json({
    message : "User logged in  successfully",
    user:{id:user._id,email:user.email,name:user.name},
    token
  })
})

router.post("/logout", async(req,res)=>{
  res.clearCookie("token",{
    secure:true
  })
  res.status(200).json({
    message: 'User log Out successfully'
  })
})

module.exports = router