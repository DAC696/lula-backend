const Union = require('../schemas/union');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new union
 * @param {Object} union 
 */

const addUnion = async (union) => {
    try {

        const newUnion = new Union(union);

        const unionCreated = await newUnion.save();

        //whenever new union is added then emit an event
        if (unionCreated) {

            sendCustomEvent("unionAdded", unionCreated)

        }

        return unionCreated;

    } catch (error) {

        console.log(error)

    }
}

const getUnionById = async (unionId) => {
    try {

        const union = await Union.findOne({ _id: unionId })
            .lean()

        return union;
    } catch (error) {
        console.log(error);
    }
}

const updateUnionById = async (unionId, objToBeUpdated) => {
    try {

        const updatedUnion = await Union.findByIdAndUpdate({ _id: unionId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever union is updated then emit an event
        if (updatedUnion) {

            sendCustomEvent("unionUpdated", updatedUnion)

        }

        return updatedUnion;
    } catch (error) {
        console.log(error);
    }
}

const deleteUnionById = async (unionId) => {
    try {

        const deletedUnion = await Union.deleteOne({ _id: unionId })

        //whenever role is deleted then emit an event
        if (deletedUnion && deletedUnion.deletedCount) {

            sendCustomEvent("unionDeleted", { unionId })

        }

        return deletedUnion.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllUnions = async () => {
    try {

        const unions = await Union.find()
            .lean()

        return unions;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addUnion,
    getUnionById,
    updateUnionById,
    deleteUnionById,
    enlistAllUnions

}