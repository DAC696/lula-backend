const Meeting = require('../schemas/meeting');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new meeting
 * @param {Object} meeting 
 */

const addMeeting = async (meeting, eventObj) => {
    try {

        const newMeeting = new Meeting(meeting);

        const meetingCreated = await newMeeting.save();

        //whenever  meeting is updated then emit an event
        if (meetingCreated) {

            meeting["_departmentId"] = {

                departmentName: eventObj.departmentName

            };

            meeting["_employeeId"] = {

                firstName: eventObj.firstName,
                lastName: eventObj.lastName

            };

            sendCustomEvent("meetingAdded", meeting)

        }

        return meetingCreated;

    } catch (error) {

        console.log(error)

    }
}

const getMeetingById = async (meetingId) => {
    try {

        const meeting = await Meeting.findOne({ _id: meetingId })
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .lean()

        return meeting;
    } catch (error) {
        console.log(error);
    }
}

const updateMeetingById = async (meetingId, objToBeUpdated) => {
    try {

        const updatedMeeting = await Meeting.findByIdAndUpdate({ _id: meetingId }, objToBeUpdated, { upsert: true, new: true })
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .lean()

        //whenever  meeting is updated then emit an event
        if (updatedMeeting) {

            sendCustomEvent("meetingUpdated", updatedMeeting)

        }

        return updatedMeeting;

    } catch (error) {
        console.log(error);
    }
}

const deleteMeetingById = async (meetingId) => {
    try {

        const deletedMeeting = await Meeting.deleteOne({ _id: meetingId })

        //whenever  meeting is deleted then emit an event
        if (deletedMeeting && deletedMeeting.deletedCount) {

            sendCustomEvent("meetingDeleted", { meetingId })

        }

        return deletedMeeting.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllMeetings = async () => {
    try {

        const meetings = await Meeting.find()
            .populate("_employeeId", "firstName lastName")
            .populate("_departmentId", "departmentName")
            .lean()

        return meetings;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addMeeting,
    getMeetingById,
    updateMeetingById,
    deleteMeetingById,
    enlistAllMeetings

}