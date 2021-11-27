// importing dependencies
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// const roles = [Constants.USER_ROLE.SYSTEMADMINISTRATOR, Constants.USER_ROLE.SUPERADMIN, Constants.USER_ROLE.PROVIDER, Constants.USER_ROLE.CLINICALSTAFF];

// creating income schema to be stored in db
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    profilePhotoPath: {
        type: String,
        default: ''
    },
    isSystemAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    _created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true, collection: "users", strict: false }
)

// capitalize every first character 
userSchema.pre('save', function (next) {
    // capitalize
    this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
    this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
    next();
});

// comparing hashed password
userSchema.methods.isValidPassword = async function (newPassword) {
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
module.exports = mongoose.model("User", userSchema);