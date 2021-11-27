const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addNonConformanceValidator = (req, res, next) => {
    try {

        const errors = {};

        let {
            vesselIdentification,
            observedArea,
            date,
            itemsEffected,
            levelOfNonConformity,
            summaryOfIdentifiedDeviation,
            actionProposed,
            timeLimitForCompliance,
            areaInchargeName,
            areaInchargePosition,
            verificationOfCorrectiveAction,
            verificationComments,
            newCorrectiveActionProposed,
            newTimeLimit,
            verificationOfNewCorrectiveAction,
            closingDate,
            newVerificationComments,
            observerName,
            observerPosition,
        } = req.body;

        if (isEmpty(vesselIdentification)) {

            errors.vesselIdentification = 'vesselIdentification is required.';

        } else if (!isValidObjectId(vesselIdentification)) {

            errors.vesselIdentification = 'vesselIdentification is not valid object id.';

        }

        if (isEmpty(observedArea)) {

            errors.observedArea = 'ObservedArea is required.';

        } else if (!isString(observedArea)) {

            errors.observedArea = 'ObservedArea is not valid string.';

        }

        if (isEmpty(date)) {

            errors.date = 'Date is required.';

        } else if (!isString(date)) {

            errors.date = 'Date is not valid string.';

        }


        if (itemsEffected !== null && itemsEffected !== undefined && !isString(itemsEffected)) {

            errors.itemsEffected = 'itemsEffected is not valid String.';

        }

        if (isEmpty(levelOfNonConformity)) {

            errors.levelOfNonConformity = 'levelOfNonConformity is required.';

        } else if (!isString(levelOfNonConformity)) {

            errors.levelOfNonConformity = 'levelOfNonConformity is not valid String.';

        }

        if (isEmpty(summaryOfIdentifiedDeviation)) {

            errors.summaryOfIdentifiedDeviation = 'summaryOfIdentifiedDeviation is required.';

        } else if (!isString(summaryOfIdentifiedDeviation)) {

            errors.summaryOfIdentifiedDeviation = 'summaryOfIdentifiedDeviation is not valid String.';

        }

        if (isEmpty(actionProposed)) {

            errors.actionProposed = 'actionProposed is required.';

        } else if (!isString(actionProposed)) {

            errors.actionProposed = 'actionProposed is not valid String.';

        }

        if (isEmpty(timeLimitForCompliance)) {

            errors.timeLimitForCompliance = 'timeLimitForCompliance is required.';

        } else if (!isString(timeLimitForCompliance)) {

            errors.timeLimitForCompliance = 'timeLimitForCompliance is not valid String.';

        }

        if (isEmpty(areaInchargePosition)) {

            errors.areaInchargePosition = 'areaInchargePosition Role Id is required.';

        } else if (!isValidObjectId(areaInchargePosition)) {

            errors.areaInchargePosition = 'areaInchargePosition Role Id is not valid object id.';

        }

        if (isEmpty(areaInchargeName)) {

            errors.areaInchargeName = 'employeeId is required.';

        } else if (!isValidObjectId(areaInchargeName)) {

            errors.areaInchargeName = 'employeeId is not valid object id.';

        }



        if (isEmpty(verificationOfCorrectiveAction)) {

            errors.verificationOfCorrectiveAction = 'verificationOfCorrectiveAction is required.';

        } else if (!isString(verificationOfCorrectiveAction)) {

            errors.verificationOfCorrectiveAction = 'verificationOfCorrectiveAction is not valid String.';

        }

        if (isEmpty(verificationComments)) {

            errors.verificationComments = 'verificationComments is required.';

        } else if (!isString(verificationComments)) {

            errors.verificationComments = 'verificationComments is not valid string.';

        }

        if (isEmpty(newCorrectiveActionProposed)) {

            errors.newCorrectiveActionProposed = 'newCorrectiveActionProposed is required.';

        } else if (!isString(newCorrectiveActionProposed)) {

            errors.newCorrectiveActionProposed = 'newCorrectiveActionProposed is not valid Boolean.';

        }

        if (isEmpty(newTimeLimit)) {

            errors.newTimeLimit = 'newTimeLimit is required.';

        } else if (!isString(newTimeLimit)) {

            errors.newTimeLimit = 'newTimeLimit is not valid ObjectId.';

        }

        if (isEmpty(verificationOfNewCorrectiveAction)) {

            errors.verificationOfNewCorrectiveAction = 'verificationOfNewCorrectiveAction is required.';

        } else if (!isString(verificationOfNewCorrectiveAction)) {

            errors.verificationOfNewCorrectiveAction = 'verificationOfNewCorrectiveAction is not valid ObjectId.';

        }

        if (isEmpty(closingDate)) {

            errors.closingDate = 'closingDate is required.';

        } else if (!isString(closingDate)) {

            errors.closingDate = 'closingDate is not valid ObjectId.';

        }

        if (isEmpty(observerName)) {

            errors.observerName = 'Employee id is required.';

        } else if (!isValidObjectId(observerName)) {

            errors.observerName = 'Employee id is not valid ObjectId.';

        }

        if (isEmpty(observerPosition)) {

            errors.observerPosition = 'Role Id is required.';

        } else if (!isValidObjectId(observerPosition)) {

            errors.observerPosition = 'Role Id is not valid ObjectId.';

        }

        if (isEmpty(newVerificationComments)) {

            errors.newVerificationComments = 'newVerificationComments Id is required.';

        } else if (!isString(newVerificationComments)) {

            errors.newVerificationComments = 'newVerificationComments Id is not valid ObjectId.';

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
* @Description : This handler will be used for both, get NonConformance by id and delete NonConformance
* @params {mongodb generated ObjectId} NonConformanceId
*/
const getNonConformanceByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { nonConformanceId } = req.params;

        if (isEmpty(nonConformanceId)) {

            errors.nonConformanceId = 'NonConformance Id is required.';

        } else if (!isValidObjectId(nonConformanceId)) {

            errors.nonConformanceId = 'NonConformance Id is not valid object id.';

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

const updateNonConformanceByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { nonConformanceId } = req.params;

        if (isEmpty(nonConformanceId)) {

            errors.nonConformanceId = 'nonConformance Id is required.';

        } else if (!isValidObjectId(nonConformanceId)) {

            errors.nonConformanceId = 'nonConformance Id is not valid object id.';

        }

        let {
            vesselIdentification,
            observedArea,
            date,
            itemsEffected,
            levelOfNonConformity,
            summaryOfIdentifiedDeviation,
            actionProposed,
            timeLimitForCompliance,
            observerName,
            observerPosition,
            areaInchargeName,
            areaInchargePosition,
            verificationOfCorrectiveAction,
            verificationComments,
            newCorrectiveActionProposed,
            newTimeLimit,
            verificationOfNewCorrectiveAction,
            closingDate,
            newVerificationComments
        } = req.body;

        if (vesselIdentification && !isValidObjectId(vesselIdentification)) {

            errors.vesselIdentification = 'vesselIdentification is not valid object.';

        }

        if (observedArea && !isString(observedArea)) {

            errors.observedArea = 'ObservedArea is not valid string.';

        }

        if (date && !isString(date)) {

            errors.date = 'Date is not valid string.';

        }


        if (itemsEffected !== null && itemsEffected !== undefined && !isString(itemsEffected)) {

            errors.itemsEffected = 'itemsEffected is not valid String.';

        }

        if (levelOfNonConformity && !isString(levelOfNonConformity)) {

            errors.levelOfNonConformity = 'levelOfNonConformity is not valid String.';

        }

        if (summaryOfIdentifiedDeviation && !isString(summaryOfIdentifiedDeviation)) {

            errors.summaryOfIdentifiedDeviation = 'summaryOfIdentifiedDeviation is not valid String.';

        }

        if (actionProposed && !isString(actionProposed)) {

            errors.actionProposed = 'actionProposed is not valid String.';

        }

        if (timeLimitForCompliance && !isString(timeLimitForCompliance)) {

            errors.timeLimitForCompliance = 'timeLimitForCompliance is not valid String.';

        }

        if (areaInchargeName && !isValidObjectId(areaInchargeName)) {

            errors.areaInchargeName = 'employeeId is not valid object id.';

        }

        if (areaInchargePosition && !isValidObjectId(areaInchargePosition)) {

            errors.areaInchargePosition = 'roleId is not valid object id.';

        }

        if (observerName && !isValidObjectId(observerName)) {

            errors.observerName = 'employeeId is not valid object id.';

        }

        if (observerPosition && !isValidObjectId(observerPosition)) {

            errors.observerPosition = 'roleId is not valid object id.';

        }

        if (verificationOfCorrectiveAction && !isString(verificationOfCorrectiveAction)) {

            errors.verificationOfCorrectiveAction = 'verificationOfCorrectiveAction is not valid String.';

        }

        if (verificationComments && !isString(verificationComments)) {

            errors.verificationComments = 'verificationComments is not valid string.';

        }

        if (newCorrectiveActionProposed && !isString(newCorrectiveActionProposed)) {

            errors.newCorrectiveActionProposed = 'newCorrectiveActionProposed is not valid Boolean.';

        }

        if (newTimeLimit && !isString(newTimeLimit)) {

            errors.newTimeLimit = 'newTimeLimit is not valid ObjectId.';

        }

        if (verificationOfNewCorrectiveAction && !isString(verificationOfNewCorrectiveAction)) {

            errors.verificationOfNewCorrectiveAction = 'verificationOfNewCorrectiveAction is not valid ObjectId.';

        }

        if (closingDate && !isString(closingDate)) {

            errors.closingDate = 'closingDate is not valid ObjectId.';

        }



        if (newVerificationComments && !isString(newVerificationComments)) {

            errors.newVerificationComments = 'newVerificationComments Id is not valid ObjectId.';

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

    addNonConformanceValidator,
    getNonConformanceByIdValidator,
    updateNonConformanceByIdValidator

}