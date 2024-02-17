const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Enter a password'],
        minlength:[6,'Minimum password length is 6 chars'],
    }
})
const User = mongoose.model('user',userSchema)
module.exports = User;