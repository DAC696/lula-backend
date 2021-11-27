const Permission = require('../schemas/permission');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new permission
 * @param {Object} permission 
 */

const addPermission = async (permission) => {
    try {

        const newPermission = new Permission(permission);

        const permissionCreated = await newPermission.save();

        //whenever new permission is added then emit an event
        if (permissionCreated) {

            sendCustomEvent("permissionAdded", permissionCreated)

        }

        return permissionCreated;

    } catch (error) {

        console.log(error)

    }
}

//get permission by Permission Name
const getPermissionByPermissionName = async (permissionName) => {
    try {

        const permission = await Permission.findOne({ permissionName })
            .lean()

        return permission;
    } catch (error) {
        console.log(error);
    }
}

const getPermissionById = async (permissionId) => {
    try {

        const permission = await Permission.findOne({ _id: permissionId })
            .lean()

        return permission;
    } catch (error) {
        console.log(error);
    }
}

const updatePermissionById = async (permissionId, objToBeUpdated) => {
    try {

        const updatedPermission = await Permission.findByIdAndUpdate({ _id: permissionId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever permission is updated then emit an event
        if (updatedPermission) {

            sendCustomEvent("permissionUpdated", updatedPermission)

        }

        return updatedPermission;
    } catch (error) {
        console.log(error);
    }
}

const deletePermissionById = async (permissionId) => {
    try {

        const deletedPermission = await Permission.deleteOne({ _id: permissionId })

        //whenever permission is deleted then emit an event
        if (deletedPermission && deletedPermission.deletedCount) {

            sendCustomEvent("permissionDeleted", { permissionId })

        }

        return deletedPermission.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllPermissions = async () => {
    try {

        const permissions = await Permission.find()
            .lean()

        return permissions;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addPermission,
    getPermissionByPermissionName,
    getPermissionById,
    updatePermissionById,
    deletePermissionById,
    enlistAllPermissions

}