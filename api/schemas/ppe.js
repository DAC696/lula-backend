// importing dependencies
const mongoose = require("mongoose");

// creating ppe schema to be stored in db
const ppeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ppe: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
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
    { timestamps: true, collection: "ppes", strict: false }
)

// exporting schema
module.exports = mongoose.model("Ppe", ppeSchema);