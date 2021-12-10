const mongoose = require('mongoose')
const { isEmpty } = require('../../utils/custom.validator')
const WorkOrderModel = require('../models/workOrders.models')
const PartModel = require('../models/parts.models')
const RoleModel = require('../models/roles.models')
const EquipmentModel = require('../models/equipments.models')
const { StatusCodes } = require('http-status-codes')
const moment = require('moment')
const cron = require('node-cron')
const EventEmitter = require('events')
const event = new EventEmitter()
/**
 * @description let user add WorkOrder
 */

const addWorkOrder = async (req, res, next) => {
  try {
    //fetch used from token
    const user = req.userData

    const {
      status,
      description,
      taskName,
      origin,
      jobType,
      jobNumber,
      jobPriority,
      mainHours,
      parts,
      taskFrequency,
      ptwRequired,
      roleId,
      equipmentId
    } = req.body

    const equipment = await EquipmentModel.getEquipmentById(equipmentId)

    if (isEmpty(equipment)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        hasError: true,
        error: ['Equipment Not found of this id']
      })
    }

    const role = await RoleModel.getRoleById(roleId)

    if (isEmpty(role)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        hasError: true,
        error: ['Role Not found of this id']
      })
    }

    if (parts && Array.isArray(parts) && parts.length)
      for (let part of parts) {
        const { partId, partQuantity } = part

        const partFound = await PartModel.getPartById(partId)

        if (isEmpty(partFound)) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            hasError: true,
            error: ['partFound Not found of this id']
          })
        }

        if (partFound.quantity < partQuantity) {
          return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            hasError: true,
            error: ['Cannot subtract from the exceeded part quantity']
          })
        }

        // minus quantity from the parts
        const minusQuantity = partFound.quantity - partQuantity

        const updatedPart = await PartModel.updatePartById(partId, {
          quantity: minusQuantity
        })

        if (!updatedPart) {
          return res.status(StatusCodes.BAD_GATEWAY).json({
            success: false,
            hasError: true,
            error: ['Something Went Wrong']
          })
        }
      }

    //prepare object for storing workOrder in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      taskName,
      description,
      status,
      origin,
      jobType,
      jobNumber,
      jobPriority,
      mainHours,
      taskFrequency,
      ptwRequired,
      parts,
      _roleId: roleId,
      _equipmentId: equipmentId,
      _created_by: user._id
    }

    const workOrderSaved = await WorkOrderModel.addWorkOrder(prepObj, {
      equipmentName: equipment.equipmentName,
      roleName: role.roleName
    })

    if (isEmpty(workOrderSaved)) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        success: false,
        hasError: true,
        error: ['Something Went Wrong. WorkOrder is not saved yet']
      })
    }

    prepObj['_equipmentId'] = {
      equipmentName: equipment.equipmentName
    }

    prepObj['_roleId'] = {
      roleName: role.roleName
    }

    return res.status(StatusCodes.CREATED).json({
      success: true,
      hasError: false,
      payload: prepObj
    })
  } catch (error) {
    console.log(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      hasError: true,
      error: ['Internal Server Error']
    })
  }
}

