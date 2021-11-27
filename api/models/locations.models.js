const Location = require('../schemas/location');
const { sendCustomEvent } = require("../misc/helperFunctions")
/**
 * @description This will create new location
 * @param {Object} location 
 */

const addLocation = async (location) => {
    try {

        const newLocation = new Location(location);

        const locationCreated = await newLocation.save();

        //whenever new location is added then emit an event
        if (locationCreated) {

            sendCustomEvent("locationAdded", locationCreated)

        }

        return locationCreated;

    } catch (error) {

        console.log(error)

    }
}

const getLocationById = async (locationId) => {
    try {

        const location = await Location.findOne({ _id: locationId })
            .lean()

        return location;
    } catch (error) {
        console.log(error);
    }
}

//custom loc id
const getLocationByCustomLocId = async (locId) => {
    try {

        const location = await Location.findOne({ locId })
            .lean()

        return location;
    } catch (error) {
        console.log(error);
    }
}

const updateLocationById = async (locationId, objToBeUpdated) => {
    try {

        const updatedLocation = await Location.findByIdAndUpdate({ _id: locationId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever location is updated then emit an event
        if (updatedLocation) {

            sendCustomEvent("locationUpdated", updatedLocation)

        }

        return updatedLocation;
    } catch (error) {
        console.log(error);
    }
}

const deleteLocationById = async (locationId) => {
    try {

        const deletedLocation = await Location.deleteOne({ _id: locationId })

        //whenever location is deleted then emit an event
        if (deletedLocation && deletedLocation.deletedCount) {

            sendCustomEvent("locationDeleted", { locationId })

        }

        return deletedLocation.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllLocations = async () => {
    try {

        const locations = await Location.find()
            .lean()

        return locations;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addLocation,
    getLocationByCustomLocId,
    getLocationById,
    updateLocationById,
    deleteLocationById,
    enlistAllLocations

}