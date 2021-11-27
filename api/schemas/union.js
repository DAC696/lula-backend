// importing dependencies
const mongoose = require("mongoose");

// creating union schema to be stored in db
const unionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unionName: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "unions", strict: false }
)

// exporting schema
module.exports = mongoose.model("Union", unionSchema);