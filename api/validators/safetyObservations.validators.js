const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addSafetyObservationValidator = (req, res, next) => {
    try {

        const errors = {};

        const { observationTitle, observationDate, observationType, employeeId,
            uaOrUc, departmentId, workArea,
            riskRating, responsibleJobTitle, whatDidYouSee,
            whatDidYouDo, whatDidYouRecommend } = req.body;

        if (isEmpty(observationTitle)) {

            errors.observationTitle = 'safety Observation title is required.';

        } else if (!isString(observationTitle)) {

            errors.observationTitle = 'safety Observation title is not valid.';

        }

        if (isEmpty(observationDate)) {

            errors.observationDate = 'safety Observation Date is required.';

        } else if (!isString(observationDate)) {

            errors.observationDate = 'safety Observation Date is not valid.';

        }

        if (isEmpty(observationType)) {

            errors.observationType = 'safety Observation type is required.';

        } else if (!isString(observationType)) {

            errors.observationType = 'safety Observation type is not valid.';

        }

        if (isEmpty(uaOrUc)) {

            errors.uaOrUc = 'safety Observation ua or uc is required.';

        } else if (!isString(uaOrUc)) {

            errors.uaOrUc = 'safety Observation ua or uc is not valid.';

        }

        if (isEmpty(workArea)) {

            errors.workArea = 'safetyObservation work area is required.';

        } else if (!isString(workArea)) {

            errors.workArea = 'safetyObservation work area is not valid.';

        }

        if (isEmpty(responsibleJobTitle)) {

            errors.responsibleJobTitle = 'safetyObservation job title is required.';

        } else if (!isValidObjectId(responsibleJobTitle)) {

            errors.responsibleJobTitle = 'safetyObservation job title is not valid object id.';

        }

        if (isEmpty(riskRating)) {

            errors.riskRating = 'safetyObservation risk rating is required.';

        } else if (!isString(riskRating)) {

            errors.riskRating = 'safetyObservation risk rating is not valid.';

        }

        if (isEmpty(whatDidYouDo)) {

            errors.whatDidYouDo = 'safetyObservation what did you do is required.';

        } else if (!isString(whatDidYouDo)) {

            errors.whatDidYouDo = 'safetyObservation what did you do is not valid.';

        }

        if (isEmpty(whatDidYouSee)) {

            errors.whatDidYouSee = 'safety Observation what did you see is required.';

        } else if (!isString(whatDidYouSee)) {

            errors.whatDidYouSee = 'Safety Observation what did you see is not valid.';

        }

        if (isEmpty(whatDidYouRecommend)) {

            errors.whatDidYouRecommend = 'Safety Observation what did you recommend is required.';

        } else if (!isString(whatDidYouRecommend)) {

            errors.whatDidYouRecommend = 'Safety Observation what did you recommend is not valid.';

        }

        if (isEmpty(employeeId)) {

            errors.employeeId = 'employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'employee Id is not valid object id.';

        }

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

/** 
* @Description : This handler will be used for both, get SafetyObservation by id and delete SafetyObservation
* @params {mongodb generated ObjectId} SafetyObservationId
*/
const getSafetyObservationByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { safetyObservationId } = req.params;

        if (isEmpty(safetyObservationId)) {

            errors.safetyObservationId = 'safetyObservation Id is required.';

        } else if (!isValidObjectId(safetyObservationId)) {

            errors.safetyObservationId = 'safetyObservation Id is not valid object id.';

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

const updateSafetyObservationByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { safetyObservationId } = req.params;

        if (isEmpty(safetyObservationId)) {

            errors.safetyObservationId = 'safetyObservation Id is required.';

        } else if (!isValidObjectId(safetyObservationId)) {

            errors.safetyObservationId = 'safetyObservation Id is not valid object id.';

        }


        const { observationTitle, observationDate, observationType, employeeId,
            uaOrUc, departmentId, workArea,
            riskRating, responsibleJobTitle, whatDidYouSee,
            whatDidYouDo, whatDidYouRecommend } = req.body;

        if (observationTitle && !isString(observationTitle)) {

            errors.observationTitle = 'safety Observation title is not valid.';

        }

        if (observationDate && !isString(observationDate)) {

            errors.observationDate = 'safety Observation Date is not valid.';

        }

        if (observationType && !isString(observationType)) {

            errors.observationType = 'safety Observation type is not valid.';

        }

        if (uaOrUc && !isString(uaOrUc)) {

            errors.uaOrUc = 'safety Observation ua or uc is not valid.';

        }

        if (workArea && !isString(workArea)) {

            errors.workArea = 'safetyObservation work area is not valid.';

        }

        if (responsibleJobTitle && !isValidObjectId(responsibleJobTitle)) {

            errors.responsibleJobTitle = 'safetyObservation job title is not valid.';

        }

        if (riskRating && !isString(riskRating)) {

            errors.riskRating = 'safetyObservation risk rating is not valid.';

        }

        if (whatDidYouDo && !isString(whatDidYouDo)) {

            errors.whatDidYouDo = 'safetyObservation what did you do is not valid.';

        }

        if (whatDidYouSee && !isString(whatDidYouSee)) {

            errors.whatDidYouSee = 'Safety Observation what did you see is not valid.';

        }

        if (whatDidYouRecommend && !isString(whatDidYouRecommend)) {

            errors.whatDidYouRecommend = 'Safety Observation what did you recommend is not valid.';

        }

        if (employeeId && !isValidObjectId(employeeId)) {

            errors.employeeId = 'employee Id is not valid object id.';

        }

        if (departmentId && !isValidObjectId(departmentId)) {

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

module.exports = {

    addSafetyObservationValidator,
    getSafetyObservationByIdValidator,
    updateSafetyObservationByIdValidator

}