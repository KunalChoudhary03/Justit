require("dotenv").config();
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user.model");

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

// Google Strategy
//passport.use is used to add a new strategy to passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(' Google profile received:', profile.displayName);
        const { displayName, emails, photos } = profile;
        const email = emails[0]?.value;
        const avatar = photos[0]?.value;

        if (!email) {
          return done(new Error('No email provided from Google'), null);
        }

        // Don't create user here, let the callback route handle it
        return done(null, profile);
      } catch (err) {
        console.error('Passport error:', err);
        done(err, null);
      }
    }
  )
);

// Serialize user (for session)
passport.serializeUser((user, done) => {
  done(null, user);
});

//  Deserialize user (for session)
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
