/* IMPORTING MODULES */
const express = require("express");

const CourseController = require("../controllers/courses.controllers");

/* Validations */
const CourseValidator = require('../validators/courses.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Course
router.post('/addCourse', checkAuth, CourseValidator.addCourseValidator, CourseController.addCourse)

//Get Course Details
router.get('/course/:courseId', checkAuth, CourseValidator.getCourseByIdValidator, CourseController.getCourseById);

//update course details
router.post("/update/:courseId", checkAuth, CourseValidator.updateCourseByIdValidator, CourseController.updateCourseById);

//delte course by id
router.delete("/delete/:courseId", checkAuth, CourseValidator.getCourseByIdValidator, CourseController.deleteCourseById);

//get All details
router.get("/list", checkAuth, CourseController.enlistAllCourses)

module.exports = router;