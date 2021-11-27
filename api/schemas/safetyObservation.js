// importing dependencies
const mongoose = require("mongoose");

// creating safetyObservation schema to be stored in db
const safetyObservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    observationTitle: {
        type: String,
        trim: true
    },
    observationDate: {
        type: String,
        trim: true
    },
    observationType: {
        type: String,
        trim: true
    },
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    uaOrUc: {
        type: String,
        trim: true
    },
    workArea: {
        type: String,
        trim: true
    },
    riskRating: {
        type: String,
        trim: true
    },

    whatDidYouSee: {
        type: String,
        trim: true
    },
    whatDidYouDo: {
        type: String,
        trim: true
    },
    whatDidYouRecommend: {
        type: String,
        trim: true
    },
    responsibleJobTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
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
    { timestamps: true, collection: "safetyObservations", strict: false }
)

// exporting schema
module.exports = mongoose.model("SafetyObservation", safetyObservationSchema);