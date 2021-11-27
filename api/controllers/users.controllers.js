const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const UserModel = require("../models/users.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");
const { assignJWTToken } = require("../middlewares/signToken");
const bcrypt = require('bcryptjs');
const sendEmail = require("../misc/send-mail");

/**
 * @description let user log in with valid username/email and password and issue a JWT token
 * @body {String} username
 * @body {String} password
 */

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    //this function returns user document if it matches email
    const employee = await EmployeeModel.getEmployeeByEmail(email);

    console.log(email, employee, password)

    // If employee  is not in the database
    if (!employee) {

      return res.status(StatusCodes.UNAUTHORIZED).json({

        success: false,
        hasError: true,
        error: ["Authentication Failed"]

      })

    }

    /*
        Check if the password is correct
        isValidPassword function is defined in model employee
        it send true if hashed password is matched with the employee provided password
    */

    const isMatch = await employee.isValidPassword(password);

    console.log('isMatch ', isMatch)

    if (isMatch) {

      // Generate token
      const token = await assignJWTToken(employee);

      return res.status(StatusCodes.OK).json({
        token,
        success: true,
        hasError: false,
        payload: {
          _id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          profilePhoto: employee.profilePhoto,
          employeeRole: employee.employeeRole,
          roleId: employee._roleId
        }
      });
    } else {

      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        hasError: true,
        error: ["Authentication Failed"]
      })

    }

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

/**
 * @description This will create new User
 * @body {String} firstName
 * @body {String} lastName
 * @body {String} password
 * @body {String} userName
 * @body {String} email
 */

const createNewUser = async (req, res, next) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    //check for existing email or userName
    //this function returns user document if it matches email
    const user = await UserModel.getUserByEmail(email);

    console.log(email, user, password)

    // If user  is not in the database
    if (user) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["Email Already Exists"]

      })

    }

    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (salt + hash)
    let passwordHash = await bcrypt.hash(password, salt);

    //prepare object for storing user in db
    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: passwordHash
    }

    const userSaved = await UserModel.createNewUser(prepObj);

    if (isEmpty(userSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. User is not created yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: userSaved

    })


  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const resetPassword = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const { resetPassword } = req.body;

    const employee = await EmployeeModel.getEmployeeById(employeeId);

    if (!employee) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee not found of this Id"]

      })

    }

    const salt = await bcrypt.genSalt(10);

    let passwordHash = await bcrypt.hash(resetPassword, salt);

    //set email template
    const isEmailSent = await sendEmail(
      employee.email,
      resetPassword,
      "resetPassword"
    );

    if (!isEmailSent) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Email is not sent"]

      })

    }

    const employeeUpdated = await EmployeeModel.updateEmployeeById(employeeId, { password: passwordHash })

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        profilePhoto: employee.profilePhoto,
        employeeRole: employee.employeeRole
      }

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

module.exports = {
  login,
  createNewUser,
  resetPassword
};
