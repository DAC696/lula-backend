const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const LocationModel = require("../models/locations.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add location
 * @body {String} locId
 * @body {String} locName
 * @body {String} locSign 
 * @body {String} locStatus
 * @body {String} email
 * @body {Array}  locCertificates
 * @body {Array}  locEquipments
 */

const addLocation = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { locId, locName, locSign, locStatus } = req.body;

    //LOCID must be unique
    const locIdExist = await LocationModel.getLocationByCustomLocId(locId);

    if (locIdExist) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Loc Id Already Exists"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      locId,
      locName,
      locSign,
      locStatus,
      _created_by: user._id
    }
  
    const locationSaved = await LocationModel.addLocation(prepObj);

    if (isEmpty(locationSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: locationSaved

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
 * @description This will get Location details by location id
 * @param {ObjectId} locationId
 */
const getLocationById = async (req, res, next) => {
  try {

    const { locationId } = req.params;

    const location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: location

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

const deleteLocationById = async (req, res, next) => {
  try {

    const { locationId } = req.params;

    const location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    const deletedLocationCount = await LocationModel.deleteLocationById(locationId);

    if (isEmpty(deletedLocationCount)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["No Location is deleted"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedLocationCount
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

const updateLocationById = async (req, res, next) => {
  try {

    const { locationId } = req.params;

    const location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    const { locId, locName, locSign, locStatus } = req.body;

    //prepare object for storing user in db
    const updateData = {
    }

    if (locId) {
      //LOCID must be unique
      const locIdExist = await LocationModel.getLocationByCustomLocId(locId);

      if (locIdExist) {

        return res.status(StatusCodes.CONFLICT).json({

          success: false,
          hasError: true,
          error: ["This Loc Id Already Exists"]

        })

      } else {

        updateData["locId"] = locId

      }
    };
    if (locName) updateData["locName"] = locName;
    if (locSign) updateData["locSign"] = locSign;
    if (locStatus) updateData["locStatus"] = locStatus;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedLocation = await LocationModel.updateLocationById(locationId, updateData);

    if (isEmpty(updatedLocation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong.Location is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedLocation

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

const enlistAllLocations = async (req, res, next) => {
  try {

    const locations = await LocationModel.enlistAllLocations();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: locations ? locations.length : 0,
      payload: locations

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

  addLocation,
  getLocationById,
  deleteLocationById,
  updateLocationById,
  enlistAllLocations

};
