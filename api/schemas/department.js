// importing dependencies
const mongoose = require("mongoose");

// creating department schema to be stored in db
const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: {
        type: String,
        trim: true
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "departments", strict: false }
)

// exporting schema
module.exports = mongoose.model("Department", departmentSchema);