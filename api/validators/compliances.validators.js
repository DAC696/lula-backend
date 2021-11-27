const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addComplianceValidator = (req, res, next) => {
    try {

        const errors = {};

        const {

            subject,
            complianceType,
            internalOrExternal,
            complianceCategory,
            isDomestic,
            date,
            description,
            comment,
            internalAuditor,
            externalAuditor,
            locationId

        } = req.body;

        if (isEmpty(subject)) {

            errors.subject = 'subject is required.';

        } else if (!isString(subject)) {

            errors.subject = 'subject is not valid.';

        }

        if (isEmpty(complianceType)) {

            errors.complianceType = 'complianceType is required.';

        } else if (!isString(complianceType)) {

            errors.complianceType = 'complianceType is not valid.';

        }



        if (isEmpty(complianceCategory)) {

            errors.complianceCategory = 'complianceCategory is required.';

        } else if (!isString(complianceCategory)) {

            errors.complianceCategory = 'complianceCategory is not valid.';

        }

        if (isEmpty(isDomestic)) {

            errors.isDomestic = 'isDomestic is required.';

        } else if (!isString(isDomestic)) {

            errors.isDomestic = 'isDomestic is not valid.';

        }

        if (isEmpty(date)) {

            errors.date = 'date is required.';

        } else if (!isString(date)) {

            errors.date = 'date is not valid.';

        }

        if (isEmpty(description)) {

            errors.description = 'description is required.';

        } else if (!isString(description)) {

            errors.description = 'description is not valid.';

        }

        if (isEmpty(comment)) {

            errors.comment = 'comment required.';

        } else if (!isString(comment)) {

            errors.comment = 'comment not valid.';

        }

        if (isEmpty(locationId)) {

            errors.locationId = 'locationId required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'locationId not valid.';

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
* @Description : This handler will be used for both, get Compliance by id and delete Compliance
* @params {mongodb generated ObjectId} ComplianceId
*/

const getComplianceByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { complianceId } = req.params;

        if (isEmpty(complianceId)) {

            errors.complianceId = 'compliance Id is required.';

        } else if (!isValidObjectId(complianceId)) {

            errors.complianceId = 'compliance Id is not valid object id.';

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

const updateComplianceByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { complianceId } = req.params;

        if (isEmpty(complianceId)) {

            errors.complianceId = 'complianceId is required.';

        } else if (!isValidObjectId(complianceId)) {

            errors.complianceId = 'complianceId is not valid object id.';

        }

        const {

            subject,
            complianceType,
            internalOrExternal,
            complianceCategory,
            isDomestic,
            date,
            description,
            comment,
            internalAuditor,
            externalAuditor,
            locationId

        } = req.body;

        if (locationId && !isValidObjectId(locationId)) {

            errors.locationId = 'locationId not valid.';

        }

        if (subject && !isString(subject)) {

            errors.subject = 'subject is not valid.';

        }

        if (complianceType && !isString(complianceType)) {

            errors.complianceType = 'complianceType is not valid.';

        }


        if (complianceCategory && !isString(complianceCategory)) {

            errors.complianceCategory = 'complianceCategory is not valid.';

        }

        if (isDomestic && !isString(isDomestic)) {

            errors.isDomestic = 'isDomestic is not valid.';

        }

        if (date && !isString(date)) {

            errors.date = 'date is not valid.';

        }

        if (description && !isString(description)) {

            errors.description = 'description is not valid.';

        }

        if (comment && !isString(comment)) {

            errors.comment = 'comment not valid.';

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

    addComplianceValidator,
    getComplianceByIdValidator,
    updateComplianceByIdValidator

}
