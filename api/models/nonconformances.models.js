const NonConformance = require('../schemas/nonConformance');
const { sendCustomEvent } = require("../misc/helperFunctions");
const moment = require("moment")

/**
 * @description This will create new nonConformance
 * @param {Object} nonConformance 
 */

const addNonConformance = async (nonConformance, eventObj) => {
    try {

        const newNonConformance = new NonConformance(nonConformance);

        const nonConformanceCreated = await newNonConformance.save();

        //whenever  nonConformance is updated then emit an event
        if (nonConformanceCreated) {

            nonConformance["_observerPosition"] = {

                roleName: eventObj.observerRoleName,
                _permissionId: {

                    permissionName: eventObj._observerPermissionId.permissionName,
                    permissions: eventObj._observerPermissionId.permissions

                }

            };

            nonConformance["_observerName"] = {

                firstName: eventObj.observerFirstName,
                lastName: eventObj.observerLastName

            };

            nonConformance["_areaInchargePosition"] = {

                roleName: eventObj.areaInchargeRoleName,
                _permissionId: {

                    permissionName: eventObj._areaInchargePermissionId.permissionName,
                    permissions: eventObj._areaInchargePermissionId.permissions

                }

            };

            nonConformance["_areaInchargeName"] = {

                firstName: eventObj.areaInchargeFirstName,
                lastName: eventObj.areaInchargeLastName

            };

            nonConformance["_vesselIdentification"] = {

                locName: eventObj.locName,
                locId: eventObj.locId

            };

            sendCustomEvent("nonConformanceAdded", nonConformance)

        }

        return nonConformanceCreated;

    } catch (error) {

        console.log(error)

    }
}

const getNonConformanceById = async (nonConformanceId) => {
    try {

        const nonConformance = await NonConformance.findOne({ _id: nonConformanceId })
            .populate("_observerName", "firstName lastName")
            .populate("_areaInchargeName", "firstName lastName")
            .populate("_vesselIdentification", "locName locId")
            .populate({
                path: '_observerPosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .populate({
                path: '_areaInchargePosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        return nonConformance;
    } catch (error) {
        console.log(error);
    }
}

const updateNonConformanceById = async (nonConformanceId, objToBeUpdated) => {
    try {

        const updatedNonConformance = await NonConformance.findByIdAndUpdate({ _id: nonConformanceId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_observerName", "firstName lastName")
            .populate("_areaInchargeName", "firstName lastName")
            .populate("_vesselIdentification", "locName locId")
            .populate({
                path: '_observerPosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .populate({
                path: '_areaInchargePosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        //whenever  nonConformance is updated then emit an event
        if (updatedNonConformance) {

            sendCustomEvent("nonConformanceUpdated", updatedNonConformance)

        }

        const year = moment(updatedNonConformance.createdAt).format("yyyy")

        updatedNonConformance["annualCorrelativeNumber"] = `${year}-${updatedNonConformance.annualCorrelativeNumber}`


        return updatedNonConformance;

    } catch (error) {
        console.log(error);
    }
}

const deleteNonConformanceById = async (nonConformanceId) => {
    try {

        const deletedNonConformance = await NonConformance.deleteOne({ _id: nonConformanceId })

        //whenever  nonConformance is deleted then emit an event
        if (deletedNonConformance && deletedNonConformance.deletedCount) {

            sendCustomEvent("nonConformanceDeleted", { nonConformanceId })

        }

        return deletedNonConformance.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllNonConformances = async () => {
    try {

        const nonConformances = await NonConformance.find()
            .populate("_observerName", "firstName lastName")
            .populate("_areaInchargeName", "firstName lastName")
            .populate("_vesselIdentification", "locName locId")
            .populate({
                path: '_observerPosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .populate({
                path: '_areaInchargePosition',
                populate: {
                    path: '_permissionId'
                }
            }).lean()

        return nonConformances;

    } catch (error) {
        console.log(error);
    }
}

const getLastNonConformance = async () => {
    try {
        const nonConformance = await NonConformance.findOne()
            .sort({ createdAt: -1 })
            .lean()

        return nonConformance
    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    addNonConformance,
    getNonConformanceById,
    updateNonConformanceById,
    deleteNonConformanceById,
    enlistAllNonConformances,
    getLastNonConformance

}