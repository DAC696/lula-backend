// importing dependencies
const mongoose = require("mongoose");

// creating ptw schema to be stored in db
const ptwSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ptwType: {
        type: String,
        trim: true
    },
    ptwNumber: {
        type: String,
        trim: true
    },
    toolboxTalkReference: {
        type: String,
        trim: true
    },
    isolationRequired: {
        type: String,
        trim: true
    },
    isolationType: {
        type: String,
        trim: true
    },
    isolationCertificate: {
        type: String,
        trim: true
    },
    workComplete: {
        type: String,
        trim: true
    },
    permitToBeAudited: {
        type: String,
        trim: true
    },
    natureOfWork: {
        type: String,
        trim: true
    },
    locationOfWork: {
        type: String,
        trim: true
    },
    riskAssessmentReference: {
        type: String,
        trim: true
    },
    coshh: {
        type: String,
        trim: true
    },
    datePermitAuthorised: {
        type: String,
        trim: true
    },
    liftingPlan: {
        type: String,
        trim: true
    },
    confinedSpaceRescuePlan: {
        type: String,
        trim: true
    },
    generalComments: {
        type: String,
        trim: true
    },
    _requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _isolationPerformedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "ptws", strict: false }
)

// exporting schema
module.exports = mongoose.model("PTW", ptwSchema);