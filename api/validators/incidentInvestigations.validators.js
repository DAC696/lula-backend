const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addIncidentInvestigationValidator = (req, res, next) => {
    try {

        const errors = {};

        let {
            investigationTitle,
            investigationType,
            classification,
            incidentTime,
            incidentDate,
            dateReported,
            LWDs,
            workArea,
            severityType,
            riskRating,
            potentialRating,
            description,
            immediateCorrectiveAction,
            additionalAssistanceProvided,
            isPersonnelRelated,
            isLocationLineManagerInformed,
            isClientInformed,
            isHIPO,
            reporter,
            roleId,
            departmentId,
        } = req.body;

        if (isEmpty(investigationTitle)) {

            errors.investigationTitle = 'InvestigationTitle is required.';

        } else if (!isString(investigationTitle)) {

            errors.investigationTitle = 'InvestigationTitle is not valid string.';

        }

        if (isEmpty(investigationType)) {

            errors.investigationType = 'Investigation Type is required.';

        } else if (!isString(investigationType)) {

            errors.investigationType = 'Investigation Type is not valid string.';

        }

        if (isEmpty(classification)) {

            errors.classification = 'Classification is required.';

        } else if (!isString(classification)) {

            errors.classification = 'Classification is not valid string.';

        }

        if (isEmpty(incidentTime)) {

            errors.incidentTime = 'incidentTime is required.';

        } else if (!isString(incidentTime)) {

            errors.incidentTime = 'incidentTime is not valid String.';

        }

        if (isEmpty(incidentDate)) {

            errors.incidentDate = 'incidentDate is required.';

        } else if (!isString(incidentDate)) {

            errors.incidentDate = 'incidentDate is not valid String.';

        }

        if (isEmpty(dateReported)) {

            errors.dateReported = 'dateReported is required.';

        } else if (!isString(dateReported)) {

            errors.dateReported = 'dateReported is not valid String.';

        }

        if (isEmpty(LWDs)) {

            errors.LWDs = 'LWDs is required.';

        } else if (!isString(LWDs)) {

            errors.LWDs = 'LWDs is not valid String.';

        }

        if (isEmpty(workArea)) {

            errors.workArea = 'workArea is required.';

        } else if (!isString(workArea)) {

            errors.workArea = 'workArea is not valid String.';

        }

        if (isEmpty(severityType)) {

            errors.severityType = 'severityType is required.';

        } else if (!isString(severityType)) {

            errors.severityType = 'severityType is not valid String.';

        }

        if (isEmpty(riskRating)) {

            errors.riskRating = 'riskRating is required.';

        } else if (!isString(riskRating)) {

            errors.riskRating = 'riskRating is not valid String.';

        }

        if (isEmpty(potentialRating)) {

            errors.potentialRating = 'potentialRating is required.';

        } else if (!isString(potentialRating)) {

            errors.potentialRating = 'potentialRating is not valid String.';

        }

        if (isEmpty(description)) {

            errors.description = 'description is required.';

        } else if (!isString(description)) {

            errors.description = 'description is not valid String.';

        }

        if (isEmpty(immediateCorrectiveAction)) {

            errors.immediateCorrectiveAction = 'immediateCorrectiveAction is required.';

        } else if (!isString(immediateCorrectiveAction)) {

            errors.immediateCorrectiveAction = 'immediateCorrectiveAction is not valid String.';

        }

        if (isEmpty(additionalAssistanceProvided)) {

            errors.additionalAssistanceProvided = 'additionalAssistanceProvided is required.';

        } else if (!isString(additionalAssistanceProvided)) {

            errors.additionalAssistanceProvided = 'additionalAssistanceProvided is not valid string.';

        }

        if (isEmpty(isPersonnelRelated)) {

            errors.isPersonnelRelated = 'isPersonnelRelated is required.';

        } else if (!isBoolean(JSON.parse(isPersonnelRelated))) {

            errors.isPersonnelRelated = 'isPersonnelRelated is not valid Boolean.';

        }

        if (isEmpty(isLocationLineManagerInformed)) {

            errors.isLocationLineManagerInformed = 'isLocationLineManagerInformed is required.';

        } else if (!isBoolean(JSON.parse(isLocationLineManagerInformed))) {

            errors.isLocationLineManagerInformed = 'isLocationLineManagerInformed is not valid ObjectId.';

        }

        if (isEmpty(isClientInformed)) {

            errors.isClientInformed = 'isClientInformed is required.';

        } else if (!isBoolean(JSON.parse(isClientInformed))) {

            errors.isClientInformed = 'isClientInformed is not valid ObjectId.';

        }

        if (isEmpty(isHIPO)) {

            errors.isHIPO = 'isHIPO is required.';

        } else if (!isBoolean(JSON.parse(isHIPO))) {

            errors.isHIPO = 'isHIPO is not valid ObjectId.';

        }

        if (isEmpty(reporter)) {

            errors.reporter = 'Reporter is required.';

        } else if (!isValidObjectId(reporter)) {

            errors.reporter = 'Reporter is not valid ObjectId.';

        }

        if (isEmpty(roleId)) {

            errors.roleId = 'Role Id is required.';

        } else if (!isValidObjectId(roleId)) {

            errors.roleId = 'Role Id is not valid ObjectId.';

        }

        if (isEmpty(departmentId)) {

            errors.departmentId = 'Department Id is required.';

        } else if (!isValidObjectId(departmentId)) {

            errors.departmentId = 'Department Id is not valid ObjectId.';

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
* @Description : This handler will be used for both, get IncidentInvestigation by id and delete IncidentInvestigation
* @params {mongodb generated ObjectId} IncidentInvestigationId
*/
const getIncidentInvestigationByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { incidentInvestigationId } = req.params;

        if (isEmpty(incidentInvestigationId)) {

            errors.incidentInvestigationId = 'IncidentInvestigation Id is required.';

        } else if (!isValidObjectId(incidentInvestigationId)) {

            errors.incidentInvestigationId = 'IncidentInvestigation Id is not valid object id.';

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

const updateIncidentInvestigationByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { incidentInvestigationId } = req.params;

        if (isEmpty(incidentInvestigationId)) {

            errors.incidentInvestigationId = 'incidentInvestigation Id is required.';

        } else if (!isValidObjectId(incidentInvestigationId)) {

            errors.incidentInvestigationId = 'incidentInvestigation Id is not valid object id.';

        }

        let {
            investigationTitle,
            investigationType,
            classification,
            incidentTime,
            incidentDate,
            dateReported,
            LWDs,
            workArea,
            severityType,
            riskRating,
            potentialRating,
            description,
            immediateCorrectiveAction,
            additionalAssistanceProvided,
            isPersonnelRelated,
            isLocationLineManagerInformed,
            isClientInformed,
            isHIPO,
            reporter,
            roleId,
            departmentId,
        } = req.body;

        if (investigationTitle && !isString(investigationTitle)) {

            errors.investigationTitle = 'InvestigationTitle is not valid string.';

        }

        if (investigationType && !isString(investigationType)) {

            errors.investigationType = 'Investigation Type is not valid string.';

        }

        if (classification && !isString(classification)) {

            errors.classification = 'Classification is not valid string.';

        }

        if (incidentTime && !isString(incidentTime)) {

            errors.incidentTime = 'incidentTime is not valid String.';

        }

        if (incidentDate && !isString(incidentDate)) {

            errors.incidentDate = 'incidentDate is not valid String.';

        }

        if (dateReported && !isString(dateReported)) {

            errors.dateReported = 'dateReported is not valid String.';

        }

        if (LWDs && !isString(LWDs)) {

            errors.LWDs = 'LWDs is not valid String.';

        }

        if (workArea && !isString(workArea)) {

            errors.workArea = 'workArea is not valid String.';

        }

        if (severityType && !isString(severityType)) {

            errors.severityType = 'severityType is not valid String.';

        }

        if (riskRating && !isString(riskRating)) {

            errors.riskRating = 'riskRating is not valid String.';

        }

        if (potentialRating && !isString(potentialRating)) {

            errors.potentialRating = 'potentialRating is not valid String.';

        }

        if (description && !isString(description)) {

            errors.description = 'description is not valid String.';

        }

        if (immediateCorrectiveAction && !isString(immediateCorrectiveAction)) {

            errors.immediateCorrectiveAction = 'immediateCorrectiveAction is not valid ObjectId.';

        }

        if (additionalAssistanceProvided && !isString(additionalAssistanceProvided)) {

            errors.additionalAssistanceProvided = 'additionalAssistanceProvided is not valid String.';

        }

        if (!isEmpty(isPersonnelRelated) && !isBoolean(JSON.parse(isPersonnelRelated))) {

            errors.isPersonnelRelated = 'isPersonnelRelated is not valid Boolean.';

        }

        if (!isEmpty(isLocationLineManagerInformed) && !isBoolean(JSON.parse(isLocationLineManagerInformed))) {

            errors.isLocationLineManagerInformed = 'isLocationLineManagerInformed is not valid Boolean.';

        }

        if (!isEmpty(isClientInformed) && !isBoolean(JSON.parse(isClientInformed))) {

            errors.isClientInformed = 'isClientInformed is not valid Boolean.';

        }

        if (!isEmpty(isHIPO) && !isBoolean(JSON.parse(isHIPO))) {

            errors.isHIPO = 'isHIPO is not valid Boolean.';

        }

        if (reporter && !isValidObjectId(reporter)) {

            errors.reporter = 'Reporter is not valid ObjectId.';

        }

        if (roleId && !isValidObjectId(roleId)) {

            errors.roleId = 'Role Id is not valid ObjectId.';

        }

        if (departmentId && !isValidObjectId(departmentId)) {

            errors.departmentId = 'Department Id is not valid ObjectId.';

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

    addIncidentInvestigationValidator,
    getIncidentInvestigationByIdValidator,
    updateIncidentInvestigationByIdValidator

}