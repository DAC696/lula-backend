const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const NonConformanceModel = require("../models/nonconformances.models");
const EmployeeModel = require("../models/employees.models");
const RoleModel = require("../models/roles.models");
const LocationModel = require("../models/locations.models");
const { StatusCodes } = require("http-status-codes");
const _ = require("lodash")
const moment = require("moment")

/**
 * @description let user add NonConformance
 * @body {String} nonConformanceName 
 */

const addNonConformance = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    let {
      vesselIdentification,
      observedArea,
      date,
      itemsEffected,
      levelOfNonConformity,
      summaryOfIdentifiedDeviation,
      actionProposed,
      timeLimitForCompliance,
      areaInchargeName,
      areaInchargePosition,
      verificationOfCorrectiveAction,
      verificationComments,
      newCorrectiveActionProposed,
      newTimeLimit,
      verificationOfNewCorrectiveAction,
      closingDate,
      newVerificationComments,
      observerName,
      observerPosition,
    } = req.body;

    //check if location id exist is an location id
    const location = await LocationModel.getLocationById(vesselIdentification);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    //check if employee id exist is an employee id
    const observerNameExists = await EmployeeModel.getEmployeeById(observerName);

    if (isEmpty(observerNameExists)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    //check if observerPosition id exist
    const observerPositionExists = await RoleModel.getRoleById(observerPosition);

    if (isEmpty(observerPositionExists)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    //check if areaInchargeName id exist is an employee id
    const areaInchargeNameExist = await EmployeeModel.getEmployeeById(areaInchargeName);

    if (isEmpty(areaInchargeNameExist)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["area incharge Not found of this id"]

      })

    }

    //check if areaInchargePosition id exist
    const areaInchargePositionExists = await RoleModel.getRoleById(areaInchargePosition);

    if (isEmpty(areaInchargePositionExists)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["areaInchargePosition Not found of this id"]

      })

    }

    const nonConformanceId = mongoose.Types.ObjectId()

    /* auto increment annual correlative number */
    let annualCorrelativeNumber;

    const isNonConformanceExist = await NonConformanceModel.getLastNonConformance()

    if (isNonConformanceExist) {

      annualCorrelativeNumber = +isNonConformanceExist.annualCorrelativeNumber;

      annualCorrelativeNumber = _.padStart(++annualCorrelativeNumber, 5, '0')

    } else {
      annualCorrelativeNumber = 000001;
    }

    //prepare object for storing user in db
    const prepObj = {
      _id: nonConformanceId,
      _vesselIdentification: vesselIdentification,
      observedArea,
      date,
      annualCorrelativeNumber,
      itemsEffected,
      levelOfNonConformity,
      summaryOfIdentifiedDeviation,
      actionProposed,
      timeLimitForCompliance,
      verificationOfCorrectiveAction,
      verificationComments,
      newCorrectiveActionProposed,
      newTimeLimit,
      verificationOfNewCorrectiveAction,
      closingDate,
      newVerificationComments,
      _areaInchargeName: areaInchargeName,
      _areaInchargePosition: areaInchargePosition,
      _observerName: observerName,
      _observerPosition: observerPosition,
      _created_by: user._id
    }

    const nonConformanceSaved = await NonConformanceModel.addNonConformance(prepObj, {

      observerFirstName: `${observerNameExists.firstName}`,
      observerLastName: `${observerNameExists.lastName}`,

      observerRoleName: observerPositionExists.roleName,
      _observerPermissionId: {
        permissionName: observerPositionExists._permissionId.permissionName,
        permissions: observerPositionExists._permissionId.permissions
      },

      areaInchargeFirstName: `${areaInchargeNameExist.firstName}`,
      areaInchargeLastName: `${areaInchargeNameExist.lastName}`,
      areaInchargeRoleName: areaInchargePositionExists.roleName,

      _areaInchargePermissionId: {
        permissionName: areaInchargePositionExists._permissionId.permissionName,
        permissions: areaInchargePositionExists._permissionId.permissions
      },

      locName: location.locName,
      locId: location.locId

    });

    if (isEmpty(nonConformanceSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. NonConformance is not saved yet"]

      })

    }

    prepObj["_observerName"] = {

      firstName: `${observerNameExists.firstName}`,
      lastName: `${observerNameExists.lastName}`,

    }

    prepObj["_observerPosition"] = {

      roleName: `${observerPositionExists.roleName}`,
      _permissionId: {
        permissionName: observerPositionExists._permissionId.permissionName,
        permissions: observerPositionExists._permissionId.permissions
      }

    }

    prepObj["_areaInchargeName"] = {

      firstName: `${areaInchargeNameExist.firstName}`,
      lastName: `${areaInchargeNameExist.lastName}`,

    }

    prepObj["_areaInchargePosition"] = {

      roleName: `${areaInchargePositionExists.roleName}`,
      _permissionId: {
        permissionName: areaInchargePositionExists._permissionId.permissionName,
        permissions: areaInchargePositionExists._permissionId.permissions
      }

    }

    prepObj["_vesselIdentification"] = {

      locName: `${location.locName}`,
      locId: `${location.locId}`

    }

    const year = moment(nonConformanceSaved.createdAt).format("yyyy")

    prepObj["annualCorrelativeNumber"] = `${year}-${annualCorrelativeNumber}`

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
 * @description This will get NonConformance details by nonConformance id
 * @param {ObjectId} nonConformanceId
 */
