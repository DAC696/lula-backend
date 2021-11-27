const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addDocumentValidator = (req, res, next) => {
    try {

        console.log(req.files)

        const errors = {};

        const { fullFilePath } = req;

        

        const {
            revisionNumber,
            documentType,
            documentOwnerId,
            locationId,
            departmentId
        } = req.body

        if (isEmpty(revisionNumber)) {

            errors.revisionNumber = 'Revision number is required.';

        } else if (!isString(revisionNumber)) {

            errors.revisionNumber = 'Revision number is not valid string.';

        }

        if (isEmpty(documentType)) {

            errors.documentType = 'documentType is required.';

        } else if (!isString(documentType)) {

            errors.documentType = 'documentType is not valid string.';

        }

        if (isEmpty(documentOwnerId)) {

            errors.documentOwnerId = 'Document Owner Id is required.';

        } else if (!isValidObjectId(documentOwnerId)) {

            errors.documentOwnerId = 'Document Owner Id is not valid ObjectId.';

        }

        if (isEmpty(locationId)) {

            errors.locationId = 'Location Id is required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'Location Id is not valid ObjectId.';

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
* @Description : This handler will be used for both, get Document by id and delete Document
* @params {mongodb generated ObjectId} DocumentId
*/
const getDocumentByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { documentId } = req.params;

        if (isEmpty(documentId)) {

            errors.documentId = 'Document Id is required.';

        } else if (!isValidObjectId(documentId)) {

            errors.documentId = 'Document Id is not valid object id.';

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

const updateDocumentByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { documentId } = req.params;

        if (isEmpty(documentId)) {

            errors.documentId = 'Work History Id is required.';

        } else if (!isValidObjectId(documentId)) {

            errors.documentId = 'Work History Id is not valid ObjectId.';

        }

        const {
            revisionNumber,
            documentType,
            documentOwnerId,
            locationId,
            departmentId
        } = req.body

        if (revisionNumber && !isString(revisionNumber)) {

            errors.revisionNumber = 'Revision number is not valid string.';

        }

        if (documentType && !isString(documentType)) {

            errors.documentType = 'documentType is not valid string.';

        }

        if (documentOwnerId && !isValidObjectId(documentOwnerId)) {

            errors.documentOwnerId = 'Document Owner Id is not valid ObjectId.';

        }

        if (locationId && !isValidObjectId(locationId)) {

            errors.locationId = 'Location Id is not valid ObjectId.';

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

/** 
* @Description : This handler will be used for both, get Document List by id
* @params {mongodb generated ObjectId} EmployeeId
*/
const getDocumentListByEmployeeIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid object id.';

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

    addDocumentValidator,
    getDocumentByIdValidator,
    updateDocumentByIdValidator,
    getDocumentListByEmployeeIdValidator

}