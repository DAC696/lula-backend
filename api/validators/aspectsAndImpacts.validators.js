const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addAspectsAndImpactValidator = (req, res, next) => {
    try {

        const errors = {};

        const { issue, impact, reviewedBy,
            lastReviewed, aspectType, operatingCondition, influence, impactAssessment,
            controlMeasures, trainingNeeds, legalAndOtherRequirements, residentialImpactLevel, locationId } = req.body;


        if (isEmpty(issue)) {

            errors.issue = 'issue is required.';

        } else if (!isString(issue)) {

            errors.issue = 'issue is not valid.';

        }

        if (isEmpty(legalAndOtherRequirements)) {

            errors.legalAndOtherRequirements = 'legalAndOtherRequirements is required.';

        } else if (!isString(legalAndOtherRequirements)) {

            errors.legalAndOtherRequirements = 'legalAndOtherRequirements is not valid.';

        }

        if (isEmpty(impact)) {

            errors.impact = 'impact is required.';

        } else if (!isString(impact)) {

            errors.impact = 'impact is not valid Number.';

        }

        if (isEmpty(lastReviewed)) {

            errors.lastReviewed = 'lastReviewed is required.';

        } else if (!isString(lastReviewed)) {

            errors.lastReviewed = 'lastReviewed is not valid.';

        }

        if (isEmpty(aspectType)) {

            errors.aspectType = 'aspectType is required.';

        } else if (!isString(aspectType)) {

            errors.aspectType = 'aspectType is not valid.';

        }

        if (isEmpty(influence)) {

            errors.influence = 'influence is required.';

        } else if (!isString(influence)) {

            errors.influence = 'influence is not valid.';

        }

        if (isEmpty(operatingCondition)) {

            errors.operatingCondition = 'operatingCondition is required.';

        } else if (!isString(operatingCondition)) {

            errors.operatingCondition = 'operatingCondition is not valid.';

        }

        if (isEmpty(residentialImpactLevel)) {

            errors.residentialImpactLevel = 'residentialImpactLevel required.';

        } else if (!isString(residentialImpactLevel)) {

            errors.residentialImpactLevel = 'residentialImpactLevel not valid.';

        }

        if (isEmpty(impactAssessment)) {

            errors.impactAssessment = 'impactAssessment is required.';

        } else if (!isString(impactAssessment)) {

            errors.impactAssessment = 'impactAssessment is not valid.';

        }



        if (isEmpty(controlMeasures)) {

            errors.controlMeasures = 'controlMeasures is required.';

        } else if (!isString(controlMeasures)) {

            errors.controlMeasures = 'controlMeasures is not valid.';

        }

        if (isEmpty(trainingNeeds)) {

            errors.trainingNeeds = 'trainingNeeds is required.';

        } else if (!isString(trainingNeeds)) {

            errors.trainingNeeds = 'trainingNeeds is not valid.';

        }

        if (isEmpty(reviewedBy)) {

            errors.reviewedBy = 'Employee Id is required.';

        } else if (!isValidObjectId(reviewedBy)) {

            errors.reviewedBy = 'Employee Id is not valid object id.';

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
* @Description : This handler will be used for both, get AspectsAndImpact by id and delete AspectsAndImpact
* @params {mongodb generated ObjectId} AspectsAndImpactId
*/

const getAspectsAndImpactByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { aspectsAndImpactId } = req.params;

        if (isEmpty(aspectsAndImpactId)) {

            errors.aspectsAndImpactId = 'aspectsAndImpact Id is required.';

        } else if (!isValidObjectId(aspectsAndImpactId)) {

            errors.aspectsAndImpactId = 'aspectsAndImpact Id is not valid object id.';

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

const updateAspectsAndImpactByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { aspectsAndImpactId } = req.params;

        if (isEmpty(aspectsAndImpactId)) {

            errors.aspectsAndImpactId = 'aspectsAndImpactId is required.';

        } else if (!isValidObjectId(aspectsAndImpactId)) {

            errors.aspectsAndImpactId = 'aspectsAndImpactId is not valid object id.';

        }


        const { issue, impact, reviewedBy,
            lastReviewed, aspectType, operatingCondition, influence, impactAssessment,
            residentialImpactLevel, controlMeasures, trainingNeeds, legalAndOtherRequirements, locationId } = req.body;


        if (issue && !isString(issue)) {

            errors.issue = 'issue is not valid.';

        }

        if (impact && !isString(impact)) {

            errors.impact = 'impact is not valid Number.';

        }

        if (lastReviewed && !isString(lastReviewed)) {

            errors.lastReviewed = 'lastReviewed is not valid.';

        }

        if (legalAndOtherRequirements && !isString(legalAndOtherRequirements)) {

            errors.legalAndOtherRequirements = 'legalAndOtherRequirements is not valid.';

        }

        if (aspectType && !isString(aspectType)) {

            errors.aspectType = 'aspectType is not valid.';

        }

        if (influence && !isString(influence)) {

            errors.influence = 'influence is not valid.';

        }

        if (operatingCondition && !isString(operatingCondition)) {

            errors.operatingCondition = 'operatingCondition is not valid.';

        }

        if (residentialImpactLevel && !isString(residentialImpactLevel)) {

            errors.residentialImpactLevel = 'residentialImpactLevel not valid.';

        }

        if (impactAssessment && !isString(impactAssessment)) {

            errors.impactAssessment = 'impactAssessment is not valid.';

        }

        if (controlMeasures && !isString(controlMeasures)) {

            errors.controlMeasures = 'controlMeasures is not valid.';

        }

        if (trainingNeeds && !isString(trainingNeeds)) {

            errors.trainingNeeds = 'trainingNeeds is not valid.';

        }

        if (reviewedBy && !isValidObjectId(reviewedBy)) {

            errors.reviewedBy = 'Employee Id is not valid object id.';

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

    addAspectsAndImpactValidator,
    getAspectsAndImpactByIdValidator,
    updateAspectsAndImpactByIdValidator

}