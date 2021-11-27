/* IMPORTING MODULES */
const express = require("express");

const ClientController = require("../controllers/clients.controllers");

/* Validations */
const ClientValidator = require('../validators/clients.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Client
router.post('/addClient', checkAuth, ClientValidator.addClientValidator, ClientController.addClient)

//Get Client Details
router.get('/client/:clientId', checkAuth, ClientValidator.getClientByIdValidator, ClientController.getClientById);

//update client details
router.post("/update/:clientId", checkAuth, ClientValidator.updateClientByIdValidator, ClientController.updateClientById);

//delte client by id
router.delete("/delete/:clientId", checkAuth, ClientValidator.getClientByIdValidator, ClientController.deleteClientById);

//get All details
router.get("/list", checkAuth, ClientController.enlistAllClients)

module.exports = router;