const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addContractValidator = (req, res, next) => {
    try {

        const errors = {};

        let { contractTitle, clientId, services, dayRate, totalValue, startDate, endDate } = req.body;

        if (isEmpty(contractTitle)) {

            errors.contractTitle = 'Contract Title is required.';

        } else if (!isString(contractTitle)) {

            errors.contractTitle = 'Contract Title is not valid string.';

        }

        if (isEmpty(startDate)) {

            errors.startDate = 'Start Date is required.';

        } else if (!isString(startDate)) {

            errors.startDate = 'Start Date is not valid string.';

        }

        if (isEmpty(endDate)) {

            errors.endDate = 'End Date is required.';

        } else if (!isString(endDate)) {

            errors.endDate = 'End Date is not valid string.';

        }

        if (isEmpty(dayRate)) {

            errors.dayRate = 'Day Rate is required.';

        } else if (!isNumber(Number(dayRate))) {

            errors.dayRate = 'Day Rate is not valid number.';

        }

        if (isEmpty(totalValue)) {

            errors.totalValue = 'Total Value is required.';

        } else if (!isNumber(Number(totalValue))) {

            errors.totalValue = 'Total Value is not valid number.';

        }


        if (isEmpty(clientId)) {

            errors.clientId = 'Client Id is required.';

        } else if (!isValidObjectId(clientId)) {

            errors.clientId = 'Client Id is not valid ObjectId.';

        }

        if (isEmpty(services)) {

            errors.services = 'Services are required.';

        } else if (!Array.isArray(services)) {

            errors.services = 'Services  should be a valid Array of Object Ids';

        } else if (!services.every(service => isValidObjectId(service))) {

            errors["services"] = "Services includes invalid object id";

        }

        req.body.dayRate = Number(dayRate)
        req.body.totalValue = Number(totalValue)

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
* @Description : This handler will be used for both, get Contract by id and delete Contract
* @params {mongodb generated ObjectId} ContractId
*/
const getContractByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { contractId } = req.params;

        if (isEmpty(contractId)) {

            errors.contractId = 'Contract Id is required.';

        } else if (!isValidObjectId(contractId)) {

            errors.contractId = 'Contract Id is not valid object id.';

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

const updateContractByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { contractId } = req.params;

        if (isEmpty(contractId)) {

            errors.contractId = 'contract Id is required.';

        } else if (!isValidObjectId(contractId)) {

            errors.contractId = 'contract Id is not valid object id.';

        }

        const { contractTitle, clientId, services, startDate, endDate, dayRate, totalValue } = req.body;


        if (!isEmpty(contractTitle) && !isString(contractTitle)) {

            errors.contractTitle = 'Contract Title is not valid.';

        }

        if (!isEmpty(clientId) && !isValidObjectId(clientId)) {

            errors.clientId = 'Permission Id is not valid Object Id.';

        }

        if (!isEmpty(services)) {

            if (!Array.isArray(services)) {

                errors.services = 'Services  should be a valid Array of Object Ids';

            } else if (!services.every(service => isValidObjectId(service))) {

                errors["services"] = "Services includes invalid object id";

            }
        }

        if (startDate && !isString(startDate)) {

            errors.startDate = 'Start Date is not valid string.';

        }

        if (endDate && !isString(endDate)) {

            errors.endDate = 'End Date is not valid string.';

        }

        if (dayRate && !isNumber(Number(dayRate))) {

            errors.dayRate = 'Day Rate is not valid number.';

        } else if (dayRate && isNumber(Number(dayRate))) {

            req.body.dayRate = Number(dayRate)

        }

        if (totalValue && !isNumber(Number(totalValue))) {
            errors.totalValue = 'Total Value is not valid number.';

        } else if (totalValue && isNumber(Number(totalValue))) {

            req.body.totalValue = Number(totalValue)

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

    addContractValidator,
    getContractByIdValidator,
    updateContractByIdValidator

}