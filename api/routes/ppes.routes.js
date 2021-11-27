/* IMPORTING MODULES */
const express = require("express");

const PpeController = require("../controllers/ppes.controllers");

/* Validations */
const PpeValidator = require('../validators/ppes.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Ppe
router.post('/addPpe/:employeeId', checkAuth, PpeValidator.addPpeValidator, PpeController.addPpe)

//update ppe details
router.post("/update/:ppeId", checkAuth, PpeValidator.updatePpeByIdValidator, PpeController.updatePpeById);

//delte ppe by id
router.delete("/delete/:ppeId", checkAuth, PpeValidator.getPpeByIdValidator, PpeController.deletePpeById);

module.exports = router;