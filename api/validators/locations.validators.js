const { isEmpty, isString, validatePhone, isValidObjectId, isEmail, isPassword, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addLocationValidator = (req, res, next) => {
    try {
        const errors = {};

        const { locId, locName, locSign, locStatus, email } = req.body;

        if (isEmpty(locId)) {

            errors.locId = 'Custom Location Id is required.';

        } else if (!isString(locId)) {

            errors.locId = 'Custom Location Id is not valid.';

        }

        if (isEmpty(locName)) {

            errors.locName = 'location Name is required.';

        } else if (!isString(locName)) {

            errors.locName = 'loction Name is not valid.';

        }

        if (isEmpty(locSign)) {

            errors.locSign = 'Location Sign is required.';

        } else if (!isString(locSign)) {

            errors.locSign = 'Location Sign is not valid.';

        }

        // validation for locStatus in req.body

        if (isEmpty(locStatus)) {

            errors.locStatus = 'Locatoin Status is required.';

        } else if (!isString(locStatus)) {

            errors.locStatus = 'Location Status Should be a valid string';

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
* @Description : This handler will be used for both, get location by id and delete location
* @params {mongodb generated ObjectId} locationId
*/
const getLocationByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { locationId } = req.params;

        if (isEmpty(locationId)) {

            errors.locationId = 'Location Id is required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'Location Id is not valid object id.';

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

const updateLocationByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { locationId } = req.params;

        if (isEmpty(locationId)) {

            errors.locationId = 'Location Id is required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'Location Id is not valid object id.';

        }

        const { locId, locName, locSign, locStatus, email } = req.body;

        if (!isEmpty(locId) && !isString(locId)) {

            errors.locId = 'Custom Location Id is not valid.';

        }

        if (!isEmpty(locName) && !isString(locName)) {

            errors.locName = 'loction Name is not valid.';

        }

        if (!isEmpty(locSign) && !isString(locSign)) {

            errors.locSign = 'Location Sign is not valid.';

        }

        // validation for locStatus in req.body

        if (!isEmpty(locStatus) && !isString(locStatus)) {

            errors.locStatus = 'Location Status Should be a valid string';

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

    addLocationValidator,
    getLocationByIdValidator,
    updateLocationByIdValidator

}