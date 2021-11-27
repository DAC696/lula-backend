const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addLocationRiskAssessmentValidator = (req, res, next) => {
    try {

        const errors = {};

        const { isPeople,
            isAsset,
            isEnvironment,
            isReputation,
            isRequiresPTW, activity, hazard, responsibleRole,
            hazardEffect, initialRiskRating, riskRanking, trainingRequired, lastReviewed,
            legalAndOtherRequirements, controlMeasures, supportingProcedures, locationId } = req.body;


        if (isPeople !== undefined && isPeople != null && !isBoolean(isPeople)) {

            errors.isPeople = 'isPeople is not valid boolean.';

        }

        if (isAsset !== undefined && isAsset != null && !isBoolean(isAsset)) {

            errors.isAsset = 'isAsset is not valid boolean.';

        }

        if (isEnvironment !== undefined && isEnvironment != null && !isBoolean(isEnvironment)) {

            errors.isEnvironment = 'isEnvironment is not valid boolean.';

        }

        if (isReputation !== undefined && isReputation != null && !isBoolean(isReputation)) {

            errors.isReputation = 'isReputation is not valid boolean.';

        }

        if (isRequiresPTW !== undefined && isRequiresPTW != null && !isBoolean(isRequiresPTW)) {

            errors.isRequiresPTW = 'isRequiresPTW is not valid boolean.';

        }

        if (isEmpty(activity)) {

            errors.activity = 'activity is required.';

        } else if (!isString(activity)) {

            errors.activity = 'activity is not valid.';

        }

        if (isEmpty(hazard)) {

            errors.hazard = 'hazard is required.';

        } else if (!isString(hazard)) {

            errors.hazard = 'hazard is not valid Number.';

        }

        if (isEmpty(hazardEffect)) {

            errors.hazardEffect = 'hazardEffect is required.';

        } else if (!isString(hazardEffect)) {

            errors.hazardEffect = 'hazardEffect is not valid.';

        }

        if (isEmpty(initialRiskRating)) {

            errors.initialRiskRating = 'InitialRiskRating is required.';

        } else if (!isString(initialRiskRating)) {

            errors.initialRiskRating = 'InitialRiskRating is not valid.';

        }

        if (isEmpty(trainingRequired)) {

            errors.trainingRequired = 'trainingRequired is required.';

        } else if (!isString(trainingRequired)) {

            errors.trainingRequired = 'trainingRequired is not valid.';

        }

        if (isEmpty(riskRanking)) {

            errors.riskRanking = 'RiskRanking is required.';

        } else if (!isString(riskRanking)) {

            errors.riskRanking = 'RiskRanking is not valid.';

        }

        if (isEmpty(legalAndOtherRequirements)) {

            errors.legalAndOtherRequirements = 'legalAndOtherRequirements required.';

        } else if (!isString(legalAndOtherRequirements)) {

            errors.legalAndOtherRequirements = 'legalAndOtherRequirements not valid.';

        }

        if (isEmpty(lastReviewed)) {

            errors.lastReviewed = 'lastReviewed is required.';

        } else if (!isString(lastReviewed)) {

            errors.lastReviewed = 'lastReviewed is not valid.';

        }

        if (isEmpty(controlMeasures)) {

            errors.controlMeasures = 'controlMeasures is required.';

        } else if (!isString(controlMeasures)) {

            errors.controlMeasures = 'controlMeasures is not valid.';

        }

        if (isEmpty(supportingProcedures)) {

            errors.supportingProcedures = 'supportingProcedures is required.';

        } else if (!isString(supportingProcedures)) {

            errors.supportingProcedures = 'supportingProcedures is not valid.';

        }

        if (isEmpty(responsibleRole)) {

            errors.responsibleRole = 'Role Id is required.';

        } else if (!isValidObjectId(responsibleRole)) {

            errors.responsibleRole = 'Role Id is not valid object id.';

        }

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

/** 
* @Description : This handler will be used for both, get LocationRiskAssessment by id and delete LocationRiskAssessment
* @params {mongodb generated ObjectId} LocationRiskAssessmentId
*/
const getLocationRiskAssessmentByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { locationRiskAssessmentId } = req.params;

        if (isEmpty(locationRiskAssessmentId)) {

            errors.locationRiskAssessmentId = 'locationriskassessment Id is required.';

        } else if (!isValidObjectId(locationRiskAssessmentId)) {

            errors.locationRiskAssessmentId = 'locationriskassessment Id is not valid object id.';

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

const updateLocationRiskAssessmentByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { locationRiskAssessmentId } = req.params;

        if (isEmpty(locationRiskAssessmentId)) {

            errors.locationRiskAssessmentId = 'locationriskassessment Id is required.';

        } else if (!isValidObjectId(locationRiskAssessmentId)) {

            errors.locationRiskAssessmentId = 'locationriskassessment Id is not valid object id.';

        }


        const { isPeople, isAsset, isReputation, isEnvironment, isRequiresPTW, activity, hazard, responsibleRole,
            hazardEffect, initialRiskRating, riskRanking, trainingRequired, lastReviewed,
            legalAndOtherRequirements, controlMeasures, supportingProcedures, locationId } = req.body;


        if (isPeople !== undefined && isPeople != null && !isBoolean(isPeople)) {

            errors.isPeople = 'isPeople is not valid boolean.';

        }

        if (isAsset !== undefined && isAsset != null && !isBoolean(isAsset)) {

            errors.isAsset = 'isAsset is not valid boolean.';

        }

        if (isEnvironment !== undefined && isEnvironment != null && !isBoolean(isEnvironment)) {

            errors.isEnvironment = 'isEnvironment is not valid boolean.';

        }

        if (isReputation !== undefined && isReputation != null && !isBoolean(isReputation)) {

            errors.isReputation = 'isReputation is not valid boolean.';

        }

        if (isRequiresPTW !== undefined && isRequiresPTW != null && !isBoolean(isRequiresPTW)) {

            errors.isRequiresPTW = 'isRequiresPTW is not valid boolean.';

        }

        if (activity && !isString(activity)) {

            errors.activity = 'activity is not valid.';

        }

        if (hazard && !isString(hazard)) {

            errors.hazard = 'hazard is not valid Number.';

        }

        if (hazardEffect && !isString(hazardEffect)) {

            errors.hazardEffect = 'hazardEffect is not valid.';

        }

        if (initialRiskRating && !isString(initialRiskRating)) {

            errors.initialRiskRating = 'InitialRiskRating is not valid.';

        }

        if (trainingRequired && !isString(trainingRequired)) {

            errors.trainingRequired = 'trainingRequired is not valid.';

        }

        if (riskRanking && !isString(riskRanking)) {

            errors.riskRanking = 'RiskRanking is not valid.';

        }

        if (legalAndOtherRequirements && !isString(legalAndOtherRequirements)) {

            errors.legalAndOtherRequirements = 'legalAndOtherRequirements not valid.';

        }

        if (lastReviewed && !isString(lastReviewed)) {

            errors.lastReviewed = 'lastReviewed is not valid.';

        }

        if (controlMeasures && !isString(controlMeasures)) {

            errors.controlMeasures = 'controlMeasures is not valid.';

        }

        if (supportingProcedures && !isString(supportingProcedures)) {

            errors.supportingProcedures = 'supportingProcedures is not valid.';

        }

        if (responsibleRole && !isValidObjectId(responsibleRole)) {

            errors.responsibleRole = 'Role Id is not valid object id.';

        }

        if (locationId && !isValidObjectId(locationId)) {

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

module.exports = {

    addLocationRiskAssessmentValidator,
    getLocationRiskAssessmentByIdValidator,
    updateLocationRiskAssessmentByIdValidator

}