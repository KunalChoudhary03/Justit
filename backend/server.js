const express = require("express");
const connectDb = require("./src/db/db");
const app = express();

connectDb();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
    
})