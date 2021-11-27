/* IMPORTING MODULES */
const express = require("express");

const ComplianceController = require("../controllers/compliances.controllers");

/* Validations */
const ComplianceValidator = require('../validators/compliances.validators');

const checkAuth = require('../middlewares/checkAuth');

//import Access Control
const complianceAccess = require("../middlewares/complianceAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Compliance
router.post('/addCompliance', checkAuth, ComplianceValidator.addComplianceValidator, ComplianceController.addCompliance)

//Get Compliance Details
router.get('/compliance/:complianceId', checkAuth, ComplianceValidator.getComplianceByIdValidator, ComplianceController.getComplianceById);

//update compliance details
router.post("/update/:complianceId", checkAuth, ComplianceValidator.updateComplianceByIdValidator, ComplianceController.updateComplianceById);

//delte compliance by id
router.delete("/delete/:complianceId", checkAuth, ComplianceValidator.getComplianceByIdValidator, ComplianceController.deleteComplianceById);

//get All details
router.get("/list", checkAuth, ComplianceController.enlistAllCompliances)

module.exports = router;