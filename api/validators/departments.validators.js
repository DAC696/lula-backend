const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addDepartmentValidator = (req, res, next) => {
    try {

        const errors = {};

        const { departmentName } = req.body;

        if (isEmpty(departmentName)) {

            errors.departmentName = 'department Name is required.';

        } else if (!isString(departmentName)) {

            errors.departmentName = 'department Name is not valid.';

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
* @Description : This handler will be used for both, get Department by id and delete Department
* @params {mongodb generated ObjectId} DepartmentId
*/
const getDepartmentByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { departmentId } = req.params;

        if (isEmpty(departmentId)) {

            errors.departmentId = 'department Id is required.';

        } else if (!isValidObjectId(departmentId)) {

            errors.departmentId = 'department Id is not valid object id.';

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

const updateDepartmentByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { departmentId } = req.params;

        if (isEmpty(departmentId)) {

            errors.departmentId = 'department Id is required.';

        } else if (!isValidObjectId(departmentId)) {

            errors.departmentId = 'department Id is not valid object id.';

        }

        const { departmentName } = req.body;


        if (!isEmpty(departmentName) && !isString(departmentName)) {

            errors.departmentName = 'department Name is not valid.';

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

    addDepartmentValidator,
    getDepartmentByIdValidator,
    updateDepartmentByIdValidator

}