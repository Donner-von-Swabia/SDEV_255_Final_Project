const { max } = require("lodash");
const User = require("../models/user");
const jwt = require('jsonwebtoken');





const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
  if(err.message === 'Incorrect Email Address'){
    errors.email = "Invalid email address"
  }
  if(err.message === 'Incorrect Password'){
    errors.password = "Invalid password"
  }
 
 
  if (err.code === 11000) {
    errors.email = 'Email address is already registered';
    return errors;
  }

  if (err.message.includes('user validation failed')) {

    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

const maxAge = 3*24*60*60;
const createToken =(id) =>{
  return jwt.sign({id},'Helios',{expiresIn:maxAge});
}


module.exports.signup_get = (req, res) => {
  res.render('signup',{title:'Signup',siteName:'A Class Coding'});
}

module.exports.login_get = (req, res) => {
  res.render('login', {title:'Login',siteName:'A Class Coding'});
}

module.exports.signup_post = async (req, res) => {
  const { email, password, IsTeacher } = req.body;

  try {
    const user = await User.create({ email, password, IsTeacher });
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    if(user.IsTeacher){
        res.cookie('Teacher', true, {httpOnly: true, maxAge: maxAge * 1000})
      }
    res.cookie('Id',user.id,{httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user : user._id});
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.login(email,password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    if(user.IsTeacher){
        res.cookie('Teacher', true, {httpOnly: true, maxAge: maxAge * 1000})
      }
    res.cookie('Id',user.id,{httpOnly: true, maxAge: maxAge * 1000})
    res.status(200).json({user : user._id})
    
  }
  catch (err){
    const errors = handleErrors(err);
    res.status(400).json({errors})
  }


}

module.exports.logout_get = (req,res) =>{
  res.cookie('jwt',"",{maxAge: 1})
  res.cookie('Teacher','',{maxAge:1})
  res.cookie('Id','',{maxAge:1})
  res.redirect('/')
}