const Compliance = require('../schemas/compliance');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new aspects And Impact
 * @param {Object} compliance 
 */

const addCompliance = async (compliance, eventObj) => {
    try {

        const newCompliance = new Compliance(compliance);

        const complianceCreated = await newCompliance.save();

        //whenever  compliance is updated then emit an event
        if (complianceCreated) {

            if (eventObj.internalAuditorFirstName)
                compliance["_internalAuditor"] = {

                    firstName: eventObj.internalAuditorFirstName,
                    lastName: eventObj.internalAuditorLastName

                };

            compliance["_locationId"] = {

                locName: eventObj.locName,
                locId: eventObj.locId

            };


            sendCustomEvent("complianceAdded", compliance)

        }

        return complianceCreated;

    } catch (error) {

        console.log(error)

    }
}

const getComplianceById = async (complianceId) => {
    try {

        const compliance = await Compliance.findOne({ _id: complianceId })
            .populate("_internalAuditor", "firstName lastName")
            .populate("_locationId", "locName locId")
            .lean()

        return compliance;
    } catch (error) {
        console.log(error);
    }
}

const updateComplianceById = async (complianceId, objToBeUpdated) => {
    try {

        const updatedCompliance = await Compliance.findByIdAndUpdate({ _id: complianceId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_internalAuditor", "firstName lastName")
            .populate("_locationId", "locName locId")
            .lean()

        //whenever  compliance is updated then emit an event
        if (updatedCompliance) {

            sendCustomEvent("complianceUpdated", updatedCompliance)

        }

        return updatedCompliance;

    } catch (error) {
        console.log(error);
    }
}

const deleteComplianceById = async (complianceId) => {
    try {

        const deletedCompliance = await Compliance.deleteOne({ _id: complianceId })

        //whenever  compliance is deleted then emit an event
        if (deletedCompliance && deletedCompliance.deletedCount) {

            sendCustomEvent("complianceDeleted", { complianceId })

        }

        return deletedCompliance.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllCompliances = async () => {
    try {

        const compliances = await Compliance.find()
            .populate("_internalAuditor", "firstName lastName")
            .populate("_locationId", "locName locId")
            .lean()

        return compliances;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addCompliance,
    getComplianceById,
    updateComplianceById,
    deleteComplianceById,
    enlistAllCompliances

}