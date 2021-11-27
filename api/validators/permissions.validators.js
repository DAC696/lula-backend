const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean, isObject } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addPermissionValidator = (req, res, next) => {
    try {

        const errors = {};

        const { permissionName, permissions } = req.body;

        if (isEmpty(permissionName)) {

            errors.permissionName = 'Permission Name is required.';

        } else if (!isString(permissionName)) {

            errors.permissionName = 'Permission Name is not valid String.';

        }

        if (isEmpty(permissions)) {

            errors.permissions = 'Permissions is required.';

        } else if (!isObject(permissions)) {

            errors.permissions = 'Permissions is not valid Object.';

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
* @Description : This handler will be used for both, get Permission by id and delete Permission
* @params {mongodb generated ObjectId} PermissionId
*/
const getPermissionByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { permissionId } = req.params;

        if (isEmpty(permissionId)) {

            errors.permissionId = 'Permission Id is required.';

        } else if (!isValidObjectId(permissionId)) {

            errors.permissionId = 'Permission Id is not valid object id.';

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

const updatePermissionByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { permissionId } = req.params;

        if (isEmpty(permissionId)) {

            errors.permissionId = 'permission Id is required.';

        } else if (!isValidObjectId(permissionId)) {

            errors.permissionId = 'permission Id is not valid object id.';

        }

        const { permissionName, permissions } = req.body;


        if (permissionName && !isString(permissionName)) {

            errors.permissionName = 'Permission Name is not valid String.';

        }

        if (!isEmpty(permissions) && !isObject(permissions)) {

            errors.permissions = 'Permissions is not valid Object.';

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

    addPermissionValidator,
    getPermissionByIdValidator,
    updatePermissionByIdValidator

}