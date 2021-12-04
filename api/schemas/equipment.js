// importing dependencies
const mongoose = require("mongoose");

// creating equipment schema to be stored in db
const equipmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    systems: {
        type: String,
        trim: true
    },
    reference: {
        type: String,
        trim: true
    },
    equipmentName: {
        type: String,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    model: {
        type: String,
        trim: true
    },
    serialNumber: {
        type: String,
        trim: true
    },
    suppliedBy: {
        type: String,
        trim: true
    },
    locatedBy: {
        type: String,
        trim: true
    },
    safetyCritical: {
        type: String,
        trim: true
    },
    value: {
        type: String,
        trim: true
    },
    lastMaintained: {
        type: String,
        trim: true
    },
    classComponent: {
        type: String,
        trim: true
    },
    classCode: {
        type: String,
        trim: true
    },
    dateInstalled: {
        type: String,
        trim: true
    },
    currentRunningHours: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    department: {
        type: String,
        trim: true
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "equipments", strict: false }
)

// exporting schema
module.exports = mongoose.model("Equipment", equipmentSchema);