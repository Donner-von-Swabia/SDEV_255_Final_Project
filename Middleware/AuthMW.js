//Dependencies
const jwt = require('jsonwebtoken');

//Teacher Auth Middleware checks jwt and cookie for teacher
const TeacherAuth = (req, res, next) =>{
    const IsTeacher = req.cookies.Teacher;
    const token = req.cookies.jwt;
    
    if (token){
        jwt.verify(token,"Helios", (err, decodedToken) =>{
            if (err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                if (IsTeacher){
                    console.log(decodedToken);
                    next();
                }
                else{
                    console.log('Not a teacher')
                    res.redirect('/login');
                }
                
            }
        });
    }
    else{
        res.render('login',{title:'Login',siteName:'A Class Coding'});
    };
};
//Student Auth Middleware only checks for valid user 
// Technically teachers can see student page
const StudentAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    
    if (token){
        jwt.verify(token,"Helios", (err, decodedToken) =>{
            if (err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }});}
    else{
        res.render('login',{title:'Login',siteName:'A Class Coding'});
    };
};
module.exports = {TeacherAuth,StudentAuth}