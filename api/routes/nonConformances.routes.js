/* IMPORTING MODULES */
const express = require("express");

const NonConformanceController = require("../controllers/nonConformances.controllers");

/* Validations */
const NonConformanceValidator = require('../validators/NonConformances.validators');

const checkAuth = require('../middlewares/checkAuth');

//import nonConformance Access Control
const nonConformanceAccess = require("../middlewares/nonConformanceAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new NonConformance
router.post('/addNonConformance', checkAuth, NonConformanceValidator.addNonConformanceValidator, NonConformanceController.addNonConformance)

//Get NonConformance Details
router.get('/nonConformance/:nonConformanceId', checkAuth, NonConformanceValidator.getNonConformanceByIdValidator, NonConformanceController.getNonConformanceById);

//update nonConformance details
router.post("/update/:nonConformanceId", checkAuth, NonConformanceValidator.updateNonConformanceByIdValidator, NonConformanceController.updateNonConformanceById);

//delte nonConformance by id
router.delete("/delete/:nonConformanceId", checkAuth, NonConformanceValidator.getNonConformanceByIdValidator, NonConformanceController.deleteNonConformanceById);

//get All details
router.get("/list", checkAuth, NonConformanceController.enlistAllNonConformances)

module.exports = router;