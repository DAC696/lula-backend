/* IMPORTING MODULES */
const express = require("express");

const IdeasAndOpportunityController = require("../controllers/ideasAndOpportunities.controllers");

/* Validations */
const IdeasAndOpportunityValidator = require('../validators/ideasAndOpportunities.validators');

const checkAuth = require('../middlewares/checkAuth');

//import ideaAndOpportunity Access Control
const ideaAndOpportunityAccess = require("../middlewares/ideaAndOpportunityAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new IdeasAndOpportunity
router.post('/addIdeasAndOpportunity', checkAuth, IdeasAndOpportunityValidator.addIdeasAndOpportunityValidator, IdeasAndOpportunityController.addIdeasAndOpportunity)

//Get IdeasAndOpportunity Details
router.get('/ideasAndOpportunity/:ideasAndOpportunityId', checkAuth, IdeasAndOpportunityValidator.getIdeasAndOpportunityByIdValidator, IdeasAndOpportunityController.getIdeasAndOpportunityById);

//update ideasAndOpportunity details
router.post("/update/:ideasAndOpportunityId", checkAuth, IdeasAndOpportunityValidator.updateIdeasAndOpportunityByIdValidator, IdeasAndOpportunityController.updateIdeasAndOpportunityById);

//delte ideasAndOpportunity by id
router.delete("/delete/:ideasAndOpportunityId", checkAuth, IdeasAndOpportunityValidator.getIdeasAndOpportunityByIdValidator, IdeasAndOpportunityController.deleteIdeasAndOpportunityById);

//get All details
router.get("/list", checkAuth, IdeasAndOpportunityController.enlistAllIdeasAndOpportunities)

module.exports = router;