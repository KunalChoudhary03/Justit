const mongoose = require('mongoose');

async function connectDb(){
try{
    await mongoose.connect("mongodb+srv://kunalchoudhary_03:of732AOr2xl94IsY@kunalchoudhary03.hgnetyf.mongodb.net/Database")
    console.log('Connected to database');
}
catch(error){
    console.log('Error',error);
}
}
module.exports =  connectDb