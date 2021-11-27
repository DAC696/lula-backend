const Service = require('../schemas/service');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new service
 * @param {Object} service 
 */

const addService = async (service) => {
    try {

        const newService = new Service(service);

        const serviceCreated = await newService.save();

        //whenever new service is added then emit an event
        if (serviceCreated) {

            sendCustomEvent("serviceAdded", serviceCreated)

        }

        return serviceCreated;

    } catch (error) {

        console.log(error)

    }
}

const getServiceById = async (serviceId) => {
    try {

        const service = await Service.findOne({ _id: serviceId })
            .lean()

        return service;
    } catch (error) {
        console.log(error);
    }
}

const updateServiceById = async (serviceId, objToBeUpdated) => {
    try {

        const updatedService = await Service.findByIdAndUpdate({ _id: serviceId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever service is updated then emit an event
        if (updatedService) {

            sendCustomEvent("serviceUpdated", updatedService)

        }

        return updatedService;
    } catch (error) {
        console.log(error);
    }
}

const deleteServiceById = async (serviceId) => {
    try {

        const deletedService = await Service.deleteOne({ _id: serviceId })

        //whenever service is deleted then emit an event
        if (deletedService && deletedService.deletedCount) {

            sendCustomEvent("serviceDeleted", { serviceId })

        }

        return deletedService.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllServices = async () => {
    try {

        const services = await Service.find()
            .lean()

        return services;

    } catch (error) {
        console.log(error);
    }
}

const getServicesByIds = async (services) => {
    try {

        const servicesCount = await Service.find({ _id: { $in: services } })
            .lean()

        return servicesCount;

    } catch (error) {
        console.log(error);
    }
}
module.exports = {

    addService,
    getServicesByIds,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    enlistAllServices

}