const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addRoleValidator = (req, res, next) => {
    try {

        const errors = {};

        const { roleName, permissionId } = req.body;

        if (isEmpty(roleName)) {

            errors.roleName = 'Role Name is required.';

        } else if (!isString(roleName)) {

            errors.roleName = 'Role Name is not valid string.';

        }

        if (isEmpty(permissionId)) {

            errors.permissionId = 'Permission Id is required.';

        } else if (!isValidObjectId(permissionId)) {

            errors.permissionId = 'Permission Id is not valid ObjectId.';

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
* @Description : This handler will be used for both, get Role by id and delete Role
* @params {mongodb generated ObjectId} RoleId
*/
const getRoleByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { roleId } = req.params;

        if (isEmpty(roleId)) {

            errors.roleId = 'Role Id is required.';

        } else if (!isValidObjectId(roleId)) {

            errors.roleId = 'Role Id is not valid object id.';

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

const updateRoleByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { roleId } = req.params;

        if (isEmpty(roleId)) {

            errors.roleId = 'role Id is required.';

        } else if (!isValidObjectId(roleId)) {

            errors.roleId = 'role Id is not valid object id.';

        }

        const { roleName, permissionId } = req.body;


        if (!isEmpty(roleName) && !isString(roleName)) {

            errors.roleName = 'Role Name is not valid.';

        }

        if (!isEmpty(permissionId) && !isValidObjectId(permissionId)) {

            errors.permissionId = 'Permission Id is not valid Object Id.';

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

    addRoleValidator,
    getRoleByIdValidator,
    updateRoleByIdValidator

}