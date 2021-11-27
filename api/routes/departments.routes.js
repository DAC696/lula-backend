/* IMPORTING MODULES */
const express = require("express");

const DepartmentController = require("../controllers/departments.controllers");

/* Validations */
const DepartmentValidator = require('../validators/departments.validators');

const checkAuth = require('../middlewares/checkAuth');

//import department Access Control
const departmentAccess = require("../middlewares/departmentAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Department
router.post('/addDepartment', checkAuth, DepartmentValidator.addDepartmentValidator, DepartmentController.addDepartment)

//Get Department Details
router.get('/department/:departmentId', checkAuth, DepartmentValidator.getDepartmentByIdValidator, DepartmentController.getDepartmentById);

//update department details
router.post("/update/:departmentId", checkAuth, DepartmentValidator.updateDepartmentByIdValidator, DepartmentController.updateDepartmentById);

//delte department by id
router.delete("/delete/:departmentId", checkAuth, DepartmentValidator.getDepartmentByIdValidator, DepartmentController.deleteDepartmentById);

//get All details
router.get("/list", checkAuth, DepartmentController.enlistAllDepartments)

module.exports = router;