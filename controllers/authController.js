const User = require('../model/User')

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let error = {email:'',password:''};
    //duplicate error code
    if(err.code ==  11000){
        error.email = "that email already exixsts"
        return error;
    }

    //validation
    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties}) => {
        error[properties.path] = properties.message
       })
    }
    return error;
}

const signup_get = (req,res) => {
    res.render('signup')
}
const signup_post = async(req,res) => {
    const {email,password} = req.body;

    try{
       const user = await User.create({email,password})
       res.status(201).json(user)
    }
    catch(err){
       let errors = handleErrors(err)
        res.status(400).json(errors)
    }
    res.send('new signup')
}
const login_get = (req,res) => {
    res.render('login')
}
const login_post = (req,res) => {
    const {email,password} = req.body;
    console.log(email,password);
    res.send('new login')
}
module.exports ={signup_get,signup_post,login_get,login_post}