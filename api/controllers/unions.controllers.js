const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const UnionModel = require("../models/unions.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Union
 * @body {String} unionName 
 * @body {String} description 

 */

const addUnion = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData;

    const { unionName, description } = req.body;

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      unionName,
      description,
      _created_by: user._id
    }

    const unionSaved = await UnionModel.addUnion(prepObj);

    if (isEmpty(unionSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Union is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: unionSaved

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
 * @description This will get Union details by union id
 * @param {ObjectId} unionId
 */
const getUnionById = async (req, res, next) => {
  try {

    const { unionId } = req.params;

    const union = await UnionModel.getUnionById(unionId);

    if (isEmpty(union)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Union Not found of this id"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: union

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

const deleteUnionById = async (req, res, next) => {
  try {

    const { unionId } = req.params;

    const union = await UnionModel.getUnionById(unionId);

    if (isEmpty(union)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Union Not found of this id"]

      })

    }

    const deletedUnionCount = await UnionModel.deleteUnionById(unionId);

    if (isEmpty(deletedUnionCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Union is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedUnionCount
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

const updateUnionById = async (req, res, next) => {
  try {

    const { unionId } = req.params;

    const union = await UnionModel.getUnionById(unionId);

    if (isEmpty(union)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Union Not found of this id"]

      })

    }

    const { unionName, description } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (unionName) updateData["unionName"] = unionName;
    if (description != undefined && description != null && isString(description)) updateData["description"] = description;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedUnion = await UnionModel.updateUnionById(unionId, updateData);

    if (isEmpty(updatedUnion)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Union is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedUnion

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

const enlistAllUnions = async (req, res, next) => {
  try {

    const unions = await UnionModel.enlistAllUnions();

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: unions ? unions.length : 0,
      payload: unions

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

  addUnion,
  getUnionById,
  deleteUnionById,
  updateUnionById,
  enlistAllUnions

};
