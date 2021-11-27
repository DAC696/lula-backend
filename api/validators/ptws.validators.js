const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addPTWValidator = (req, res, next) => {
    try {

        const errors = {};

        const { ptwType, ptwNumber, isolationRequired, requestedBy,
            toolboxTalkReference, isolationPerformedBy,
            isolationType, isolationCertificate, workComplete, permitToBeAudited,
            natureOfWork, locationOfWork, riskAssessmentReference,
            coshh, datePermitAuthorised, liftingPlan, confinedSpaceRescuePlan, generalComments
        } = req.body;


        if (isEmpty(ptwType)) {

            errors.ptwType = 'PTW type is required.';

        } else if (!isString(ptwType)) {

            errors.ptwType = 'PTW type is not valid.';

        }

        if (isEmpty(coshh)) {

            errors.coshh = 'PTW coshh is required.';

        } else if (!isString(coshh)) {

            errors.coshh = 'PTW coshh is not valid.';

        }

        if (isEmpty(datePermitAuthorised)) {

            errors.datePermitAuthorised = 'datePermitAuthorised is required.';

        } else if (!isString(datePermitAuthorised)) {

            errors.datePermitAuthorised = 'datePermitAuthorised is not valid boolean.';

        }

        if (isEmpty(liftingPlan)) {

            errors.liftingPlan = 'liftingPlan is required.';

        } else if (!isString(liftingPlan)) {

            errors.liftingPlan = 'liftingPlan is not valid boolean.';

        }

        if (isEmpty(confinedSpaceRescuePlan)) {

            errors.confinedSpaceRescuePlan = 'confinedSpaceRescuePlan is required.';

        } else if (!isString(confinedSpaceRescuePlan)) {

            errors.confinedSpaceRescuePlan = 'confinedSpaceRescuePlan is not valid boolean.';

        }

        if (isEmpty(generalComments)) {

            errors.generalComments = 'generalComments is required.';

        } else if (!isString(generalComments)) {

            errors.generalComments = 'generalComments is not valid boolean.';

        }

        if (isEmpty(ptwNumber)) {

            errors.ptwNumber = 'PTW Number is required.';

        } else if (!isString(ptwNumber)) {

            errors.ptwNumber = 'PTW Number is not valid.';

        }

        if (isEmpty(isolationRequired)) {

            errors.isolationRequired = 'isolationRequired is required.';

        } else if (!isString(isolationRequired)) {

            errors.isolationRequired = 'isolationRequired is not valid.';

        }

        if (isEmpty(toolboxTalkReference)) {

            errors.toolboxTalkReference = 'PTW toolboxTalkReference is required.';

        } else if (!isString(toolboxTalkReference)) {

            errors.toolboxTalkReference = 'PTW toolboxTalkReference is not valid.';

        }

        if (isEmpty(isolationType)) {

            errors.isolationType = 'isolationType is required.';

        } else if (!isString(isolationType)) {

            errors.isolationType = 'isolationType is not valid.';

        }

        if (isEmpty(workComplete)) {

            errors.workComplete = 'work complete is required.';

        } else if (!isString(workComplete)) {

            errors.workComplete = 'work complete is not valid.';

        }

        if (isEmpty(isolationCertificate)) {

            errors.isolationCertificate = 'isolationCertificate is required.';

        } else if (!isString(isolationCertificate)) {

            errors.isolationCertificate = 'isolationCertificate is not valid.';

        }

        if (isEmpty(natureOfWork)) {

            errors.natureOfWork = 'natureOfWork required.';

        } else if (!isString(natureOfWork)) {

            errors.natureOfWork = 'natureOfWork not valid.';

        }

        if (isEmpty(permitToBeAudited)) {

            errors.permitToBeAudited = 'permitToBeAudited is required.';

        } else if (!isString(permitToBeAudited)) {

            errors.permitToBeAudited = 'permitToBeAudited is not valid.';

        }

        if (isEmpty(locationOfWork)) {

            errors.locationOfWork = 'location of work is required.';

        } else if (!isString(locationOfWork)) {

            errors.locationOfWork = 'location of work is not valid.';

        }

        if (isEmpty(riskAssessmentReference)) {

            errors.riskAssessmentReference = 'Risk Assessment Reference what did you recommend is required.';

        } else if (!isString(riskAssessmentReference)) {

            errors.riskAssessmentReference = 'Risk Assessment Reference what did you recommend is not valid.';

        }

        if (isEmpty(requestedBy)) {

            errors.requestedBy = 'Employee is required.';

        } else if (!isValidObjectId(requestedBy)) {

            errors.requestedBy = 'Employee is not valid object id.';

        }

        if (isEmpty(isolationPerformedBy)) {

            errors.isolationPerformedBy = 'Employee Id is required.';

        } else if (!isValidObjectId(isolationPerformedBy)) {

            errors.isolationPerformedBy = 'Employee Id is not valid object id.';

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
* @Description : This handler will be used for both, get PTW by id and delete PTW
* @params {mongodb generated ObjectId} PTWId
*/
const getPTWByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { ptwId } = req.params;

        if (isEmpty(ptwId)) {

            errors.ptwId = 'ptw Id is required.';

        } else if (!isValidObjectId(ptwId)) {

            errors.ptwId = 'ptw Id is not valid object id.';

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

const updatePTWByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { ptwId } = req.params;

        if (isEmpty(ptwId)) {

            errors.ptwId = 'ptw Id is required.';

        } else if (!isValidObjectId(ptwId)) {

            errors.ptwId = 'ptw Id is not valid object id.';

        }


        const { ptwType, ptwNumber, isolationRequired, requestedBy,
            toolboxTalkReference, isolationPerformedBy,
            isolationType, isolationCertificate, workComplete, permitToBeAudited,
            natureOfWork, locationOfWork, riskAssessmentReference,
            coshh, datePermitAuthorised, liftingPlan, confinedSpaceRescuePlan, generalComments
        } = req.body;


        if (ptwType && !isString(ptwType)) {

            errors.ptwType = 'PTW type is not valid.';

        }

        if (coshh && !isString(coshh)) {

            errors.coshh = 'PTW coshh is not valid.';

        }

        if (datePermitAuthorised && !isString(datePermitAuthorised)) {

            errors.datePermitAuthorised = 'datePermitAuthorised is not valid boolean.';

        }

        if (liftingPlan && !isString(liftingPlan)) {

            errors.liftingPlan = 'liftingPlan is not valid boolean.';

        }

        if (confinedSpaceRescuePlan && !isString(confinedSpaceRescuePlan)) {

            errors.confinedSpaceRescuePlan = 'confinedSpaceRescuePlan is not valid boolean.';

        }

        if (generalComments && !isString(generalComments)) {

            errors.generalComments = 'generalComments is not valid boolean.';

        }

        if (!isEmpty(ptwNumber) && !isString(ptwNumber)) {

            errors.ptwNumber = 'PTW Number is not valid.';

        }

        if (!isEmpty(isolationRequired) && !isString(isolationRequired)) {

            errors.isolationRequired = 'isolationRequired is not valid string.';

        }

        if (toolboxTalkReference && !isString(toolboxTalkReference)) {

            errors.toolboxTalkReference = 'PTW toolboxTalkReference is not valid.';

        }

        if (isolationType && !isString(isolationType)) {

            errors.isolationType = 'isolationType is not valid.';

        }

        if (workComplete && !isString(workComplete)) {

            errors.workComplete = 'work complete is not valid.';

        }

        if (isolationCertificate && !isString(isolationCertificate)) {

            errors.isolationCertificate = 'isolationCertificate is not valid.';

        }

        if (natureOfWork && !isString(natureOfWork)) {

            errors.natureOfWork = 'natureOfWork not valid.';

        }

        if (permitToBeAudited && !isString(permitToBeAudited)) {

            errors.permitToBeAudited = 'permitToBeAudited is not valid.';

        }

        if (locationOfWork && !isString(locationOfWork)) {

            errors.locationOfWork = 'location of work is not valid.';

        }

        if (riskAssessmentReference && !isString(riskAssessmentReference)) {

            errors.riskAssessmentReference = 'Risk Assessment Reference what did you recommend is not valid.';

        }

        if (requestedBy && !isValidObjectId(requestedBy)) {

            errors.requestedBy = 'Employee is not valid object id.';

        }

        if (isolationPerformedBy && !isValidObjectId(isolationPerformedBy)) {

            errors.isolationPerformedBy = 'Employee Id is not valid object id.';

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

    addPTWValidator,
    getPTWByIdValidator,
    updatePTWByIdValidator

}