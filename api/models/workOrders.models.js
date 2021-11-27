const WorkOrder = require('../schemas/workOrder');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new workOrder
 * @param {Object} workOrder 
 */

const addWorkOrder = async (workOrder, eventObj) => {
    try {

        const newWorkOrder = new WorkOrder(workOrder);

        const workOrderCreated = await newWorkOrder.save();

        //whenever new workOrder is added then emit an event
        if (workOrderCreated) {

            if (eventObj)
                eventObj["_equipmentId"] = {
                    equipmentName: eventObj && eventObj.equipmentName
                }

            if (eventObj)
                eventObj["_roleId"] = {
                    roleName: eventObj && eventObj.roleName
                }

            sendCustomEvent("workOrderAdded", workOrderCreated)

        }

        return workOrderCreated;

    } catch (error) {

        console.log(error)

    }
}

const getWorkOrderById = async (workOrderId) => {
    try {

        const workOrder = await WorkOrder.findOne({ _id: workOrderId })
            .populate("_equipmentId")
            .populate("parts.partId")
            .populate("_roleId")
            .lean()

        return workOrder;
    } catch (error) {
        console.log(error);
    }
}

const getWorkOrderByEquipmentId = async (equipmentId) => {
    try {

        const workOrders = await WorkOrder.find({ _equipmentId: equipmentId })
            .populate("_equipmentId")
            .populate("parts.partId")
            .populate("_roleId")
            .lean()

        return workOrders;
    } catch (error) {
        console.log(error);
    }
}

const updateWorkOrderById = async (workOrderId, objToBeUpdated) => {
    try {

        const updatedWorkOrder = await WorkOrder.findByIdAndUpdate({ _id: workOrderId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_equipmentId")
            .populate("parts.partId")
            .populate("_roleId")
            .lean()

        //whenever workOrder is updated then emit an event
        if (updatedWorkOrder) {

            sendCustomEvent("workOrderUpdated", updatedWorkOrder)

        }

        return updatedWorkOrder;
    } catch (error) {
        console.log(error);
    }
}

const deleteWorkOrderById = async (workOrderId) => {
    try {

        const deletedWorkOrder = await WorkOrder.deleteOne({ _id: workOrderId })

        //whenever role is deleted then emit an event
        if (deletedWorkOrder && deletedWorkOrder.deletedCount) {

            sendCustomEvent("workOrderDeleted", { workOrderId })

        }

        return deletedWorkOrder.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllWorkOrders = async () => {
    try {

        const workOrders = await WorkOrder.find()
            .populate("_equipmentId")
            .populate("parts.partId")
            .populate("_roleId")
            .lean()

        return workOrders;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addWorkOrder,
    getWorkOrderById,
    updateWorkOrderById,
    deleteWorkOrderById,
    enlistAllWorkOrders,
    getWorkOrderByEquipmentId

}