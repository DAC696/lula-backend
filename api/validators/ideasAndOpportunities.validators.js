const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addIdeasAndOpportunityValidator = (req, res, next) => {
    try {

        const errors = {};

        const { ideaTitle, ideaDate, description, employeeId,
            reasonForSuggestion, departmentId, opportunityArea,
            suggestedImprovements } = req.body;

        if (isEmpty(ideaTitle)) {

            errors.ideaTitle = 'Idea title is required.';

        } else if (!isString(ideaTitle)) {

            errors.ideaTitle = 'Idea title is not valid.';

        }

        if (isEmpty(ideaDate)) {

            errors.ideaDate = 'Idea Date is required.';

        } else if (!isString(ideaDate)) {

            errors.ideaDate = 'Idea Date is not valid.';

        }

        if (isEmpty(reasonForSuggestion)) {

            errors.reasonForSuggestion = 'safety Observation ua or uc is required.';

        } else if (!isString(reasonForSuggestion)) {

            errors.reasonForSuggestion = 'safety Observation ua or uc is not valid.';

        }

        if (isEmpty(opportunityArea)) {

            errors.opportunityArea = 'Opportunity  area is required.';

        } else if (!isString(opportunityArea)) {

            errors.opportunityArea = 'Opportunity  area is not valid.';

        }

        if (isEmpty(suggestedImprovements)) {

            errors.suggestedImprovements = 'Suggested Improvements is required.';

        } else if (!isString(suggestedImprovements)) {

            errors.suggestedImprovements = 'Suggested Improvements is not valid.';

        }

        if (isEmpty(description)) {

            errors.description = 'description is required.';

        } else if (!isString(description)) {

            errors.description = 'description is not valid.';

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
* @Description : This handler will be used for both, get IdeasAndOpportunity by id and delete IdeasAndOpportunity
* @params {mongodb generated ObjectId} IdeasAndOpportunityId
*/
const getIdeasAndOpportunityByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { ideasAndOpportunityId } = req.params;

        if (isEmpty(ideasAndOpportunityId)) {

            errors.ideasAndOpportunityId = 'ideasAndOpportunity Id is required.';

        } else if (!isValidObjectId(ideasAndOpportunityId)) {

            errors.ideasAndOpportunityId = 'ideasAndOpportunity Id is not valid object id.';

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

const updateIdeasAndOpportunityByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { ideasAndOpportunityId } = req.params;

        if (isEmpty(ideasAndOpportunityId)) {

            errors.ideasAndOpportunityId = 'ideasAndOpportunity Id is required.';

        } else if (!isValidObjectId(ideasAndOpportunityId)) {

            errors.ideasAndOpportunityId = 'ideasAndOpportunity Id is not valid object id.';

        }


        const { ideaTitle, ideaDate, description, employeeId,
            reasonForSuggestion, departmentId, opportunityArea,
            suggestedImprovements } = req.body;

        if (ideaTitle && !isString(ideaTitle)) {

            errors.ideaTitle = 'Idea title is not valid.';

        }

        if (ideaDate && !isString(ideaDate)) {

            errors.ideaDate = 'Idea Date is not valid.';

        }

        if (reasonForSuggestion && !isString(reasonForSuggestion)) {

            errors.reasonForSuggestion = 'safety Observation ua or uc is not valid.';

        }

        if (opportunityArea && !isString(opportunityArea)) {

            errors.opportunityArea = 'Opportunity  area is not valid.';

        }

        if (suggestedImprovements && !isString(suggestedImprovements)) {

            errors.suggestedImprovements = 'Suggested Improvements is not valid.';

        }

        if (description && !isString(description)) {

            errors.description = 'description is not valid.';

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

    addIdeasAndOpportunityValidator,
    getIdeasAndOpportunityByIdValidator,
    updateIdeasAndOpportunityByIdValidator

}