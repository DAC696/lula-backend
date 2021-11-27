// importing dependencies
const mongoose = require("mongoose");

// creating location schema to be stored in db
const locationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    locId: {
        type: String,
        trim: true
    },
    locName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    locSign: {
        type: String,
        trim: true
    },
    locStatus: {
        type: String,
        trim: true
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "locations", strict: false }
)

// exporting schema
module.exports = mongoose.model("Location", locationSchema);