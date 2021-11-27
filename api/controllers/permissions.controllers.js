const mongoose = require("mongoose");
const { isEmpty, isBoolean } = require("../../utils/custom.validator")
const PermissionModel = require("../models/permissions.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Permission
 * @body {String} permissionName 
 * @body {String} description 

 */

const addPermission = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { permissionName, permissions } = req.body;

    const isPermissionExists = await PermissionModel.getPermissionByPermissionName(permissionName)

    if (isPermissionExists) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Permission Name Already Exists"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      permissionName,
      permissions,
      _created_by: user._id
    }

    const permissionSaved = await PermissionModel.addPermission(prepObj);

    if (isEmpty(permissionSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Permission is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: permissionSaved

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
 * @description This will get Permission details by permission id
 * @param {ObjectId} permissionId
 */
const getPermissionById = async (req, res, next) => {
  try {

    const { permissionId } = req.params;

    const permission = await PermissionModel.getPermissionById(permissionId);

    if (isEmpty(permission)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Permission Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: permission

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

const deletePermissionById = async (req, res, next) => {
  try {

    const { permissionId } = req.params;

    const permission = await PermissionModel.getPermissionById(permissionId);

    if (isEmpty(permission)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Permission Not found of this id"]

      })

    }

    const deletedPermissionCount = await PermissionModel.deletePermissionById(permissionId);

    if (isEmpty(deletedPermissionCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Permission is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedPermissionCount
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

const updatePermissionById = async (req, res, next) => {
  try {

    const { permissionId } = req.params;

    const permission = await PermissionModel.getPermissionById(permissionId);

    if (isEmpty(permission)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Permission Not found of this id"]

      })

    }

    const { permissionName, permissions } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (permissionName) updateData["permissionName"] = permissionName
    if (!isEmpty(permissions)) updateData["permissions"] = permissions;


    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedPermission = await PermissionModel.updatePermissionById(permissionId, updateData);

    if (isEmpty(updatedPermission)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Permission is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedPermission

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

const enlistAllPermissions = async (req, res, next) => {
  try {

    const permissions = await PermissionModel.enlistAllPermissions();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: permissions ? permissions.length : 0,
      payload: permissions

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

  addPermission,
  getPermissionById,
  deletePermissionById,
  updatePermissionById,
  enlistAllPermissions

};
