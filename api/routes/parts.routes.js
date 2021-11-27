/* IMPORTING MODULES */
const express = require("express");

const PartController = require("../controllers/parts.controllers");

/* Validations */
const PartValidator = require('../validators/parts.validators');

const checkAuth = require('../middlewares/checkAuth');

//import part Access Control
const partAccess = require("../middlewares/partAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Part
router.post('/addPart', checkAuth, PartValidator.addPartValidator, PartController.addPart)

//Get Part Details
router.get('/part/:partId', checkAuth, PartValidator.getPartByIdValidator, PartController.getPartById);

//update part details
router.post("/update/:partId", checkAuth, PartValidator.updatePartByIdValidator, PartController.updatePartById);

//delte part by id
router.delete("/delete/:partId", checkAuth, PartValidator.getPartByIdValidator, PartController.deletePartById);

//get All details
router.get("/list", checkAuth, PartController.enlistAllParts)

module.exports = router;