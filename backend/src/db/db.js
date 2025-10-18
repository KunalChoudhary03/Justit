const mongoose = require("mongoose")

try{
    await mongoose.connect("mongodb+srv://kunalchoudhary_03:of732AOr2xl94IsY@kunalchoudhary03.hgnetyf.mongodb.net/Database")
    console.log("Connected to DataBase");
}
catch(error){
    console.log('Error',error);
    
}