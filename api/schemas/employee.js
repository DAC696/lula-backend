// importing dependencies
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


// creating employee schema to be stored in db
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    empId: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    homePhoneNumber: {
        type: String,
        trim: true
    },
    houseNumber: {
        type: String,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    floorNumber: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    areaCode: {
        type: String,
        trim: true
    },
    insurance: {
        type: String,
        trim: true
    },
    nationalID: {
        type: String,
        trim: true
    },
    passportNumber: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    dateHired: {
        type: String,
        trim: true
    },
    dateReleased: {
        type: String,
        trim: true
    },
    cbu: {
        type: String,
        trim: true
    },
    _departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    status: {
        type: String,
        trim: true
    },
    primaryFamilyMemberName: {
        type: String,
        trim: true
    },
    primaryFamilyMemberPhone: {
        type: String,
        trim: true
    },
    primaryFamilyMemberRelation: {
        type: String,
        trim: true
    },
    secondaryFamilyMemberName: {
        type: String,
        trim: true
    },
    secondaryFamilyMemberPhone: {
        type: String,
        trim: true
    },
    secondaryFamilyMemberRelation: {
        type: String,
        trim: true
    },
    tertiaryFamilyMemberName: {
        type: String,
        trim: true
    },
    tertiaryFamilyMemberPhone: {
        type: String,
        trim: true
    },
    tertiaryFamilyMemberRelation: {
        type: String,
        trim: true
    },
    employeeRole: {
        type: String,
        trim: true

    },
    _unionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Union'
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    _roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    _trainingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training'
    },
    profilePhoto: {
        type: String,
        trim: true,
        default: ""
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "employees", strict: false }
)

// comparing hashed password
employeeSchema.methods.isValidPassword = async function (newPassword) {
    try {
        console.log(newPassword, this.password)
        const passwordMatched = await bcrypt.compare(newPassword, this.password);
        console.log(passwordMatched);
        return passwordMatched;
    } catch (error) {
        console.log("error in compare password", error)
        next(error);
    }
}

// exporting schema
module.exports = mongoose.model("Employee", employeeSchema);