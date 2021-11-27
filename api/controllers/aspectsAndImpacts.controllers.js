const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const AspectsAndImpactModel = require("../models/aspectsAndImpacts.models");
const EmployeeModel = require("../models/employees.models");
const LocationModel = require("../models/locations.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add AspectsAndImpact 
 */

const addAspectsAndImpact = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { issue, impact, reviewedBy,
      lastReviewed, aspectType, operatingCondition, influence, impactAssessment,
      controlMeasures, trainingNeeds, legalAndOtherRequirements, residentialImpactLevel, locationId } = req.body;

    //check if reviewedBy (employee id) id exist
    const employee = await EmployeeModel.getEmployeeById(reviewedBy);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

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

    //prepare object for storing aspect and impact in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      issue,
      impact,
      lastReviewed,
      aspectType,
      operatingCondition,
      influence,
      impactAssessment,
      residentialImpactLevel,
      controlMeasures,
      trainingNeeds,
      legalAndOtherRequirements,
      _reviewedBy: reviewedBy,
      _locationId: locationId,
      _created_by: user._id
    }

    const aspectsAndImpactSaved = await AspectsAndImpactModel.addAspectsAndImpact(prepObj, {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,

      locName: location.locName,
      locId: location.locId

    });

    if (isEmpty(aspectsAndImpactSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. AspectsAndImpact is not saved yet"]

      })

    }

    prepObj["_reviewedBy"] = {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`

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
 * @description This will get AspectsAndImpact details by aspectsAndImpact id
 * @param {ObjectId} aspectsAndImpactId
 */

const getAspectsAndImpactById = async (req, res, next) => {
  try {

    const { aspectsAndImpactId } = req.params;

    const aspectsAndImpact = await AspectsAndImpactModel.getAspectsAndImpactById(aspectsAndImpactId);

    if (isEmpty(aspectsAndImpact)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["AspectsAndImpact Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: aspectsAndImpact

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

const deleteAspectsAndImpactById = async (req, res, next) => {
  try {

    const { aspectsAndImpactId } = req.params;

    const aspectsAndImpact = await AspectsAndImpactModel.getAspectsAndImpactById(aspectsAndImpactId);

    if (isEmpty(aspectsAndImpact)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["AspectsAndImpact Not found of this id"]

      })

    }

    const deletedAspectsAndImpactCount = await AspectsAndImpactModel.deleteAspectsAndImpactById(aspectsAndImpactId);

    if (isEmpty(deletedAspectsAndImpactCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No AspectsAndImpact is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedAspectsAndImpactCount
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

const updateAspectsAndImpactById = async (req, res, next) => {
  try {

    const { aspectsAndImpactId } = req.params;

    const aspectsAndImpact = await AspectsAndImpactModel.getAspectsAndImpactById(aspectsAndImpactId);

    if (isEmpty(aspectsAndImpact)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["AspectsAndImpact Not found of this id"]

      })

    }

    const { issue, impact, reviewedBy,
      lastReviewed, aspectType, operatingCondition, influence, impactAssessment,
      controlMeasures, trainingNeeds, legalAndOtherRequirements, residentialImpactLevel, locationId } = req.body;

    //prepare object for storing aspectsAndImpact in db
    const updateData = {}

    if (issue) updateData["issue"] = issue;
    if (impact) updateData["impact"] = impact;
    if (aspectType) updateData["aspectType"] = aspectType;
    if (operatingCondition) updateData["operatingCondition"] = operatingCondition;
    if (influence) updateData["influence"] = influence;
    if (impactAssessment) updateData["impactAssessment"] = impactAssessment;
    if (residentialImpactLevel) updateData["residentialImpactLevel"] = residentialImpactLevel;
    if (trainingNeeds) updateData["trainingNeeds"] = trainingNeeds;
    if (legalAndOtherRequirements) updateData["legalAndOtherRequirements"] = legalAndOtherRequirements;
    if (controlMeasures) updateData["controlMeasures"] = controlMeasures;
    if (lastReviewed) updateData["lastReviewed"] = lastReviewed;

    if (reviewedBy) {

      //check if employee id exist
      const employee = await EmployeeModel.getEmployeeById(reviewedBy);

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_reviewedBy"] = reviewedBy

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

    const updatedAspectsAndImpact = await AspectsAndImpactModel.updateAspectsAndImpactById(aspectsAndImpactId, updateData);

    if (isEmpty(updatedAspectsAndImpact)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. AspectsAndImpact is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedAspectsAndImpact

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

const enlistAllAspectsAndImpacts = async (req, res, next) => {
  try {

    const aspectsAndImpacts = await AspectsAndImpactModel.enlistAllAspectsAndImpacts();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: aspectsAndImpacts ? aspectsAndImpacts.length : 0,
      payload: aspectsAndImpacts

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

  addAspectsAndImpact,
  getAspectsAndImpactById,
  deleteAspectsAndImpactById,
  updateAspectsAndImpactById,
  enlistAllAspectsAndImpacts

};
