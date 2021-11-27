const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addEquipmentValidator = (req, res, next) => {
    try {

        const errors = {};

        const { systems,
            reference,
            equipmentName,
            manufacturer,
            model,
            serialNumber,
            suppliedBy,
            locatedBy,
            safetyCritical,
            value,
            lastMaintained,
            classComponent,
            classCode,
            dateInstalled,
            currentRunningHours,
            status,
            locationId,
            department
        } = req.body
         
        if (isEmpty(equipmentName)) {

            errors.equipmentName = 'equipmentName is required.';

        } else if (!isString(equipmentName)) {

            errors.equipmentName = 'equipmentName is not valid string.';

        }
  
        if (isEmpty(locationId)) {

            errors.locationId = 'Location Id is required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'Location Id is not valid ObjectId.';

        }
 
        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                hasError: true,
                error: [errors]
            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

/** 
* @Description : This handler will be used for both, get Equipment by id and delete Equipment
* @params {mongodb generated ObjectId} EquipmentId
*/
const getEquipmentByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { equipmentId } = req.params;

        if (isEmpty(equipmentId)) {

            errors.equipmentId = 'Equipment Id is required.';

        } else if (!isValidObjectId(equipmentId)) {

            errors.equipmentId = 'Equipment Id is not valid object id.';

        }

        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({

                success: false,
                hasError: true,
                error: [errors]

            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

const updateEquipmentByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { equipmentId } = req.params;

        if (isEmpty(equipmentId)) {

            errors.equipmentId = 'Work History Id is required.';

        } else if (!isValidObjectId(equipmentId)) {

            errors.equipmentId = 'Work History Id is not valid ObjectId.';

        }

        const { systems,
            reference,
            equipmentName,
            manufacturer,
            model,
            serialNumber,
            suppliedBy,
            locatedBy,
            safetyCritical,
            value,
            lastMaintained,
            classComponent,
            classCode,
            dateInstalled,
            currentRunningHours,
            status,
            locationId,
            department
        } = req.body

        if (equipmentName && !isString(equipmentName)) {

            errors.equipmentName = 'equipmentName is not valid string.';

        }


        if (locationId && !isValidObjectId(locationId)) {

            errors.locationId = 'Location Id is not valid ObjectId.';

        } 

        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                hasError: true,
                error: [errors]
            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

/** 
* @Description : This handler will be used for both, get Equipment List by id
* @params {mongodb generated ObjectId} EmployeeId
*/
const getEquipmentListByEmployeeIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid object id.';

        }

        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({

                success: false,
                hasError: true,
                error: [errors]

            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

module.exports = {

    addEquipmentValidator,
    getEquipmentByIdValidator,
    updateEquipmentByIdValidator,
    getEquipmentListByEmployeeIdValidator

}