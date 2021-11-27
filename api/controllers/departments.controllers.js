const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const DepartmentModel = require("../models/departments.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Department
 * @body {String} departmentName 
 */

const addDepartment = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { departmentName } = req.body;

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      departmentName,
      _created_by: user._id
    }

    const departmentSaved = await DepartmentModel.addDepartment(prepObj);

    if (isEmpty(departmentSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Department is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: departmentSaved

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
 * @description This will get Department details by department id
 * @param {ObjectId} departmentId
 */
const getDepartmentById = async (req, res, next) => {
  try {

    const { departmentId } = req.params;

    const department = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(department)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Department Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: department

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

const enlistAllDepartments = async (req, res, next) => {
  try {

    const departments = await DepartmentModel.enlistAllDepartments();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: departments ? departments.length : 0,
      payload: departments

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

const deleteDepartmentById = async (req, res, next) => {
  try {

    const { departmentId } = req.params;

    const department = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(department)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Department Not found of this id"]

      })

    }

    const deletedDepartmentCount = await DepartmentModel.deleteDepartmentById(departmentId);

    if (isEmpty(deletedDepartmentCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Department is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedDepartmentCount
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

const updateDepartmentById = async (req, res, next) => {
  try {

    const { departmentId } = req.params;

    const department = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(department)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Department Not found of this id"]

      })

    }

    const { departmentName } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (departmentName) updateData["departmentName"] = departmentName;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedDepartment = await DepartmentModel.updateDepartmentById(departmentId, updateData);

    if (isEmpty(updatedDepartment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Department is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedDepartment

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

  addDepartment,
  getDepartmentById,
  deleteDepartmentById,
  updateDepartmentById,
  enlistAllDepartments

};