const updateWorkOrderById = async (req, res, next) => {
  try {
    const { workOrderId } = req.params

    const workOrder = await WorkOrderModel.getWorkOrderById(workOrderId)

    if (isEmpty(workOrder)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        hasError: true,
        error: ['WorkOrder Not found of this id']
      })
    }

    const {
      taskName,
      status,
      description,
      origin,
      jobType,
      jobNumber,
      jobPriority,
      mainHours,
      taskFrequency,
      ptwRequired,
      // roleId,
      parts,
      equipmentId
    } = req.body

    //prepare object for storing user in db
    const updateData = {}

    if (equipmentId) {
      const equipment = await EquipmentModel.getEquipmentById(equipmentId)

      if (isEmpty(equipment)) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          hasError: true,
          error: ['Equipment Not found of this id']
        })
      } else {
        updateData['_equipmentId'] = equipmentId
      }
    }

    // if (roleId) {
    //   const role = await RoleModel.getRoleById(roleId)

    //   if (isEmpty(role)) {
    //     return res.status(StatusCodes.NOT_FOUND).json({
    //       success: false,
    //       hasError: true,
    //       error: ['Role Not found of this id']
    //     })
    //   }
    // } else {
    //   updateData['_roleId'] = roleId
    // }

    if (taskName) updateData['taskName'] = taskName
    if (origin) updateData['origin'] = origin
    if (jobNumber) updateData['jobNumber'] = jobNumber
    if (jobPriority) updateData['jobPriority'] = jobPriority
    if (jobType) updateData['jobType'] = jobType
    if (mainHours !== undefined) updateData['mainHours'] = mainHours
    if (status !== undefined) {
      updateData['status'] = status

      if (status == 'completed') {
        //create new work order

        let partsArr = []
        if (
          workOrder.parts &&
          Array.isArray(workOrder.parts) &&
          workOrder.parts.length
        )
          for (let part of workOrder.parts) {
            const { partId, partQuantity } = part

            const partFound = await PartModel.getPartById(partId._id)

            if (isEmpty(partFound)) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                hasError: true,
                error: ['partFound Not found of this id']
              })
            }

            partsArr.push({ partId: partId._id, partQuantity })

            if (partFound.quantity < partQuantity) {
              return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                hasError: true,
                error: ['Cannot subtract from the exceeded part quantity']
              })
            }

            // minus quantity from the parts
            const minusQuantity = partFound.quantity - partQuantity

            const updatedPart = await PartModel.updatePartById(partId._id, {
              quantity: minusQuantity
            })

            if (!updatedPart) {
              return res.status(StatusCodes.BAD_GATEWAY).json({
                success: false,
                hasError: true,
                error: ['Something Went Wrong']
              })
            }
          }

        // const prepObj = {
        //   _id: mongoose.Types.ObjectId(),
        //   taskName: workOrder.taskName,
        //   description: workOrder.description,
        //   status: "incomplete",
        //   origin: workOrder.origin,
        //   jobType: workOrder.jobType,
        //   jobNumber: workOrder.jobNumber,
        //   jobPriority: workOrder.jobPriority,
        //   mainHours: workOrder.mainHours,
        //   taskFrequency: workOrder.taskFrequency,
        //   ptwRequired: workOrder.ptwRequired,
        //   parts: partsArr,
        //   _roleId: workOrder._roleId,
        //   _equipmentId: workOrder._equipmentId,
        //   _created_by: workOrder._created_by
        // }

        // const workOrderSaved = await WorkOrderModel.addWorkOrder(prepObj, {
        //   equipmentName: workOrder._equipmentId.equipmentName,
        //   roleName: workOrder._roleId.roleName
        // });
      }
    }

    if (description !== undefined) updateData['description'] = description
    if (parts && Array.isArray(parts)) {
      for (let part of parts) {
        const { partId, partQuantity } = part

        const partFound = await PartModel.getPartById(part.partId)

        if (isEmpty(partFound)) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            hasError: true,
            error: ['Part is not found of this id']
          })
        }

        // minus quantity from the parts
        const minusQuantity = partFound.quantity - partQuantity

        const updatedPart = await PartModel.updatePartById(partId, {
          quantity: minusQuantity
        })
      }

      updateData['parts'] = parts
    }

    if (taskFrequency) updateData['taskFrequency'] = taskFrequency
    if (ptwRequired !== undefined) updateData['ptwRequired'] = ptwRequired

    if (!Object.keys(updateData).length) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        hasError: true,
        error: ['Minimum One field is required to update']
      })
    }
    updateData['completedAt'] = moment().toISOString()
    const updatedWorkOrder = await WorkOrderModel.updateWorkOrderById(
      workOrderId,
      updateData
    )

    if (isEmpty(updatedWorkOrder)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        hasError: true,
        error: ['Something Went Wrong. WorkOrder is not updated']
      })
    }
    const timeFrequency = updatedWorkOrder.taskFrequency.split(' ')[0]
    const totalWeeks = timeFrequency * 7
    const updatedTimeFrequency = moment(updatedWorkOrder.completedAt).add(
      totalWeeks,
      'days'
    )
    const formattedTime = updatedTimeFrequency.format('YYYY-MMM-DD h:mm:ss')
    const minutes = moment(updatedTimeFrequency).minutes()
    const hours = moment(updatedTimeFrequency).hours()
    const date = moment(updatedTimeFrequency).date()
    const month = formattedTime.split('-')[1]

    // console.log(minutes, hours, date, month)
    //     cron.schedule(`${minutes} ${hours} ${date} ${month} *`, () => {
    //   addWorkOrderRepeated(updatedWorkOrder)
    // })

    async function doSomething (updatedWorkOrder) {
      console.log("in function",updatedWorkOrder);

      const prepObj = {
          _id: mongoose.Types.ObjectId(),
          taskName: updatedWorkOrder.taskName,
          description: updatedWorkOrder.description,
          status: "incomplete",
          origin: updatedWorkOrder.origin,
          jobType: updatedWorkOrder.jobType,
          jobNumber: updatedWorkOrder.jobNumber,
          jobPriority: updatedWorkOrder.jobPriority,
          mainHours: updatedWorkOrder.mainHours,
          taskFrequency: updatedWorkOrder.taskFrequency,
          ptwRequired: updatedWorkOrder.ptwRequired,
          parts: updatedWorkOrder.parts,
          _roleId: updatedWorkOrder._roleId,
          _equipmentId: updatedWorkOrder._equipmentId,
          _created_by: updatedWorkOrder._created_by
      }
      console.log("new", prepObj);

        const workOrderSaved = await WorkOrderModel.addWorkOrder(prepObj, {
          equipmentName: updatedWorkOrder._equipmentId.equipmentName,
          roleName: updatedWorkOrder._roleId.roleName
        });
      let expired = { expiredAt: true };
      const updatedWorkOrderExpired = await WorkOrderModel.updateWorkOrderById(updatedWorkOrder._id, expired);
      event.emit('JOB COMPLETED');
    }
    const task = cron.schedule(`${minutes} ${hours} ${date} ${month} *`, () => {
      doSomething(updatedWorkOrder);
    })

    event.on('JOB COMPLETED', () => {
    console.log('Job done!');
    task.stop();
});

    return res.status(StatusCodes.CREATED).json({
      success: true,
      hasError: false,
      payload: updatedWorkOrder
    })
  } catch (error) {
    console.log(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      hasError: true,
      error: ['Internal Server Error']
    })
  }
}

