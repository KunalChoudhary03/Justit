const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register',async(req,res)=>{
  try{
  const{email,password} = req.body
  const existingUser = await userModel.findOne({email})
  if(existingUser){
    return res.status(400).json({
      message:"user already exists"
    })
  }
 const hashPassword = await bcrypt.hash(password,10)

  const user  =  await userModel.create({
    email,
    password:hashPassword
  })
  
  res.status(201).json({
   message:"user created successfully",
   user:{ id: user._id, email: user.email}
  })
}
catch(error){
  return res.status(500).json({
    message:error
  })
  }

})

router.post("/login", async(req,res)=>{
  const {username,password} = req.body;
  const user  = await userModel.findOne({username: username})
  if(!user){
    return res.status(401).json({
      message: "Invalid user"
    })
  }
  const isPassValid = password === user.password
  if(!isPassValid){
    return res.status(401).json({
      message :"Invalid password"
    })
  }
  res.status(401).json({
    message : "User loggin successfully",
    user
  })
})

router.post("/logout", async(req,res)=>{

})

module.exports = router