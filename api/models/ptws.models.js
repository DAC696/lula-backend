const PTW = require('../schemas/ptw');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new ptw
 * @param {Object} ptw 
 */

const addPTW = async (ptw, eventObj) => {
    try {

        const newPTW = new PTW(ptw);

        const ptwCreated = await newPTW.save();

        //whenever  ptw is updated then emit an event
        if (ptwCreated) {

            ptw["_requestedBy"] = {

                firstName: eventObj.requesterFirstName,
                lastName: eventObj.requesterLastName

            };

            ptw["_isolationPerformedBy"] = {

                firstName: eventObj.performerFirstName,
                lastName: eventObj.performerLastName

            };

            sendCustomEvent("ptwAdded", ptw)

        }

        return ptwCreated;

    } catch (error) {

        console.log(error)

    }
}

const getPTWById = async (ptwId) => {
    try {

        const ptw = await PTW.findOne({ _id: ptwId })
            .populate("_requestedBy", "firstName lastName")
            .populate("_isolationPerformedBy", "firstName lastName")
            .lean()

        return ptw;

    } catch (error) {
        console.log(error);
    }
}

const updatePTWById = async (ptwId, objToBeUpdated) => {
    try {

        const updatedPTW = await PTW.findByIdAndUpdate({ _id: ptwId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_requestedBy", "firstName lastName")
            .populate("_isolationPerformedBy", "firstName lastName")
            .lean()

        //whenever  ptw is updated then emit an event
        if (updatedPTW) {

            sendCustomEvent("ptwUpdated", updatedPTW)

        }

        return updatedPTW;

    } catch (error) {
        console.log(error);
    }
}

const deletePTWById = async (ptwId) => {
    try {

        const deletedPTW = await PTW.deleteOne({ _id: ptwId })

        //whenever  ptw is deleted then emit an event
        if (deletedPTW && deletedPTW.deletedCount) {

            sendCustomEvent("ptwDeleted", { ptwId })

        }

        return deletedPTW.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllPTWs = async () => {
    try {

        const ptws = await PTW.find()
            .populate("_requestedBy", "firstName lastName")
            .populate("_isolationPerformedBy", "firstName lastName")
            .lean()

        return ptws;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addPTW,
    getPTWById,
    updatePTWById,
    deletePTWById,
    enlistAllPTWs

}