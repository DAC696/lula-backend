const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const EquipmentModel = require("../models/equipments.models");
const LocationModel = require("../models/locations.models");
const PartModel = require("../models/parts.models");
const WorkOrderModel = require("../models/workOrders.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Equipment
 */

const addEquipment = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const {
      systems,
      reference,
      equipmentName,
      manufacturer,
      model,
      serialNumber,
      suppliedBy,
      locatedBy,
      safetyCritical,
      value,
      lastMaintained,
      classComponent,
      classCode,
      dateInstalled,
      currentRunningHours,
      status,
      locationId,
      department
    } = req.body

    const location = await LocationModel.getLocationById(locationId);
    const allLocations = await EquipmentModel.enlistAllEquipmentsByLocationId(locationId);
    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })
    }
    const referenceNumber = `${location.locId}-0000${allLocations.length}`;
    console.log(referenceNumber);
    //prepare object for storing equipment in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      systems,
      referenceNumber,
      reference,
      equipmentName,
      manufacturer,
      model,
      serialNumber,
      suppliedBy,
      locatedBy,
      safetyCritical,
      value,
      lastMaintained,
      classComponent,
      classCode,
      dateInstalled,
      currentRunningHours,
      status,
      _locationId: locationId,
      department,
      _created_by: user._id
    }

    const equipmentSaved = await EquipmentModel.addEquipment(prepObj, {
      locName: location.locName,
      locId: location.locId
    });

    if (isEmpty(equipmentSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Equipment is not saved yet"]

      })

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

const updateEquipmentById = async (req, res, next) => {
  try {

    const { equipmentId } = req.params;

    const equipment = await EquipmentModel.getEquipmentById(equipmentId);

    if (isEmpty(equipment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Equipment Not found of this id"]

      })

    }

    const {
      systems,
      reference,
      equipmentName,
      manufacturer,
      model,
      serialNumber,
      suppliedBy,
      locatedBy,
      safetyCritical,
      value,
      lastMaintained,
      classComponent,
      classCode,
      dateInstalled,
      currentRunningHours,
      status,
      locationId,
      department
    } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (locationId) {

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

    if(department !== undefined) updateData["department"] = department
    if (systems !== undefined) updateData["systems"] = systems;
    if (reference !== undefined) updateData["reference"] = reference;
    if (equipmentName) updateData["equipmentName"] = equipmentName;
    if (manufacturer !== undefined) updateData["manufacturer"] = manufacturer;
    if (model !== undefined) updateData["model"] = model;
    if (serialNumber !== undefined) updateData["serialNumber"] = serialNumber;
    if (suppliedBy !== undefined) updateData["suppliedBy"] = suppliedBy;
    if (locatedBy !== undefined) updateData["locatedBy"] = locatedBy;
    if (safetyCritical !== undefined) updateData["safetyCritical"] = safetyCritical;
    if (value !== undefined) updateData["value"] = value;
    if (lastMaintained !== undefined) updateData["lastMaintained"] = lastMaintained;
    if (classComponent !== undefined) updateData["classComponent"] = classComponent;
    if (classCode !== undefined) updateData["classCode"] = classCode;
    if (dateInstalled !== undefined) updateData["dateInstalled"] = dateInstalled;
    if (currentRunningHours !== undefined) updateData["currentRunningHours"] = currentRunningHours;
    if (status !== undefined) updateData["status"] = status;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedEquipment = await EquipmentModel.updateEquipmentById(equipmentId, updateData);

    if (isEmpty(updatedEquipment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Equipment is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedEquipment

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

const deleteEquipmentById = async (req, res, next) => {
  try {

    const { equipmentId } = req.params;

    const equipment = await EquipmentModel.getEquipmentById(equipmentId);

    if (isEmpty(equipment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Equipment Not found of this id"]

      })

    }

    const deletedEquipmentCount = await EquipmentModel.deleteEquipmentById(equipmentId);

    if (isEmpty(deletedEquipmentCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Equipment is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedEquipmentCount
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

/**
 * @description This will get Equipment details by equipment id
 * @param {ObjectId} equipmentId
 */
const getEquipmentById = async (req, res, next) => {
  try {

    const { equipmentId } = req.params;

    let equipment = await EquipmentModel.getEquipmentById(equipmentId);

    if (isEmpty(equipment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Equipment Not found of this id"]

      })

    }

    const workOrders = await WorkOrderModel.getWorkOrderByEquipmentId(equipmentId)

    const parts = await PartModel.getPartByEquipmentId(equipmentId)

    equipment.workOrders = workOrders
    equipment.parts = parts

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: equipment

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

const enlistAllEquipments = async (req, res, next) => {
  try {

    const equipments = await EquipmentModel.enlistAllEquipments();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: equipments ? equipments.length : 0,
      payload: equipments

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

const enlistAllEquipmentsByLocationId = async (req, res, next) => {
  try {

    const {locationId} = req.params 
    const equipments = await EquipmentModel.enlistAllEquipmentsByLocationId(locationId);
 
    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: equipments ? equipments.length : 0,
      payload: equipments

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

  addEquipment,
  updateEquipmentById,
  deleteEquipmentById,
  getEquipmentById,
  enlistAllEquipments,
  enlistAllEquipmentsByLocationId
};
