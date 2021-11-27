const IdeasAndOpportunity = require('../schemas/ideasAndOpportunity');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new ideasAndOpportunity
 * @param {Object} ideasAndOpportunity 
 */

const addIdeasAndOpportunity = async (ideasAndOpportunity, eventObj) => {
    try {

        const newIdeasAndOpportunity = new IdeasAndOpportunity(ideasAndOpportunity);

        const ideasAndOpportunityCreated = await newIdeasAndOpportunity.save();

        //whenever  ideasAndOpportunity is updated then emit an event
        if (ideasAndOpportunityCreated) {

            ideasAndOpportunity["_departmentId"] = {

                departmentName: eventObj.departmentName

            };

            ideasAndOpportunity["_employeeId"] = {

                firstName: eventObj.firstName,
                lastName: eventObj.lastName

            };

            sendCustomEvent("ideasAndOpportunityAdded", ideasAndOpportunity)

        }

        return ideasAndOpportunityCreated;

    } catch (error) {

        console.log(error)

    }
}

const getIdeasAndOpportunityById = async (ideasAndOpportunityId) => {
    try {

        const ideasAndOpportunity = await IdeasAndOpportunity.findOne({ _id: ideasAndOpportunityId })
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .lean()

        return ideasAndOpportunity;
    } catch (error) {
        console.log(error);
    }
}

const updateIdeasAndOpportunityById = async (ideasAndOpportunityId, objToBeUpdated) => {
    try {

        const updatedIdeasAndOpportunity = await IdeasAndOpportunity.findByIdAndUpdate({ _id: ideasAndOpportunityId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .lean()

        //whenever  ideasAndOpportunity is updated then emit an event
        if (updatedIdeasAndOpportunity) {

            sendCustomEvent("ideasAndOpportunityUpdated", updatedIdeasAndOpportunity)

        }

        return updatedIdeasAndOpportunity;

    } catch (error) {
        console.log(error);
    }
}

const deleteIdeasAndOpportunityById = async (ideasAndOpportunityId) => {
    try {

        const deletedIdeasAndOpportunity = await IdeasAndOpportunity.deleteOne({ _id: ideasAndOpportunityId })

        //whenever  ideasAndOpportunity is deleted then emit an event
        if (deletedIdeasAndOpportunity && deletedIdeasAndOpportunity.deletedCount) {

            sendCustomEvent("ideasAndOpportunityDeleted", { ideasAndOpportunityId })

        }

        return deletedIdeasAndOpportunity.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllIdeasAndOpportunities = async () => {
    try {

        const ideasAndOpportunities = await IdeasAndOpportunity.find()
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .lean()

        return ideasAndOpportunities;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addIdeasAndOpportunity,
    getIdeasAndOpportunityById,
    updateIdeasAndOpportunityById,
    deleteIdeasAndOpportunityById,
    enlistAllIdeasAndOpportunities

}