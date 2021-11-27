/* IMPORTING MODULES */
const express = require("express");

const UnionController = require("../controllers/unions.controllers");

/* Validations */
const UnionValidator = require('../validators/unions.validators');

const checkAuth = require('../middlewares/checkAuth');

//import union Access Control
const unionAccess = require("../middlewares/unionAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Union
router.post('/addUnion', checkAuth, UnionValidator.addUnionValidator, UnionController.addUnion)

//Get Union Details
router.get('/union/:unionId', checkAuth, UnionValidator.getUnionByIdValidator, UnionController.getUnionById);

//update union details
router.post("/update/:unionId", checkAuth, UnionValidator.updateUnionByIdValidator, UnionController.updateUnionById);

//delte union by id
router.delete("/delete/:unionId", checkAuth, UnionValidator.getUnionByIdValidator, UnionController.deleteUnionById);

//get All details
router.get("/list", checkAuth, UnionController.enlistAllUnions)

module.exports = router;