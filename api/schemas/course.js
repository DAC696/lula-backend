// importing dependencies
const mongoose = require("mongoose");

// creating course schema to be stored in db
const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseName: {
        type: String,
        trim: true
    },
    courseType: {
        type: String,
        trim: true
    },
    isMandatory: {
        type: Boolean
    },
    // validDate: {
    //     type: String,
    //     trim: true
    // },
    // expiryDate: {
    //     type: String,
    //     trim: true
    // },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "courses", strict: false }
)

// exporting schema
module.exports = mongoose.model("Course", courseSchema);