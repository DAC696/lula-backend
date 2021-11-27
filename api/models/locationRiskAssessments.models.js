const LocationRiskAssessment = require('../schemas/locationRiskAssessment');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new locationRiskAssessment
 * @param {Object} locationRiskAssessment 
 */

const addLocationRiskAssessment = async (locationRiskAssessment, eventObj) => {
    try {

        const newLocationRiskAssessment = new LocationRiskAssessment(locationRiskAssessment);

        const locationRiskAssessmentCreated = await newLocationRiskAssessment.save();

        //whenever  locationRiskAssessment is updated then emit an event
        if (locationRiskAssessmentCreated) {

            locationRiskAssessment["_responsibleRole"] = {

                roleName: eventObj.roleName

            };

            locationRiskAssessment["_locationId"] = {

                locName: eventObj.locName,
                locId: eventObj.locId

            };

            sendCustomEvent("locationRiskAssessmentAdded", locationRiskAssessment)

        }

        return locationRiskAssessmentCreated;

    } catch (error) {

        console.log(error)

    }
}

const getLocationRiskAssessmentById = async (locationRiskAssessmentId) => {
    try {

        const locationRiskAssessment = await LocationRiskAssessment.findOne({ _id: locationRiskAssessmentId })
            .populate("_responsibleRole", "roleName")
            .populate("_locationId", "locName locId")
            .lean()

        return locationRiskAssessment;
    } catch (error) {
        console.log(error);
    }
}

const updateLocationRiskAssessmentById = async (locationRiskAssessmentId, objToBeUpdated) => {
    try {

        const updatedLocationRiskAssessment = await LocationRiskAssessment.findByIdAndUpdate({ _id: locationRiskAssessmentId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_responsibleRole", "roleName")
            .populate("_locationId", "locName locId")
            .lean()

        //whenever  locationRiskAssessment is updated then emit an event
        if (updatedLocationRiskAssessment) {

            sendCustomEvent("locationRiskAssessmentUpdated", updatedLocationRiskAssessment)

        }

        return updatedLocationRiskAssessment;

    } catch (error) {
        console.log(error);
    }
}

const deleteLocationRiskAssessmentById = async (locationRiskAssessmentId) => {
    try {

        const deletedLocationRiskAssessment = await LocationRiskAssessment.deleteOne({ _id: locationRiskAssessmentId })

        //whenever  locationRiskAssessment is deleted then emit an event
        if (deletedLocationRiskAssessment && deletedLocationRiskAssessment.deletedCount) {

            sendCustomEvent("locationRiskAssessmentDeleted", { locationRiskAssessmentId })

        }

        return deletedLocationRiskAssessment.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllLocationRiskAssessments = async () => {
    try {

        const locationRiskAssessments = await LocationRiskAssessment.find()
            .populate("_responsibleRole", "roleName")
            .populate("_locationId", "locName locId")
            .lean()

        return locationRiskAssessments;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addLocationRiskAssessment,
    getLocationRiskAssessmentById,
    updateLocationRiskAssessmentById,
    deleteLocationRiskAssessmentById,
    enlistAllLocationRiskAssessments

}