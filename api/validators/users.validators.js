const { isEmpty, isString, validatePhone, isValidObjectId, isEmail, isPassword, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const createNewUser = (req, res, next) => {
    try {
        const errors = {};

        const { firstName, lastName, password, email } = req.body;

        if (isEmpty(firstName)) {

            errors.firstName = 'FirstName is required.';

        } else if (!isString(firstName)) {

            errors.firstName = 'FirstName is not valid.';

        }

        if (isEmpty(lastName)) {

            errors.lastName = 'LastName is required.';

        } else if (!isString(lastName)) {

            errors.lastName = 'LastName is not valid.';

        }

        if (isEmpty(email)) {

            errors.email = 'Email is required.';

        } else if (!isEmail(email)) {

            errors.email = 'Email is not valid.';

        }

        // validation for password in req.body

        if (isEmpty(password)) {

            errors.password = 'password is required.';

        } else if (!isString(password)) {

            errors.password = 'Should be a valid string';

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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]
        })
    }
}

// validate username and password for login
const loginValidator = (req, res, next) => {
    try {
        const errors = {};

        const { email, password } = req.body;

        if (isEmpty(email)) {

            errors.email = 'email is required.';

        } else if (!isEmail(email)) {

            errors.email = 'email is not valid.';

        }

        // validation for password in req.body

        if (isEmpty(password)) {

            errors.password = 'password is required.';

        } else if (!isString(password)) {

            errors.password = 'Should be a valid string';

        }

        if (Object.keys(errors).length > 0) {

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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

const resetPasswordValidator = (req, res, next) => {
    try {
        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'employee Id is not valid Object Id.';

        }

        const { resetPassword } = req.body;

        if (isEmpty(resetPassword)) {

            errors.resetPassword = 'ResetPassword is required.';

        } else if (!isString(resetPassword)) {

            errors.resetPassword = 'ResetPassword is not valid string.';

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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]
        })
    }
}

module.exports = {

    loginValidator,
    createNewUser,
    resetPasswordValidator

}