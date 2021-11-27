const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isObject } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addWorkOrderValidator = (req, res, next) => {
    try {

        const errors = {};

        const {
            taskName,
            description,//optional
            status,
            origin,
            jobType,
            jobNumber,
            jobPriority,
            mainHours,
            taskFrequency,
            ptwRequired,
            roleId,
            parts, //optional
            equipmentId
        } = req.body;

        if (isEmpty(taskName)) {

            errors.taskName = 'Task Name is required.';

        } else if (!isString(taskName)) {

            errors.taskName = 'Task Name is not valid.';

        }

        if (isEmpty(origin)) {

            errors.origin = 'Origin is required.';

        } else if (!isString(origin)) {

            errors.origin = 'Origin is not valid.';

        }

        if (isEmpty(jobType)) {

            errors.jobType = 'jobType is required.';

        } else if (!isString(jobType)) {

            errors.jobType = 'jobType is not valid.';

        }

        if (isEmpty(jobPriority)) {

            errors.jobPriority = 'jobPriority is required.';

        } else if (!isString(jobPriority)) {

            errors.jobPriority = 'jobPriority is not valid.';

        }

        if (isEmpty(jobNumber)) {

            errors.jobNumber = 'Job Number is required.';

        } else if (!isString(jobNumber)) {

            errors.jobNumber = 'Job Number is not valid.';

        }

        if (isEmpty(taskFrequency)) {

            errors.taskFrequency = 'taskFrequency is required.';

        } else if (!isString(taskFrequency)) {

            errors.taskFrequency = 'taskFrequency is not valid.';

        }

        if (!Array.isArray(parts)) {
        } else if (Array.isArray(parts)) {

            if (parts.length)
                for (const part of parts) {

                    const { partId, partQuantity } = part

                    if (isEmpty(partQuantity)) {

                        errors.partQuantity = 'partQuantity is required.';

                    } else if (!isNumber(partQuantity)) {

                        errors.partQuantity = 'partQuantity is not valid.';

                    }

                    if (isEmpty(partId)) {

                        errors.partId = 'Part Id is required.';

                    } else if (!isValidObjectId(partId)) {

                        errors.partId = 'Part Id is not valid.';

                    }
                }
        }

        if (isEmpty(equipmentId)) {

            errors.equipmentId = 'Equipment Id is required.';

        } else if (!isValidObjectId(equipmentId)) {

            errors.equipmentId = 'Equipment Id is not valid.';

        }

        if (isEmpty(roleId)) {

            errors.roleId = 'Role Id is required.';

        } else if (!isValidObjectId(roleId)) {

            errors.roleId = 'Role Id is not valid.';

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
* @Description : This handler will be used for both, get WorkOrder by id and delete WorkOrder
* @params {mongodb generated ObjectId} WorkOrderId
*/
const getWorkOrderByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { workOrderId } = req.params;

        if (isEmpty(workOrderId)) {

            errors.workOrderId = 'WorkOrder Id is required.';

        } else if (!isValidObjectId(workOrderId)) {

            errors.workOrderId = 'WorkOrder Id is not valid object id.';

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

const updateWorkOrderByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { workOrderId } = req.params;

        if (isEmpty(workOrderId)) {

            errors.workOrderId = 'workOrder Id is required.';

        } else if (!isValidObjectId(workOrderId)) {

            errors.workOrderId = 'workOrder Id is not valid object id.';

        }

        const {
            taskName,
            status,
            origin,
            jobType,
            jobNumber,
            jobPriority,
            mainHours,
            parts,
            taskFrequency,
            ptwRequired,
            roleId,
            equipmentId,
        } = req.body;

        if (taskName && !isString(taskName)) {

            errors.taskName = 'Task Name is not valid.';

        }


        if (origin && !isString(origin)) {

            errors.origin = 'Origin is not valid.';

        }

        if (jobType && !isString(jobType)) {

            errors.jobType = 'jobType is not valid.';

        }

        if (jobPriority && !isString(jobPriority)) {

            errors.jobPriority = 'jobPriority is not valid.';

        }

        if (jobNumber && !isString(jobNumber)) {

            errors.jobNumber = 'Job Number is not valid.';

        }

        if (taskFrequency && !isString(taskFrequency)) {

            errors.taskFrequency = 'taskFrequency is not valid.';

        }

        if (equipmentId && !isValidObjectId(equipmentId)) {

            errors.equipmentId = 'Equipment Id is not valid.';

        }

        if (roleId && !isValidObjectId(roleId)) {

            errors.roleId = 'Role Id is not valid.';

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

    addWorkOrderValidator,
    getWorkOrderByIdValidator,
    updateWorkOrderByIdValidator

}