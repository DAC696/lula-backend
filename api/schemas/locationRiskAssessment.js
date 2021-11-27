// importing dependencies
const mongoose = require("mongoose");

// creating locationriskassessment schema to be stored in db
const locationriskassessmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isPeople: {
        type: Boolean,
        trim: true
    },
    isAsset: {
        type: Boolean,
        trim: true
    },
    isEnvironment: {
        type: Boolean,
        trim: true
    },
    isReputation: {
        type: Boolean,
        trim: true
    },
    isRequiresPTW: {
        type: Boolean,
        trim: true
    },
    activity: {
        type: String,
        trim: true
    },
    hazard: {
        type: String,
        trim: true
    },
    hazardEffect: {
        type: String,
        trim: true
    },
    intialRiskRating: {
        type: String,
        trim: true
    },
    riskRanking: {
        type: String,
        trim: true
    },
    trainingRequired: {
        type: String,
        trim: true
    },
    lastReviewed: {
        type: String,
        trim: true
    },
    legalAndOtherRequirements: {
        type: String,
        trim: true
    },
    controlMeasures: {
        type: String,
        trim: true
    },
    supportingProcedures: {
        type: String,
        trim: true
    },
    _responsibleRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "locationriskassessments", strict: false }
)

// exporting schema
module.exports = mongoose.model("LocationRiskAssessment", locationriskassessmentSchema);