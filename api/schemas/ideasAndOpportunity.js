// importing dependencies
const mongoose = require("mongoose");

// creating ideasAndOpportunity schema to be stored in db
const ideasAndOpportunitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ideaTitle: {
        type: String,
        trim: true
    },
    ideaDate: {
        type: String,
        trim: true
    },
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    opportunityArea: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    reasonForSuggestion: {
        type: String,
        trim: true
    },
    suggestedImprovements: {
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
    { timestamps: true, collection: "ideasAndOpportunities", strict: false }
)

// exporting schema
module.exports = mongoose.model("IdeasAndOpportunity", ideasAndOpportunitySchema);