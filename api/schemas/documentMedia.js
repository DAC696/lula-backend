// importing dependencies
const mongoose = require("mongoose");

// creating document schema to be stored in db
const documentMediaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    documentName: {
        type: String,
        trim: true
    },
    documentFullPath: {
        type: String,
        trim: true
    },
    _documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "documentMedias", strict: false }
)

// exporting schema
module.exports = mongoose.model("DocumentMedia", documentMediaSchema);