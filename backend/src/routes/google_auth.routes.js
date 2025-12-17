const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Google login route
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false
  })
);

// Google OAuth callback
router.get('/google/callback', 
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${FRONTEND_URL}/login?error=google_auth_failed` 
  }),
  async (req, res) => {
    try {
      const profile = req.user;
      
      if (!profile || !profile.emails) {
        return res.redirect(`${FRONTEND_URL}/login?error=no_profile`);
      }
      
      const email = profile.emails[0]?.value;
      const displayName = profile.displayName;
      const avatar = profile.photos?.[0]?.value;

      if (!email) {
        return res.redirect(`${FRONTEND_URL}/login?error=no_email`);
      }
      
      // Create or update user
      let existingUser = await User.findOne({ email });
      
      if (!existingUser) {
        console.log(' Creating new Google user:', email);
        existingUser = await User.create({
          name: displayName,
          email,
          avatar,
          authType: 'google',
          password: null
        });
      } else {
        console.log(' Updating existing user:', email);
        // Update existing user
        if (existingUser.authType !== 'google') {
          existingUser.authType = 'google';
        }
        if (avatar) {
          existingUser.avatar = avatar;
        }
        await existingUser.save();
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '7d' }
      );
      
      console.log(' JWT token generated for:', email);
      
      // Redirect to frontend with token
      res.redirect(
        `${FRONTEND_URL}/?token=${token}&name=${encodeURIComponent(existingUser.name)}&email=${existingUser.email}`
      );
      
    } catch (error) {
      console.error(' Google auth error:', error);
      res.redirect(`${FRONTEND_URL}/login?error=google_auth_failed&msg=${error.message}`);
    }
  }
);

module.exports = router;

module.exports = router;
