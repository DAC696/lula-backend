const Part = require('../schemas/part');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new part
 * @param {Object} part 
 */

const addPart = async (part, eventObj) => {
    try {

        const newPart = new Part(part);

        const partCreated = await newPart.save();

        //whenever new part is added then emit an event
        if (partCreated) {

            eventObj["_equipmentId"] = {
                equipmentName: eventObj.equipmentName,
                _locationId: {
                  locId: eventObj._locationId.locId,
                  locName: eventObj._locationId.locName,
                }
              }

            sendCustomEvent("partAdded", partCreated)

        }

        return partCreated;

    } catch (error) {

        console.log(error)

    }
}

const getPartById = async (partId) => {
    try {

        const part = await Part.findOne({ _id: partId })
            .populate({
                path: '_equipmentId',
                populate: {
                    path: '_locationId'
                }
            })
            .lean()

        return part;
    } catch (error) {
        console.log(error);
    }
}

const getPartByEquipmentId = async (equipmentId) => {
    try {

        const parts = await Part.find({ _equipmentId: equipmentId })
            .populate({
                path: '_equipmentId',
                populate: {
                    path: '_locationId'
                }
            })
            .lean()

        return parts;
    } catch (error) {
        console.log(error);
    }
}

const updatePartById = async (partId, objToBeUpdated) => {
    try {

        const updatedPart = await Part.findByIdAndUpdate({ _id: partId }, objToBeUpdated, { upsert: true, new: true })
            .populate({
                path: '_equipmentId',
                populate: {
                    path: '_locationId'
                }
            })
            .lean()

        //whenever part is updated then emit an event
        if (updatedPart) {

            sendCustomEvent("partUpdated", updatedPart)

        }

        return updatedPart;
    } catch (error) {
        console.log(error);
    }
}

const deletePartById = async (partId) => {
    try {

        const deletedPart = await Part.deleteOne({ _id: partId })

        //whenever role is deleted then emit an event
        if (deletedPart && deletedPart.deletedCount) {

            sendCustomEvent("partDeleted", { partId })

        }

        return deletedPart.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const setIsDeletedToTrue = async (partId) => {
    try {
        const objToBeUpdated = { isDeleted: true }
        const updatedIsDeleteFlag = await Part.findByIdAndUpdate({ _id: partId }, objToBeUpdated, { upsert: true, new: true })
            .lean()
        return updatedIsDeleteFlag
    } catch (error) {
        console.log(error)
    }
}

const enlistAllParts = async () => {
    try {

        const parts = await Part.find({ isDeleted: false })
            .populate({
                path: '_equipmentId',
                populate: {
                    path: '_locationId'
                }
            })
            .lean()

        return parts;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addPart,
    getPartById,
    updatePartById,
    deletePartById,
    enlistAllParts,
    setIsDeletedToTrue,
    getPartByEquipmentId

}