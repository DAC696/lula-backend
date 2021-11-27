const Department = require('../schemas/department');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new department
 * @param {Object} department 
 */

const addDepartment = async (department) => {
    try {

        const newDepartment = new Department(department);

        const departmentCreated = await newDepartment.save();

        //whenever  department is updated then emit an event
        if (departmentCreated) {

            sendCustomEvent("departmentAdded", departmentCreated)

        }

        return departmentCreated;

    } catch (error) {

        console.log(error)

    }
}

const getDepartmentById = async (departmentId) => {
    try {

        const department = await Department.findOne({ _id: departmentId })
            .lean()

        return department;
    } catch (error) {
        console.log(error);
    }
}

const updateDepartmentById = async (departmentId, objToBeUpdated) => {
    try {

        const updatedDepartment = await Department.findByIdAndUpdate({ _id: departmentId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever  department is updated then emit an event
        if (updatedDepartment) {

            sendCustomEvent("departmentUpdated", updatedDepartment)

        }

        return updatedDepartment;
    } catch (error) {
        console.log(error);
    }
}

const deleteDepartmentById = async (departmentId) => {
    try {

        const deletedDepartment = await Department.deleteOne({ _id: departmentId })

        //whenever  department is deleted then emit an event
        if (deletedDepartment && deletedDepartment.deletedCount) {

            sendCustomEvent("departmentDeleted", { departmentId })

        }

        return deletedDepartment.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllDepartments = async () => {
    try {

        const departments = await Department.find()
            .lean()

        return departments;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addDepartment,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById,
    enlistAllDepartments

}