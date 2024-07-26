const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    is_verified:{
        type: Number,
        default: 0
    },
    image:{
        type: String,
    }
})

const  User = mongoose.model("User", userSchema);

module.exports = User;