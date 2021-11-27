/* IMPORTING MODULES */
const express = require("express");

const UserController = require("../controllers/users.controllers");

/* Validations */
const UserValidator = require('../validators/users.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Create New User 
router.post('/createUser', UserValidator.createNewUser, UserController.createNewUser)

//log with email n password
router.post('/login', UserValidator.loginValidator, UserController.login);

//reset employee password
router.post('/employee/resetPassword/:employeeId', UserValidator.resetPasswordValidator, UserController.resetPassword);

module.exports = router;