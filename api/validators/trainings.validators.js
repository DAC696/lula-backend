const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addTrainingValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        const { courseId, validDate, expiryDate  } = req.body;

        // validation for courseId in req.params

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id Should be a valid string';

        }
        if (isEmpty(validDate)) {

            errors.validDate = 'Valid Date is required.';

        } else if (!isString(validDate)) {

            errors.validDate = 'Valid Date is not valid string.';

        }

        if (isEmpty(expiryDate)) {

            errors.expiryDate = 'Expiry Date is required.';

        } else if (!isString(expiryDate)) {

            errors.expiryDate = 'Expiry Date is not valid string.';

        }

        // validation for courseId in req.body

        if (isEmpty(courseId)) {

            errors.courseId = 'Course Id is required.';

        } else if (!isValidObjectId(courseId)) {

            errors.courseId = 'Course Id Should be a valid string';

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
* @Description : This handler will be used for both, get Training by id and delete Training
* @params {mongodb generated ObjectId} employeeId
*/
const getTrainingListByEmployeeIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'employee Id is not valid object id.';

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

const updateTrainingByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { trainingId } = req.params;

        if (isEmpty(trainingId)) {

            errors.trainingId = 'training Id is required.';

        } else if (!isValidObjectId(trainingId)) {

            errors.trainingId = 'training Id is not valid object id.';

        }

        const { trainingStatus, validDate, expiryDate  } = req.body;


        if (!isEmpty(trainingStatus) && !isString(trainingStatus)) {

            errors.trainingStatus = 'training status is not valid.';

            
        }
           if (validDate && !isString(validDate)) {

            errors.validDate = 'Valid Date is not valid string.';

        }

        if (expiryDate && !isString(expiryDate)) {

            errors.expiryDate = 'Expiry Date is not valid string.';
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

    addTrainingValidator,
    getTrainingListByEmployeeIdValidator,
    updateTrainingByIdValidator

}