// importing dependencies
const mongoose = require("mongoose");

// creating salarycalculator schema to be stored in db
const salaryCalculatorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {},
    dates:[],
    startDate: {
        type: Date,
        trim: true
    },
    endDate: {
        type: Date,
        trim: true
    },
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "salaryCalculators", strict: false }
)

// exporting schema
module.exports = mongoose.model("SalaryCalculator", salaryCalculatorSchema);