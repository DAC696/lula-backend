const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const TrainingModel = require("../models/trainings.models");
const CourseModel = require("../models/courses.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Training
 */

const addTraining = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { employeeId } = req.params;

    const { courseId, validDate, expiryDate  } = req.body;

    const course = await CourseModel.getCourseById(courseId);

    if (isEmpty(course)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Course Not found of this id"]

      })

    }

    //prepare object for storing training in db
    const prepObj = {

      _id: mongoose.Types.ObjectId(),
      _courseId: courseId,
      trainingStatus: "Outstanding",
      validDate,
      expiryDate,
      _employeeId: employeeId,
      _created_by: user._id

    }

    const trainingSaved = await TrainingModel.addTraining(prepObj, {

      courseName: course.courseName,
      courseType: course.courseType,
      isMandatory: course.isMandatory,
      // validDate: course.validDate,
      // expiryDate: course.expiryDate

    });

    if (isEmpty(trainingSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Training is not saved yet"]

      })

    }

    prepObj["_courseId"] = {
      courseName: course.courseName,
      courseType: course.courseType,
      isMandatory: course.isMandatory,
      // validDate: course.validDate,
      // expiryDate: course.expiryDate

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: prepObj

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

const updateTrainingById = async (req, res, next) => {
  try {

    const { trainingId } = req.params;

    const training = await TrainingModel.getTrainingById(trainingId);

    if (isEmpty(training)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Training Not found of this id"]

      })

    }

    const { trainingStatus, validDate, expiryDate } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (trainingStatus) updateData["trainingStatus"] = trainingStatus;
    if (validDate) updateData["validDate"] = validDate;
    if (expiryDate) updateData["expiryDate"] = expiryDate;
    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedTraining = await TrainingModel.updateTrainingById(trainingId, updateData);

    if (isEmpty(updatedTraining)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Training is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedTraining

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

const getTrainingListByEmployeeId = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const employee = EmployeeModel.getEmployeeById(employeeId);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    const trainings = await TrainingModel.getTrainingListByEmployeeId(employeeId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: trainings ? trainings.length : 0,
      payload: trainings

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

  addTraining,
  updateTrainingById,
  getTrainingListByEmployeeId

};
