const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const CourseModel = require("../models/courses.models");
const TrainingModel = require("../models/trainings.models");
const { StatusCodes } = require("http-status-codes");


/**
 * @description let user add Course
 * @body {String} courseName 
 */

const addCourse = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    let { courseName, courseType, isMandatory, validDate, expiryDate } = req.body;

    //prepare object for storing user in db
    const prepObj = {

      _id: mongoose.Types.ObjectId(),
      courseName,
      courseType,
      isMandatory,
      validDate,
      expiryDate,
      _created_by: user._id

    }

    let courseSaved = await CourseModel.addCourse(prepObj);

    if (isEmpty(courseSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Course is not saved yet"]

      })

    }


    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: courseSaved

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

/**
 * @description This will get Course details by course id
 * @param {ObjectId} courseId
 */
const getCourseById = async (req, res, next) => {
  try {

    const { courseId } = req.params;

    const course = await CourseModel.getCourseById(courseId);

    if (isEmpty(course)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Course Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: course

    })

  } catch (error) {

    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const deleteCourseById = async (req, res, next) => {
  try {

    const { courseId } = req.params;

    const course = await CourseModel.getCourseById(courseId);

    if (isEmpty(course)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Course Not found of this id"]

      })

    }

    const deletedCourseCount = await CourseModel.deleteCourseById(courseId);

    if (isEmpty(deletedCourseCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Course is deleted"]

      })

    }

    const trainingsDeleted = await TrainingModel.deleteTrainingsByCourseId(courseId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedCourseCount
      }

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const updateCourseById = async (req, res, next) => {
  try {

    const { courseId } = req.params;

    const course = await CourseModel.getCourseById(courseId);

    if (isEmpty(course)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Course Not found of this id"]

      })

    }

    let { courseName, courseType, isMandatory, validDate, expiryDate } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (courseName) updateData["courseName"] = courseName;
    if (courseType) updateData["courseType"] = courseType;
    if (!isEmpty(isMandatory)) updateData["isMandatory"] = isMandatory;
    if (validDate) updateData["validDate"] = validDate;
    if (expiryDate) updateData["expiryDate"] = expiryDate;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedCourse = await CourseModel.updateCourseById(courseId, updateData);

    if (isEmpty(updatedCourse)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Course is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedCourse

    })

  } catch (error) {

    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const enlistAllCourses = async (req, res, next) => {
  try {

    const courses = await CourseModel.enlistAllCourses();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: courses ? courses.length : 0,
      payload: courses

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

module.exports = {

  addCourse,
  getCourseById,
  deleteCourseById,
  updateCourseById,
  enlistAllCourses

};
