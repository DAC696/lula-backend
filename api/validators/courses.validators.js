const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isBoolean } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addCourseValidator = (req, res, next) => {
    try {

        const errors = {};

        let { courseName, courseType, isMandatory, validDate, expiryDate } = req.body;

        if (isEmpty(courseName)) {

            errors.courseName = 'Course Name is required.';

        } else if (!isString(courseName)) {

            errors.courseName = 'Course Title is not valid string.';

        }

        if (isEmpty(validDate)) {

            errors.validDate = 'Valid Date is required.';

        } else if (!isString(validDate)) {

            errors.validDate = 'Valid Date is not valid string.';

        }

        if (isEmpty(expiryDate)) {

            errors.expiryDate = 'Expiry Date is required.';

        } else if (!isString(expiryDate)) {

            errors.expiryDate = 'Expiry Date is not valid string.';

        }

        if (isEmpty(courseType)) {

            errors.courseType = 'Course Type is required.';

        } else if (!isString(courseType)) {

            errors.courseType = 'Course Type is not valid string.';

        }

        if (isEmpty(isMandatory)) {

            errors.isMandatory = 'Is Mandatory is required.';

        } else if (!isBoolean(isMandatory)) {

            errors.isMandatory = 'Is Mandatory is not valid boolean.';

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
* @Description : This handler will be used for both, get Course by id and delete Course
* @params {mongodb generated ObjectId} CourseId
*/
const getCourseByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { courseId } = req.params;

        if (isEmpty(courseId)) {

            errors.courseId = 'Course Id is required.';

        } else if (!isValidObjectId(courseId)) {

            errors.courseId = 'Course Id is not valid object id.';

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

const updateCourseByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { courseId } = req.params;

        if (isEmpty(courseId)) {

            errors.courseId = 'course Id is required.';

        } else if (!isValidObjectId(courseId)) {

            errors.courseId = 'course Id is not valid object id.';

        }

        let { courseName, courseType, isMandatory, validDate, expiryDate } = req.body;

        if (courseName && !isString(courseName)) {

            errors.courseName = 'Course Title is not valid string.';

        }

        if (validDate && !isString(validDate)) {

            errors.validDate = 'Valid Date is not valid string.';

        }

        if (expiryDate && !isString(expiryDate)) {

            errors.expiryDate = 'Expiry Date is not valid string.';

        }

        if (courseType && !isString(courseType)) {

            errors.courseType = 'Course Type is not valid string.';

        }

        if (!isEmpty(isMandatory) && !isBoolean(isMandatory)) {

            errors.isMandatory = 'Is Mandatory is not valid boolean.';

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

    addCourseValidator,
    getCourseByIdValidator,
    updateCourseByIdValidator

}