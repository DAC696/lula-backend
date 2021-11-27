/* IMPORTING MODULES */
const express = require("express");

const WorkOrderController = require("../controllers/workOrders.controllers");

/* Validations */
const WorkOrderValidator = require('../validators/workOrders.validators');

const checkAuth = require('../middlewares/checkAuth');

//import workOrder Access Control
const workOrderAccess = require("../middlewares/workOrderAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new WorkOrder
router.post('/addWorkOrder', checkAuth, WorkOrderValidator.addWorkOrderValidator, WorkOrderController.addWorkOrder)

//Get WorkOrder Details
router.get('/workOrder/:workOrderId', checkAuth, WorkOrderValidator.getWorkOrderByIdValidator, WorkOrderController.getWorkOrderById);

//update workOrder details
router.post("/update/:workOrderId", checkAuth, WorkOrderValidator.updateWorkOrderByIdValidator, WorkOrderController.updateWorkOrderById);

//delte workOrder by id
router.delete("/delete/:workOrderId", checkAuth, WorkOrderValidator.getWorkOrderByIdValidator, WorkOrderController.deleteWorkOrderById);

//get All details
router.get("/list", checkAuth, WorkOrderController.enlistAllWorkOrders)

module.exports = router;