const getNonConformanceById = async (req, res, next) => {
  try {

    const { nonConformanceId } = req.params;

    const nonConformance = await NonConformanceModel.getNonConformanceById(nonConformanceId);

    if (isEmpty(nonConformance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["NonConformance Not found of this id"]

      })

    }

    const year = moment(nonConformance.createdAt).format("yyyy")

    nonConformance["annualCorrelativeNumber"] = `${year}-${nonConformance.annualCorrelativeNumber}`

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: nonConformance

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

const deleteNonConformanceById = async (req, res, next) => {
  try {

    const { nonConformanceId } = req.params;

    const nonConformance = await NonConformanceModel.getNonConformanceById(nonConformanceId);

    if (isEmpty(nonConformance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["NonConformance Not found of this id"]

      })

    }

    const deletedNonConformanceCount = await NonConformanceModel.deleteNonConformanceById(nonConformanceId);

    if (isEmpty(deletedNonConformanceCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No NonConformance is deleted"]

      })

    }
    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedNonConformanceCount
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

const updateNonConformanceById = async (req, res, next) => {
  try {

    const user = req.userData;

    const { nonConformanceId } = req.params;

    const nonConformance = await NonConformanceModel.getNonConformanceById(nonConformanceId);

    if (isEmpty(nonConformance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["NonConformance Not found of this id"]

      })

    }

    const {
      vesselIdentification,
      observedArea,
      date,
      itemsEffected,
      levelOfNonConformity,
      summaryOfIdentifiedDeviation,
      actionProposed,
      timeLimitForCompliance,
      areaInchargeName,
      areaInchargePosition,
      verificationOfCorrectiveAction,
      verificationComments,
      newCorrectiveActionProposed,
      newTimeLimit,
      verificationOfNewCorrectiveAction,
      closingDate,
      newVerificationComments,
      observerName,
      observerPosition
    } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (vesselIdentification) updateData["vesselIdentification"] = vesselIdentification;
    if (observedArea) updateData["observedArea"] = observedArea;
    if (date) updateData["date"] = date;
    if (itemsEffected !== undefined) updateData["itemsEffected"] = itemsEffected;
    if (levelOfNonConformity) updateData["levelOfNonConformity"] = levelOfNonConformity;
    if (summaryOfIdentifiedDeviation) updateData["summaryOfIdentifiedDeviation"] = summaryOfIdentifiedDeviation;
    if (actionProposed) updateData["actionProposed"] = actionProposed;
    if (timeLimitForCompliance) updateData["timeLimitForCompliance"] = timeLimitForCompliance;
    if (verificationOfCorrectiveAction) updateData["verificationOfCorrectiveAction"] = verificationOfCorrectiveAction;
    if (verificationComments) updateData["verificationComments"] = verificationComments;
    if (newCorrectiveActionProposed) updateData["newCorrectiveActionProposed"] = newCorrectiveActionProposed;
    if (newTimeLimit) updateData["newTimeLimit"] = newTimeLimit;
    if (verificationOfNewCorrectiveAction) updateData["verificationOfNewCorrectiveAction"] = verificationOfNewCorrectiveAction;
    if (closingDate) updateData["closingDate"] = closingDate;
    if (newVerificationComments) updateData["newVerificationComments"] = newVerificationComments;

    if (observerName) {

      //check if employee id exist
      const observerNameExists = await EmployeeModel.getEmployeeById(observerName);

      if (isEmpty(observerNameExists)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_observerName"] = observerName

      }

    }

    if (observerPosition) {

      //check if role id exist
      const observerPositionExists = await RoleModel.getRoleById(observerPosition);

      if (isEmpty(observerPositionExists)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Role Not found of this id"]

        })

      } else {

        updateData["_observerPosition"] = observerPosition

      }

    }

    /* Area Incharge  */
    if (areaInchargeName) {

      //check if employee id exist
      const areaInchargeNameExists = await EmployeeModel.getEmployeeById(areaInchargeName);

      if (isEmpty(areaInchargeNameExists)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_areaInchargeName"] = areaInchargeName

      }

    }

    if (areaInchargePosition) {

      //check if role id exist
      const areaInchargePositionExists = await RoleModel.getRoleById(areaInchargePosition);

      if (isEmpty(areaInchargePositionExists)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Role Not found of this id"]

        })

      } else {

        updateData["_areaInchargePosition"] = areaInchargePosition

      }

    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedNonConformance = await NonConformanceModel.updateNonConformanceById(nonConformanceId, updateData);

    if (isEmpty(updatedNonConformance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. NonConformance is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedNonConformance

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

const enlistAllNonConformances = async (req, res, next) => {
  try {

    const nonConformances = await NonConformanceModel.enlistAllNonConformances();

    const newNonConformances = nonConformances.map(nonConformance => {

      const year = moment(nonConformance.createdAt).format("yyyy")

      nonConformance["annualCorrelativeNumber"] = `${year}-${nonConformance.annualCorrelativeNumber}`

      return nonConformance

    })

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: nonConformances ? nonConformances.length : 0,
      payload: newNonConformances

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

  addNonConformance,
  getNonConformanceById,
  deleteNonConformanceById,
  updateNonConformanceById,
  enlistAllNonConformances

};
