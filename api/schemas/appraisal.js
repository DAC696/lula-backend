// importing dependencies
const mongoose = require("mongoose");

// creating appraisal schema to be stored in db
const appraisalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // appraisalTitle: {
    //     type: String,
    //     trim: true
    // },
    appraisalFirstName: {
        type: String,
        trim: true
    },
    appraisalLastName: {
        type: String,
        trim: true
    },
   _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    startDate: {
        type: String,
        trim: true
    },
    endDate: {
        type: String,
        trim: true
    },
    appraisalType: {
        type: String,
        trim: true
    },
    appraisalDetails: {},
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "appraisals", strict: false }
)

// exporting schema
module.exports = mongoose.model("Appraisal", appraisalSchema);