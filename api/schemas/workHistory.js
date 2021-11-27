// importing dependencies
const mongoose = require("mongoose");

// creating workHistory schema to be stored in db
const workHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    startDate: {
        type: String,
        trim: true
    },
    endDate: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true,
        default: ""
    },
    isPresent: {
        type: Boolean
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "workHistorys", strict: false }
)

// exporting schema
module.exports = mongoose.model("WorkHistory", workHistorySchema);