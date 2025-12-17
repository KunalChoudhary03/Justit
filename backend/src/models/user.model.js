const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password: { 
        type: String, 
        required: false, 
        sparse: true,  // this is used to allow multiple null values
        default: null
    }, 
    avatar:{
        type:String,
    },
    authType:{
        type:String,
        enum:["local", "google"],
        default:"local"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

// Create model
const User = mongoose.model("User", userSchema)

// Auto-drop old password index on connection
mongoose.connection.on('connected', async () => {
    try {
        const indexes = await User.collection.getIndexes();
        console.log(' Current indexes:', Object.keys(indexes));
        
        // Check if old password_1 index exists
        if (indexes.password_1) {
            console.log(' Dropping old password_1 index...');
            await User.collection.dropIndex('password_1');
            console.log(' Old password index dropped successfully');
        }
    } catch (err) {
        if (err.code === 27) {
            console.log(' Index does not exist (that\'s okay)');
        } else {
            console.error(' Error checking/dropping index:', err.message);
        }
    }
});

module.exports = User