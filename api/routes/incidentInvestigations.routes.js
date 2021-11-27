/* IMPORTING MODULES */
const express = require("express");

const IncidentInvestigationController = require("../controllers/incidentInvestigations.controllers");

/* Validations */
const IncidentInvestigationValidator = require('../validators/incidentInvestigations.validators');

const checkAuth = require('../middlewares/checkAuth');

const multipleUpload = require('../middlewares/multipleDocsUpload');

//import incidentInvestigation Access Control
const incidentInvestigationAccess = require("../middlewares/incidentInvestigationAccess");


/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new IncidentInvestigation
router.post('/addIncidentInvestigation', checkAuth, multipleUpload.array("multipleInvestigationDocs", 10), IncidentInvestigationValidator.addIncidentInvestigationValidator, IncidentInvestigationController.addIncidentInvestigation)

//Get IncidentInvestigation Details
router.get('/incidentInvestigation/:incidentInvestigationId', checkAuth, IncidentInvestigationValidator.getIncidentInvestigationByIdValidator, IncidentInvestigationController.getIncidentInvestigationById);

//update incidentInvestigation details
router.post("/update/:incidentInvestigationId", checkAuth, multipleUpload.array("updateMultipleInvestigationDocs", 10), IncidentInvestigationValidator.updateIncidentInvestigationByIdValidator, IncidentInvestigationController.updateIncidentInvestigationById);

//delte incidentInvestigation by id
router.delete("/delete/:incidentInvestigationId", checkAuth, IncidentInvestigationValidator.getIncidentInvestigationByIdValidator, IncidentInvestigationController.deleteIncidentInvestigationById);

//get All details
router.get("/list", checkAuth, IncidentInvestigationController.enlistAllIncidentInvestigations)


module.exports = router;