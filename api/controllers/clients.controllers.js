const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const ClientModel = require("../models/clients.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Client
 * @body {String} clientName
 * @body {String} clientCompany
 * @body {String} phoneNumber
 * @body {String} email 
 * @body {String} companyLogo - base64
 */

const addClient = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { clientName, clientCompany, phoneNumber, companyLogo, email, companyAddress } = req.body;

    const isEmailExist = await ClientModel.getClientByEmail(email)

    if (isEmailExist) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["Client already exist with the same email"]

      })

    }

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      clientName,
      clientCompany,
      phoneNumber,
      companyAddress,
      companyLogo: companyLogo ? companyLogo : "",
      email,
      _created_by: user._id
    }

    const clientSaved = await ClientModel.addClient(prepObj);

    if (isEmpty(clientSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Client is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: clientSaved

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
 * @description This will get Client details by client id
 * @param {ObjectId} clientId
 */
const getClientById = async (req, res, next) => {
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

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: client

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

const deleteClientById = async (req, res, next) => {
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

    const deletedClientCount = await ClientModel.deleteClientById(clientId);

    if (isEmpty(deletedClientCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Client is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedClientCount
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

const updateClientById = async (req, res, next) => {
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

    const { clientName, clientCompany, phoneNumber, companyLogo, email, companyAddress } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (clientName) updateData["clientName"] = clientName;
    if (clientCompany) updateData["clientCompany"] = clientCompany;
    if (phoneNumber) updateData["phoneNumber"] = phoneNumber;
    if (companyLogo) updateData["companyLogo"] = companyLogo;
    if (companyAddress) updateData["companyAddress"] = companyAddress;
    if (email) updateData["email"] = email;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedClient = await ClientModel.updateClientById(clientId, updateData);

    if (isEmpty(updatedClient)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Client is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedClient

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

const enlistAllClients = async (req, res, next) => {
  try {

    const clients = await ClientModel.enlistAllClients();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: clients ? clients.length : 0,
      payload: clients

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

  addClient,
  getClientById,
  deleteClientById,
  updateClientById,
  enlistAllClients

};
