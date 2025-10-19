const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')

router.post('/register',async(req,res)=>{
  const{username,password} = req.body

  const user  =  await userModel.create({
    username,password
  })
  res.status(201).json({
   message:"user created successfully",
   user
  })
})
module.exports = router