/* IMPORTING MODULES */
const express = require("express");

const DocumentController = require("../controllers/documents.controllers");

/* Validations */
const DocumentValidator = require('../validators/documents.validators');

const LocationValidator = require('../validators/locations.validators');

const checkAuth = require('../middlewares/checkAuth');

//import document Access Control
// const documentAccess = require("../middlewares/documentAccess");

const fileUpload = require('../middlewares/uploadMultipleDocument');


/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Document
router.post('/addDocument', checkAuth, fileUpload.array('uploadDocuments',100), DocumentValidator.addDocumentValidator, DocumentController.addDocument)

//Get Document Details
router.get('/document/:documentId', checkAuth, DocumentValidator.getDocumentByIdValidator, DocumentController.getDocumentById);

//update document details
router.post("/update/:documentId", checkAuth, fileUpload.array('uploadDocuments'), DocumentValidator.updateDocumentByIdValidator, DocumentController.updateDocumentById);

//delte document by id
router.delete("/delete/:documentId", checkAuth, DocumentValidator.getDocumentByIdValidator, DocumentController.deleteDocumentById);

//get All details
router.get("/list", checkAuth, DocumentController.enlistAllDocuments)

//get documents by location id
router.get("/list/:locationId", checkAuth, LocationValidator.getLocationByIdValidator,DocumentController.enlistAllDocumentsByLocationId) 

module.exports = router;