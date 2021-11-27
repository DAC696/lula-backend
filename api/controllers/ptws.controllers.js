const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const PTWModel = require("../models/ptws.models");
const EmployeeModel = require("../models/employees.models");
const DepartmentModel = require("../models/departments.models");
const { StatusCodes } = require("http-status-codes");

/**`
 * @description let user add PTW
 * @body {String} ptwName 
 */

const addPTW = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { ptwType, ptwNumber, isolationRequired, requestedBy,
      toolboxTalkReference, isolationPerformedBy,
      isolationType, isolationCertificate, workComplete, permitToBeAudited,
      natureOfWork, locationOfWork, riskAssessmentReference,
      coshh, datePermitAuthorised, liftingPlan, confinedSpaceRescuePlan, generalComments
    } = req.body;

    //check if isIsolationPerformedByExist id exist (it's and employee id)
    const isIsolationPerformedByExist = await EmployeeModel.getEmployeeById(isolationPerformedBy);

    if (isEmpty(isIsolationPerformedByExist)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    //check if isRequestedByExist id exist (it's and employee id)
    const isRequestedByExist = await EmployeeModel.getEmployeeById(requestedBy);

    if (isEmpty(isRequestedByExist)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      ptwType, ptwNumber, isolationRequired, _requestedBy: requestedBy,
      toolboxTalkReference, _isolationPerformedBy: isolationPerformedBy,
      isolationType, isolationCertificate, workComplete, permitToBeAudited,
      natureOfWork, locationOfWork, riskAssessmentReference,
      coshh, datePermitAuthorised, liftingPlan, confinedSpaceRescuePlan, generalComments,
      _created_by: user._id
    }

    const ptwSaved = await PTWModel.addPTW(prepObj, {

      requesterFirstName: `${isRequestedByExist.firstName}`,
      requesterLastName: `${isRequestedByExist.lastName}`,
      performerFirstName: `${isIsolationPerformedByExist.firstName}`,
      performerLastName: `${isIsolationPerformedByExist.lastName}`,

    });

    if (isEmpty(ptwSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. PTW is not saved yet"]

      })

    }

    prepObj["_isolationPerformedBy"] = {

      _id: `${isRequestedByExist._id}`,
      firstName: `${isRequestedByExist.firstName}`,
      lastName: `${isRequestedByExist.lastName}`

    }

    prepObj["_requestedBy"] = {

      _id: `${isRequestedByExist._id}`,
      firstName: `${isRequestedByExist.firstName}`,
      lastName: `${isRequestedByExist.lastName}`

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
 * @description This will get PTW details by ptw id
 * @param {ObjectId} ptwId
 */
const getPTWById = async (req, res, next) => {
  try {

    const { ptwId } = req.params;

    const ptw = await PTWModel.getPTWById(ptwId);

    if (isEmpty(ptw)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["PTW Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: ptw

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

const deletePTWById = async (req, res, next) => {
  try {

    const { ptwId } = req.params;

    const ptw = await PTWModel.getPTWById(ptwId);

    if (isEmpty(ptw)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["PTW Not found of this id"]

      })

    }

    const deletedPTWCount = await PTWModel.deletePTWById(ptwId);

    if (isEmpty(deletedPTWCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No PTW is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedPTWCount
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

const updatePTWById = async (req, res, next) => {
  try {

    const { ptwId } = req.params;

    const ptw = await PTWModel.getPTWById(ptwId);

    if (isEmpty(ptw)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["PTW Not found of this id"]

      })

    }

    const { ptwType, ptwNumber, isolationRequired, requestedBy,
      toolboxTalkReference, isolationPerformedBy,
      isolationType, isolationCertificate, workComplete, permitToBeAudited,
      natureOfWork, locationOfWork, riskAssessmentReference,
      coshh, datePermitAuthorised, liftingPlan, confinedSpaceRescuePlan, generalComments
    } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (ptwNumber) updateData["ptwNumber"] = ptwNumber;
    if (ptwType) updateData["ptwType"] = ptwType;
    if (!isEmpty(isolationRequired)) updateData["isolationRequired"] = isolationRequired;
    if (toolboxTalkReference) updateData["toolboxTalkReference"] = toolboxTalkReference;
    if (isolationCertificate) updateData["isolationCertificate"] = isolationCertificate;
    if (workComplete) updateData["workComplete"] = workComplete;
    if (permitToBeAudited) updateData["permitToBeAudited"] = permitToBeAudited;
    if (natureOfWork) updateData["natureOfWork"] = natureOfWork;
    if (locationOfWork) updateData["locationOfWork"] = locationOfWork;
    if (riskAssessmentReference) updateData["riskAssessmentReference"] = riskAssessmentReference;
    if (coshh) updateData["coshh"] = coshh;
    if (datePermitAuthorised) updateData["datePermitAuthorised"] = datePermitAuthorised;
    if (liftingPlan) updateData["liftingPlan"] = liftingPlan;
    if (confinedSpaceRescuePlan) updateData["confinedSpaceRescuePlan"] = confinedSpaceRescuePlan;
    if (generalComments) updateData["generalComments"] = generalComments;
    if (isolationType) updateData["isolationType"] = isolationType;

    if (requestedBy) {

      //check if isRequestedByExist id exist (it's and employee id)
      const isRequestedByExist = await EmployeeModel.getEmployeeById(requestedBy);

      if (isEmpty(isRequestedByExist)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_requestedBy"] = requestedBy

      }

    }

    if (isolationPerformedBy) {

      //check if isIsolationPerformedByExist id exist (it's and employee id)
      const isIsolationPerformedByExist = await EmployeeModel.getEmployeeById(isolationPerformedBy);

      if (isEmpty(isIsolationPerformedByExist)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_isolationPerformedBy"] = isolationPerformedBy

      }

    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedPTW = await PTWModel.updatePTWById(ptwId, updateData);

    if (isEmpty(updatedPTW)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. PTW is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedPTW

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

const enlistAllPTWs = async (req, res, next) => {
  try {

    const ptws = await PTWModel.enlistAllPTWs();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: ptws ? ptws.length : 0,
      payload: ptws

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

  addPTW,
  getPTWById,
  deletePTWById,
  updatePTWById,
  enlistAllPTWs

};
