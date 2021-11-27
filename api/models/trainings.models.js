const Training = require('../schemas/training');
const { sendCustomEvent } = require("../misc/helperFunctions")
const mongoose = require("mongoose");
const training = require('../schemas/training');
const ObjectId = mongoose.Types.ObjectId;
/**
 * @description This will create new training
 * @param {Object} training 
 */

const addTraining = async (training, appendObj) => {
    try {

        const newTraining = new Training(training);

        const trainingCreated = await newTraining.save();

        //whenever new training is added then emit an event
        if (trainingCreated && trainingCreated) {

            training["_courseId"] = appendObj;

            sendCustomEvent("trainingAdded", training)

        }

        return trainingCreated;

    } catch (error) {

        console.log(error)

    }
}

const getTrainingById = async (trainingId) => {
    try {

        const training = await Training.findOne({ _id: trainingId })
            .lean()

        return training;
    } catch (error) {
        console.log(error);
    }
}

const updateTrainingById = async (trainingId, objToBeUpdated) => {
    try {

        const updatedTraining = await Training.findByIdAndUpdate({ _id: trainingId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_courseId")
            .populate("_employeeId")
            .lean()

        //whenever training is updated then emit an event
        if (updatedTraining && updatedTraining) {

            sendCustomEvent("trainingUpdated", updatedTraining)

        }

        return updatedTraining;
    } catch (error) {
        console.log(error);
    }
}

const getTrainingListByEmployeeId = async (employeeId) => {
    try {

        const trainings = await Training.find({ _employeeId: ObjectId(employeeId) })
            .populate("_courseId")
            .populate("_employeeId", "-profilePhoto")
            .lean()

        return trainings;

    } catch (error) {
        console.log(error);
    }
}

const deleteTrainingsByEmployeeId = async (employeeId) => {
    try {

        const trainings = await Training.deleteMany({ _employeeId: employeeId })

        return trainings
    } catch (error) {
        console.log(error)
    }
}

const deleteTrainingsByCourseId = async (courseId) => {
    try {

        const trainings = await Training.deleteMany({ _courseId: courseId })

        return trainings
    } catch (error) {
        console.log(error)
    }
}

module.exports = {

    addTraining,
    getTrainingById,
    updateTrainingById,
    getTrainingListByEmployeeId,
    deleteTrainingsByEmployeeId,
    deleteTrainingsByCourseId

}