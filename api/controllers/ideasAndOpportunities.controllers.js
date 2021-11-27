const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const IdeasAndOpportunityModel = require("../models/ideasAndOpportunities.models");
const EmployeeModel = require("../models/employees.models");
const DepartmentModel = require("../models/departments.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add IdeasAndOpportunity
 * @body {String} ideasAndOpportunityName 
 */

const addIdeasAndOpportunity = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { ideaTitle, ideaDate, description, employeeId,
      reasonForSuggestion, departmentId, opportunityArea,
      suggestedImprovements } = req.body;

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
      ideaTitle, ideaDate, description, _employeeId: employeeId,
      reasonForSuggestion, _departmentId: departmentId, opportunityArea,
      suggestedImprovements,
      _created_by: user._id
    }

    const ideasAndOpportunitySaved = await IdeasAndOpportunityModel.addIdeasAndOpportunity(prepObj, {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,
      departmentName: `${department.departmentName}`

    });

    if (isEmpty(ideasAndOpportunitySaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. IdeasAndOpportunity is not saved yet"]

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
 * @description This will get IdeasAndOpportunity details by ideasAndOpportunity id
 * @param {ObjectId} ideasAndOpportunityId
 */
const getIdeasAndOpportunityById = async (req, res, next) => {
  try {

    const { ideasAndOpportunityId } = req.params;

    const ideasAndOpportunity = await IdeasAndOpportunityModel.getIdeasAndOpportunityById(ideasAndOpportunityId);

    if (isEmpty(ideasAndOpportunity)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["IdeasAndOpportunity Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: ideasAndOpportunity

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

const deleteIdeasAndOpportunityById = async (req, res, next) => {
  try {

    const { ideasAndOpportunityId } = req.params;

    const ideasAndOpportunity = await IdeasAndOpportunityModel.getIdeasAndOpportunityById(ideasAndOpportunityId);

    if (isEmpty(ideasAndOpportunity)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["IdeasAndOpportunity Not found of this id"]

      })

    }

    const deletedIdeasAndOpportunityCount = await IdeasAndOpportunityModel.deleteIdeasAndOpportunityById(ideasAndOpportunityId);

    if (isEmpty(deletedIdeasAndOpportunityCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No IdeasAndOpportunity is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedIdeasAndOpportunityCount
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

const updateIdeasAndOpportunityById = async (req, res, next) => {
  try {

    const { ideasAndOpportunityId } = req.params;

    const ideasAndOpportunity = await IdeasAndOpportunityModel.getIdeasAndOpportunityById(ideasAndOpportunityId);

    if (isEmpty(ideasAndOpportunity)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["IdeasAndOpportunity Not found of this id"]

      })

    }

    const { ideaTitle, ideaDate, description, employeeId,
      reasonForSuggestion, departmentId, opportunityArea,
      suggestedImprovements } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (ideaDate) updateData["ideaDate"] = ideaDate;
    if (ideaTitle) updateData["ideaTitle"] = ideaTitle;
    if (description) updateData["description"] = description;
    if (reasonForSuggestion) updateData["reasonForSuggestion"] = reasonForSuggestion;
    if (opportunityArea) updateData["opportunityArea"] = opportunityArea;
    if (suggestedImprovements) updateData["suggestedImprovements"] = suggestedImprovements;

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

    const updatedIdeasAndOpportunity = await IdeasAndOpportunityModel.updateIdeasAndOpportunityById(ideasAndOpportunityId, updateData);

    if (isEmpty(updatedIdeasAndOpportunity)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. IdeasAndOpportunity is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedIdeasAndOpportunity

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

const enlistAllIdeasAndOpportunities = async (req, res, next) => {
  try {

    const ideasAndOpportunities = await IdeasAndOpportunityModel.enlistAllIdeasAndOpportunities();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: ideasAndOpportunities ? ideasAndOpportunities.length : 0,
      payload: ideasAndOpportunities

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

  addIdeasAndOpportunity,
  getIdeasAndOpportunityById,
  deleteIdeasAndOpportunityById,
  updateIdeasAndOpportunityById,
  enlistAllIdeasAndOpportunities

};
