const mongoose = require("mongoose");
const { isEmpty, isString } = require("../../utils/custom.validator")
const ComplianceModel = require("../models/compliances.models");
const EmployeeModel = require("../models/employees.models");
const LocationModel = require("../models/locations.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Compliance 
 */

const addCompliance = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const {
      subject,
      complianceType,
      internalOrExternal,
      complianceCategory,
      isDomestic,
      date,
      description,
      comment,
      internalAuditor,
      externalAuditor,
      locationId
    } = req.body;

    let internalAuditorFound;
    //check if internalAuditor (employee id) id exist
    if (internalAuditor) {

      internalAuditorFound = await EmployeeModel.getEmployeeById(internalAuditor);

      if (isEmpty(internalAuditorFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      }

    }

    //check if location id exist
    const location = await LocationModel.getLocationById(locationId)
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
      subject,
      complianceType,
      internalOrExternal,
      complianceCategory,
      isDomestic,
      date,
      description,
      comment,
      externalAuditor,
      _internalAuditor: internalAuditor,
      _locationId: locationId,
      _created_by: user._id
    }

    const complianceSaved = await ComplianceModel.addCompliance(prepObj, {

      internalAuditorFirstName: internalAuditorFound ? `${internalAuditorFound.firstName}` : undefined,
      internalAuditorLastName: internalAuditorFound ? `${internalAuditorFound.lastName}` : undefined,

      locName: `${location.locName}`,
      locId: `${location.locId}`

    });

    if (isEmpty(complianceSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Compliance is not saved yet"]

      })

    }

    if (internalAuditorFound)
      prepObj["_internalAuditor"] = {

        firstName: `${internalAuditorFound.firstName}`,
        lastName: `${internalAuditorFound.lastName}`

      }

    prepObj["_location"] = {

      locName: `${location.locName}`,
      locId: `${location.locId}`

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
 * @description This will get Compliance details by compliance id
 * @param {ObjectId} complianceId
 */

const getComplianceById = async (req, res, next) => {
  try {

    const { complianceId } = req.params;

    const compliance = await ComplianceModel.getComplianceById(complianceId);

    if (isEmpty(compliance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Compliance Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: compliance

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

const deleteComplianceById = async (req, res, next) => {
  try {

    const { complianceId } = req.params;

    const compliance = await ComplianceModel.getComplianceById(complianceId);

    if (isEmpty(compliance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Compliance Not found of this id"]

      })

    }

    const deletedComplianceCount = await ComplianceModel.deleteComplianceById(complianceId);

    if (isEmpty(deletedComplianceCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Compliance is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedComplianceCount
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

const updateComplianceById = async (req, res, next) => {
  try {

    const { complianceId } = req.params;

    const compliance = await ComplianceModel.getComplianceById(complianceId);

    if (isEmpty(compliance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Compliance Not found of this id"]

      })

    }

    const {

      subject,
      complianceType,
      internalOrExternal,
      complianceCategory,
      isDomestic,
      date,
      description,
      comment,
      internalAuditor,
      externalAuditor,
      locationId

    } = req.body;
    //prepare object for storing compliance in db
    const updateData = {}

    if (subject) updateData["subject"] = subject;
    if (complianceType) updateData["complianceType"] = complianceType;
    if (internalOrExternal !== undefined) updateData["internalOrExternal"] = internalOrExternal;
    if (complianceCategory) updateData["complianceCategory"] = complianceCategory;
    if (isDomestic) updateData["isDomestic"] = isDomestic;
    if (date) updateData["date"] = date;
    if (description) updateData["description"] = description;
    if (comment) updateData["comment"] = comment;
    if (externalAuditor !== undefined) updateData["externalAuditor"] = externalAuditor;

    if (internalAuditor !== undefined) updateData["_internalAuditor"] = internalAuditor

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

    const updatedCompliance = await ComplianceModel.updateComplianceById(complianceId, updateData);

    if (isEmpty(updatedCompliance)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Compliance is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedCompliance

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

const enlistAllCompliances = async (req, res, next) => {
  try {

    const compliances = await ComplianceModel.enlistAllCompliances();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: compliances ? compliances.length : 0,
      payload: compliances

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

  addCompliance,
  getComplianceById,
  deleteComplianceById,
  updateComplianceById,
  enlistAllCompliances

};
