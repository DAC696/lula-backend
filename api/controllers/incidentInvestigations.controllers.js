const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const IncidentInvestigationModel = require("../models/incidentInvestigations.models");
const EmployeeModel = require("../models/employees.models");
const DepartmentModel = require("../models/departments.models");
const InvestigationDocModel = require("../models/investigationDocs.models");
const RoleModel = require("../models/roles.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add IncidentInvestigation
 * @body {String} incidentInvestigationName 
 */

const addIncidentInvestigation = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const {
      investigationTitle,
      investigationType,
      classification,
      incidentTime,
      incidentDate,
      dateReported,
      LWDs,
      workArea,
      severityType,
      riskRating,
      potentialRating,
      description,
      immediateCorrectiveAction,
      additionalAssistanceProvided,
      isPersonnelRelated,
      isLocationLineManagerInformed,
      isClientInformed,
      isHIPO,
      reporter,
      roleId,
      departmentId
    } = req.body;

    //check if employee id exist //reporter is an employee id
    const employee = await EmployeeModel.getEmployeeById(reporter);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    //check if department id exist
    const department = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(department)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Department Not found of this id"]

      })

    }

    //roleId is a Role ID
    const role = await RoleModel.getRoleById(roleId);

    if (isEmpty(role)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Role Not found of this id"]

      })

    }

    const incidentInvestigationId = mongoose.Types.ObjectId()

    const documents = []

    if (req.files && req.files.length) {

      for (let i = 0; i < req.files.length; i++) {

        const { originalname, path } = req.files[i];

        const obj = {

          documentURL: `/${path}`,
          documentName: originalname,
          _incidentInvestigationId: incidentInvestigationId,
          _created_by: user._id

        }

        documents.push(obj)

      } //loop ends

      //insert all documents into the investigation doc collection
      const docs = await InvestigationDocModel.addMultipleInvestigationDocuments(documents)

    }



    //prepare object for storing user in db
    const prepObj = {
      _id: incidentInvestigationId,
      investigationTitle,
      investigationType,
      classification,
      incidentTime,
      incidentDate,
      dateReported,
      LWDs,
      workArea,
      severityType,
      riskRating,
      potentialRating,
      description,
      immediateCorrectiveAction,
      additionalAssistanceProvided,
      isPersonnelRelated,
      isLocationLineManagerInformed,
      isClientInformed,
      isHIPO,
      _reporter: reporter,
      _roleId: roleId,
      _departmentId: departmentId,
      _created_by: user._id
    }

    const incidentInvestigationSaved = await IncidentInvestigationModel.addIncidentInvestigation(prepObj, {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,
      departmentName: `${department.departmentName}`,
      roleName: role.roleName,
      _permissionId: {
        permissionName: role._permissionId.permissionName,
        permissions: role._permissionId.permissions
      },
      documents

    });

    if (isEmpty(incidentInvestigationSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. IncidentInvestigation is not saved yet"]

      })

    }

    prepObj["_departmentId"] = {

      departmentName: `${department.departmentName}`

    }

    prepObj["_reporter"] = {

      firstName: `${employee.firstName}`,
      lastName: `${employee.lastName}`,

    }

    prepObj["_roleId"] = {

      roleName: `${role.roleName}`,
      _permissionId: {
        permissionName: role._permissionId.permissionName,
        permissions: role._permissionId.permissions
      }

    }

    prepObj["documents"] = documents;

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
 * @description This will get IncidentInvestigation details by incidentInvestigation id
 * @param {ObjectId} incidentInvestigationId
 */
