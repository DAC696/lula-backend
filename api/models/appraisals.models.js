const Appraisal = require('../schemas/appraisal');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new appraisals
 * @param {Object} appraisals 
 */

const addAppraisal = async (appraisal) => {
    try {

        const newAppraisal = new Appraisal(appraisal);

        const appraisalCreated = await newAppraisal.save();

        //whenever new appraisal is added then emit an event
        if (appraisalCreated) {

            //this object will be used to send events  and it contains populated location id and employee id
            sendCustomEvent("appraisalAdded", appraisalCreated)

        }

        return appraisalCreated;

    } catch (error) {

        console.log(error)

    }
}

const getAppraisalById = async (appraisalId) => {
    try {

        const appraisal = await Appraisal.findOne({ _id: appraisalId })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        return appraisal;
    } catch (error) {
        console.log(error);
    }
}

const updateAppraisalById = async (appraisalId, objToBeUpdated) => {
    try {

        const updatedAppraisal = await Appraisal.findByIdAndUpdate({ _id: appraisalId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        //whenever appraisals is updated then emit an event
        if (updatedAppraisal) {

            sendCustomEvent("appraisalUpdated", updatedAppraisal)

        }

        return updatedAppraisals;
    } catch (error) {
        console.log(error);
    }
}

const deleteAppraisalById = async (appraisalId) => {
    try {

        const deletedAppraisal = await Appraisal.deleteOne({ _id: appraisalId })

        //whenever appraisals is deleted then emit an event
        if (deletedAppraisal && deletedAppraisal.deletedCount) {

            sendCustomEvent("appraisalDeleted", { appraisalId })

        }

        return deletedAppraisal.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllAppraisals = async (employeeId = undefined) => {
    try {

        if (employeeId) {

            const appraisals = await Appraisal.find({ _employeeId: employeeId })
                .populate('_employeeId', '-profilePhoto')
                .populate('_created_by', '-password')
                .populate('_locationId')
                .populate('_roleId')
                .lean()

            return appraisals;

        } else {

            const appraisals = await Appraisal.find()
                .populate({
                    path: '_employeeId',
                    populate: {
                        path: '_locationId'
                    },
                    select: "-profilePhoto"
                })
                .populate({
                    path: '_employeeId',
                    populate: {
                        path: '_unionId'
                    },
                    select: "-profilePhoto"
                })
                .populate({
                    path: '_employeeId',
                    populate: {
                        path: '_departmentId'
                    },
                    select: "-profilePhoto"
                }).populate('_locationId')
                .populate('_roleId')
                .lean()

            console.log(appraisals[0]._employeeId)
            return appraisals;

        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addAppraisal,
    getAppraisalById,
    updateAppraisalById,
    deleteAppraisalById,
    enlistAllAppraisals,

}