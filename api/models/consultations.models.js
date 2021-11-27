const Consultation = require('../schemas/consultation');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new aspects And Impact
 * @param {Object} consultation 
 */

const addConsultation = async (consultation, eventObj) => {
    try {

        const newConsultation = new Consultation(consultation);

        const consultationCreated = await newConsultation.save();

        //whenever  consultation is updated then emit an event
        if (consultationCreated) {

            //if employee exist then do this otherwise execute else part
            if (eventObj.firstName)
                consultation["_employeeId"] = {

                    firstName: eventObj.firstName,
                    lastName: eventObj.lastName

                };

            consultation["_locationId"] = {

                locName: eventObj.locName,
                locId: eventObj.locId

            };

            consultation["_crewPosition"] = {

                roleName: eventObj.roleName,
                _permissionId: {

                    permissionName: eventObj._permissionId.permissionName,
                    permissions: eventObj._permissionId.permissions

                }

            };

            sendCustomEvent("consultationAdded", consultation)

        }

        return consultationCreated;

    } catch (error) {

        console.log(error)

    }
}

const getConsultationById = async (consultationId) => {
    try {

        const consultation = await Consultation.findOne({ _id: consultationId })
            .populate("_employeeId", "firstName lastName")
            .populate("_locationId", "locName locId")
            .populate({
                path: '_crewPosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        return consultation;
    } catch (error) {
        console.log(error);
    }
}

const updateConsultationById = async (consultationId, objToBeUpdated) => {
    try {

        const updatedConsultation = await Consultation.findByIdAndUpdate({ _id: consultationId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_employeeId", "firstName lastName")
            .populate("_locationId", "locName locId")
            .populate({
                path: '_crewPosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        //whenever  consultation is updated then emit an event
        if (updatedConsultation) {

            sendCustomEvent("consultationUpdated", updatedConsultation)

        }

        return updatedConsultation;

    } catch (error) {
        console.log(error);
    }
}

const deleteConsultationById = async (consultationId) => {
    try {

        const deletedConsultation = await Consultation.deleteOne({ _id: consultationId })

        //whenever  consultation is deleted then emit an event
        if (deletedConsultation && deletedConsultation.deletedCount) {

            sendCustomEvent("consultationDeleted", { consultationId })

        }

        return deletedConsultation.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllConsultations = async () => {
    try {

        const consultations = await Consultation.find()
            .populate("_employeeId", "firstName lastName")
            .populate("_locationId", "locName locId")
            .populate({
                path: '_crewPosition',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        return consultations;

    } catch (error) {
        console.log(error);
    }
}

const getLastConsultation = async () => {
    try {
        const consulation = await Consultation.findOne()
            .sort({ createdAt: -1 })
            .lean()

        return consulation
    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    addConsultation,
    getConsultationById,
    updateConsultationById,
    deleteConsultationById,
    enlistAllConsultations,
    getLastConsultation

}