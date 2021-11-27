const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')
const { StatusCodes } = require('http-status-codes');

const addEmployeeValidator = (req, res, next) => {
    try {

        const errors = {};

        const {  firstName, lastName, password, phoneNumber, email,
            address,
            street,
            homePhoneNumber,
            houseNumber,
            floorNumber,
            city,
            state,
            areaCode, profilePhoto,
            insurance, nationalID, passportNumber, dateOfBirth, gender, dateHired,
            dateReleased, cbu, status, employeeRole, roleId, locationId, departmentId, unionId,
            primaryFamilyMemberName, primaryFamilyMemberPhone, primaryFamilyMemberRelation,
            secondaryFamilyMemberName, secondaryFamilyMemberPhone, secondaryFamilyMemberRelation,
            tertiaryFamilyMemberName, tertiaryFamilyMemberPhone, tertiaryFamilyMemberRelation,

        } = req.body;

        if (isEmpty(firstName)) {

            errors.firstName = 'Employee First Name is required.';

        } else if (!isString(firstName)) {

            errors.firstName = 'Employee First Name is not valid.';

        }

        if (isEmpty(lastName)) {

            errors.lastName = 'Employee Last Name is required.';

        } else if (!isString(lastName)) {

            errors.lastName = 'Employee Last Name is not valid.';

        }

        if (address && !isString(address)) {

            errors.address = 'address is not valid string.';

        }

        if (homePhoneNumber && !isString(homePhoneNumber)) {

            errors.homePhoneNumber = 'homePhoneNumber is not valid string.';

        }

        if (houseNumber && !isString(houseNumber)) {

            errors.houseNumber = 'houseNumber is not valid string.';

        }

        if (street && !isString(street)) {

            errors.street = 'street is not valid string.';

        }

        if (floorNumber && !isString(floorNumber)) {

            errors.floorNumber = 'floorNumber is not valid string.';

        }

        if (areaCode && !isString(areaCode)) {

            errors.areaCode = 'areaCode is not valid string.';

        }

        if (city && !isString(city)) {

            errors.city = 'city is not valid string.';

        }

        if (state && !isString(state)) {

            errors.state = 'state is not valid string.';

        }

        if (isEmpty(password)) {

            errors.password = 'Password is required.';

        } else if (!isString(password)) {

            errors.password = 'Password is not valid.';

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

        // validation for insurance in req.body

        if (insurance && !isString(insurance)) {

            errors.insurance = 'Insurance Number Should be a valid string';

        }

        // validation for nationalID in req.body

        if (nationalID && !isString(nationalID)) {

            errors.nationalID = 'National ID Should be a valid string';

        }

        // validation for passportNumber in req.body

        if (passportNumber && !isString(passportNumber)) {

            errors.passportNumber = 'Passport Number Should be a valid string';

        }

        // validation for dateOfBirth in req.body

        if (dateOfBirth && !isString(dateOfBirth)) {

            errors.dateOfBirth = 'Date of birth Should be a valid string';

        }

        // validation for gender in req.body

        if (gender && !isString(gender)) {

            errors.gender = 'Gender Should be a valid string';

        }

        // validation for dateHired in req.body

        if (dateHired && !isString(dateHired)) {

            errors.dateHired = 'Date Hired Should be a valid string';

        }

        // validation for dateReleased in req.body || optional

        if (dateReleased && !isString(dateReleased)) {

            errors.dateReleased = 'Date Released Should be a valid string';

        }

        // validation for cbu in req.body

        if (cbu && !isString(cbu)) {

            errors.cbu = 'CBU Should be a valid string';

        }

        // validation for status in req.body

        if (status && !isString(status)) {

            errors.status = 'status Should be a valid string';

        }

        // validation for employeeRole in req.body

        if (isEmpty(employeeRole)) {

            errors.employeeRole = 'employeeRole is required.';

        } else if (!isString(employeeRole)) {

            errors.employeeRole = 'employeeRole Should be a valid string';

        }

        // validation for locationId in req.body

        if (isEmpty(locationId)) {

            errors.locationId = 'locationId is required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'locationId Should be a valid object id';

        }

        // validation for roleId in req.body

        if (isEmpty(roleId)) {

            errors.roleId = 'roleId is required.';

        } else if (!isValidObjectId(roleId)) {

            errors.roleId = 'roleId Should be a valid object id';

        }

        // validation for departmentId in req.body

        if (isEmpty(departmentId)) {

            errors.departmentId = 'departmentId is required.';

        } else if (!isValidObjectId(departmentId)) {

            errors.departmentId = 'departmentId Should be a valid object id';

        }

        // validation for unionId in req.body

        if (unionId && !isValidObjectId(unionId)) {

            errors.unionId = 'unionId Should be a valid object id';

        }

        // validation for primaryFamilyMemberName in req.body

        if (primaryFamilyMemberName && !isString(primaryFamilyMemberName)) {

            errors.primaryFamilyMemberName = 'primaryFamilyMemberName Should be a valid string';

        }

        // validation for primaryFamilyMemberPhone in req.body

        if (primaryFamilyMemberPhone && !isString(primaryFamilyMemberPhone)) {

            errors.primaryFamilyMemberPhone = 'primaryFamilyMemberPhone Should be a valid string';

        }

        // validation for primaryFamilyMemberRelation in req.body

        if (primaryFamilyMemberRelation && !isString(primaryFamilyMemberRelation)) {

            errors.primaryFamilyMemberRelation = 'primaryFamilyMemberRelation Should be a valid string';

        }

        // validation for secondaryFamilyMemberName in req.body

        if (secondaryFamilyMemberName && !isString(secondaryFamilyMemberName)) {

            errors.secondaryFamilyMemberName = 'secondaryFamilyMemberName Should be a valid string';

        }

        // validation for secondaryFamilyMemberPhone in req.body

        if (secondaryFamilyMemberPhone && !isString(secondaryFamilyMemberPhone)) {

            errors.secondaryFamilyMemberPhone = 'secondaryFamilyMemberPhone Should be a valid string';

        }

        // validation for secondaryFamilyMemberRelation in req.body

        if (secondaryFamilyMemberRelation && !isString(secondaryFamilyMemberRelation)) {

            errors.secondaryFamilyMemberRelation = 'secondaryFamilyMemberRelation Should be a valid string';

        }

        // validation for tertiaryFamilyMemberName in req.body

        if (tertiaryFamilyMemberName && !isString(tertiaryFamilyMemberName)) {

            errors.tertiaryFamilyMemberName = 'tertiaryFamilyMemberName Should be a valid string';

        }

        // validation for tertiaryFamilyMemberPhone in req.body

        if (tertiaryFamilyMemberPhone && !isString(tertiaryFamilyMemberPhone)) {

            errors.tertiaryFamilyMemberPhone = 'tertiaryFamilyMemberPhone Should be a valid string';

        }

        // validation for tertiaryFamilyMemberRelation in req.body

        if (tertiaryFamilyMemberRelation && !isString(tertiaryFamilyMemberRelation)) {

            errors.tertiaryFamilyMemberRelation = 'tertiaryFamilyMemberRelation Should be a valid string';

        }

        // validation for profilePhoto in req.body

        if (profilePhoto && !isString(profilePhoto)) {

            errors.profilePhoto = 'Profile Photo Should be a valid string';

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
* @Description : This handler will be used for both, get Employee by id and delete Employee
* @params {mongodb generated ObjectId} EmployeeId
*/
const getEmployeeByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'employee Id is not valid object id.';

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

const updateEmployeeByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { employeeId } = req.params;

        if (isEmpty(employeeId)) {

            errors.employeeId = 'employee Id is required.';

        } else if (!isValidObjectId(employeeId)) {

            errors.employeeId = 'employee Id is not valid object id.';

        }

        const { 
             firstName, lastName, password, phoneNumber, email, address,
            homePhoneNumber,
            street,
            houseNumber,
            floorNumber,
            city,
            state,
            areaCode, profilePhoto,
            insurance, nationalID, passportNumber, dateOfBirth, gender, dateHired,
            dateReleased, cbu, status, roleId, locationId, departmentId, unionId,
            primaryFamilyMemberName, primaryFamilyMemberPhone, primaryFamilyMemberRelation,
            secondaryFamilyMemberName, secondaryFamilyMemberPhone, secondaryFamilyMemberRelation,
            tertiaryFamilyMemberName, tertiaryFamilyMemberPhone, tertiaryFamilyMemberRelation,

        } = req.body; 

        if (firstName && !isString(firstName)) {

            errors.firstName = 'Employee First Name is not valid.';

        }

        if (lastName && !isString(lastName)) {

            errors.lastName = 'Employee Last Name is not valid.';

        }

        if (address && !isString(address)) {

            errors.address = 'Address is not valid.';

        }

        if (street !== undefined && street !== null && !isString(street)) {

            errors.street = 'street Should be a valid string';

        }

        if (areaCode !== undefined && areaCode !== null && !isString(areaCode)) {

            errors.areaCode = 'areaCode Should be a valid string';

        }

        if (floorNumber !== undefined && floorNumber !== null && !isString(floorNumber)) {

            errors.floorNumber = 'floorNumber Should be a valid string';

        }

        if (homePhoneNumber !== undefined && homePhoneNumber !== null && !isString(homePhoneNumber)) {

            errors.homePhoneNumber = 'homePhoneNumber Should be a valid string';

        }

        if (houseNumber !== undefined && houseNumber !== null && !isString(houseNumber)) {

            errors.houseNumber = 'houseNumber Should be a valid string';

        }

        if (city !== undefined && city !== null && !isString(city)) {

            errors.city = 'city Should be a valid string';

        }

        if (state !== undefined && state !== null && !isString(state)) {

            errors.state = 'state Should be a valid string';

        }

        if (email && !isEmail(email)) {

            errors.email = 'Email is not valid.';

        }

        if (password && !isString(password)) {

            errors.password = 'Password is not valid.';

        }

        // validation for phoneNumber in req.body

        if (phoneNumber && !isString(phoneNumber)) {

            errors.phoneNumber = 'Phone Number Should be a valid string';

        }

        // validation for insurance in req.body

        if (insurance && !isString(insurance)) {

            errors.insurance = 'Insurance Number Should be a valid string';

        }

        // validation for nationalID in req.body

        if (nationalID && !isString(nationalID)) {

            errors.nationalID = 'National ID Should be a valid string';

        }

        // validation for passportNumber in req.body

        if (passportNumber && !isString(passportNumber)) {

            errors.passportNumber = 'Passport Number Should be a valid string';

        }

        // validation for dateOfBirth in req.body

        if (dateOfBirth && !isString(dateOfBirth)) {

            errors.dateOfBirth = 'Date of birth Should be a valid string';

        }

        // validation for gender in req.body

        if (gender && !isString(gender)) {

            errors.gender = 'Gender Should be a valid string';

        }

        // validation for dateHired in req.body

        if (dateHired && !isString(dateHired)) {

            errors.dateHired = 'Date Hired Should be a valid string';

        }

        // validation for dateReleased in req.body

        if (dateReleased && !isString(dateReleased)) {

            errors.dateReleased = 'Date Released Should be a valid string';

        }

        // validation for cbu in req.body

        if (cbu && !isString(cbu)) {

            errors.cbu = 'CBU Should be a valid string';

        }

        // validation for status in req.body

        if (status && !isString(status)) {

            errors.status = 'status Should be a valid string';

        }

        // validation for locationId in req.body

        if (locationId && !isValidObjectId(locationId)) {

            errors.locationId = 'locationId Should be a valid object id';

        }

        // validation for roleId in req.body

        if (roleId && !isValidObjectId(roleId)) {

            errors.roleId = 'roleId Should be a valid object id';

        }

        // validation for departmentId in req.body

        if (departmentId && !isValidObjectId(departmentId)) {

            errors.departmentId = 'departmentId Should be a valid object id';

        }

        // validation for unionId in req.body

        if (unionId !== undefined && unionId !== null && !isValidObjectId(unionId)) {

            errors.unionId = 'unionId Should be a valid object id';

        }

        // validation for primaryFamilyMemberName in req.body

        if (primaryFamilyMemberName !== undefined && primaryFamilyMemberName !== null && !isString(primaryFamilyMemberName)) {

            errors.primaryFamilyMemberName = 'primaryFamilyMemberName Should be a valid string';

        }

        // validation for primaryFamilyMemberPhone in req.body

        if (primaryFamilyMemberPhone !== undefined && primaryFamilyMemberPhone !== null && !isString(primaryFamilyMemberPhone)) {

            errors.primaryFamilyMemberPhone = 'primaryFamilyMemberPhone Should be a valid string';

        }

        // validation for primaryFamilyMemberRelation in req.body

        if (primaryFamilyMemberRelation !== undefined && primaryFamilyMemberRelation !== null && !isString(primaryFamilyMemberRelation)) {

            errors.primaryFamilyMemberRelation = 'primaryFamilyMemberRelation Should be a valid string';

        }

        // validation for secondaryFamilyMemberName in req.body

        if (secondaryFamilyMemberName !== undefined && secondaryFamilyMemberName !== null && !isString(secondaryFamilyMemberName)) {

            errors.secondaryFamilyMemberName = 'secondaryFamilyMemberName Should be a valid string';

        }

        // validation for secondaryFamilyMemberPhone in req.body

        if (secondaryFamilyMemberPhone !== undefined && secondaryFamilyMemberPhone !== null && !isString(secondaryFamilyMemberPhone)) {

            errors.secondaryFamilyMemberPhone = 'secondaryFamilyMemberPhone Should be a valid string';

        }

        // validation for secondaryFamilyMemberRelation in req.body

        if (secondaryFamilyMemberRelation !== undefined && secondaryFamilyMemberRelation !== null && !isString(secondaryFamilyMemberRelation)) {

            errors.secondaryFamilyMemberRelation = 'secondaryFamilyMemberRelation Should be a valid string';

        }

        // validation for tertiaryFamilyMemberName in req.body

        if (tertiaryFamilyMemberName !== undefined && tertiaryFamilyMemberName !== null && !isString(tertiaryFamilyMemberName)) {

            errors.tertiaryFamilyMemberName = 'tertiaryFamilyMemberName Should be a valid string';

        }

        // validation for tertiaryFamilyMemberPhone in req.body

        if (tertiaryFamilyMemberPhone !== undefined && tertiaryFamilyMemberPhone !== null && !isString(tertiaryFamilyMemberPhone)) {

            errors.tertiaryFamilyMemberPhone = 'tertiaryFamilyMemberPhone Should be a valid string';

        }

        // validation for tertiaryFamilyMemberRelation in req.body

        if (tertiaryFamilyMemberRelation !== undefined && tertiaryFamilyMemberRelation !== null && !isString(tertiaryFamilyMemberRelation)) {

            errors.tertiaryFamilyMemberRelation = 'tertiaryFamilyMemberRelation Should be a valid string';

        }

        // validation for profilePhoto in req.body

        if (profilePhoto !== undefined && profilePhoto !== null && !isString(profilePhoto)) {

            errors.profilePhoto = 'Profile Photo Should be a valid string';

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

    addEmployeeValidator,
    getEmployeeByIdValidator,
    updateEmployeeByIdValidator

}