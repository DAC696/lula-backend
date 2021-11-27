// importing dependencies
const mongoose = require("mongoose");

// creating part schema to be stored in db
const partSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemName: {
        type: String,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    suppliedBy: {
        type: String,
        trim: true
    },
    cost: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    isDeleted:{
        type: String,
        trim: true,
        default: false
    },
    _equipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "parts", strict: false }
)

// exporting schema
module.exports = mongoose.model("Part", partSchema);