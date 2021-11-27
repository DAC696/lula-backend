/* IMPORTING MODULES */
const express = require("express");

const ServiceController = require("../controllers/services.controllers");

/* Validations */
const ServiceValidator = require('../validators/services.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Service
router.post('/addService', checkAuth, ServiceValidator.addServiceValidator, ServiceController.addService)

//Get Service Details
router.get('/service/:serviceId', checkAuth, ServiceValidator.getServiceByIdValidator, ServiceController.getServiceById);

//update service details
router.post("/update/:serviceId", checkAuth, ServiceValidator.updateServiceByIdValidator, ServiceController.updateServiceById);

//delte service by id
router.delete("/delete/:serviceId", checkAuth, ServiceValidator.getServiceByIdValidator, ServiceController.deleteServiceById);

//get All details
router.get("/list", checkAuth, ServiceController.enlistAllServices)

module.exports = router;