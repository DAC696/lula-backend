const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const ServiceModel = require("../models/services.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Service
 * @body {String} serviceName 
 */

const addService = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { serviceName } = req.body;

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      serviceName,
      _created_by: user._id
    }

    const serviceSaved = await ServiceModel.addService(prepObj);

    if (isEmpty(serviceSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Service is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: serviceSaved

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
 * @description This will get Service details by service id
 * @param {ObjectId} serviceId
 */
const getServiceById = async (req, res, next) => {
  try {

    const { serviceId } = req.params;

    const service = await ServiceModel.getServiceById(serviceId);

    if (isEmpty(service)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Service Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: service

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

const deleteServiceById = async (req, res, next) => {
  try {

    const { serviceId } = req.params;

    const service = await ServiceModel.getServiceById(serviceId);

    if (isEmpty(service)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Service Not found of this id"]

      })

    }

    const deletedServiceCount = await ServiceModel.deleteServiceById(serviceId);

    if (isEmpty(deletedServiceCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Service is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedServiceCount
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

const updateServiceById = async (req, res, next) => {
  try {

    const { serviceId } = req.params;

    const service = await ServiceModel.getServiceById(serviceId);

    if (isEmpty(service)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Service Not found of this id"]

      })

    }

    const { serviceName } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (serviceName) updateData["serviceName"] = serviceName;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedService = await ServiceModel.updateServiceById(serviceId, updateData);

    if (isEmpty(updatedService)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Service is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedService

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

const enlistAllServices = async (req, res, next) => {
  try {

    const services = await ServiceModel.enlistAllServices();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: services ? services.length : 0,
      payload: services

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

  addService,
  getServiceById,
  deleteServiceById,
  updateServiceById,
  enlistAllServices

};
