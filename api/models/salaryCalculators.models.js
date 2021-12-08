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
            let employeeArray = [];
            for (var k = 0; k < employess.length; k++){
                const salaryCalculatorObject = await SalaryCalculator.find({ _employeeId:  employess[k]._id , startDate: { $gte: moment(salaryCalculators.fromDate) }, endDate: { $lt: moment(salaryCalculators.toDate) }, })
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
                // const salaryCalculatorObject = await SalaryCalculator.find({ _employeeId: { $in: employeesIds }, startDate: { $gte: moment(salaryCalculators.fromDate) }, endDate: { $lt: moment(salaryCalculators.toDate) }, })
                // .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                // .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                // .lean();
            let seen = new Set(salaryCalculatorObject.map(v => v.code.name));
            let codeArray = [];
            seen.forEach(v => codeArray.push(v));
            let total = [];
            codeArray.map(c => total.push({ days: 0, flag: false }));
            
            let newArray = [];
            for (var i = 0; i < codeArray.length; i++)
            {
                for (var j = 0; j < salaryCalculatorObject.length; j++)
                {
                    if (codeArray[i] === salaryCalculatorObject[j].code.name)
                        if (!total[i].flag)
                        {
                            total[i].days = total[i].days + salaryCalculatorObject[j].dates.length;
                            let data = { ...salaryCalculatorObject[j], total_days:total[i].days };
                            total[i].flag=true;
                            newArray.push(data);
                        } else
                        {
                            total[i].days = total[i].days + salaryCalculatorObject[j].dates.length;
                            let data = { ...newArray[i], total_days: total[i].days };
                            newArray[i] = data;
                        }
                }
            
                }
                if (newArray.length > 0) {
                   let data = { employee: employess[k], salary:newArray };
                employeeArray.push(data);
            } 
                }
            return employeeArray;
            
        } else if (salaryCalculators.type == 'date')
        {
           

            const salaryCalculatorObject = await SalaryCalculator.find({ _employeeId: salaryCalculators.employId,startDate:{$gte:moment(salaryCalculators.fromDate)},endDate:{$lt:moment(salaryCalculators.toDate)}, })
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
            console.log(salaryCalculatorObject);
            let seen = new Set(salaryCalculatorObject.map(v => v.code.name));
            let codeArray = [];
            seen.forEach(v => codeArray.push(v));
            console.log(codeArray);
            let total = [];
            codeArray.map(c => total.push({ days: 0, flag: false }));
            
            let newArray = [];
            for (var i = 0; i < codeArray.length; i++)
            {
                for (var j = 0; j < salaryCalculatorObject.length; j++)
                {
                    if (codeArray[i] === salaryCalculatorObject[j].code.name)
                        if (!total[i].flag)
                        {
                            total[i].days = total[i].days + salaryCalculatorObject[j].dates.length;
                            let data = { ...salaryCalculatorObject[j], total_days:total[i].days };
                            total[i].flag=true;
                            newArray.push(data);
                        } else
                        {
                            total[i].days = total[i].days + salaryCalculatorObject[j].dates.length;
                            let data = { ...newArray[i], total_days: total[i].days };
                            newArray[i] = data;
                        }
                }
            }
            
            return newArray;
        } else if (salaryCalculators.type == 'all')
        {

            const startDate =moment(salaryCalculators.fromDate).format('YYYY-MM-DD');
            const endDate = moment(salaryCalculators.toDate).format('YYYY-MM-DD');
            const employess = await Employee.find();
            console.log(startDate,endDate)
            // console.log(employess);
            // const employeesIds = employess.map(e =>
            // {
            //     return e._id;
            // })
            // console.log(employess.length);
            let employeeArray = [];
            for (var k = 0; k < employess.length; k++){
                const salaryCalculatorObject = await SalaryCalculator.find({ _employeeId:  employess[k]._id , dates: { $gte: startDate,$lte:endDate } })
                .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                .lean();
                // const salaryCalculatorObject = await SalaryCalculator.find({ _employeeId: { $in: employeesIds }, startDate: { $gte: moment(salaryCalculators.fromDate) }, endDate: { $lt: moment(salaryCalculators.toDate) }, })
                // .populate({ path: '_employeeId', select: "-_id firstName lastName", model: 'Employee', populate: { path: '_roleId', select: 'roleName -_id', model: 'Role' } })
                // .populate({path:'_employeeId',select: "-_id firstName lastName", model: 'Employee',populate:{path:'_locationId',select:'locName -_id',model:'Location'}})
                // .lean();
                // console.log(employess[k]._id,salaryCalculatorObject.length);
                let refinedSalaryArray = salaryCalculatorObject.map(e => {
                    let x;
                    let y;
                    for (var l = 0; l < e.dates.length; l++) {
                        if (e.dates[l] == startDate) {
                            x = l;
                        }
                        if (e.dates[l] == endDate) {
                            y = l;
                        }
                    }
                    console.log(x, y);
                    // e.dates.slice(x, y);
                    // console.log(e.dates.slice(x, y+1));
                    if (x && !y) {
                        let dates = e.dates.slice(x)
                        e.dates = dates;
                        return e;
                    } else if (!x && y) {
                        let dates = e.dates.slice(0, y + 1)
                        e.dates = dates;
                        return e;
                    } else {
                        let dates = e.dates.slice(x, y);
                        e.dates = dates;
                        return e;
                    }
                });
                // console.log(refinedSalraryArray);
            let seen = new Set(refinedSalaryArray.map(v => v.code.name));
            let codeArray = [];
            seen.forEach(v => codeArray.push(v));
            let total = [];
            codeArray.map(c => total.push({ days: 0, flag: false }));
                // console.log("in code Array",codeArray);
            let newArray = [];
            for (var i = 0; i < codeArray.length; i++)
            {
                for (var j = 0; j < refinedSalaryArray.length; j++)
                {
                    console.log("in salry calcualtor");
                    if (codeArray[i] === refinedSalaryArray[j].code.name)
                        if (!total[i].flag)
                        {
                            total[i].days = total[i].days + refinedSalaryArray[j].dates.length;
                            let data = { ...refinedSalaryArray[j], total_days:total[i].days };
                            total[i].flag=true;
                            newArray.push(data);
                        } else
                        {
                            total[i].days = total[i].days + refinedSalaryArray[j].dates.length;
                            let data = { ...newArray[i], total_days: total[i].days };
                            newArray[i] = data;
                        }
                }
            
                }
                if (newArray.length > 0) {
                   let data = { employee: employess[k], salary:newArray };
                employeeArray.push(data);
            } 
                }
            return employeeArray;
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