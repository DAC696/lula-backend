const SalaryCalculator = require('../schemas/salaryCalculator');
const Employee = require('../schemas/employee');
const Location=require('../schemas/location');
const { sendCustomEvent } = require("../misc/helperFunctions");
const moment = require('moment')

/**
 * @description This will create new salaryCalculator
 * @param {Object} salaryCalculator 
 */

const addSalaryCalculator = async (salaryCalculator, eventObj) => {
    try {

        const newSalaryCalculator = new SalaryCalculator(salaryCalculator);

        const salaryCalculatorCreated = await newSalaryCalculator.save();

        //whenever new salaryCalculator is added then emit an event
        if (salaryCalculatorCreated) {

            salaryCalculator["_employeeId"] = {

                firstName: eventObj.firstName,
                lastName: eventObj.lastName

            };

            sendCustomEvent("salaryCalculatorAdded", salaryCalculatorCreated)

        }

        return salaryCalculatorCreated;

    } catch (error) {

        console.log(error)

    }
}

const getSalaryCalculatorById = async (salaryCalculatorId) => {
    try {

        const salaryCalculator = await SalaryCalculator.findOne({ _id: salaryCalculatorId })
            .populate("_employeeId", "firstName lastName")
            .lean()

        return salaryCalculator;
    } catch (error) {
        console.log(error);
    }
}

const updateSalaryCalculatorById = async (salaryCalculatorId, objToBeUpdated) => {
    try {

        const updatedSalaryCalculator = await SalaryCalculator.findByIdAndUpdate({ _id: salaryCalculatorId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_employeeId", "firstName lastName")
            .lean()

        //whenever salaryCalculator is updated then emit an event
        if (updatedSalaryCalculator) {

            sendCustomEvent("salaryCalculatorUpdated", updatedSalaryCalculator)

        }

        return updatedSalaryCalculator;
    } catch (error) {
        console.log(error);
    }
}

const deleteSalaryCalculatorById = async (salaryCalculatorId) => {
    try {

        const deletedSalaryCalculator = await SalaryCalculator.deleteOne({ _id: salaryCalculatorId })

        //whenever salaryCalculator is deleted then emit an event
        if (deletedSalaryCalculator && deletedSalaryCalculator.deletedCount) {

            sendCustomEvent("salaryCalculatorDeleted", { salaryCalculatorId })

        }

        return deletedSalaryCalculator.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllSalaryCalculators = async (startDate=undefined, endDate=undefined) => {
    try {

        if(!startDate || !endDate){

            const salaryCalculators = await SalaryCalculator.find()
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
            return salaryCalculators
        }else if(startDate && endDate){
            const conditionObj = {}

            conditionObj["endDate"] = {$gte: moment(startDate).toDate(),$lte: moment(endDate).toDate()}
     
            const salaryCalculators = await SalaryCalculator.find() 
               .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();

                return salaryCalculators

        }
 

        return salaryCalculators;

    } catch (error) {
        console.log(error);
    }
}

//get salaries by em
const enlistAllSalaryCalculatorsByEmployeeId = async (employeeId) => {
    try {

        const salaryCalculators = await SalaryCalculator.find({ _employeeId: employeeId })
            .populate("_employeeId", "firstName lastName")
            .lean()

        return salaryCalculators;

    } catch (error) {
        console.log(error);
    }
}
//get Salary Calcualtor by type
const enlistAllSalaryCalculatorsByType = async (salaryCalculators) =>
{
    try
    {
        if (salaryCalculators.type == 'location')
        {
            const location = await Location.findById(salaryCalculators.locId);
            const employess = await Employee.find({ _locationId: location._id });
            // console.log(employess);
            const employeesIds = employess.map(e =>
            {
                return e._id;
            })
            const salaryCalcualtorObject = await SalaryCalculator.find({ _employeeId: { $in: employeesIds } })
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
            return salaryCalcualtorObject
        } else if (salaryCalculators.type == 'date')
        {
            const salaryCalculatorObject = await SalaryCalculator.find({ _employeeId: salaryCalculators.employId,startDate:{$gte:moment(salaryCalculators.fromDate)},endDate:{$lt:moment(salaryCalculators.toDate)}, })
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
            return salaryCalculatorObject;
        } else if (salaryCalculators.type == 'all')
        {
            const salaryCalculatorObject = await SalaryCalculator.find()
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
            return salaryCalculatorObject
    }
    }catch (error) {
        console.log(error);
    }
}



const getSalaryCalculatorsByIds = async (salaryCalculators) => {
    try {

        const salaryCalculatorsCount = await SalaryCalculator.find({ _id: { $in: salaryCalculators } })
            .lean()

        return salaryCalculatorsCount;

    } catch (error) {
        console.log(error);
    }
}
module.exports = {

    addSalaryCalculator,
    getSalaryCalculatorsByIds,
    getSalaryCalculatorById,
    updateSalaryCalculatorById,
    deleteSalaryCalculatorById,
    enlistAllSalaryCalculators,
    enlistAllSalaryCalculatorsByEmployeeId,
    enlistAllSalaryCalculatorsByType

}