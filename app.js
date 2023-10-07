//Dependencies
const express = require('express');

const morgan = require('morgan');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');

//Files
const Course = require('./models/course');
const AuthRoutes = require('./Routes/AuthRoutes');
const CourseRoutes = require('./Routes/courseRoutes')
const app = express();

//DB Connect/Run
const dbURI = "mongodb+srv://se09242001:test4@nodetuts.g7cmzow.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(3000))
.catch(err => console.log(err));

//App Settings
app.set('view engine','ejs');
app.use(express.static('Public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(morgan('dev'));
app.use((req,res, next) => {
    res.locals.path = req.path;
    next()
})

//Routes
app.use(AuthRoutes);
app.use(CourseRoutes);

//Home Page
app.get('/',(req,res)=>{
    res.render('index',{title:'Home',siteName:'A Class Coding'})
});

//404 Page Not Found catch all
app.use((req,res)=> {
    res.status(404).render('404',{title:'404:Page Not Found',siteName:'404:Page Not Found'})
});