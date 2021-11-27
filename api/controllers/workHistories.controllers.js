const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { isEmpty } = require("../../utils/custom.validator")
const WorkHistoryModel = require("../models/workHistories.models");
const LocationModel = require("../models/locations.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");
const { update } = require("../schemas/user");

/**
 * @description let user add WorkHistory
 */

const addWorkHistory = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { employeeId } = req.params;

    const employee = await EmployeeModel.getEmployeeById(employeeId);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    const { locationId, startDate, endDate, isPresent, description } = req.body;

    const location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    //prepare object for storing workHistory in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      startDate,
      endDate,
      isPresent,
      description,
      _employeeId: employeeId,
      _locationId: locationId,
      _created_by: user._id
    }

    const workHistorySaved = await WorkHistoryModel.addWorkHistory(prepObj, {
      locName: location.locName,
      locId: location.locId

    });

    if (isEmpty(workHistorySaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. WorkHistory is not saved yet"]

      })

    }

    prepObj["_locationId"] = {
      locName: location.locName,
      locId: location.locId
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

const updateWorkHistoryById = async (req, res, next) => {
  try {

    const { workHistoryId } = req.params;

    const workHistory = await WorkHistoryModel.getWorkHistoryById(workHistoryId);

    if (isEmpty(workHistory)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["WorkHistory Not found of this id"]

      })

    }

    const { locationId, isPresent, startDate, endDate, description } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (locationId) {

      const location = await LocationModel.getLocationById(locationId);

      if (isEmpty(location)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Location Not found of this id"]

        })

      } else {

        updateData["_locationId"] = locationId

      }

    }

    if (!isEmpty(isPresent)) updateData["isPresent"] = isPresent;
    if (startDate) updateData["startDate"] = startDate;
    if (endDate) updateData["endDate"] = endDate;
    if (description) updateData["description"] = description;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedWorkHistory = await WorkHistoryModel.updateWorkHistoryById(workHistoryId, updateData);

    if (isEmpty(updatedWorkHistory)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. WorkHistory is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedWorkHistory

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

const deleteWorkHistoryById = async (req, res, next) => {
  try {

    const { workHistoryId } = req.params;

    const workHistory = await WorkHistoryModel.getWorkHistoryById(workHistoryId);

    if (isEmpty(workHistory)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["WorkHistory Not found of this id"]

      })

    }

    const deletedWorkHistoryCount = await WorkHistoryModel.deleteWorkHistoryById(workHistoryId);

    if (isEmpty(deletedWorkHistoryCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No WorkHistory is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedWorkHistoryCount
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

module.exports = {

  addWorkHistory,
  updateWorkHistoryById,
  deleteWorkHistoryById

};
