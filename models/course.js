const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    CourseName:{
        type: String,
        required: true
    },
    CourseNumber:{
        type: String,
        required: true
    },
    CourseDescription:{
        type: String,
        required: false
    }},{timestamps:true});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
