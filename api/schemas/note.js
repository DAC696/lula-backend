// importing dependencies
const mongoose = require("mongoose");

// creating note schema to be stored in db
const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
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
    { timestamps: true, collection: "notes", strict: false }
)

// exporting schema
module.exports = mongoose.model("Note", noteSchema);