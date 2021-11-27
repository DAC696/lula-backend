const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const SafetyObservationModel = require("../models/safetyObservations.models");
const EmployeeModel = require("../models/employees.models");
const DepartmentModel = require("../models/departments.models");
const RoleModel = require("../models/roles.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add SafetyObservation
 * @body {String} safetyObservationName 
 */

const addSafetyObservation = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { observationTitle, observationDate, observationType, employeeId,
      uaOrUc, departmentId, workArea,
      riskRating, responsibleJobTitle, whatDidYouSee,
      whatDidYouDo, whatDidYouRecommend } = req.body;

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

    //responsibleJobTitle is a Role ID
    const role = await RoleModel.getRoleById(responsibleJobTitle);

    if (isEmpty(role)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {

      _id: mongoose.Types.ObjectId(),
      observationTitle, observationDate, observationType,
      _employeeId: employeeId,
      uaOrUc,
      _departmentId: departmentId,
      workArea,
      riskRating, responsibleJobTitle, whatDidYouSee,
      whatDidYouDo, whatDidYouRecommend,
      _created_by: user._id

    }

    const safetyObservationSaved = await SafetyObservationModel.addSafetyObservation(prepObj, {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,
      departmentName: `${department.departmentName}`,
      roleName: role.roleName

    });

    if (isEmpty(safetyObservationSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. SafetyObservation is not saved yet"]

      })

    }

    prepObj["_departmentId"] = {

      departmentName: `${department.departmentName}`

    }

    prepObj["_employeeId"] = {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,

    }

    prepObj["responsibleJobTitle"] = {

      roleName: role.roleName

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
 * @description This will get SafetyObservation details by safetyObservation id
 * @param {ObjectId} safetyObservationId
 */
const getSafetyObservationById = async (req, res, next) => {
  try {

    const { safetyObservationId } = req.params;

    const safetyObservation = await SafetyObservationModel.getSafetyObservationById(safetyObservationId);

    if (isEmpty(safetyObservation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["SafetyObservation Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: safetyObservation

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

const deleteSafetyObservationById = async (req, res, next) => {
  try {

    const { safetyObservationId } = req.params;

    const safetyObservation = await SafetyObservationModel.getSafetyObservationById(safetyObservationId);

    if (isEmpty(safetyObservation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["SafetyObservation Not found of this id"]

      })

    }

    const deletedSafetyObservationCount = await SafetyObservationModel.deleteSafetyObservationById(safetyObservationId);

    if (isEmpty(deletedSafetyObservationCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No SafetyObservation is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedSafetyObservationCount
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

const updateSafetyObservationById = async (req, res, next) => {
  try {

    const { safetyObservationId } = req.params;

    const safetyObservation = await SafetyObservationModel.getSafetyObservationById(safetyObservationId);

    if (isEmpty(safetyObservation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["SafetyObservation Not found of this id"]

      })

    }

    const { observationTitle, observationDate, observationType, employeeId,
      uaOrUc, departmentId, workArea,
      riskRating, responsibleJobTitle, whatDidYouSee,
      whatDidYouDo, whatDidYouRecommend } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (observationTitle) updateData["observationTitle"] = observationTitle;
    if (observationType) updateData["observationType"] = observationType;
    if (observationDate) updateData["observationDate"] = observationDate;
    if (uaOrUc) updateData["uaOrUc"] = uaOrUc;
    if (workArea) updateData["workArea"] = workArea;
    if (riskRating) updateData["riskRating"] = riskRating;
    if (responsibleJobTitle) updateData["responsibleJobTitle"] = responsibleJobTitle;
    if (whatDidYouRecommend) updateData["whatDidYouRecommend"] = whatDidYouRecommend;
    if (whatDidYouSee) updateData["whatDidYouSee"] = whatDidYouSee;
    if (whatDidYouDo) updateData["whatDidYouDo"] = whatDidYouDo;

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

    const updatedSafetyObservation = await SafetyObservationModel.updateSafetyObservationById(safetyObservationId, updateData);

    if (isEmpty(updatedSafetyObservation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. SafetyObservation is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedSafetyObservation

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

const enlistAllSafetyObservations = async (req, res, next) => {
  try {

    const safetyObservations = await SafetyObservationModel.enlistAllSafetyObservations();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: safetyObservations ? safetyObservations.length : 0,
      payload: safetyObservations

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

  addSafetyObservation,
  getSafetyObservationById,
  deleteSafetyObservationById,
  updateSafetyObservationById,
  enlistAllSafetyObservations

};
