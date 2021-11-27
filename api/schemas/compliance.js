// importing dependencies
const mongoose = require("mongoose");

// creating compliance schema to be stored in db
const complianceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: {
        type: String,
        trim: true
    },
    complianceType: {
        type: String,
        trim: true
    },
    internalOrExternal: {
        type: String,
        trim: true
    },
    complianceCategory: {
        type: String,
        trim: true
    },
    isDomestic: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    externalAuditor: {
        type: String,
        trim: true
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _internalAuditor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "compliances", strict: false }
)

// exporting schema
module.exports = mongoose.model("Compliance", complianceSchema);