const Equipment = require('../schemas/equipment');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new equipment
 * @param {Object} equipment 
 */

const addEquipment = async (equipment, eventObj) => {
    try {

        const newEquipment = new Equipment(equipment);

        const equipmentCreated = await newEquipment.save();

        //whenever new equipment is added then emit an event
        if (equipmentCreated) {

            equipment["_locationId"] = {
                locName: eventObj.locName,
                locId: eventObj.locId
            };

            //this object will be used to send events  and it contains populated location id and employee id
            sendCustomEvent("equipmentAdded", equipment)

        }

        return equipmentCreated;

    } catch (error) {

        console.log(error)

    }
}

const getEquipmentById = async (equipmentId) => {
    try {

        const equipment = await Equipment.findOne({ _id: equipmentId })
            .populate('_locationId')
            .lean()

        return equipment;
    } catch (error) {
        console.log(error);
    }
}

const updateEquipmentById = async (equipmentId, objToBeUpdated) => {
    try {

        const updatedEquipment = await Equipment.findByIdAndUpdate({ _id: equipmentId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_locationId')
            .lean()

        //whenever equipment is updated then emit an event
        if (updatedEquipment) {

            sendCustomEvent("equipmentUpdated", updatedEquipment)

        }

        return updatedEquipment;
    } catch (error) {
        console.log(error);
    }
}

const deleteEquipmentById = async (equipmentId) => {
    try {

        const deletedEquipment = await Equipment.deleteOne({ _id: equipmentId })

        //whenever equipment is deleted then emit an event
        if (deletedEquipment && deletedEquipment.deletedCount) {

            sendCustomEvent("equipmentDeleted", { equipmentId })

        }

        return deletedEquipment.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllEquipments = async (employeeId) => {
    try {

        const equipments = await Equipment.find({ _employeeId: employeeId })
            .populate('_locationId')
            .lean()

        return equipments;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllEquipmentsByLocationId = async (locationId) => {
    try {

        const equipments = await Equipment.find({ _locationId: locationId })
            .populate('_locationId')
            .lean()

        return equipments;

    } catch (error) {
        console.log(error);
    }
}

const enlistLastEquipmentsByLocationId = async(locationId) => {
 
    try {

        const equipments = await Equipment.find({ _locationId: locationId })
            
            .populate('_locationId')
            .lean().sort({ $natural: -1 }).limit(1);
        
        return equipments;

    } catch (error) {
        console.log(error);
    }
}

const deleteManyById = async (locationId) => {
    
try{
        const trainings = await Equipment.deleteMany({ _locationId: locationId })

        return trainings
    } catch (error) {
        console.log(error)
    }

}


module.exports = {

    addEquipment,
    getEquipmentById,
    updateEquipmentById,
    deleteEquipmentById,
    deleteManyById,
    enlistAllEquipments,
    enlistAllEquipmentsByLocationId,
    enlistLastEquipmentsByLocationId


}