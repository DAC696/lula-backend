const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addUnionValidator = (req, res, next) => {
    try {

        const errors = {};

        const { unionName, description } = req.body;

        if (isEmpty(unionName)) {

            errors.unionName = 'Union Name is required.';

        } else if (!isString(unionName)) {

            errors.unionName = 'Union Name is not valid.';

        }

        if (description != undefined && description != null && !isString(description)) {

            errors.description = 'Union description is not valid.';

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
* @Description : This handler will be used for both, get Union by id and delete Union
* @params {mongodb generated ObjectId} UnionId
*/
const getUnionByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { unionId } = req.params;

        if (isEmpty(unionId)) {

            errors.unionId = 'Union Id is required.';

        } else if (!isValidObjectId(unionId)) {

            errors.unionId = 'Union Id is not valid object id.';

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

const updateUnionByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { unionId } = req.params;

        if (isEmpty(unionId)) {

            errors.unionId = 'union Id is required.';

        } else if (!isValidObjectId(unionId)) {

            errors.unionId = 'union Id is not valid object id.';

        }

        const { unionName, description } = req.body;


        if (!isEmpty(unionName) && !isString(unionName)) {

            errors.unionName = 'Union Name is not valid.';

        }

        if (description != undefined && description != null && !isString(description)) {

            errors.description = 'Description is not valid.';

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

    addUnionValidator,
    getUnionByIdValidator,
    updateUnionByIdValidator

}