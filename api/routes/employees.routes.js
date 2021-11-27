/* IMPORTING MODULES */
const express = require("express");

const EmployeeController = require("../controllers/employees.controllers");

/* Validations */
const EmployeeValidator = require('../validators/employees.validators');

const LocationValidator = require('../validators/locations.validators');


const checkAuth = require('../middlewares/checkAuth');

const fileUpload = require('../middlewares/uploadDocument');

const employeeAccess = require("../middlewares/employeeAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Employee
router.post('/addEmployee', checkAuth, fileUpload.single('employeeDocument'), EmployeeValidator.addEmployeeValidator, EmployeeController.addEmployee)

//Get Employee Details
router.get('/employee/:employeeId', checkAuth, EmployeeValidator.getEmployeeByIdValidator, EmployeeController.getEmployeeById);

//update employee details
router.post("/update/:employeeId", checkAuth, fileUpload.single('updateEmployee'), EmployeeValidator.updateEmployeeByIdValidator, EmployeeController.updateEmployeeById);

//delte employee by id
router.delete("/delete/:employeeId", checkAuth, EmployeeValidator.getEmployeeByIdValidator, EmployeeController.deleteEmployeeById);

//get All details
router.get("/list", checkAuth, EmployeeController.enlistAllEmployees)

router.get("/list/:locationId", checkAuth, LocationValidator.getLocationByIdValidator, EmployeeController.enlistAllEmployeesByLocationId)

module.exports = router;