// importing dependencies
const mongoose = require("mongoose");

// creating service schema to be stored in db
const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clientName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    clientCompany: {
        type: String,
        trim: true
    },
    companyAddress: {
        type: String,
        trim: true
    },
    companyLogo: { //base64
        type: String,
        trim: true,
        default: ""
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "clients", strict: false }
)

// exporting schema
module.exports = mongoose.model("Client", clientSchema);