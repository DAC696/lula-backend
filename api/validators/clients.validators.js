const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addClientValidator = (req, res, next) => {
    try {

        const errors = {};

        const { clientName, clientCompany, phoneNumber, email, companyLogo, companyAddress } = req.body;

        if (isEmpty(clientName)) {

            errors.clientName = 'Client Name is required.';

        } else if (!isString(clientName)) {

            errors.clientName = 'Client Name is not valid.';

        }

        if (isEmpty(clientCompany)) {

            errors.clientCompany = 'Client Company is required.';

        } else if (!isString(clientCompany)) {

            errors.clientCompany = 'Client Company is not valid.';

        }

        if (isEmpty(companyAddress)) {

            errors.companyAddress = 'Company Address is required.';

        } else if (!isString(companyAddress)) {

            errors.companyAddress = 'Company Address is not valid.';

        }

        if (isEmpty(email)) {

            errors.email = 'Email is required.';

        } else if (!isEmail(email)) {

            errors.email = 'Email is not valid.';

        }

        // validation for phoneNumber in req.body

        if (isEmpty(phoneNumber)) {

            errors.phoneNumber = 'Phone Number is required.';

        } else if (!isString(phoneNumber)) {

            errors.phoneNumber = 'Phone Number Should be a valid string';

        }

        // validation for companyLogo in req.body

        if (companyLogo && !isString(companyLogo)) {

            errors.companyLogo = 'Company Logo Should be a valid string';

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
* @Description : This handler will be used for both, get Client by id and delete Client
* @params {mongodb generated ObjectId} ClientId
*/
const getClientByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { clientId } = req.params;

        if (isEmpty(clientId)) {

            errors.clientId = 'client Id is required.';

        } else if (!isValidObjectId(clientId)) {

            errors.clientId = 'client Id is not valid object id.';

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

const updateClientByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { clientId } = req.params;

        if (isEmpty(clientId)) {

            errors.clientId = 'client Id is required.';

        } else if (!isValidObjectId(clientId)) {

            errors.clientId = 'client Id is not valid object id.';

        }

        const { clientName, clientCompany, phoneNumber, email, companyLogo, companyAddress } = req.body;


        if (!isEmpty(clientName) && !isString(clientName)) {

            errors.clientName = 'client Name is not valid.';

        }

        if (!isEmpty(clientCompany) && !isString(clientCompany)) {

            errors.clientCompany = 'Client Sign is not valid.';

        }

        if (!isEmpty(email) && !isEmail(email)) {

            errors.email = 'Email is not valid.';

        }

        // validation for phoneNumber in req.body

        if (!isEmpty(phoneNumber) && !isString(phoneNumber)) {

            errors.phoneNumber = 'Phone Number Should be a valid string';

        }

        if (!isEmpty(companyLogo) && !isString(companyLogo)) {

            errors.companyLogo = 'Company Logo is not valid.';

        }

        if (!isEmpty(companyAddress) && !isString(companyAddress)) {

            errors.companyAddress = 'Company Address is not valid.';

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

    addClientValidator,
    getClientByIdValidator,
    updateClientByIdValidator

}