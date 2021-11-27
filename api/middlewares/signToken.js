const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../../dependencies/config");
const { NUM_OF_HOURS_FOR_JWT_TOKEN } = require("../../utils/constants");
const { StatusCodes } = require('http-status-codes')

/* ASSIGNing JWT */

const assignJWTToken = async (employee) => {
  try {
    /*  SETTING PAYLOAD WITH _ID AND NAME FROM THE USER */

    const payload = {
      _id: employee._id,
      email: employee.email,
      firstName: employee.firstName,
      lastName: employee.lastName,
      employeeRole: employee.employeeRole,
      _roleId: employee._roleId
    };

    return JWT.sign(payload, JWT_SECRET, {

      expiresIn: NUM_OF_HOURS_FOR_JWT_TOKEN

    });

  } catch (error) {

   console.log("Error in Assigning JWT Token ", error)

  }
};


module.exports = { assignJWTToken };
