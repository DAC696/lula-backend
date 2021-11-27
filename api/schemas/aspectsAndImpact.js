// importing dependencies
const mongoose = require("mongoose");

// creating aspectsandimpact schema to be stored in db
const aspectsandimpactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    issue: {
        type: String,
        trim: true
    },
    impact: {
        type: String,
        trim: true
    },
    lastReviewed: {
        type: String,
        trim: true
    },
    aspectType: {
        type: String,
        trim: true
    },
    operatingCondition: {
        type: String,
        trim: true
    },
    influence: {
        type: String,
        trim: true
    },
    impactAssessment: {
        type: String,
        trim: true
    },
    residentialImpactLevel: {
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
    trainingNeeds: {
        type: String,
        trim: true
    },
    _reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
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
    { timestamps: true, collection: "aspectsandimpacts", strict: false }
)

// exporting schema
module.exports = mongoose.model("Aspectsandimpact", aspectsandimpactSchema);