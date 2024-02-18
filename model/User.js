const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');

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
//bcrypt used for encryption
//fire func after doc is saved to db
userSchema.post('save',function(doc,next){
console.log('new user created and saved ',doc)
next();
})
//fire func before doc is saved to db
userSchema.pre('save',async function(next){
//console.log("user about to be created",this)
const salt = await bcrypt.genSalt();
this.password = await bcrypt.hash(this.password,salt)
next()
})

const User = mongoose.model('user',userSchema)
module.exports = User;