const { isEmpty, isString, isValidObjectId } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addSalaryCalculatorValidator = (req, res, next) => {
    try {

        const errors = {};

        const { salaries } = req.body;

        if (isEmpty(salaries)) {

            errors.salaries = 'Salaries is required.';

        } else if (!Array.isArray(salaries)) {

            errors.salaries = 'Salaries is not valid Array.';

        }

        if (Array.isArray(salaries)) {

            for (const salary of salaries) {

                const { code, startDate, endDate, employeeId } = salary;

                if (isEmpty(code)) {

                    errors.code = 'Salary Code is required.';

                }

                if (isEmpty(startDate)) {

                    errors.startDate = 'startDate is required.';

                } else if (!isString(startDate)) {

                    errors.startDate = 'startDate is not valid String.';

                }

                if (isEmpty(endDate)) {

                    errors.endDate = 'endDate is required.';

                } else if (!isString(endDate)) {

                    errors.endDate = 'endDate is not valid String.';

                }

                if (isEmpty(employeeId)) {

                    errors.employeeId = 'EmployeeId is required.';

                } else if (!isValidObjectId(employeeId)) {

                    errors.employeeId = 'EmployeeId is not valid Object Id.';

                }

            }

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
* @Description : This handler will be used for both, get SalaryCalculator by id and delete SalaryCalculator
* @params {mongodb generated ObjectId} SalaryCalculatorId
*/
const getSalaryCalculatorByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { salaryCalculatorId } = req.params;

        if (isEmpty(salaryCalculatorId)) {

            errors.salaryCalculatorId = 'SalaryCalculator Id is required.';

        } else if (!isValidObjectId(salaryCalculatorId)) {

            errors.salaryCalculatorId = 'SalaryCalculator Id is not valid object id.';

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

const updateSalaryCalculatorByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { salaryCalculatorId } = req.params;

        if (isEmpty(salaryCalculatorId)) {

            errors.salaryCalculatorId = 'salarycalculator Id is required.';

        } else if (!isValidObjectId(salaryCalculatorId)) {

            errors.salaryCalculatorId = 'salarycalculator Id is not valid object id.';

        }

        const { startDate, endDate, employeeId } = req.body;


        if (startDate && !isString(startDate)) {

            errors.startDate = 'startDate is not valid String.';

        }

        if (endDate && !isString(endDate)) {

            errors.endDate = 'endDate is not valid String.';

        }


        if (employeeId && !isValidObjectId(employeeId)) {

            errors.employeeId = 'EmployeeId is not valid Object Id.';

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

    addSalaryCalculatorValidator,
    getSalaryCalculatorByIdValidator,
    updateSalaryCalculatorByIdValidator

}