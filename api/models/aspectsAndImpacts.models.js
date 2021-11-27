const AspectsAndImpact = require('../schemas/aspectsAndImpact');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new aspects And Impact
 * @param {Object} aspectsAndImpact 
 */

const addAspectsAndImpact = async (aspectsAndImpact, eventObj) => {
    try {

        const newAspectsAndImpact = new AspectsAndImpact(aspectsAndImpact);

        const aspectsAndImpactCreated = await newAspectsAndImpact.save();

        //whenever  aspectsAndImpact is updated then emit an event
        if (aspectsAndImpactCreated) {

            aspectsAndImpact["_reviewedBy"] = {

                firstName: eventObj.firstName,
                lastName: eventObj.lastName

            };

            aspectsAndImpact["_locationId"] = {

                locName: eventObj.locName,
                locId: eventObj.locId

            };

            sendCustomEvent("aspectsAndImpactAdded", aspectsAndImpact)

        }

        return aspectsAndImpactCreated;

    } catch (error) {

        console.log(error)

    }
}

const getAspectsAndImpactById = async (aspectsAndImpactId) => {
    try {

        const aspectsAndImpact = await AspectsAndImpact.findOne({ _id: aspectsAndImpactId })
            .populate("_reviewedBy", "firstName lastName")
            .populate("_locationId", "locName locId")
            .lean()

        return aspectsAndImpact;
    } catch (error) {
        console.log(error);
    }
}

const updateAspectsAndImpactById = async (aspectsAndImpactId, objToBeUpdated) => {
    try {

        const updatedAspectsAndImpact = await AspectsAndImpact.findByIdAndUpdate({ _id: aspectsAndImpactId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_reviewedBy", "firstName lastName")
            .populate("_locationId", "locName locId")
            .lean()

        //whenever  aspectsAndImpact is updated then emit an event
        if (updatedAspectsAndImpact) {

            sendCustomEvent("aspectsAndImpactUpdated", updatedAspectsAndImpact)

        }

        return updatedAspectsAndImpact;

    } catch (error) {
        console.log(error);
    }
}

const deleteAspectsAndImpactById = async (aspectsAndImpactId) => {
    try {

        const deletedAspectsAndImpact = await AspectsAndImpact.deleteOne({ _id: aspectsAndImpactId })

        //whenever  aspectsAndImpact is deleted then emit an event
        if (deletedAspectsAndImpact && deletedAspectsAndImpact.deletedCount) {

            sendCustomEvent("aspectsAndImpactDeleted", { aspectsAndImpactId })

        }

        return deletedAspectsAndImpact.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllAspectsAndImpacts = async () => {
    try {

        const aspectsAndImpacts = await AspectsAndImpact.find()
            .populate("_reviewedBy", "firstName lastName")
            .populate("_locationId", "locName locId")
            .lean()

        return aspectsAndImpacts;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addAspectsAndImpact,
    getAspectsAndImpactById,
    updateAspectsAndImpactById,
    deleteAspectsAndImpactById,
    enlistAllAspectsAndImpacts

}