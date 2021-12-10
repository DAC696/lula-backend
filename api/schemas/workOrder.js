// importing dependencies
const mongoose = require("mongoose");

// creating workorder schema to be stored in db
const workorderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskName: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        trim: true
    },
    origin: {
        type: String,
        trim: true
    },
    jobType: {
        type: String,
        trim: true
    },
    jobNumber: {
        type: String,
        trim: true
    },
    jobPriority: {
        type: String,
        trim: true
    },
    mainHours: {
        type: String,
        trim: true
    },
    parts: [
        {
            partId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Part'
            },
            partQuantity: {
                type: Number,
                trim: true
            }
        }
    ],
    taskFrequency: {
        type: String,
        trim: true
    },
    ptwRequired: {
        type: String,
        trim: true
    },
    hoursRun: {
        type:Boolean
    },
    completedAt: {
        type:String,
    },
    expiredAt: {
        type: Boolean,
        default:false
    },
    _roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
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
    { timestamps: true, collection: "workorders", strict: false }
)

// exporting schema
module.exports = mongoose.model("WorkOrder", workorderSchema);