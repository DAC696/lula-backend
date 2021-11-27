const Role = require('../schemas/role');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new role
 * @param {Object} role 
 */

const addRole = async (role, appendObj) => {
    try {

        const newRole = new Role(role);

        const roleCreated = await newRole.save();

        //whenever new role is added then emit an event
        if (roleCreated) {

            role["_permissionId"] = appendObj;

            sendCustomEvent("roleAdded", role)

        }

        return roleCreated;

    } catch (error) {

        console.log(error)

    }
}

const getRoleById = async (roleId) => {
    try {

        const role = await Role.findOne({ _id: roleId })
            .populate('_permissionId', '_id permissionName permissions')
            .lean() 
        return role;
    } catch (error) {
        console.log(error);
    }
}

const getRoleByRoleName = async (roleName) => {
    try {

        const role = await Role.findOne({ roleName: roleName })
            .populate('_permissionId', 'permissionName _id permissions')
            .lean()

        return role;
    } catch (error) {
        console.log(error);
    }
}

const updateRoleById = async (roleId, objToBeUpdated) => {
    try {

        const updatedRole = await Role.findByIdAndUpdate({ _id: roleId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_permissionId', '_id permissionName permissions')
            .lean()

        //whenever role is updated then emit an event
        if (updatedRole) {

            sendCustomEvent("roleUpdated", updatedRole)

        }

        return updatedRole;
    } catch (error) {
        console.log(error);
    }
}

const deleteRoleById = async (roleId) => {
    try {

        const deletedRole = await Role.deleteOne({ _id: roleId })

        //whenever role is deleted then emit an event
        if (deletedRole && deletedRole.deletedCount) {

            sendCustomEvent("roleDeleted", { roleId })

        }

        return deletedRole.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllRoles = async () => {
    try {

        const roles = await Role.find()
            .populate('_permissionId', '_id permissionName permissions')
            .lean()

        console.log(roles.length)
        return roles;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addRole,
    getRoleById,
    updateRoleById,
    deleteRoleById,
    enlistAllRoles,
    getRoleByRoleName

}