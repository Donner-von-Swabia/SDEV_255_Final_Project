const { Router } = require('express');
const router = Router();
const courseController = require('../Controller/CourseController')

//Create Course
router.get('/create_course', courseController.course_create_get)
router.post('/create_course', courseController.course_create_post)

//Update Course
router.get('/updateCourse/:id', courseController.updateCourse_get)
router.post('/updateCourse/:id', courseController.updateCourse_post)

//Teacher Page
router.get('/teacher', courseController.teacher_get)
router.get('/teacher/:id', courseController.teacher_details_get)
router.delete('/teacher/:id', courseController.teacher_details_delete)

//Student Page
router.get('/student',courseController.student_get)


module.exports = router;