// importing dependencies
const mongoose = require("mongoose");

// creating consultation schema to be stored in db
const consultationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    consultationType: {
        type: String,
        trim: true
    },
    recordable: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    consulationDate: {
        type: String,
        trim: true
    },
    consulationTime: {
        type: String,
        trim: true
    },
    reportDate: {
        type: String,
        trim: true
    },
    _locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    registerNumber: {
        type: Number,
        trim: true
    },
    personWithInjuryOrPathalogy: {
        type: String,
        trim: true
    },
    _crewPosition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    intitialTreatmentProvidedBy: {
        type: String,
        trim: true
    },
    isEmployee: {
        type: String,
        trim: true
    },
    nonEmployeeAddressAndPhoneNumber: {
        type: String,
        trim: true
    },
    medicalRadioConsultation: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        trim: true
    },
    treatmentDate: {
        type: String,
        trim: true
    },
    doctorName: {
        type: String,
        trim: true
    },
    didItOccurAtWorkingHours: {
        type: String,
        trim: true
    },
    disembarkmentDate: {
        type: String,
        trim: true
    },
    embarkmentDate: {
        type: String,
        trim: true
    },
    diseaseDetails: {
        type: String,
        trim: true
    },
    medicOrders: {
        type: String,
        trim: true
    },
    location: {
        type: String,
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
    { timestamps: true, collection: "consultations", strict: false }
)

// exporting schema
module.exports = mongoose.model("Consultation", consultationSchema);