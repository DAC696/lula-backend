const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addPpeValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid ObjectId.';

        }

        const { ppe, description } = req.body;

        if (isEmpty(ppe)) {

            errors.ppe = 'PPE is required.';

        } else if (!isString(ppe)) {

            errors.ppe = 'PPE is not valid string.';

        }

        if (isEmpty(description)) {

            errors.description = 'Description is required.';

        } else if (!isString(description)) {

            errors.description = 'Description is not valid string.';

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
* @Description : This handler will be used for both, get Ppe by id and delete Ppe
* @params {mongodb generated ObjectId} PpeId
*/
const getPpeByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { ppeId } = req.params;

        if (isEmpty(ppeId)) {

            errors.ppeId = 'Ppe Id is required.';

        } else if (!isValidObjectId(ppeId)) {

            errors.ppeId = 'Ppe Id is not valid object id.';

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

const updatePpeByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { ppeId } = req.params;

        if (isEmpty(ppeId)) {

            errors.ppeId = 'Work History Id is required.';

        } else if (!isValidObjectId(ppeId)) {

            errors.ppeId = 'Work History Id is not valid ObjectId.';

        }

        const { ppe, description } = req.body;

        if (ppe && !isString(ppe)) {

            errors.ppe = 'PPE is not valid string.';

        }

        if (description && !isString(description)) {

            errors.description = 'Description is not valid string.';

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
* @Description : This handler will be used for both, get Ppe List by id
* @params {mongodb generated ObjectId} EmployeeId
*/
const getPpeListByEmployeeIdValidator = (req, res, next) => {
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

    addPpeValidator,
    getPpeByIdValidator,
    updatePpeByIdValidator,
    getPpeListByEmployeeIdValidator

}