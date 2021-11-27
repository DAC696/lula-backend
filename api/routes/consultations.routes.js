/* IMPORTING MODULES */
const express = require("express");

const ConsultationController = require("../controllers/consultations.controllers");

/* Validations */
const ConsultationValidator = require('../validators/consultations.validators');

const checkAuth = require('../middlewares/checkAuth');

//import consultation Access Control
const consultationAccess = require("../middlewares/medicalConsultationAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Consultation
router.post('/addConsultation', checkAuth, ConsultationValidator.addConsultationValidator, ConsultationController.addConsultation)

//Get Consultation Details
router.get('/consultation/:consultationId', checkAuth, ConsultationValidator.getConsultationByIdValidator, ConsultationController.getConsultationById);

//update consultation details
router.post("/update/:consultationId", checkAuth, ConsultationValidator.updateConsultationByIdValidator, ConsultationController.updateConsultationById);

//delte consultation by id
router.delete("/delete/:consultationId", checkAuth, ConsultationValidator.getConsultationByIdValidator, ConsultationController.deleteConsultationById);

//get All details
router.get("/list", checkAuth, ConsultationController.enlistAllConsultations)

module.exports = router;