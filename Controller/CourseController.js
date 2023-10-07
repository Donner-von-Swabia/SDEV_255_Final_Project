const Course = require('../models/course');
const {requireAuth} = require('../Middleware/AuthMW');

module.exports.course_create_get = (req,res) =>{
    {
        res.render('createCourse',{title:'Create Course',siteName:'A Class Coding'})
    };
};

module.exports.course_create_post = (req,res) =>{
    {
        console.log(req.body);
        const course = new Course(req.body);
        course.save()
        .then(result =>{
            res.redirect('/teacher');
        })
        .catch((err)=>{
            console.log(err);
        })
    };
};

module.exports.updateCourse_get = (req,res) =>{
    const id = req.params.id;
    Course.findById(id)
    .then(result=>{
        res.render('updateCourse', {course:result,title:'Update',siteName:'A Class Coding: Teachers'});
    })
    .catch((err) => {
        console.log(err);
    })
};

module.exports.updateCourse_post = (req,res) => {
    const id = req.params.id;
    const name = req.body.CourseName;
    const number = req.body.CourseNumber;
    const des = req.body.CourseDescription;
    const ch = req.body.CreditHours;
    Course.findByIdAndUpdate(id,{
        CouseName:name,
        CourseNumber:number,
        CourseDescription: des,
        CreditHours: ch
    })
    .then(result =>{
        res.redirect('/teacher');
    })
    .catch((err)=>{
        console.log(err);
    })
};

module.exports.teacher_get = (req,res) =>{
    Course.find().sort({createAt: -1})
    .then(result=>{
        res.render('teacher',{course:result,title:'Teacher',siteName:'A Class Coding: Teachers'});
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports.teacher_details_get = (req,res) => {
    const id = req.params.id;
    Course.findById(id)
    .then(result=>{
        res.render('course', {course:result,title:'Teacher',siteName:'A Class Coding: Teachers'});
    })
    .catch((err) => {
        console.log(err);
    })
};

module.exports.teacher_details_delete = (req,res) =>{
    const id = req.params.id;
    Course.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/teacher'});
    })
    .catch((err) =>{
        console.log(err);
    })
};

module.exports.student_get = (req,res) => {
    res.render('student',{title:'Student',siteName:'A Class Coding: Students'})
};