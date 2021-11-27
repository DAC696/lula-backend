const WorkHistory = require('../schemas/workHistory');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new workHistory
 * @param {Object} workHistory 
 */

const addWorkHistory = async (workHistory, eventObj) => {
    try {

        const newWorkHistory = new WorkHistory(workHistory);

        const workHistoryCreated = await newWorkHistory.save();

        //whenever new workHistory is added then emit an event
        if (workHistoryCreated) {

            workHistory["_locationId"] = eventObj;

            //this object will be used to send events  and it contains populated location id and employee id
            sendCustomEvent("workHistoryAdded", workHistory)

        }

        return workHistoryCreated;

    } catch (error) {

        console.log(error)

    }
}

const getWorkHistoryById = async (workHistoryId) => {
    try {

        const workHistory = await WorkHistory.findOne({ _id: workHistoryId })
            .populate('_locationId')
            .populate('_employeeId')
            .lean()

        return workHistory;
    } catch (error) {
        console.log(error);
    }
}

const updateWorkHistoryById = async (workHistoryId, objToBeUpdated) => {
    try {

        const updatedWorkHistory = await WorkHistory.findByIdAndUpdate({ _id: workHistoryId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_locationId')
            .populate('_employeeId')
            .lean()

        //whenever workHistory is updated then emit an event
        if (updatedWorkHistory) {

            sendCustomEvent("workHistoryUpdated", updatedWorkHistory)

        }

        return updatedWorkHistory;
    } catch (error) {
        console.log(error);
    }
}

const deleteWorkHistoryById = async (workHistoryId) => {
    try {

        const deletedWorkHistory = await WorkHistory.deleteOne({ _id: workHistoryId })

        //whenever workHistory is deleted then emit an event
        if (deletedWorkHistory && deletedWorkHistory.deletedCount) {

            sendCustomEvent("workHistoryDeleted", { workHistoryId })

        }

        return deletedWorkHistory.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllWorkHistorys = async (employeeId) => {
    try {

        const workHistorys = await WorkHistory.find({ _employeeId: employeeId })
            .populate('_locationId')
            .populate('_employeeId')
            .lean()

        return workHistorys;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addWorkHistory,
    getWorkHistoryById,
    updateWorkHistoryById,
    deleteWorkHistoryById,
    enlistAllWorkHistorys

}