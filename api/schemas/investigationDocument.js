// importing dependencies
const mongoose = require("mongoose");

// creating investigationDocument schema to be stored in db
const investigationDocumentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    documentURL: {
        type: String,
        trim: true
    },
    documentName: {
        type: String,
        trim: true
    },
    _incidentInvestigationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncidentInvestigation'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "investigationDocuments", strict: false }
)

// exporting schema
module.exports = mongoose.model("InvestigationDocument", investigationDocumentSchema);