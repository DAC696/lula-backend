/* IMPORTING MODULES */
const express = require("express");

const AspectsAndImpactController = require("../controllers/aspectsAndImpacts.controllers");

/* Validations */
const AspectsAndImpactValidator = require('../validators/aspectsAndImpacts.validators');

const checkAuth = require('../middlewares/checkAuth');

//aspect and impact access
const aspectAndImpactAccess = require("../middlewares/aspectAndImpactAccess");


/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new AspectsAndImpact
router.post('/addAspectsAndImpact', checkAuth, AspectsAndImpactValidator.addAspectsAndImpactValidator, AspectsAndImpactController.addAspectsAndImpact)

//Get AspectsAndImpact Details
router.get('/aspectsAndImpact/:aspectsAndImpactId', checkAuth, AspectsAndImpactValidator.getAspectsAndImpactByIdValidator, AspectsAndImpactController.getAspectsAndImpactById);

//update aspectsAndImpact details
router.post("/update/:aspectsAndImpactId", checkAuth, AspectsAndImpactValidator.updateAspectsAndImpactByIdValidator, AspectsAndImpactController.updateAspectsAndImpactById);

//delte aspectsAndImpact by id
router.delete("/delete/:aspectsAndImpactId", checkAuth, AspectsAndImpactValidator.getAspectsAndImpactByIdValidator, AspectsAndImpactController.deleteAspectsAndImpactById);

//get All details
router.get("/list", checkAuth, AspectsAndImpactController.enlistAllAspectsAndImpacts)

module.exports = router;