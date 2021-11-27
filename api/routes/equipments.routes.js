/* IMPORTING MODULES */
const express = require("express");

const EquipmentController = require("../controllers/equipments.controllers");

/* Validations */
const EquipmentValidator = require('../validators/equipments.validators');

const LocationValidator = require('../validators/locations.validators');

const checkAuth = require('../middlewares/checkAuth');

//import equipment Access Control
const equipmentAccess = require("../middlewares/equipmentAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Equipment
router.post('/addEquipment', checkAuth, EquipmentValidator.addEquipmentValidator, EquipmentController.addEquipment)

//Get Equipment Details
router.get('/equipment/:equipmentId', checkAuth, EquipmentValidator.getEquipmentByIdValidator, EquipmentController.getEquipmentById);

//update equipment details
router.post("/update/:equipmentId", checkAuth, EquipmentValidator.updateEquipmentByIdValidator, EquipmentController.updateEquipmentById);

//delte equipment by id
router.delete("/delete/:equipmentId", checkAuth, EquipmentValidator.getEquipmentByIdValidator, EquipmentController.deleteEquipmentById);

//get All details
router.get("/list", checkAuth, EquipmentController.enlistAllEquipments)

router.get("/list/:locationId", checkAuth, LocationValidator.getLocationByIdValidator,EquipmentController.enlistAllEquipmentsByLocationId)

module.exports = router;