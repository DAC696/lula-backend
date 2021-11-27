const Course = require('../schemas/course');
const { sendCustomEvent } = require("../misc/helperFunctions");
const employee = require('../schemas/employee');

/**
 * @description This will create new course
 * @param {Object} course 
 */

const addCourse = async (course, eventObj) => {
    try {

        const newCourse = new Course(course);

        let courseCreated = await newCourse.save();

        //whenever new course is added then emit an event
        if (courseCreated && courseCreated) {

            sendCustomEvent("courseAdded", eventObj)

        }

        return courseCreated;

    } catch (error) {

        console.log(error)

    }
}

const getCourseById = async (courseId) => {
    try {

        const course = await Course.findOne({ _id: courseId })
            .lean()

        return course;

    } catch (error) {

        console.log(error);

    }
}

const updateCourseById = async (courseId, objToBeUpdated) => {
    try {

        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever  course is updated then emit an event
        if (updatedCourse && updatedCourse) {

            sendCustomEvent("courseUpdated", updatedCourse)

        }

        return updatedCourse;

    } catch (error) {

        console.log(error);

    }
}

const deleteCourseById = async (courseId) => {
    try {

        const deletedCourse = await Course.deleteOne({ _id: courseId })

        //whenever  course is deleted then emit an event
        if (deletedCourse && deletedCourse.deletedCount) {

            sendCustomEvent("courseDeleted", { courseId })

        }

        return deletedCourse.deletedCount;

    } catch (error) {

        console.log(error);

    }
}

const enlistAllCourses = async () => {
    try {

        const courses = await Course.find()
            .lean()

        return courses;

    } catch (error) {

        console.log(error);

    }
}

const getMandatoryCoursesByEmployeeRole = async (employeeRole) => {
    try {

        const courses = await Course.find({ courseType: employeeRole, isMandatory: true })
            .lean()

        return courses;

    } catch (error) {

        console.log(error);

    }
}

module.exports = {

    addCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    enlistAllCourses,
    getMandatoryCoursesByEmployeeRole

}