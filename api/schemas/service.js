// importing dependencies
const mongoose = require("mongoose");

// creating service schema to be stored in db
const serviceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serviceName: {
        type: String,
        trim: true
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "services", strict: false }
)

// exporting schema
module.exports = mongoose.model("Service", serviceSchema);