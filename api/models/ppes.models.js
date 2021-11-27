const Ppes = require('../schemas/ppe');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new ppes
 * @param {Object} ppes 
 */

const addPpes = async (ppes) => {
    try {

        const newPpes = new Ppes(ppes);

        const ppesCreated = await newPpes.save();

        //whenever new ppes is added then emit an event
        if (ppesCreated) {

            //this object will be used to send events  and it contains populated location id and employee id
            sendCustomEvent("ppesAdded", ppesCreated)

        }

        return ppesCreated;

    } catch (error) {

        console.log(error)

    }
}

const getPpesById = async (ppesId) => {
    try {

        const ppes = await Ppes.findOne({ _id: ppesId })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        return ppes;
    } catch (error) {
        console.log(error);
    }
}

const updatePpesById = async (ppesId, objToBeUpdated) => {
    try {

        const updatedPpes = await Ppes.findByIdAndUpdate({ _id: ppesId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        //whenever ppes is updated then emit an event
        if (updatedPpes) {

            sendCustomEvent("ppesUpdated", updatedPpes)

        }

        return updatedPpes;
    } catch (error) {
        console.log(error);
    }
}

const deletePpesById = async (ppesId) => {
    try {

        const deletedPpes = await Ppes.deleteOne({ _id: ppesId })

        //whenever ppes is deleted then emit an event
        if (deletedPpes && deletedPpes.deletedCount) {

            sendCustomEvent("ppesDeleted", { ppesId })

        }

        return deletedPpes.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllPpess = async (employeeId) => {
    try {

        const ppess = await Ppes.find({ _employeeId: employeeId })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        return ppess;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addPpes,
    getPpesById,
    updatePpesById,
    deletePpesById,
    enlistAllPpess

}