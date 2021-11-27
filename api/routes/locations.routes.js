/* IMPORTING MODULES */
const express = require("express");

const LocationController = require("../controllers/locations.controllers");

/* Validations */
const LocationValidator = require('../validators/locations.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Location
router.post('/addLocation', checkAuth, LocationValidator.addLocationValidator, LocationController.addLocation)

//Get Location Details
router.get('/location/:locationId', checkAuth, LocationValidator.getLocationByIdValidator, LocationController.getLocationById);

//update location details
router.post("/update/:locationId", checkAuth, LocationValidator.updateLocationByIdValidator, LocationController.updateLocationById);

//delte location by id
router.delete("/delete/:locationId", checkAuth, LocationValidator.getLocationByIdValidator, LocationController.deleteLocationById);

//get All details
router.get("/list", checkAuth, LocationController.enlistAllLocations)

module.exports = router;