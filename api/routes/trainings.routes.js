/* IMPORTING MODULES */
const express = require("express");

const TrainingController = require("../controllers/trainings.controllers");

/* Validations */
const TrainingValidator = require('../validators/trainings.validators');

const checkAuth = require('../middlewares/checkAuth');

//import training Access Control
const trainingAccess = require("../middlewares/trainingAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Training
router.post('/addTraining/:employeeId', checkAuth, TrainingValidator.addTrainingValidator, TrainingController.addTraining)

//update training details
router.post("/update/:trainingId", checkAuth, TrainingValidator.updateTrainingByIdValidator, TrainingController.updateTrainingById);

//get All details
router.get("/list/:employeeId", checkAuth, TrainingValidator.getTrainingListByEmployeeIdValidator, TrainingController.getTrainingListByEmployeeId)

module.exports = router;