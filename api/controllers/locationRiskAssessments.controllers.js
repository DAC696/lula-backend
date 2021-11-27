const mongoose = require("mongoose");
const { isEmpty, isBoolean } = require("../../utils/custom.validator")
const LocationRiskAssessmentModel = require("../models/locationRiskAssessments.models");
const RoleModel = require("../models/roles.models");
const LocationModel = require("../models/locations.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add LocationRiskAssessment 
 */

const addLocationRiskAssessment = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { isPeople, isAsset, isReputation, isEnvironment, isRequiresPTW, activity, hazard, responsibleRole,
      hazardEffect, initialRiskRating, riskRanking, trainingRequired, lastReviewed,
      legalAndOtherRequirements, controlMeasures, supportingProcedures, locationId } = req.body;

    //check if responsibleRole id exist
    const role = await RoleModel.getRoleById(responsibleRole);

    if (isEmpty(role)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    const location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }
    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      isPeople, isAsset, isReputation, isEnvironment, isRequiresPTW,
      activity,
      hazard,
      hazardEffect,
      initialRiskRating,
      riskRanking,
      trainingRequired,
      lastReviewed,
      legalAndOtherRequirements,
      controlMeasures,
      supportingProcedures,
      _responsibleRole: responsibleRole,
      _locationId: locationId,
      _created_by: user._id
    }

    const locationRiskAssessmentSaved = await LocationRiskAssessmentModel.addLocationRiskAssessment(prepObj, {

      roleName: `${role.roleName}`,
      locName: location.locName,
      locId: location.locId

    });

    if (isEmpty(locationRiskAssessmentSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. LocationRiskAssessment is not saved yet"]

      })

    }

    prepObj["_responsibleRole"] = {

      roleName: `${role.roleName}`

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

/**
 * @description This will get LocationRiskAssessment details by locationRiskAssessment id
 * @param {ObjectId} locationRiskAssessmentId
 */
const getLocationRiskAssessmentById = async (req, res, next) => {
  try {

    const { locationRiskAssessmentId } = req.params;

    const locationRiskAssessment = await LocationRiskAssessmentModel.getLocationRiskAssessmentById(locationRiskAssessmentId);

    if (isEmpty(locationRiskAssessment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["LocationRiskAssessment Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: locationRiskAssessment

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

const deleteLocationRiskAssessmentById = async (req, res, next) => {
  try {

    const { locationRiskAssessmentId } = req.params;

    const locationRiskAssessment = await LocationRiskAssessmentModel.getLocationRiskAssessmentById(locationRiskAssessmentId);

    if (isEmpty(locationRiskAssessment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["LocationRiskAssessment Not found of this id"]

      })

    }

    const deletedLocationRiskAssessmentCount = await LocationRiskAssessmentModel.deleteLocationRiskAssessmentById(locationRiskAssessmentId);

    if (isEmpty(deletedLocationRiskAssessmentCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No LocationRiskAssessment is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedLocationRiskAssessmentCount
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

const updateLocationRiskAssessmentById = async (req, res, next) => {
  try {

    const { locationRiskAssessmentId } = req.params;

    const locationRiskAssessment = await LocationRiskAssessmentModel.getLocationRiskAssessmentById(locationRiskAssessmentId);

    if (isEmpty(locationRiskAssessment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["LocationRiskAssessment Not found of this id"]

      })

    }

    const { isPeople, isAsset, isReputation, isEnvironment, isRequiresPTW, activity, hazard, responsibleRole,
      hazardEffect, initialRiskRating, riskRanking, trainingRequired, lastReviewed,
      legalAndOtherRequirements, controlMeasures, supportingProcedures, locationId } = req.body;


    //prepare object for storing user in db
    const updateData = {}

    if (isPeople != undefined && isPeople != null & isBoolean(isPeople)) updateData["isPeople"] = isPeople;
    if (isAsset != undefined && isAsset != null & isBoolean(isAsset)) updateData["isAsset"] = isAsset;
    if (isReputation != undefined && isReputation != null & isBoolean(isReputation)) updateData["isReputation"] = isReputation;
    if (isEnvironment != undefined && isEnvironment != null & isBoolean(isEnvironment)) updateData["isEnvironment"] = isEnvironment;
    if (isRequiresPTW != undefined && isRequiresPTW != null & isBoolean(isRequiresPTW)) updateData["isRequiresPTW"] = isRequiresPTW;
    if (activity) updateData["activity"] = activity;
    if (hazard) updateData["hazard"] = hazard;
    if (hazardEffect) updateData["hazardEffect"] = hazardEffect;
    if (initialRiskRating) updateData["initialRiskRating"] = initialRiskRating;
    if (riskRanking) updateData["riskRanking"] = riskRanking;
    if (trainingRequired) updateData["trainingRequired"] = trainingRequired;
    if (lastReviewed) updateData["lastReviewed"] = lastReviewed;
    if (legalAndOtherRequirements) updateData["legalAndOtherRequirements"] = legalAndOtherRequirements;
    if (controlMeasures) updateData["controlMeasures"] = controlMeasures;
    if (supportingProcedures) updateData["supportingProcedures"] = supportingProcedures;

    if (responsibleRole) {

      //check if role id exist
      const role = await RoleModel.getRoleById(responsibleRole);

      if (isEmpty(role)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Role Not found of this id"]

        })

      } else {

        updateData["_responsibleRole"] = responsibleRole

      }

    }

    if (locationId) {

      //check if location id exist
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
    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedLocationRiskAssessment = await LocationRiskAssessmentModel.updateLocationRiskAssessmentById(locationRiskAssessmentId, updateData);

    if (isEmpty(updatedLocationRiskAssessment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. LocationRiskAssessment is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedLocationRiskAssessment

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

const enlistAllLocationRiskAssessments = async (req, res, next) => {
  try {

    const locationRiskAssessments = await LocationRiskAssessmentModel.enlistAllLocationRiskAssessments();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: locationRiskAssessments ? locationRiskAssessments.length : 0,
      payload: locationRiskAssessments

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

  addLocationRiskAssessment,
  getLocationRiskAssessmentById,
  deleteLocationRiskAssessmentById,
  updateLocationRiskAssessmentById,
  enlistAllLocationRiskAssessments

};
