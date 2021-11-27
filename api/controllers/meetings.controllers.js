const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const MeetingModel = require("../models/meetings.models");
const EmployeeModel = require("../models/employees.models");
const DepartmentModel = require("../models/departments.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Meeting
 * @body {String} meetingName 
 */

const addMeeting = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { meetingName, meetingLocation, numOfPersons, employeeId,
      meetingType, departmentId,
      startDate, endDate, startTime, endTime,
      purpose, agenda, comments } = req.body;

    //check if employee id exist
    const employee = await EmployeeModel.getEmployeeById(employeeId);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    //check if department id exist
    const department = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(department)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Department Not found of this id"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      meetingName, meetingLocation, numOfPersons, _employeeId: employeeId,
      meetingType, _departmentId: departmentId,
      startDate, endDate, startTime, endTime,
      purpose, agenda, comments,
      _created_by: user._id
    }

    const meetingSaved = await MeetingModel.addMeeting(prepObj, {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,
      departmentName: `${department.departmentName}`

    });

    if (isEmpty(meetingSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Meeting is not saved yet"]

      })

    }

    prepObj["_departmentId"] = {

      departmentName: `${department.departmentName}`

    }

    prepObj["_employeeId"] = {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,

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

/**
 * @description This will get Meeting details by meeting id
 * @param {ObjectId} meetingId
 */
const getMeetingById = async (req, res, next) => {
  try {

    const { meetingId } = req.params;

    const meeting = await MeetingModel.getMeetingById(meetingId);

    if (isEmpty(meeting)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Meeting Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: meeting

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

const deleteMeetingById = async (req, res, next) => {
  try {

    const { meetingId } = req.params;

    const meeting = await MeetingModel.getMeetingById(meetingId);

    if (isEmpty(meeting)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Meeting Not found of this id"]

      })

    }

    const deletedMeetingCount = await MeetingModel.deleteMeetingById(meetingId);

    if (isEmpty(deletedMeetingCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Meeting is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedMeetingCount
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

const updateMeetingById = async (req, res, next) => {
  try {

    const { meetingId } = req.params;

    const meeting = await MeetingModel.getMeetingById(meetingId);

    if (isEmpty(meeting)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Meeting Not found of this id"]

      })

    }

    const { meetingName, meetingLocation, numOfPersons, employeeId,
      meetingType, departmentId,
      startDate, endDate, startTime, endTime,
      purpose, agenda, comments } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (meetingName) updateData["meetingName"] = meetingName;
    if (meetingType) updateData["meetingType"] = meetingType;
    if (meetingLocation) updateData["meetingLocation"] = meetingLocation;
    if (numOfPersons) updateData["numOfPersons"] = numOfPersons;
    if (startDate) updateData["startDate"] = startDate;
    if (endDate) updateData["endDate"] = endDate;
    if (startTime) updateData["startTime"] = startTime;
    if (endTime) updateData["endTime"] = endTime;
    if (purpose) updateData["purpose"] = purpose;
    if (agenda) updateData["agenda"] = agenda;
    if (comments) updateData["comments"] = comments;

    if (departmentId) {

      //check if department id exist
      const department = await DepartmentModel.getDepartmentById(departmentId);

      if (isEmpty(department)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Department Not found of this id"]

        })

      } else {

        updateData["_departmentId"] = departmentId

      }

    }

    if (employeeId) {

      //check if employee id exist
      const employee = await EmployeeModel.getEmployeeById(employeeId);

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_employeeId"] = employeeId

      }

    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedMeeting = await MeetingModel.updateMeetingById(meetingId, updateData);

    if (isEmpty(updatedMeeting)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Meeting is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedMeeting

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

const enlistAllMeetings = async (req, res, next) => {
  try {

    const meetings = await MeetingModel.enlistAllMeetings();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: meetings ? meetings.length : 0,
      payload: meetings

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

  addMeeting,
  getMeetingById,
  deleteMeetingById,
  updateMeetingById,
  enlistAllMeetings

};
