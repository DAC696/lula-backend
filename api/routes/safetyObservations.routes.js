/* IMPORTING MODULES */
const express = require("express");

const SafetyObservationController = require("../controllers/safetyObservations.controllers");

/* Validations */
const SafetyObservationValidator = require('../validators/safetyObservations.validators');

const checkAuth = require('../middlewares/checkAuth');

//import safetyObservation Access Control
const safetyObservationAccess = require("../middlewares/safetyObservationAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new SafetyObservation
router.post('/addSafetyObservation', checkAuth, SafetyObservationValidator.addSafetyObservationValidator, SafetyObservationController.addSafetyObservation)

//Get SafetyObservation Details
router.get('/safetyObservation/:safetyObservationId', checkAuth, SafetyObservationValidator.getSafetyObservationByIdValidator, SafetyObservationController.getSafetyObservationById);

//update safetyObservation details
router.post("/update/:safetyObservationId", checkAuth, SafetyObservationValidator.updateSafetyObservationByIdValidator, SafetyObservationController.updateSafetyObservationById);

//delte safetyObservation by id
router.delete("/delete/:safetyObservationId", checkAuth, SafetyObservationValidator.getSafetyObservationByIdValidator, SafetyObservationController.deleteSafetyObservationById);

//get All details
router.get("/list", checkAuth, SafetyObservationController.enlistAllSafetyObservations)

module.exports = router;