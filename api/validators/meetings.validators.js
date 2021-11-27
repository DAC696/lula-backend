const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addMeetingValidator = (req, res, next) => {
    try {

        const errors = {};

        const { meetingName, meetingLocation, numOfPersons, employeeId,
            meetingType, departmentId,
            startDate, endDate, startTime, endTime,
            purpose, agenda, comments } = req.body;


        if (isEmpty(meetingName)) {

            errors.meetingName = 'meetingName is required.';

        } else if (!isString(meetingName)) {

            errors.meetingName = 'meetingName is not valid.';

        }

        if (isEmpty(meetingLocation)) {

            errors.meetingLocation = 'Meeting Location is required.';

        } else if (!isString(meetingLocation)) {

            errors.meetingLocation = 'Meeting Location is not valid.';

        }

        if (isEmpty(numOfPersons)) {

            errors.numOfPersons = 'Num Of Persons is required.';

        } else if (!isNumber(numOfPersons)) {

            errors.numOfPersons = 'Num Of Persons is not valid Number.';

        }

        if (isEmpty(meetingType)) {

            errors.meetingType = 'Meeting Type is required.';

        } else if (!isString(meetingType)) {

            errors.meetingType = 'Meeting Type is not valid.';

        }

        if (isEmpty(startDate)) {

            errors.startDate = 'Start Date is required.';

        } else if (!isString(startDate)) {

            errors.startDate = 'Start Date is not valid.';

        }

        if (isEmpty(startTime)) {

            errors.startTime = 'Start time is required.';

        } else if (!isString(startTime)) {

            errors.startTime = 'Start time is not valid.';

        }

        if (isEmpty(endDate)) {

            errors.endDate = 'End Date is required.';

        } else if (!isString(endDate)) {

            errors.endDate = 'End Date is not valid.';

        }

        if (isEmpty(purpose)) {

            errors.purpose = 'purpose required.';

        } else if (!isString(purpose)) {

            errors.purpose = 'purpose not valid.';

        }

        if (isEmpty(endTime)) {

            errors.endTime = 'end time is required.';

        } else if (!isString(endTime)) {

            errors.endTime = 'end time is not valid.';

        }

        if (isEmpty(agenda)) {

            errors.agenda = 'agenda is required.';

        } else if (!isString(agenda)) {

            errors.agenda = 'agenda is not valid.';

        }

        if (isEmpty(comments)) {

            errors.comments = 'comments is required.';

        } else if (!isString(comments)) {

            errors.comments = 'comments is not valid.';

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
* @Description : This handler will be used for both, get Meeting by id and delete Meeting
* @params {mongodb generated ObjectId} MeetingId
*/
const getMeetingByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { meetingId } = req.params;

        if (isEmpty(meetingId)) {

            errors.meetingId = 'meeting Id is required.';

        } else if (!isValidObjectId(meetingId)) {

            errors.meetingId = 'meeting Id is not valid object id.';

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

const updateMeetingByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { meetingId } = req.params;

        if (isEmpty(meetingId)) {

            errors.meetingId = 'meeting Id is required.';

        } else if (!isValidObjectId(meetingId)) {

            errors.meetingId = 'meeting Id is not valid object id.';

        }


        const { meetingName, meetingLocation, numOfPersons, employeeId,
            meetingType, departmentId,
            startDate, endDate, startTime, endTime,
            purpose, agenda, comments } = req.body;


        if (meetingName && !isString(meetingName)) {

            errors.meetingName = 'Meeting Name is not valid.';

        }

        if (meetingLocation && !isString(meetingLocation)) {

            errors.meetingLocation = 'Meeting Location is not valid.';

        }

        if (numOfPersons && !isNumber(numOfPersons)) {

            errors.numOfPersons = 'Num Of Persons is not valid Number.';

        }

        if (meetingType && !isString(meetingType)) {

            errors.meetingType = 'Meeting Type is not valid.';

        }

        if (startDate && !isString(startDate)) {

            errors.startDate = 'Start Date is not valid.';

        }

        if (endTime && !isString(startTime)) {

            errors.startTime = 'Start time is not valid.';

        }

        if (endDate && !isString(endDate)) {

            errors.endDate = 'End Date is not valid.';

        }

        if (purpose && !isString(purpose)) {

            errors.purpose = 'purpose not valid.';

        }

        if (endTime && !isString(endTime)) {

            errors.endTime = 'end time is not valid.';

        }

        if (agenda && !isString(agenda)) {

            errors.agenda = 'agenda is not valid.';

        }

        if (comments && !isString(comments)) {

            errors.comments = 'comments is not valid string.';

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

module.exports = {

    addMeetingValidator,
    getMeetingByIdValidator,
    updateMeetingByIdValidator

}