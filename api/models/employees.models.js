const Employee = require('../schemas/employee');
const { sendCustomEvent } = require("../misc/helperFunctions");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

/**
 * @description This will create new employee
 * @param {Object} employee 
 */

const addEmployee = async (employee, eventObj) => {
    try {

        const newEmployee = new Employee(employee);

        let employeeCreated = await newEmployee.save();

        //whenever new employee is added then emit an event
        if (employeeCreated && employeeCreated) {

            eventObj["_roleId"] = {

                roleName: eventObj.roleName,
                _permissionId: {
                    permissionName: eventObj.permissionName,
                    permissions: eventObj.permissions
                }

            }

            if (eventObj.unionName)
                eventObj["_unionId"] = {

                    unionName: eventObj.unionName,
                    description: eventObj.description

                }

            eventObj["_departmentId"] = {

                departmentName: eventObj.departmentName

            }

            eventObj["_locationId"] = {

                locName: eventObj.locName,
                locId: eventObj.locId,
                email: eventObj.email,
                locSign: eventObj.locSign,
                locStatus: eventObj.locStatus

            }

            sendCustomEvent("employeeAdded", eventObj)

        }

        return employeeCreated;

    } catch (error) {

        console.log(error)

    }
}

const getEmployeeById = async (employeeId) => {
    try {

        const employee = await Employee.findOne({ _id: ObjectId(employeeId) })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_unionId')
            .populate({
                path: '_roleId',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        return employee;
    } catch (error) {
        console.log(error);
    }
}

const updateEmployeeById = async (employeeId, objToBeUpdated) => {
    try {

        const updatedEmployee = await Employee.findByIdAndUpdate({ _id: employeeId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_unionId')
            .populate({
                path: '_roleId',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        //whenever  employee is updated then emit an event
        if (updatedEmployee && updatedEmployee) {

            sendCustomEvent("employeeUpdated", updatedEmployee)

        }

        return updatedEmployee;
    } catch (error) {
        console.log(error);
    }
}

const deleteEmployeeById = async (employeeId) => {
    try {

        const deletedEmployee = await Employee.deleteOne({ _id: employeeId })

        //whenever  employee is deleted then emit an event
        if (deletedEmployee && deletedEmployee.deletedCount) {

            sendCustomEvent("employeeDeleted", { employeeId })

        }

        return deletedEmployee.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllEmployees = async () => {
    try {

        const employees = await Employee.find()
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_unionId')
            .populate('_courses')
            .populate({
                path: '_roleId',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        return employees;

    } catch (error) {
        console.log(error);
    }
}

const getEmployeeByPassportOrInsuranceOrNationalID = async (passportNumber, nationalID, insurance, email) => {
    try {
        if (!passportNumber.length) passportNumber = undefined;
        if (!nationalID.length) nationalID = undefined;
        if (!insurance.length) insurance = undefined;

        console.log(typeof passportNumber, typeof nationalID, insurance, email)

        const employeeFound = await Employee.find(

            { $or: [{ 'passportNumber': passportNumber }, { 'nationalID': nationalID }, { 'insurance': insurance }, { 'email': email }] }

        ).lean()

        return employeeFound;

    } catch (error) {

        console.log(error)

    }
}

const getEmployeeByEmail = async (email) => {
    try {

        const employeeFound = await Employee.findOne({ email })
            .populate({
                path: '_roleId',
                populate: {
                    path: '_permissionId'
                }
            })
            .exec()

        return employeeFound;

    } catch (error) {

        console.log(error)

    }
}

const enlistAllEmployeesByLocationId = async (locationId) => {
    try {

        const employees = await Employee.find({ _locationId: locationId })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_unionId')
            .populate('_courses')
            .populate({
                path: '_roleId',
                populate: {
                    path: '_permissionId'
                }
            })
            .lean()

        return employees;

    } catch (error) {
        console.log(error);
    }
}

//custom emp id
const getLatestEmployee = async () => {
    try {

        const employee = await Employee.find({  })
            .sort({createdAt: -1})
            .limit(1)
            .lean()

        return employee[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getLatestEmployee,
    enlistAllEmployeesByLocationId,
    addEmployee,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
    enlistAllEmployees,
    getEmployeeByPassportOrInsuranceOrNationalID,
    getEmployeeByEmail

}