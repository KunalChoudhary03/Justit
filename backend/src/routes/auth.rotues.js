const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, adminPasskey } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Decide role
    const role = adminPasskey === process.env.ADMIN_PASS_KEY ? "admin" : "user";

    // Create user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    // Set cookie (use 'lax' for local dev cross-origin requests)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    // Response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



router.post("/login", async(req,res)=>{
  const existingToken = req.cookies.token;
  if (existingToken) {
  try {
    const decoded = jwt.verify(existingToken, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (user) {
      return res.status(200).json({ 
        message: "User already logged in",
        user: { id: user._id, email: user.email ,role: user.role},
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
    email:user.email,
    role:user.role
  },process.env.JWT_SECRET)
 res.cookie("token", token,{
  httpOnly: true,
  secure: false,
  sameSite: "none",
});

  res.status(200).json({
    message : "User logged in  successfully",
    user:{id:user._id,email:user.email,name:user.name,role:user.role},
    token
  })
})

router.post("/logout", async(req,res)=>{
  res.clearCookie("token",{
    secure:false
  })
  res.status(200).json({
    message: 'User log Out successfully'
  })
})

module.exports = router