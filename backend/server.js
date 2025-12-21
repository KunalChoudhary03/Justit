require('dotenv').config();

const express = require('express');
const app = require('./src/app.js'); 
const connectDb = require('./src/db/db.js');
const Payment = require('../models/Payment');

connectDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