const deleteWorkOrderById = async (req, res, next) => {
  try {
    const { workOrderId } = req.params

    const workOrder = await WorkOrderModel.getWorkOrderById(workOrderId)

    if (isEmpty(workOrder)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        hasError: true,
        error: ['WorkOrder Not found of this id']
      })
    }

    const deletedWorkOrderCount = await WorkOrderModel.deleteWorkOrderById(
      workOrderId
    )

    if (isEmpty(deletedWorkOrderCount)) {
      return res.status(StatusCodes.OK).json({
        success: false,
        hasError: true,
        error: ['No WorkOrder is deleted']
      })
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedWorkOrderCount
      }
    })
  } catch (error) {
    console.log(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      hasError: true,
      error: ['Internal Server Error']
    })
  }
}

/**
 * @description This will get WorkOrder details by workOrder id
 * @param {ObjectId} workOrderId
 */
const getWorkOrderById = async (req, res, next) => {
  try {
    const { workOrderId } = req.params

    const workOrder = await WorkOrderModel.getWorkOrderById(workOrderId)

    if (isEmpty(workOrder)) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        hasError: true,
        error: ['WorkOrder Not found of this id']
      })
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      hasError: false,
      payload: workOrder
    })
  } catch (error) {
    console.log(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      hasError: true,
      error: ['Internal Server Error']
    })
  }
}

const enlistAllWorkOrders = async (req, res, next) => {
  try {
    const workOrders = await WorkOrderModel.enlistAllWorkOrders()

    return res.status(StatusCodes.OK).json({
      success: true,
      hasError: false,
      total: workOrders ? workOrders.length : 0,
      payload: workOrders
    })
  } catch (error) {
    console.log(error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      hasError: true,
      error: ['Internal Server Error']
    })
  }
}
module.exports = {
  addWorkOrder,
  updateWorkOrderById,
  deleteWorkOrderById,
  getWorkOrderById,
  enlistAllWorkOrders
}
