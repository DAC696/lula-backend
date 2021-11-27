const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const ConsultationModel = require("../models/consultations.models");
const EmployeeModel = require("../models/employees.models");
const LocationModel = require("../models/locations.models");
const RoleModel = require("../models/roles.models");
const { StatusCodes } = require("http-status-codes");
const _ = require("lodash")

/**
 * @description let user add Consultation 
 */

const addConsultation = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const {

      consultationType,
      recordable,
      companyName,
      consultationDate,
      consultationTime,
      reportDate,
      locationId,
      personWithInjuryOrPathalogy,
      crewPosition,
      phoneNumber,
      initialTreatmentProvidedBy,
      isEmployee,
      nonEmployeeAddressAndPhoneNumber,
      medicalRadioConsulation,
      time,
      treatmentDate,
      doctorName,
      didItOccurAtWorkingHours,
      disembarkmentDate,
      embarkmentDate,
      diseaseDetails,
      medicOrders,
      location,
      address,
      employeeId

    } = req.body;

    let employee;

    if (employeeId) {
      //check if internalAuditor (employee id) id exist
      employee = await EmployeeModel.getEmployeeById(employeeId);

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      }

    }

    let locationExists = await LocationModel.getLocationById(locationId);

    if (isEmpty(locationExists)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    //check if crew position that is role exists
    let roleExists = await RoleModel.getRoleById(crewPosition);

    if (isEmpty(roleExists)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["role Not found of this id"]

      })

    }

    let registerNumber;

    const isConsulationExist = await ConsultationModel.getLastConsultation()

    if (isConsulationExist) {

      registerNumber = +isConsulationExist.registerNumber;

      registerNumber = _.padStart(++registerNumber, 5, '0')

    } else {
      registerNumber = 000001;
    }

    //prepare object for storing aspect and impact in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      recordable,
      consultationType,
      companyName,
      consultationDate,
      consultationTime,
      reportDate,
      _locationId: locationId,
      registerNumber: +registerNumber,
      personWithInjuryOrPathalogy,
      _crewPosition: crewPosition,
      phoneNumber,
      initialTreatmentProvidedBy,
      isEmployee,
      nonEmployeeAddressAndPhoneNumber,
      medicalRadioConsulation,
      time,
      treatmentDate,
      doctorName,
      didItOccurAtWorkingHours,
      disembarkmentDate,
      embarkmentDate,
      diseaseDetails,
      medicOrders,
      location,
      address,
      _employeeId: employeeId,
      _created_by: user._id
    }

    const consultationSaved = await ConsultationModel.addConsultation(prepObj, {

      firstName: employee ? `${employee.firstName}` : null,
      lastName: employee ? `${employee.lastName}` : null,

      locName: locationExists.locName,
      locId: locationExists.locId,


      roleName: roleExists.roleName,
      _permissionId: {
        permissionName: roleExists._permissionId.permissionName,
        permissions: roleExists._permissionId.permissions
      }


    });

    if (isEmpty(consultationSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Consultation is not saved yet"]

      })

    }

    if (employeeId)
      prepObj["_employeeId"] = {

        firstName: `${employee.firstName}`,
        lastName: `${employee.lastName}`

      }

    prepObj["_locId"] = {

      locName: `${locationExists.locName}`,
      locId: locationExists.locId

    }

    prepObj["_crewPosition"] = {

      roleName: roleExists.roleName,
      _permissionId: {
        permissionName: roleExists._permissionId.permissionName,
        permissions: roleExists._permissionId.permissions
      }

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
 * @description This will get Consultation details by consultation id
 * @param {ObjectId} consultationId
 */

const getConsultationById = async (req, res, next) => {
  try {

    const { consultationId } = req.params;

    const consultation = await ConsultationModel.getConsultationById(consultationId);

    if (isEmpty(consultation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Consultation Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: consultation

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

const deleteConsultationById = async (req, res, next) => {
  try {

    const { consultationId } = req.params;

    const consultation = await ConsultationModel.getConsultationById(consultationId);

    if (isEmpty(consultation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Consultation Not found of this id"]

      })

    }

    const deletedConsultationCount = await ConsultationModel.deleteConsultationById(consultationId);

    if (isEmpty(deletedConsultationCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Consultation is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedConsultationCount
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

const updateConsultationById = async (req, res, next) => {
  try {

    const { consultationId } = req.params;

    const consultation = await ConsultationModel.getConsultationById(consultationId);

    if (isEmpty(consultation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Consultation Not found of this id"]

      })

    }

    const {

      consultationType,
      recordable,
      companyName,
      consultationDate,
      consultationTime,
      reportDate,
      locationId,
      personWithInjuryOrPathalogy,
      crewPosition,
      phoneNumber,
      initialTreatmentProvidedBy,
      isEmployee,
      nonEmployeeAddressAndPhoneNumber,
      medicalRadioConsulation,
      time,
      treatmentDate,
      doctorName,
      didItOccurAtWorkingHours,
      disembarkmentDate,
      embarkmentDate,
      diseaseDetails,
      medicOrders,
      location,
      address,
      employeeId

    } = req.body;



    //prepare object for storing consultation in db
    const updateData = {}

    if (companyName) updateData["companyName"] = companyName;
    if (consultationType) updateData["consultationType"] = consultationType;
    if (consultationDate) updateData["consultationDate"] = consultationDate;
    if (consultationTime) updateData["consultationTime"] = consultationTime;
    if (reportDate) updateData["reportDate"] = reportDate;
    if (crewPosition) updateData["crewPosition"] = crewPosition;
    if (phoneNumber) updateData["phoneNumber"] = phoneNumber;
    if (initialTreatmentProvidedBy) updateData["initialTreatmentProvidedBy"] = initialTreatmentProvidedBy;
    if (isEmployee) updateData["isEmployee"] = isEmployee;
    if (nonEmployeeAddressAndPhoneNumber !== undefined && nonEmployeeAddressAndPhoneNumber !== null && nonEmployeeAddressAndPhoneNumber !== "undefined" && nonEmployeeAddressAndPhoneNumber !== "null") updateData["nonEmployeeAddressAndPhoneNumber"] = nonEmployeeAddressAndPhoneNumber;
    if (medicalRadioConsulation) updateData["medicalRadioConsulation"] = medicalRadioConsulation;
    if (time) updateData["time"] = time;
    if (treatmentDate) updateData["treatmentDate"] = treatmentDate;
    if (doctorName) updateData["doctorName"] = doctorName;
    if (didItOccurAtWorkingHours) updateData["didItOccurAtWorkingHours"] = didItOccurAtWorkingHours;
    if (disembarkmentDate !== undefined && disembarkmentDate !== null && disembarkmentDate !== "undefined" && disembarkmentDate !== "null") updateData["disembarkmentDate"] = disembarkmentDate;
    if (embarkmentDate) updateData["embarkmentDate"] = embarkmentDate;
    if (diseaseDetails) updateData["diseaseDetails"] = diseaseDetails;
    if (medicOrders) updateData["medicOrders"] = medicOrders;
    if (location) updateData["location"] = location;
    if (address) updateData["address"] = address;
    if (recordable) updateData["recordable"] = recordable;


    if (employeeId !== null && employeeId !== undefined) {
      //check if internalAuditor (employee id) id exist
      const employee = await EmployeeModel.getEmployeeById(employeeId);

      if (isEmpty(employee)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Employee Not found of this id"]

        })

      } else {

        updateData["_employeeId"] = employeeId

      }

    } else if (employeeId === null) {
      updateData["_employeeId"] = employeeId
    }

    if (locationId !== null && locationId !== undefined) {
      //check if (location id) id exist
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

    if (personWithInjuryOrPathalogy) updateData["personWithInjuryOrPathalogy"] = personWithInjuryOrPathalogy

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedConsultation = await ConsultationModel.updateConsultationById(consultationId, updateData);

    if (isEmpty(updatedConsultation)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Consultation is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedConsultation

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

const enlistAllConsultations = async (req, res, next) => {
  try {

    const consultations = await ConsultationModel.enlistAllConsultations();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: consultations ? consultations.length : 0,
      payload: consultations

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

  addConsultation,
  getConsultationById,
  deleteConsultationById,
  updateConsultationById,
  enlistAllConsultations

};
