/* IMPORTING MODULES */
const express = require("express");

const RoleController = require("../controllers/roles.controllers");

/* Validations */
const RoleValidator = require('../validators/roles.validators');

const checkAuth = require('../middlewares/checkAuth');

//import role Access Control
const roleAccess = require("../middlewares/roleAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Role
router.post('/addRole', checkAuth, RoleValidator.addRoleValidator, RoleController.addRole)

//Get Role Details
router.get('/role/:roleId', checkAuth, RoleValidator.getRoleByIdValidator, RoleController.getRoleById);

//update role details
router.post("/update/:roleId", checkAuth, RoleValidator.updateRoleByIdValidator, RoleController.updateRoleById);

//delte role by id
router.delete("/delete/:roleId", checkAuth, RoleValidator.getRoleByIdValidator, RoleController.deleteRoleById);

//get All details
router.get("/list", checkAuth, RoleController.enlistAllRoles)

module.exports = router;