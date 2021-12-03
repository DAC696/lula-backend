const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const AppraisalModel = require("../models/appraisals.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Appraisal
 */

const addAppraisal = async (req, res, next) => {
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

    const {  startDate, endDate, appraisalType, appraisalDetails } = req.body;

    //prepare object for storing appraisal in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      // appraisalTitle,
      appraisalFirstName:employee.firstName,
      appraisalLastName:employee.lastName,
      _locationId:employee._locationId,
      startDate,
      endDate,
      _roleId:employee._roleId,
      appraisalType,
      appraisalDetails,
      _employeeId: employeeId,
      _created_by: user._id
    }

    const appraisalSaved = await AppraisalModel.addAppraisal(prepObj);

    if (isEmpty(appraisalSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Appraisal is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: appraisalSaved

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

const deleteAppraisalById = async (req, res, next) => {
  try {

    const { appraisalId } = req.params;

    const appraisal = await AppraisalModel.getAppraisalById(appraisalId);

    if (isEmpty(appraisal)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["appraisal Not found of this id"]

      })

    }

    const deletedAppraisalCount = await AppraisalModel.deleteAppraisalById(appraisalId);

    if (isEmpty(deletedAppraisalCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Appraisal is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedAppraisalCount
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

const enlistAllAppraisals = async (req, res, next) => {
  try {

    const appraisals = await AppraisalModel.enlistAllAppraisals();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: appraisals ? appraisals.length : 0,
      payload: appraisals

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

  addAppraisal,
  deleteAppraisalById,
  enlistAllAppraisals

};
