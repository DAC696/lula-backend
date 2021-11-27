const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addServiceValidator = (req, res, next) => {
    try {

        const errors = {};

        const { serviceName } = req.body;

        if (isEmpty(serviceName)) {

            errors.serviceName = 'Service Name is required.';

        } else if (!isString(serviceName)) {

            errors.serviceName = 'Service Name is not valid.';

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
* @Description : This handler will be used for both, get Service by id and delete Service
* @params {mongodb generated ObjectId} ServiceId
*/
const getServiceByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { serviceId } = req.params;

        if (isEmpty(serviceId)) {

            errors.serviceId = 'Service Id is required.';

        } else if (!isValidObjectId(serviceId)) {

            errors.serviceId = 'Service Id is not valid object id.';

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

const updateServiceByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { serviceId } = req.params;

        if (isEmpty(serviceId)) {

            errors.serviceId = 'service Id is required.';

        } else if (!isValidObjectId(serviceId)) {

            errors.serviceId = 'service Id is not valid object id.';

        }

        const { serviceName } = req.body;


        if (!isEmpty(serviceName) && !isString(serviceName)) {

            errors.serviceName = 'Service Name is not valid.';

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

    addServiceValidator,
    getServiceByIdValidator,
    updateServiceByIdValidator

}