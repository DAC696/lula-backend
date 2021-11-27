/* IMPORTING MODULES */
const express = require("express");

const SalaryCalculatorController = require("../controllers/salaryCalculators.controllers");

/* Validations */
const SalaryCalculatorValidator = require('../validators/salaryCalculators.validators');

const EmployeeValidator = require('../validators/employees.validators');


const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new SalaryCalculator
router.post('/addSalaryCalculator', checkAuth, SalaryCalculatorValidator.addSalaryCalculatorValidator, SalaryCalculatorController.addSalaryCalculator)

//Get SalaryCalculator Details
router.get('/salaryCalculator/:salaryCalculatorId', checkAuth, SalaryCalculatorValidator.getSalaryCalculatorByIdValidator, SalaryCalculatorController.getSalaryCalculatorById);

//update salaryCalculator details
router.post("/update/:salaryCalculatorId", checkAuth, SalaryCalculatorValidator.updateSalaryCalculatorByIdValidator, SalaryCalculatorController.updateSalaryCalculatorById);

//delte salaryCalculator by id
router.delete("/delete/:salaryCalculatorId", checkAuth, SalaryCalculatorValidator.getSalaryCalculatorByIdValidator, SalaryCalculatorController.deleteSalaryCalculatorById);

//get All details
router.get("/list", checkAuth, SalaryCalculatorController.enlistAllSalaryCalculators)

router.get("/list/:employeeId", checkAuth, EmployeeValidator.getEmployeeByIdValidator, SalaryCalculatorController.enlistAllSalaryCalculatorsByEmployeeId)

module.exports = router;