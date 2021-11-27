// importing dependencies
const mongoose = require("mongoose");

// creating incidentInvestigation schema to be stored in db
const incidentInvestigationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    investigationTitle: {
        type: String,
        trim: true
    },
    investigationType: {
        type: String,
        trim: true
    },
    classification: {
        type: String,
        trim: true
    },
    incidentTime: {
        type: String,
        trim: true
    },
    incidentDate: {
        type: String,
        trim: true
    },
    dateReported: {
        type: String,
        trim: true
    },
    LWDs: {
        type: String,
        trim: true
    },
    workArea: {
        type: String,
        trim: true
    },
    severityType: {
        type: String,
        trim: true
    },
    riskRating: {
        type: String,
        trim: true
    },
    potentialRating: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    immediateCorrectiveAction: {
        type: String,
        trim: true
    },
    additionalAssistanceProvided: {
        type: String,
        trim: true
    },
    isPersonnelRelated: {
        type: Boolean
    },
    isLocationLineManagerInformed: {
        type: Boolean
    },
    isClientInformed: {
        type: Boolean
    },
    isHIPO: {
        type: Boolean
    },
    _reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _roleId: {
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
    { timestamps: true, collection: "incidentInvestigations", strict: false }
)

// exporting schema
module.exports = mongoose.model("IncidentInvestigation", incidentInvestigationSchema);