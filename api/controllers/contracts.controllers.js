const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const ContractModel = require("../models/contracts.models");
const { StatusCodes } = require("http-status-codes");
const ClientModel = require("../models/clients.models");
const ServiceModel = require("../models/services.models");
const service = require("../schemas/service");


/**
 * @description let user add Contract
 * @body {String} contractName 
 */

const addContract = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { contractTitle, clientId, services, dayRate, totalValue, startDate, endDate } = req.body;

    const isClientExists = await ClientModel.getClientById(clientId);

    if (isEmpty(isClientExists)) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Client Id does not Exist"]

      })

    }

    //pass array of objects in services to see if these ids exist in db
    const servicesFound = await ServiceModel.getServicesByIds(services)

    //if count of services found is not equal to the services ids provider
    if (servicesFound.length < services.length) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["One of service id is not found"]

      })

    }

    let fileURL;

    if (req.fullFilePath) {

      fileURL = req.fullFilePath.replace("./", "/")

    }

    //prepare object for storing user in db
    const prepObj = {

      _id: mongoose.Types.ObjectId(),
      contractTitle,
      _clientId: clientId,
      _services: services,
      dayRate,
      totalValue,
      startDate,
      endDate,
      documentName: req.fileName ? req.fileName : "",
      documentURL: fileURL ? fileURL : '',
      _created_by: user._id

    }

    const prepObjForEvent = {

      _id: prepObj._id,
      contractTitle,
      dayRate,
      totalValue,
      startDate,
      endDate,
      documentName: req.fileName ? req.fileName : "",
      documentURL: fileURL ? fileURL : '',
      _clientId: {
        _id: isClientExists._id,
        clientName: isClientExists.clientName,
        clientCompany: isClientExists.clientCompany
      },
      _services: servicesFound
    }

    let contractSaved = await ContractModel.addContract(prepObj, prepObjForEvent);

    if (isEmpty(contractSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Contract is not saved yet"]

      })

    }


    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: prepObjForEvent

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
 * @description This will get Contract details by contract id
 * @param {ObjectId} contractId
 */
const getContractById = async (req, res, next) => {
  try {

    const { contractId } = req.params;

    const contract = await ContractModel.getContractById(contractId);

    if (isEmpty(contract)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Contract Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: contract

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

const deleteContractById = async (req, res, next) => {
  try {

    const { contractId } = req.params;

    const contract = await ContractModel.getContractById(contractId);

    if (isEmpty(contract)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Contract Not found of this id"]

      })

    }

    const deletedContractCount = await ContractModel.deleteContractById(contractId);

    if (isEmpty(deletedContractCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Contract is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedContractCount
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

const updateContractById = async (req, res, next) => {
  try {

    const { contractId } = req.params;

    const contract = await ContractModel.getContractById(contractId);

    if (isEmpty(contract)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Contract Not found of this id"]

      })

    }

    const { contractTitle, clientId, services, dayRate, totalValue, startDate, endDate, document } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    let fileURL;

    if (req.fullFilePath) {
      fileURL = req.fullFilePath.replace("./", "/")
    }

    if (contractTitle) updateData["contractTitle"] = contractTitle;
    if (dayRate) updateData["dayRate"] = dayRate;
    if (totalValue) updateData["totalValue"] = totalValue;
    if (document) updateData["document"] = document;
    if (startDate) updateData["startDate"] = startDate;
    if (endDate) updateData["endDate"] = endDate;
    if (fileURL) updateData["documentURL"] = fileURL;
    if (fileURL) updateData["documentName"] = req.fileName;

    if (clientId) {

      const clientFound = await ClientModel.getClientById(clientId)

      if (isEmpty(clientFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Cient Id does not Exist"]

        })

      } else {

        updateData["_clientId"] = clientId;

      }
    }

    if (!isEmpty(services) && services.length) {

      const servicesFound = await ServiceModel.getServicesByIds(services)

      //if count of services found is not equal to the services ids provider
      if (servicesFound < services.length) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["One of service id is not found"]

        })

      } else {

        updateData["_services"] = services;

      }
    }

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedContract = await ContractModel.updateContractById(contractId, updateData);

    if (isEmpty(updatedContract)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Contract is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedContract

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

const enlistAllContracts = async (req, res, next) => {
  try {

    const contracts = await ContractModel.enlistAllContracts();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: contracts ? contracts.length : 0,
      payload: contracts

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

const enlistAllContractsByClientId = async (req, res, next) => {
  try {

    const { clientId } = req.params;

    const client = await ClientModel.getClientById(clientId);

    if (isEmpty(client)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Client Not found of this id"]

      })

    }

    const contracts = await ContractModel.enlistAllContractsByClientId(clientId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: contracts ? contracts.length : 0,
      payload: contracts

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

  addContract,
  getContractById,
  deleteContractById,
  updateContractById,
  enlistAllContracts,
  enlistAllContractsByClientId

};
