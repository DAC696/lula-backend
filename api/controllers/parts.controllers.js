const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const PartModel = require("../models/parts.models");
const EquipmentModel = require("../models/equipments.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Part
 */

const addPart = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const {
      itemName,
      manufacturer,
      suppliedBy,
      cost,
      quantity,
      equipmentId
    } = req.body

    const equipment = await EquipmentModel.getEquipmentById(equipmentId);

    if (isEmpty(equipment)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Equipment Not found of this id"]

      })

    }

    //prepare object for storing part in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      itemName,
      manufacturer,
      suppliedBy,
      cost,
      quantity,
      _equipmentId: equipmentId,
      _created_by: user._id
    } 
    
    const partSaved = await PartModel.addPart(prepObj, { 
        equipmentName: equipment.equipmentName,
        _locationId: {
          locId: equipment._locationId.locId,
          locName: equipment._locationId.locName,
        }
      
    });

    if (isEmpty(partSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Part is not saved yet"]

      })

    }

    prepObj["_equipmentId"] = {
      equipmentName: equipment.equipmentName,
      _location: {
        locId: equipment._locationId.locId,
        locName: equipment._locationId.locName,
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

const updatePartById = async (req, res, next) => {
  try {

    const { partId } = req.params;

    const part = await PartModel.getPartById(partId);

    if (isEmpty(part)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Part Not found of this id"]

      })

    }

    const {
      itemName,
      manufacturer,
      suppliedBy,
      cost,
      quantity,
      equipmentId
    } = req.body


    //prepare object for storing user in db
    const updateData = {}

    if (equipmentId) {

      const equipment = await EquipmentModel.getEquipmentById(equipmentId);

      if (isEmpty(equipment)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Equipment Not found of this id"]

        })

      } else {

        updateData["_equipmentId"] = equipmentId

      }

    }

    if (itemName) updateData["itemName"] = itemName;
    if (cost) updateData["cost"] = cost;
    if (quantity) updateData["quantity"] = quantity;
    if (manufacturer !== undefined) updateData["manufacturer"] = manufacturer;
    if (suppliedBy !== undefined) updateData["suppliedBy"] = suppliedBy;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedPart = await PartModel.updatePartById(partId, updateData);

    if (isEmpty(updatedPart)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Part is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedPart

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

const deletePartById = async (req, res, next) => {
  try {

    const { partId } = req.params;

    const part = await PartModel.getPartById(partId);

    if (isEmpty(part)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Part Not found of this id"]

      })

    }

    const setIsDeletedToTrue = await PartModel.setIsDeletedToTrue(partId);

    if (isEmpty(setIsDeletedToTrue)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Part is deleted"]

      })

    }

    let deletedCount = 1

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedCount
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
 * @description This will get Part details by part id
 * @param {ObjectId} partId
 */
const getPartById = async (req, res, next) => {
  try {

    const { partId } = req.params;

    const part = await PartModel.getPartById(partId);

    if (isEmpty(part)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Part Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: part

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

const enlistAllParts = async (req, res, next) => {
  try {

    const parts = await PartModel.enlistAllParts();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: parts ? parts.length : 0,
      payload: parts

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

  addPart,
  updatePartById,
  deletePartById,
  getPartById,
  enlistAllParts

};
