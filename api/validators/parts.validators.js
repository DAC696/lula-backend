const { isEmpty, isString, isValidObjectId, isEmail, isNumber, isObject } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addPartValidator = (req, res, next) => {
    try {

        const errors = {};

        const {
            itemName,
            manufacturer,
            suppliedBy,
            cost,
            quantity,
            equipmentId,
        } = req.body;

        if (isEmpty(itemName)) {

            errors.itemName = 'Item Name is required.';

        } else if (!isString(itemName)) {

            errors.itemName = 'Item Name is not valid.';

        }

        if (isEmpty(cost)) {

            errors.cost = 'cost is required.';

        } else if (!isString(cost)) {

            errors.cost = 'cost is not valid.';

        }

        if (isEmpty(quantity)) {

            errors.quantity = 'Quantity is required.';

        } else if (!isNumber(quantity)) {

            errors.quantity = 'Quantity is not valid.';

        }

        if (isEmpty(equipmentId)) {

            errors.equipmentId = 'Equipment Id is required.';

        } else if (!isValidObjectId(equipmentId)) {

            errors.equipmentId = 'Equipment Id is not valid.';

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
* @Description : This handler will be used for both, get Part by id and delete Part
* @params {mongodb generated ObjectId} PartId
*/
const getPartByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { partId } = req.params;

        if (isEmpty(partId)) {

            errors.partId = 'Part Id is required.';

        } else if (!isValidObjectId(partId)) {

            errors.partId = 'Part Id is not valid object id.';

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

const updatePartByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { partId } = req.params;

        if (isEmpty(partId)) {

            errors.partId = 'part Id is required.';

        } else if (!isValidObjectId(partId)) {

            errors.partId = 'part Id is not valid object id.';

        }

        const {
            itemName,
            manufacturer,
            suppliedBy,
            cost,
            quantity,
            equipmentId,
        } = req.body;

        if (itemName && !isString(itemName)) {

            errors.itemName = 'Item Name is not valid.';

        }

        if (cost && !isString(cost)) {

            errors.cost = 'cost is not valid.';

        }

        if (quantity && !isNumber(quantity)) {

            errors.quantity = 'Quantity is not valid.';

        }

        if (equipmentId && !isValidObjectId(equipmentId)) {

            errors.equipmentId = 'Equipment Id is not valid.';

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

    addPartValidator,
    getPartByIdValidator,
    updatePartByIdValidator

}