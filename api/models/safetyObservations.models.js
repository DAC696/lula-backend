const SafetyObservation = require('../schemas/safetyObservation');
const { sendCustomEvent } = require("../misc/helperFunctions");
const { populate } = require('../schemas/safetyObservation');

/**
 * @description This will create new safetyObservation
 * @param {Object} safetyObservation 
 */

const addSafetyObservation = async (safetyObservation, eventObj) => {
    try {

        const newSafetyObservation = new SafetyObservation(safetyObservation);

        const safetyObservationCreated = await newSafetyObservation.save();

        //whenever  safetyObservation is updated then emit an event
        if (safetyObservationCreated) {

            safetyObservation["_departmentId"] = {

                departmentName: eventObj.departmentName

            };

            safetyObservation["_employeeId"] = {

                firstName: eventObj.firstName,
                lastName: eventObj.lastName

            };

            safetyObservation["responsibleJobTitle"] = {

                roleName: eventObj.roleName

            }
            console.log(safetyObservation)

            sendCustomEvent("safetyObservationAdded", safetyObservation)

        }

        return safetyObservationCreated;

    } catch (error) {

        console.log(error)

    }
}

const getSafetyObservationById = async (safetyObservationId) => {
    try {

        const safetyObservation = await SafetyObservation.findOne({ _id: safetyObservationId })
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .populate("responsibleJobTitle", "roleName")
            .lean()

        return safetyObservation;
    } catch (error) {
        console.log(error);
    }
}

const updateSafetyObservationById = async (safetyObservationId, objToBeUpdated) => {
    try {

        const updatedSafetyObservation = await SafetyObservation.findByIdAndUpdate({ _id: safetyObservationId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .populate("responsibleJobTitle", "roleName")
            .lean()

        //whenever  safetyObservation is updated then emit an event
        if (updatedSafetyObservation) {

            sendCustomEvent("safetyObservationUpdated", updatedSafetyObservation)

        }

        return updatedSafetyObservation;

    } catch (error) {
        console.log(error);
    }
}

const deleteSafetyObservationById = async (safetyObservationId) => {
    try {

        const deletedSafetyObservation = await SafetyObservation.deleteOne({ _id: safetyObservationId })

        //whenever  safetyObservation is deleted then emit an event
        if (deletedSafetyObservation && deletedSafetyObservation.deletedCount) {

            sendCustomEvent("safetyObservationDeleted", { safetyObservationId })

        }

        return deletedSafetyObservation.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllSafetyObservations = async () => {
    try {

        const safetyObservations = await SafetyObservation.find()
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .populate("responsibleJobTitle", "roleName")
            .lean()

        return safetyObservations;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addSafetyObservation,
    getSafetyObservationById,
    updateSafetyObservationById,
    deleteSafetyObservationById,
    enlistAllSafetyObservations

}