/* IMPORTING MODULES */
const express = require("express");

const ContractController = require("../controllers/contracts.controllers");

/* Validations */
const ContractValidator = require('../validators/contracts.validators');

const ClientValidator = require('../validators/clients.validators');

const checkAuth = require('../middlewares/checkAuth');

const fileUpload = require('../middlewares/uploadDocument');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Contract
router.post('/addContract', checkAuth, fileUpload.single('contractDocument'), ContractValidator.addContractValidator, ContractController.addContract)


//Get Contract Details
router.get('/contract/:contractId', checkAuth, ContractValidator.getContractByIdValidator, ContractController.getContractById);

//get all contracts by clients Id
router.get("/list/:clientId", checkAuth, ClientValidator.getClientByIdValidator, ContractController.enlistAllContractsByClientId)

//update contract details
router.post("/update/:contractId", checkAuth, fileUpload.single('updateContract'), ContractValidator.updateContractByIdValidator, ContractController.updateContractById);

//delte contract by id
router.delete("/delete/:contractId", checkAuth, ContractValidator.getContractByIdValidator, ContractController.deleteContractById);

//get All details
router.get("/list", checkAuth, ContractController.enlistAllContracts)


module.exports = router;