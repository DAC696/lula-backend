const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const SalaryCalculatorModel = require("../models/salaryCalculators.models");
const { StatusCodes } = require("http-status-codes");
const EmployeeModel = require("../models/employees.models");
const moment = require('moment')

/**
 * @description let user add SalaryCalculator
 * @body {Array} salaryCalculator array
 */

const addSalaryCalculator = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { salaries } = req.body;

    const salarySavedArr = []

    for (const salary of salaries) {

      const { code, startDate, endDate, employeeId, dates } = salary;

      const employee = await EmployeeModel.getEmployeeById(employeeId)

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Id does not Exist"]

        })

      }

      const prepObj = {
        _id: mongoose.Types.ObjectId(),
        code, 
        startDate:moment(startDate).toDate(),
         endDate: moment(endDate).toDate(),
        dates,
        _employeeId: employeeId,
        _created_by: user._id
      }

      const salaryCalculatorSaved = await SalaryCalculatorModel.addSalaryCalculator(prepObj, {
        firstName: employee.firstName,
        lastName: employee.lastName
      });

      salarySavedArr.push(salaryCalculatorSaved)

      if (!salaryCalculatorSaved) {

        return res.status(StatusCodes.BAD_GATEWAY).json({

          success: false,
          hasError: true,
          error: ["This SalaryCalculator not saved"]

        })

      }

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: salarySavedArr

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
 * @description This will get SalaryCalculator details by salaryCalculator id
 * @param {ObjectId} salaryCalculatorId
 */
const getSalaryCalculatorById = async (req, res, next) => {
  try {

    const { salaryCalculatorId } = req.params;

    const salaryCalculator = await SalaryCalculatorModel.getSalaryCalculatorById(salaryCalculatorId);

    if (isEmpty(salaryCalculator)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["SalaryCalculator Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: salaryCalculator

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

const deleteSalaryCalculatorById = async (req, res, next) => {
  try {

    const { salaryCalculatorId } = req.params;

    const salaryCalculator = await SalaryCalculatorModel.getSalaryCalculatorById(salaryCalculatorId);

    if (isEmpty(salaryCalculator)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["SalaryCalculator Not found of this id"]

      })

    }

    const deletedSalaryCalculatorCount = await SalaryCalculatorModel.deleteSalaryCalculatorById(salaryCalculatorId);

    if (isEmpty(deletedSalaryCalculatorCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No SalaryCalculator is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedSalaryCalculatorCount
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

const updateSalaryCalculatorById = async (req, res, next) => {
  try {

    const { salaryCalculatorId } = req.params;

    const salaryCalculator = await SalaryCalculatorModel.getSalaryCalculatorById(salaryCalculatorId);

    if (isEmpty(salaryCalculator)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["SalaryCalculator Not found of this id"]

      })

    }

    const { code, startDate, endDate, status, employeeId, dates } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (code) updateData["code"] = code;
    if (startDate) updateData["startDate"] = startDate;
    if (endDate) updateData["endDate"] = endDate;
    if(dates !== undefined && Array.isArray(dates)) updateData["dates"] = dates

    if (employeeId) {

      const employee = await EmployeeModel.getEmployeeById(employeeId)

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Id does not Exist"]

        })

      } else {

        updateData["_employeeId"] = employeeId;

      }
    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedSalaryCalculator = await SalaryCalculatorModel.updateSalaryCalculatorById(salaryCalculatorId, updateData);

    if (isEmpty(updatedSalaryCalculator)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. SalaryCalculator is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedSalaryCalculator

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

const enlistAllSalaryCalculators = async (req, res, next) => {
  try {

    const salaryCalculators = await SalaryCalculatorModel.enlistAllSalaryCalculators();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: salaryCalculators ? salaryCalculators.length : 0,
      payload: salaryCalculators

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

const enlistAllSalaryCalculatorsByEmployeeId = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const salaryCalculators = await SalaryCalculatorModel.enlistAllSalaryCalculatorsByEmployeeId(employeeId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: salaryCalculators ? salaryCalculators.length : 0,
      payload: salaryCalculators

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

const getSalaryCalculatorByType = async (req, res, next) => {
  try
  {
    const { type, locationId, startDate, endDate, employeeId, } = req.body;

    const salaryCalculators = await SalaryCalculatorModel.enlistAllSalaryCalculatorsByType(req.body);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: salaryCalculators ? salaryCalculators.length : 0,
      payload: salaryCalculators

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

  addSalaryCalculator,
  getSalaryCalculatorById,
  deleteSalaryCalculatorById,
  updateSalaryCalculatorById,
  enlistAllSalaryCalculators,
  enlistAllSalaryCalculatorsByEmployeeId,
  getSalaryCalculatorByType

};
