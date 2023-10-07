const { Router } = require('express');
const router = Router();
const courseController = require('../Controller/CourseController')
const {TeacherAuth,StudentAuth} = require('../Middleware/AuthMW')

//Create Course
router.get('/create_course',TeacherAuth, courseController.course_create_get)
router.post('/create_course',TeacherAuth, courseController.course_create_post)

//Update Course
router.get('/updateCourse/:id',TeacherAuth, courseController.updateCourse_get)
router.post('/updateCourse/:id',TeacherAuth, courseController.updateCourse_post)

//Teacher Page
router.get('/teacher',TeacherAuth, courseController.teacher_get)
router.get('/teacher/:id',TeacherAuth, courseController.teacher_details_get)
router.delete('/teacher/:id',TeacherAuth, courseController.teacher_details_delete)

//Student Page
router.get('/student',StudentAuth,courseController.student_get)


module.exports = router;