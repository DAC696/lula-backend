const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const PpeModel = require("../models/ppes.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Ppe
 */

const addPpe = async (req, res, next) => {
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

    const { ppe, description } = req.body;

    //prepare object for storing ppe in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      ppe,
      description,
      _employeeId: employeeId,
      _created_by: user._id
    }

    const ppeSaved = await PpeModel.addPpes(prepObj);

    if (isEmpty(ppeSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Ppe is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: ppeSaved

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

const updatePpeById = async (req, res, next) => {
  try {

    const { ppeId } = req.params;

    const ppeFound = await PpeModel.getPpesById(ppeId);

    if (isEmpty(ppeFound)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Ppe Not found of this id"]

      })

    }

    const { ppe, description } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (ppe) updateData["ppe"] = ppe;
    if (description) updateData["description"] = description;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedPpe = await PpeModel.updatePpesById(ppeId, updateData);

    if (isEmpty(updatedPpe)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Ppe is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedPpe

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

const getPpeListByEmployeeId = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const employee = await EmployeeModel.getEmployeeById(employeeId);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    const ppes = await PpeModel.getPpeListByEmployeeId(employeeId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: ppes ? ppes.length : 0,
      payload: ppes

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

const deletePpeById = async (req, res, next) => {
  try {

    const { ppeId } = req.params;

    const ppe = await PpeModel.getPpesById(ppeId);

    if (isEmpty(ppe)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["ppe Not found of this id"]

      })

    }

    const deletedPpeCount = await PpeModel.deletePpesById(ppeId);

    if (isEmpty(deletedPpeCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Ppe is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedPpeCount
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

  addPpe,
  updatePpeById,
  getPpeListByEmployeeId,
  deletePpeById

};
