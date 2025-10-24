const express = require('express');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.rotues")
const userRoutes = require("./routes/user.routes");
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use('/auth',authRoutes)
app.use('/user',userRoutes)
module.exports = app;

