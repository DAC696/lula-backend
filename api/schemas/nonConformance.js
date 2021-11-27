// importing dependencies
const mongoose = require("mongoose");

// creating nonConformance schema to be stored in db
const nonConformanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _vesselIdentification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _observerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _observerPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    _areaInchargeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _areaInchargePosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    observedArea: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    annualCorrelativeNumber: {
        type: Number,
        trim: true
    },
    itemsEffected: {
        type: String,
        trim: true
    },
    levelOfNonConformity: {
        type: String,
        trim: true
    },
    summaryOfIdentifiedDeviation: {
        type: String,
        trim: true
    },
    actionProposed: {
        type: String,
        trim: true
    },
    timeLimitForCompliance: {
        type: String,
        trim: true
    },
    verificationOfCorrectiveAction: {
        type: String,
        trim: true
    },
    verificationComments: {
        type: String,
        trim: true
    },
    newCorrectiveActionProposed: {
        type: String,
        trim: true
    },
    newTimeLimit: {
        type: String,
        trim: true
    },
    verificationOfNewCorrectiveAction: {
        type: String,
        trim: true
    },
    closingDate: {
        type: String,
        trim: true
    },
    newVerificationComments: {
        type: String,
        trim: true
    },
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "nonConformances", strict: false }
)

// exporting schema
module.exports = mongoose.model("NonConformance", nonConformanceSchema);