const getIncidentInvestigationById = async (req, res, next) => {
  try {

    const { incidentInvestigationId } = req.params;

    const incidentInvestigation = await IncidentInvestigationModel.getIncidentInvestigationById(incidentInvestigationId);

    if (isEmpty(incidentInvestigation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["IncidentInvestigation Not found of this id"]

      })

    }

    //get related investigations docs
    const documents = await InvestigationDocModel.getAllInvestigationDocumentsByIncidentId(incidentInvestigationId)

    incidentInvestigation["documents"] = documents;

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: incidentInvestigation

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

const deleteIncidentInvestigationById = async (req, res, next) => {
  try {

    const { incidentInvestigationId } = req.params;

    const incidentInvestigation = await IncidentInvestigationModel.getIncidentInvestigationById(incidentInvestigationId);

    if (isEmpty(incidentInvestigation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["IncidentInvestigation Not found of this id"]

      })

    }

    const deletedIncidentInvestigationCount = await IncidentInvestigationModel.deleteIncidentInvestigationById(incidentInvestigationId);

    if (isEmpty(deletedIncidentInvestigationCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No IncidentInvestigation is deleted"]

      })

    }

    const docsRelatedToIncidentDeleted = await InvestigationDocModel.deleteAllInvestigationDocumentByIncidentId(incidentInvestigationId)

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedIncidentInvestigationCount
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

const updateIncidentInvestigationById = async (req, res, next) => {
  try {

    const user = req.userData;

    const { incidentInvestigationId } = req.params;

    const incidentInvestigation = await IncidentInvestigationModel.getIncidentInvestigationById(incidentInvestigationId);

    if (isEmpty(incidentInvestigation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["IncidentInvestigation Not found of this id"]

      })

    }

    const {
      investigationTitle,
      investigationType,
      classification,
      incidentTime,
      incidentDate,
      dateReported,
      LWDs,
      workArea,
      severityType,
      riskRating,
      potentialRating,
      description,
      immediateCorrectiveAction,
      additionalAssistanceProvided,
      isPersonnelRelated,
      isLocationLineManagerInformed,
      isClientInformed,
      isHIPO,
      reporter,
      roleId,
      departmentId,
      docsArrToBeDeleted  // this is the array of documents to be deleted from the docs collection
    } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (investigationTitle) updateData["investigationTitle"] = investigationTitle;
    if (investigationType) updateData["investigationType"] = investigationType;
    if (classification) updateData["classification"] = classification;
    if (incidentDate) updateData["incidentDate"] = incidentDate;
    if (incidentTime) updateData["incidentTime"] = incidentTime;
    if (dateReported) updateData["dateReported"] = dateReported;
    if (LWDs) updateData["LWDs"] = LWDs;
    if (workArea) updateData["workArea"] = workArea;
    if (severityType) updateData["severityType"] = severityType;
    if (riskRating) updateData["riskRating"] = riskRating;
    if (potentialRating) updateData["potentialRating"] = potentialRating;
    if (description) updateData["description"] = description;
    if (immediateCorrectiveAction) updateData["immediateCorrectiveAction"] = immediateCorrectiveAction;
    if (additionalAssistanceProvided) updateData["additionalAssistanceProvided"] = additionalAssistanceProvided;

    if (!isEmpty(isPersonnelRelated)) updateData["isPersonnelRelated"] = isPersonnelRelated;
    if (!isEmpty(isLocationLineManagerInformed)) updateData["isLocationLineManagerInformed"] = isLocationLineManagerInformed;
    if (!isEmpty(isClientInformed)) updateData["isClientInformed"] = isClientInformed;
    if (!isEmpty(isHIPO)) updateData["isHIPO"] = isHIPO;

    if (departmentId) {

      //check if department id exist
      const department = await DepartmentModel.getDepartmentById(departmentId);

      if (isEmpty(department)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Department Not found of this id"]

        })

      } else {

        updateData["_departmentId"] = departmentId

      }

    }

    //reporter is an employee id
    if (reporter) {

      //check if employee id exist
      const employee = await EmployeeModel.getEmployeeById(reporter);

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_reporter"] = reporter

      }

    }

    if (roleId) {

      //check if role id exist
      const role = await RoleModel.getRoleById(roleId);

      if (isEmpty(role)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Role Not found of this id"]

        })

      } else {

        updateData["_roleId"] = role

      }

    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedIncidentInvestigation = await IncidentInvestigationModel.updateIncidentInvestigationById(incidentInvestigationId, updateData);

    if (isEmpty(updatedIncidentInvestigation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. IncidentInvestigation is not updated"]

      })

    }

    if (docsArrToBeDeleted && docsArrToBeDeleted.length) {

      const deletedDocs = await InvestigationDocModel.deleteAllInvestigationDocumentByDocsArr(docsArrToBeDeleted)

    }

    //save rest of the files to the db
    const documents = []

    if (req.files && req.files.length) {

      for (let i = 0; i < req.files.length; i++) {

        const { originalname, path } = req.files[i];

        const obj = {

          documentURL: `/${path}`,
          documentName: originalname,
          _incidentInvestigationId: incidentInvestigationId,
          _created_by: user._id

        }

        documents.push(obj)

      } //loop ends

      //insert all documents into the investigation doc collection
      const docs = await InvestigationDocModel.addMultipleInvestigationDocuments(documents)

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedIncidentInvestigation

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

const enlistAllIncidentInvestigations = async (req, res, next) => {
  try {

    const incidentInvestigations = await IncidentInvestigationModel.enlistAllIncidentInvestigations();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: incidentInvestigations ? incidentInvestigations.length : 0,
      payload: incidentInvestigations

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

  addIncidentInvestigation,
  getIncidentInvestigationById,
  deleteIncidentInvestigationById,
  updateIncidentInvestigationById,
  enlistAllIncidentInvestigations

};
