/* IMPORTING MODULES */
const express = require("express");

const WorkHistoryController = require("../controllers/workHistories.controllers");

/* Validations */
const WorkHistoryValidator = require('../validators/workHistories.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new WorkHistory
router.post('/addWorkHistory/:employeeId', checkAuth, WorkHistoryValidator.addWorkHistoryValidator, WorkHistoryController.addWorkHistory)

//update workHistory details
router.post("/update/:workHistoryId", checkAuth, WorkHistoryValidator.updateWorkHistoryByIdValidator, WorkHistoryController.updateWorkHistoryById);

//delte workHistory by id
router.delete("/delete/:workHistoryId", checkAuth, WorkHistoryValidator.getWorkHistoryByIdValidator, WorkHistoryController.deleteWorkHistoryById);

module.exports = router;