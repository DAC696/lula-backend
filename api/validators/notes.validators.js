const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addNoteValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'Employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid ObjectId.';

        }

        const { comment } = req.body;

        if (isEmpty(comment)) {

            errors.comment = 'Comment is required.';

        } else if (!isString(comment)) {

            errors.comment = 'Comment is not valid string.';

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
* @Description : This handler will be used for both, get Note by id and delete Note
* @params {mongodb generated ObjectId} NoteId
*/
const getNoteByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { noteId } = req.params;

        if (isEmpty(noteId)) {

            errors.noteId = 'Note Id is required.';

        } else if (!isValidObjectId(noteId)) {

            errors.noteId = 'Note Id is not valid object id.';

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

const updateNoteByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { noteId } = req.params;

        if (isEmpty(noteId)) {

            errors.noteId = 'Work History Id is required.';

        } else if (!isValidObjectId(noteId)) {

            errors.noteId = 'Work History Id is not valid ObjectId.';

        }

        const { comment } = req.body;

        if (comment && !isString(comment)) {

            errors.comment = 'Comment is not valid string.';

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
* @Description : This handler will be used for both, get Note List by id
* @params {mongodb generated ObjectId} EmployeeId
*/
const getNoteListByEmployeeIdValidator = (req, res, next) => {
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

    addNoteValidator,
    getNoteByIdValidator,
    updateNoteByIdValidator,
    getNoteListByEmployeeIdValidator

}