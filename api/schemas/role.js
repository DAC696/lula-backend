// importing dependencies
const mongoose = require("mongoose");

// creating role schema to be stored in db
const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roleName: {
        type: String,
        trim: true
    },
    _permissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "roles", strict: false }
)

// exporting schema
module.exports = mongoose.model("Role", roleSchema);