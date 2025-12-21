const mongoose = require("mongoose")

const connectDb = async()=>{
try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to DataBase");
}
catch(error){
    console.log('Error',error);
    
}
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

module.exports =  connectDb