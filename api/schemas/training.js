// importing dependencies
const mongoose = require("mongoose");

// creating training schema to be stored in db
const trainingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    trainingStatus: {
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
    { timestamps: true, collection: "trainings", strict: false }
)

// exporting schema
module.exports = mongoose.model("Training", trainingSchema);