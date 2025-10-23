const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userModel = require('../models/user.model')

router.get('/profile',authMiddleware, async (req,res)=> {
    const user = await userModel.findById(req.user.id).select('-password');
    res.status(200).json({user});
});

module.exports = router;