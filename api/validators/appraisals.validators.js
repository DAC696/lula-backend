const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean, isObject } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addAppraisalsValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid ObjectId.';

        }

        const { locId, startDate, endDate, appraisalType, appraisalDetails } = req.body;

        // if (isEmpty(appraisalTitle)) {

        //     errors.appraisalTitle = 'Appraisal Title is required.';

        // } else if (!isString(appraisalTitle)) {

        //     errors.appraisalTitle = 'Appraisal Title is not valid string.';

        // }

        // if (isEmpty(appraisalFirstName)) {

        //     errors.appraisalFirstName = 'Appraisal First Name is required.';

        // } else if (!isString(appraisalFirstName)) {

        //     errors.appraisalFirstName = 'Appraisal First Name is not valid string.';

        // }

        // if (isEmpty(appraisalLastName)) {

        //     errors.appraisalLastName = 'Appraisal Last Name is required.';

        // } else if (!isString(appraisalLastName)) {

        //     errors.appraisalLastName = 'Appraisal Last Name is not valid string.';

        // }

        if (isEmpty(locId)) {

            errors.locId = 'Appraisal locId is required.';

        } else if (!isString(locId)) {

            errors.locId = 'Appraisal locId is not valid string.';

        }

        // if (isEmpty(position)) {

        //     errors.position = 'Appraisal position is required.';

        // } else if (!isString(position)) {

        //     errors.position = 'Appraisal position is not valid string.';

        // }

        // if (isEmpty(vessel)) {

        //     errors.vessel = 'Appraisal vessel is required.';

        // } else if (!isString(vessel)) {

        //     errors.vessel = 'Appraisal vessel is not valid string.';

        // }

        if (isEmpty(startDate)) {

            errors.startDate = 'Appraisal startDate is required.';

        } else if (!isString(startDate)) {

            errors.startDate = 'Appraisal startDate is not valid string.';

        }

        if (isEmpty(endDate)) {

            errors.endDate = 'Appraisal endDate is required.';

        } else if (!isString(endDate)) {

            errors.endDate = 'Appraisal endDate is not valid string.';

        }

        if (isEmpty(appraisalType)) {

            errors.appraisalType = 'Appraisal Type is required.';

        } else if (!isString(appraisalType)) {

            errors.appraisalType = 'Appraisal Type is not valid string.';

        }

        if (isEmpty(appraisalDetails)) {

            errors.appraisalDetails = 'Appraisal Details is required.';

        } else if (!isObject(appraisalDetails)) {

            errors.appraisalDetails = 'Appraisal Details is not valid object.';

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
* @Description : This handler will be used for both, get Appraisals by id and delete Appraisals
* @params {mongodb generated ObjectId} AppraisalsId
*/
const getAppraisalsByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { appraisalId } = req.params;

        if (isEmpty(appraisalId)) {

            errors.appraisalId = 'Appraisals Id is required.';

        } else if (!isValidObjectId(appraisalId)) {

            errors.appraisalId = 'Appraisals Id is not valid object id.';

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

    addAppraisalsValidator,
    getAppraisalsByIdValidator

}