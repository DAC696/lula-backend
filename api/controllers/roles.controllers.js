const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const RoleModel = require("../models/roles.models");
const { StatusCodes } = require("http-status-codes");
const PermissionModel = require("../models/permissions.models");

/**
 * @description let user add Role
 * @body {String} roleName 
 */

const addRole = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { roleName, permissionId } = req.body;

    const isRoleExists = await RoleModel.getRoleByRoleName(roleName);

    if (isRoleExists) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Role Name Already Exists"]

      })

    }

    const permissionFound = await PermissionModel.getPermissionById(permissionId)

    if (isEmpty(permissionFound)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Permission Id does not Exist"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      roleName,
      _permissionId: permissionId,
      _created_by: user._id
    }

    const roleSaved = await RoleModel.addRole(prepObj, {
      _id: permissionId,
      permissionName: permissionFound.permissionName,
      permissions: permissionFound.permissions
    });

    if (isEmpty(roleSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Role is not saved yet"]

      })

    }

    prepObj["_permissionId"] = {
      _id: permissionId,
      permissionName: permissionFound.permissionName,
      permissions: permissionFound.permissions

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
 * @description This will get Role details by role id
 * @param {ObjectId} roleId
 */
const getRoleById = async (req, res, next) => {
  try {

    const { roleId } = req.params;

    const role = await RoleModel.getRoleById(roleId);

    if (isEmpty(role)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: role

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

const deleteRoleById = async (req, res, next) => {
  try {

    const { roleId } = req.params;

    const role = await RoleModel.getRoleById(roleId);

    if (isEmpty(role)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    const deletedRoleCount = await RoleModel.deleteRoleById(roleId);

    if (isEmpty(deletedRoleCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Role is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedRoleCount
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

const updateRoleById = async (req, res, next) => {
  try {

    const { roleId } = req.params;

    const role = await RoleModel.getRoleById(roleId);

    if (isEmpty(role)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    const { roleName, permissionId } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (roleName) updateData["roleName"] = roleName;

    if (permissionId) {

      const permissionFound = await PermissionModel.getPermissionById(permissionId)

      if (isEmpty(permissionFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Permission Id does not Exist"]

        })

      } else {

        updateData["_permissionId"] = permissionId;

      }
    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedRole = await RoleModel.updateRoleById(roleId, updateData);

    if (isEmpty(updatedRole)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Role is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedRole

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

const enlistAllRoles = async (req, res, next) => {
  try {

    const roles = await RoleModel.enlistAllRoles();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: roles ? roles.length : 0,
      payload: roles

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

  addRole,
  getRoleById,
  deleteRoleById,
  updateRoleById,
  enlistAllRoles

};
