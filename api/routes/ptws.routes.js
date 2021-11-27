/* IMPORTING MODULES */
const express = require("express");

const PTWController = require("../controllers/ptws.controllers");

/* Validations */
const PTWValidator = require('../validators/ptws.validators');

const checkAuth = require('../middlewares/checkAuth');

//import ptw Access Control
const ptwAccess = require("../middlewares/ptwAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new PTW
router.post('/addPTW', checkAuth, PTWValidator.addPTWValidator, PTWController.addPTW)

//Get PTW Details
router.get('/ptw/:ptwId', checkAuth, PTWValidator.getPTWByIdValidator, PTWController.getPTWById);

//update ptw details
router.post("/update/:ptwId", checkAuth, PTWValidator.updatePTWByIdValidator, PTWController.updatePTWById);

//delte ptw by id
router.delete("/delete/:ptwId", checkAuth, PTWValidator.getPTWByIdValidator, PTWController.deletePTWById);

//get All details
router.get("/list", checkAuth, PTWController.enlistAllPTWs)

module.exports = router;