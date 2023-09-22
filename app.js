const express = require('express');
const app = express();
app.set('view engine','ejs');
app.listen(3000);
app.get('/',(req,res)=>{
    res.render('index',{title:'Home',siteName:'A Class Coding'})
});

app.get('/teacher',(req,res)=>{
    res.render('teacher',{title:'Teacher',siteName:'A Class Coding: Teachers'})
});

app.get('/student',(req,res)=>{
    res.render('student',{title:'Student',siteName:'A Class Coding: Students'})
});

app.get('/super',(req,res)=>{
    res.render('super',{title:'Super',siteName:'Super'})
});

app.use((req,res)=> {
    res.status(404).render('404',{title:'404:Page Not Found',siteName:'404:Page Not Found'})
});