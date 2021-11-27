// importing dependencies
const mongoose = require("mongoose");

// creating document schema to be stored in db
const documentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    revisionNumber: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true,
        default: ''
    },
    documentType: {
        type: String,
        trim: true
    },
    documentName: {
        type: String,
        trim: true
    },
    documentFullPath: {
        type: String,
        trim: true
    },
    _documentOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "documents", strict: false }
)

// exporting schema
module.exports = mongoose.model("Document", documentSchema);