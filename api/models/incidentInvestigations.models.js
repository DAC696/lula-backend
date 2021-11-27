const IncidentInvestigation = require('../schemas/incidentInvestigation');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new incidentInvestigation
 * @param {Object} incidentInvestigation 
 */

const addIncidentInvestigation = async (incidentInvestigation, eventObj) => {
    try {

        const newIncidentInvestigation = new IncidentInvestigation(incidentInvestigation);

        const incidentInvestigationCreated = await newIncidentInvestigation.save();

        //whenever  incidentInvestigation is updated then emit an event
        if (incidentInvestigationCreated) {

            incidentInvestigation["_departmentId"] = {

                departmentName: eventObj.departmentName

            };

            incidentInvestigation["_reporter"] = {

                firstName: eventObj.firstName,
                lastName: eventObj.lastName

            };

            incidentInvestigation["_roleId"] = {

                roleName: eventObj.roleName

            }

            incidentInvestigation["documents"] = eventObj.documents;

            sendCustomEvent("incidentInvestigationAdded", incidentInvestigation)

        }

        return incidentInvestigationCreated;

    } catch (error) {

        console.log(error)

    }
}

const getIncidentInvestigationById = async (incidentInvestigationId) => {
    try {

        const incidentInvestigation = await IncidentInvestigation.findOne({ _id: incidentInvestigationId })
            .populate("_reporter", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .populate("_roleId", "roleName")
            .lean()

        return incidentInvestigation;
    } catch (error) {
        console.log(error);
    }
}

const updateIncidentInvestigationById = async (incidentInvestigationId, objToBeUpdated) => {
    try {

        const updatedIncidentInvestigation = await IncidentInvestigation.findByIdAndUpdate({ _id: incidentInvestigationId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_reporter", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .populate("_roleId", "roleName")
            .lean()

        //whenever  incidentInvestigation is updated then emit an event
        if (updatedIncidentInvestigation) {

            sendCustomEvent("incidentInvestigationUpdated", updatedIncidentInvestigation)

        }

        return updatedIncidentInvestigation;

    } catch (error) {
        console.log(error);
    }
}

const deleteIncidentInvestigationById = async (incidentInvestigationId) => {
    try {

        const deletedIncidentInvestigation = await IncidentInvestigation.deleteOne({ _id: incidentInvestigationId })

        //whenever  incidentInvestigation is deleted then emit an event
        if (deletedIncidentInvestigation && deletedIncidentInvestigation.deletedCount) {

            sendCustomEvent("incidentInvestigationDeleted", { incidentInvestigationId })

        }

        return deletedIncidentInvestigation.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllIncidentInvestigations = async () => {
    try {

        const incidentInvestigations = await IncidentInvestigation.find()
            .populate("_reporter", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .populate("_roleId", "roleName")
            .lean()

        return incidentInvestigations;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addIncidentInvestigation,
    getIncidentInvestigationById,
    updateIncidentInvestigationById,
    deleteIncidentInvestigationById,
    enlistAllIncidentInvestigations

}