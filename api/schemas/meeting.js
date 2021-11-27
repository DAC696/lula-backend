// importing dependencies
const mongoose = require("mongoose");

// creating meeting schema to be stored in db
const meetingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    meetingName: {
        type: String,
        trim: true
    },
    meetingLocation: {
        type: String,
        trim: true
    },
    numOfPersons: {
        type: Number,
        trim: true
    },
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    meetingType: {
        type: String,
        trim: true
    },
    startDate: {
        type: String,
        trim: true
    },
    endDate: {
        type: String,
        trim: true
    },
    startTime: {
        type: String,
        trim: true
    },
    endTime: {
        type: String,
        trim: true
    },
    purpose: {
        type: String,
        trim: true
    },
    agenda: {
        type: String,
        trim: true
    },
    comments: {
        type: String,
        trim: true
    },
    _departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "meetings", strict: false }
)

// exporting schema
module.exports = mongoose.model("Meeting", meetingSchema);