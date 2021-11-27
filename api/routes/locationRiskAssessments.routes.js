/* IMPORTING MODULES */
const express = require("express");

const LocationRiskAssessmentController = require("../controllers/locationRiskAssessments.controllers");

/* Validations */
const LocationRiskAssessmentValidator = require('../validators/locationRiskAssessments.validators');

const checkAuth = require('../middlewares/checkAuth');

//import locationRiskAssessment Access Control
const locationRiskAssessmentAccess = require("../middlewares/locationRiskAssessmentAccess");


/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new LocationRiskAssessment
router.post('/addLocationRiskAssessment', checkAuth, LocationRiskAssessmentValidator.addLocationRiskAssessmentValidator, LocationRiskAssessmentController.addLocationRiskAssessment)

//Get LocationRiskAssessment Details
router.get('/locationriskassessment/:locationRiskAssessmentId', checkAuth, LocationRiskAssessmentValidator.getLocationRiskAssessmentByIdValidator, LocationRiskAssessmentController.getLocationRiskAssessmentById);

//update locationriskassessment details
router.post("/update/:locationRiskAssessmentId", checkAuth, LocationRiskAssessmentValidator.updateLocationRiskAssessmentByIdValidator, LocationRiskAssessmentController.updateLocationRiskAssessmentById);

//delte locationriskassessment by id
router.delete("/delete/:locationRiskAssessmentId", checkAuth, LocationRiskAssessmentValidator.getLocationRiskAssessmentByIdValidator, LocationRiskAssessmentController.deleteLocationRiskAssessmentById);

//get All details
router.get("/list", checkAuth, LocationRiskAssessmentController.enlistAllLocationRiskAssessments)

module.exports = router;