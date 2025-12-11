const express = require('express');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const authRoutes = require("./routes/auth.rotues")
const userRoutes = require("./routes/user.routes");
const productroutes = require('./routes/productroutes');
const cartRoutes = require("./routes/cart.rotuer");
const googleAuthRoutes = require("./routes/google_auth.routes");
const passport = require("./config/passport");
const cors = require("cors");
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

// Body parser
app.use(express.json())
app.use(cookieParser());

// Express session middleware (REQUIRED for passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport initialization (MUST come after session middleware)
app.use(passport.initialize());
app.use(passport.session());

app.use('/product',productroutes)
app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/cart',cartRoutes)
app.use('/auth', googleAuthRoutes) 
module.exports = app;

