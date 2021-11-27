const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addWorkHistoryValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid ObjectId.';

        }

        const { startDate, endDate, isPresent, locationId, description } = req.body;

        if (isEmpty(startDate)) {

            errors.startDate = 'start date is required.';

        } else if (!isString(startDate)) {

            errors.startDate = 'start date is not valid string.';

        }

        //optional
        if (endDate && !isString(endDate)) {

            errors.endDate = 'end date is not valid string.';

        }

        if (isEmpty(description)) {

            errors.description = 'description is required.';

        } else if (!isString(description)) {

            errors.description = 'description is not valid string.';

        }

        if (isEmpty(isPresent)) {

            errors.isPresent = 'isPresent is required.';

        } else if (!isBoolean(isPresent)) {

            errors.isPresent = 'isPresent is not valid Boolean.';

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
* @Description : This handler will be used for both, get WorkHistory by id and delete WorkHistory
* @params {mongodb generated ObjectId} WorkHistoryId
*/
const getWorkHistoryByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { workHistoryId } = req.params;

        if (isEmpty(workHistoryId)) {

            errors.workHistoryId = 'WorkHistory Id is required.';

        } else if (!isValidObjectId(workHistoryId)) {

            errors.workHistoryId = 'WorkHistory Id is not valid object id.';

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

const updateWorkHistoryByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { workHistoryId } = req.params;

        if (isEmpty(workHistoryId)) {

            errors.workHistoryId = 'Work History Id is required.';

        } else if (!isValidObjectId(workHistoryId)) {

            errors.workHistoryId = 'Work History Id is not valid ObjectId.';

        }

        const { startDate, endDate, isPresent, locationId, description } = req.body;

        if (startDate && !isString(startDate)) {

            errors.startDate = 'start date is not valid string.';

        }

        if (endDate && !isString(endDate)) {

            errors.endDate = 'end date is not valid string.';

        }

        if (description && !isString(description)) {

            errors.description = 'Description is not valid string.';

        }

        if (isPresent && !isBoolean(isPresent)) {

            errors.isPresent = 'isPresent is not valid Boolean.';

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
* @Description : This handler will be used for both, get WorkHistory List by id
* @params {mongodb generated ObjectId} EmployeeId
*/
const getWorkHistoryListByEmployeeIdValidator = (req, res, next) => {
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

    addWorkHistoryValidator,
    getWorkHistoryByIdValidator,
    updateWorkHistoryByIdValidator,
    getWorkHistoryListByEmployeeIdValidator

}