/* IMPORTING MODULES */
const express = require("express");

const AppraisalController = require("../controllers/appraisals.controllers");

/* Validations */
const AppraisalValidator = require('../validators/appraisals.validators');

const checkAuth = require('../middlewares/checkAuth');

//import Access Control Middleware
const appraisalAccess = require("../middlewares/appraisalAccess");


/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Appraisal
router.post('/addAppraisal/:employeeId', checkAuth, AppraisalValidator.addAppraisalsValidator, AppraisalController.addAppraisal)

//delte appraisal by id
router.delete("/delete/:appraisalId", checkAuth, AppraisalValidator.getAppraisalsByIdValidator, AppraisalController.deleteAppraisalById);

router.get("/list", checkAuth, AppraisalController.enlistAllAppraisals)
module.exports = router;