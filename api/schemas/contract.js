// importing dependencies
const mongoose = require("mongoose");

// creating contract schema to be stored in db
const contractSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    contractTitle: {
        type: String,
        trim: true
    },
    _clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    _services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    dayRate: {
        type: Number
    },
    totalValue: {
        type: Number
    },
    startDate: {
        type: String,
        trim: true
    },
    endDate: {
        type: String,
        trim: true
    },
    documentName: {
        type: String,
        trim: true,
        default: ""
    },
    documentURL: {
        type: String,
        trim: true,
        default: ""
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "contracts", strict: false }
)

// exporting schema
module.exports = mongoose.model("Contract", contractSchema);