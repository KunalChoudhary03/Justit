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

// Get environment variables
const FRONTEND_URL = process.env.FRONTEND_URL  || "http://localhost:5173";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === 'production';

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://justit-two.vercel.app',
  'https://justit-yyzo.onrender.com'
];

app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(` CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Express session middleware (REQUIRED for passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key_12345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // true on HTTPS only
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? '.onrender.com' : undefined,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization (MUST come after session middleware)
app.use(passport.session());
app.use(passport.initialize());

// Routes
app.use('/product', productroutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', googleAuthRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend is running',
    environment: NODE_ENV,
    frontendUrl: FRONTEND_URL
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(' Error:', err.message);
  res.status(500).json({ 
    message: 'Server error', 
    error: isProduction ? 'Internal server error' : err.message 
  });
});

module.exports = app;

