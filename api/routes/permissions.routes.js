/* IMPORTING MODULES */
const express = require("express");

const PermissionController = require("../controllers/permissions.controllers");

/* Validations */
const PermissionValidator = require('../validators/permissions.validators');

const checkAuth = require('../middlewares/checkAuth');

//import permission Access Control
const permissionAccess = require("../middlewares/permissionAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Permission
router.post('/addPermission', checkAuth, PermissionValidator.addPermissionValidator, PermissionController.addPermission)

//Get Permission Details
router.get('/permission/:permissionId', checkAuth, PermissionValidator.getPermissionByIdValidator, PermissionController.getPermissionById);

//update permission details
router.post("/update/:permissionId", checkAuth, PermissionValidator.updatePermissionByIdValidator, PermissionController.updatePermissionById);

//delte permission by id
router.delete("/delete/:permissionId", checkAuth, PermissionValidator.getPermissionByIdValidator, PermissionController.deletePermissionById);

//get All details
router.get("/list", checkAuth, PermissionController.enlistAllPermissions)

module.exports = router;